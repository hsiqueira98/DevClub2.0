import { gsap, SplitText } from '../lib/gsap'
import { DURATION } from './motion.tokens'

/*
 * Chapter 04 (docs/STORYBOARD.md / DECISION_LOG.md — this chapter's
 * 5th and final mechanism, locked in): a pinned rolodex of full-screen
 * cards, one per method pillar (Fase B), flipping on scroll. A
 * progress bar and the DevClub mark both react per transition; the
 * last card holds, then a blackout hands off into Chapter 05.
 *
 * No gsap.matchMedia — same rule as hero.timeline.js: its cleanup
 * isn't captured by useGSAP's context (StrictMode double-mount left
 * ghost tweens last time). Reduced motion is a plain window.matchMedia
 * check — and the rolodex also needs a `lg`-equivalent width check,
 * since below it PillarRolodex.jsx's CSS makes [data-pillars-stage]
 * display:none, and pinning a hidden, zero-size element would still
 * reserve its full `end` distance as dead page scroll. Neither check
 * is "live" — same trade-off hero.timeline.js already accepts.
 */
export function createPillarsTimeline(section) {
  const title = section.querySelector('[data-pillars-title]')
  const stage = section.querySelector('[data-pillars-stage]')

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.from(title, { autoAlpha: 0, duration: DURATION.fast })
    return
  }

  const cleanupTitle = setupTitleReveal(title)
  const cleanupRolodex =
    stage && window.matchMedia('(min-width: 1024px)').matches
      ? setupRolodex(stage)
      : undefined

  return () => {
    cleanupTitle()
    cleanupRolodex?.()
  }
}

// Fase A: the headline breaks into lines and rises into place as it
// enters view — a normal scroll-linked reveal, no pin.
function setupTitleReveal(title) {
  const split = new SplitText(title, { type: 'lines' })

  gsap.from(split.lines, {
    rotationX: -100,
    transformOrigin: '50% 50% -160px',
    opacity: 0,
    stagger: 0.25,
    ease: 'power3',
    scrollTrigger: {
      trigger: title,
      start: 'top 85%',
      end: 'top 40%',
      scrub: 1,
    },
  })

  return () => split.revert()
}

// Fase B: the stage pins on its own, so Fase A scrolls past normally
// before the pin engages. One continuous timeline, built once and
// scrubbed by ScrollTrigger — not an index tracked in onUpdate that
// fires a fresh mini-timeline per transition, which is how this
// chapter's previous two mechanisms both worked. Scrubbing a
// pre-built timeline reverses for free: no `animating` guard, no
// manual currentIndex bookkeeping, no risk of a transition firing
// twice on a fast scroll — GSAP's own scrub already owns all of that.
// Cards flip via rotationX (a rolodex, not a wipe): backface-
// visibility:hidden hides a card once it's rotated edge-on, so no
// autoAlpha/opacity bookkeeping is needed to hide an inactive one.
function setupRolodex(stage) {
  const cards = Array.from(stage.querySelectorAll('[data-pillar-card]'))
  const blackout = stage.querySelector('[data-pillars-blackout]')
  const progressFill = stage.querySelector('[data-pillars-progress-fill]')
  const mark = stage.querySelector('[data-pillars-mark]')
  const DELAY = 0.5 // dwell time on each card before it flips onward

  const splitTexts = cards.map(
    (card) =>
      new SplitText(
        card.querySelectorAll(
          '[data-slide-heading], [data-slide-qualifier], [data-slide-description]',
        ),
        { type: 'words' },
      ),
  )

  // -900px (not the -300px a small demo card would use): the Z-axis
  // origin needs to scale with the element's own size, or the flip
  // visibly distorts — a full-screen card needs the rotation axis
  // much further back than a few-hundred-px demo card does. Paired
  // with [perspective:3000px] on the stage in PillarRolodex.jsx.
  gsap.set(cards, {
    rotationX: (i) => (i ? -90 : 0),
    transformOrigin: 'center center -900px',
  })
  gsap.set(splitTexts[0].words, { autoAlpha: 1, yPercent: 0 })
  splitTexts
    .slice(1)
    .forEach((split) => gsap.set(split.words, { autoAlpha: 0, yPercent: 30 }))

  // Accessibility bookkeeping only — never fires a tween of its own.
  // The visuals are entirely the pre-built, scrubbed timeline below;
  // called once up front too, so Tab reaches card 0 before any scroll
  // has happened (onUpdate firing immediately on creation isn't
  // guaranteed — same reasoning as every prior version of this file).
  function updateActiveIndex(progress) {
    const activeIndex = Math.min(
      cards.length - 1,
      Math.round(progress * cards.length),
    )
    cards.forEach((card, i) => {
      card.tabIndex = i === activeIndex ? 0 : -1
    })
  }
  updateActiveIndex(0)

  const tl = gsap.timeline({
    defaults: { ease: 'power1.inOut' },
    scrollTrigger: {
      trigger: stage,
      start: 'top top',
      end: () => `+=${window.innerHeight * cards.length * 1.3}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => updateActiveIndex(self.progress),
    },
  })

  cards.forEach((card, i) => {
    const next = cards[i + 1]
    if (!next) return

    tl.to(card, { rotationX: 90 }, '+=' + DELAY)
      .to(next, { rotationX: 0 }, '<')
      .to(
        splitTexts[i].words,
        { autoAlpha: 0, yPercent: -20, stagger: 0.008 },
        '<',
      )
      .fromTo(
        splitTexts[i + 1].words,
        { autoAlpha: 0, yPercent: 30 },
        { autoAlpha: 1, yPercent: 0, stagger: 0.02 },
        '<0.15',
      )

    if (progressFill) {
      tl.to(
        progressFill,
        { width: `${((i + 1) / (cards.length - 1)) * 100}%` },
        '<',
      )
    }
    if (mark) {
      tl.to(
        mark,
        { rotation: '+=90', scale: 1.15, yoyo: true, repeat: 1, duration: 0.4 },
        '<',
      )
    }
  })

  // Tail: hold on the last card, then darken into Chapter 05 — same
  // blackout handoff technique as before, now just the tail of this
  // one timeline instead of a separately-computed amount in onUpdate.
  tl.to({}, { duration: DELAY })
  if (blackout) tl.to(blackout, { opacity: 1, duration: DELAY * 1.5 })

  return () => {
    splitTexts.forEach((split) => split.revert())
    cards.forEach((card) => {
      card.tabIndex = 0
    })
  }
}
