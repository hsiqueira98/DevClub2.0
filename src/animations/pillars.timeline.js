import { gsap, ScrollTrigger, SplitText } from '../lib/gsap'
import { DURATION } from './motion.tokens'

/*
 * Chapter 04 (docs/STORYBOARD.md / DECISION_LOG.md): a stack of
 * full-screen pillar cards (Fase B), all `position:absolute` inside
 * one pinned stage, driven by a single scrubbed GSAP timeline — not
 * per-card ScrollTriggers. Adapted from Skiper UI's stacking-cards
 * technique, stripped of its own component shell and its own Lenis
 * instance: this project already runs exactly one, in
 * SmoothScrollProvider.jsx, and a second would fight it for control of
 * scroll — the same reason React Bits' ScrollStack has been off the
 * table for this chapter since much earlier in this project.
 *
 * No gsap.matchMedia — same rule as hero.timeline.js: its cleanup
 * isn't captured by useGSAP's context. A plain window.matchMedia check
 * covers reduced motion and the `lg` width PillarStack.jsx's CSS gates
 * on (pinning a hidden container would reserve scroll for nothing
 * visible) — neither check is "live", same trade-off as elsewhere.
 */
export function createPillarsTimeline(section) {
  const title = section.querySelector('[data-pillars-title]')
  const container = section.querySelector('[data-pillars-stack]')
  const blackout = section.querySelector('[data-pillars-blackout]')

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.from(title, { autoAlpha: 0, duration: DURATION.fast })
    return
  }

  const cleanupTitle = setupTitleReveal(title)
  const isDesktop =
    container && window.matchMedia('(min-width: 1024px)').matches
  const cleanupStack = isDesktop ? setupStack(container, blackout) : undefined

  return () => {
    cleanupTitle()
    cleanupStack?.()
  }
}

// Fase A: a ScrollFloat-style reveal — each character rises from below
// with a squash-and-stretch overshoot. `type: 'chars,words'`, not just
// 'chars': SplitText also wraps each word in its own span when 'words'
// is included, and that word-level span is what keeps the browser's
// line-wrapping breaking between words rather than between individual,
// now-independently-positioned character spans.
function setupTitleReveal(title) {
  // The gradient accent word is handed to SplitText's `ignore` as an
  // ELEMENT, not a selector string (no scope resolution to get wrong).
  // Without this it rendered as a blank gap in the middle of the
  // headline: SplitText re-wraps every character in its own
  // inline-block span, and AccentText's background-clip:text does not
  // survive that — the same hazard FirstDecision.jsx documents for the
  // hero, which is why the hero's accent is a flat colour. Ignored, the
  // <em> stays one intact node, keeps its gradient, and earns its own
  // beat below.
  const accent = title.querySelector('[data-split-ignore]')
  const split = new SplitText(title, {
    type: 'chars,words',
    ignore: accent || undefined,
  })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: title,
      start: 'center bottom+=50%',
      end: 'bottom bottom-=40%',
      scrub: true,
    },
  })

  tl.fromTo(
    split.chars,
    {
      opacity: 0,
      yPercent: 120,
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: '50% 0%',
    },
    {
      opacity: 1,
      yPercent: 0,
      scaleY: 1,
      scaleX: 1,
      duration: 1,
      ease: 'back.inOut(2)',
      stagger: 0.03,
    },
  )

  // The payoff word wipes in after the sentence has finished
  // assembling, rather than arriving inside the same stagger as
  // everything else. A clip-path wipe, not opacity: the gradient has to
  // stay painted across the whole word for it to read as one surface
  // being uncovered.
  if (accent) {
    tl.fromTo(
      accent,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power2.out' },
      '>-0.25',
    )
  }

  return () => split.revert()
}

// Fase B: one pinned timeline for the whole sequence. Each card holds
// its place and shrinks/rotates while the next slides up over it from
// `yPercent: 100` — the frame's own `overflow-hidden` is what hides a
// card that hasn't arrived yet, so no opacity bookkeeping is needed.
// Later cards sit later in the DOM, so they paint over earlier ones
// without any explicit z-index.
//
// The timeline/scroll budget was verified against the real installed
// GSAP rather than reasoned about: with 5 cards the loop runs i=0..3,
// its last tween sits at position 3 with duration 1, so the timeline
// measures exactly 4 after the loop; the blackout is placed explicitly
// at `cards.length - 1` (= 4) for TAIL, landing the total at 4.6 —
// matching `end`'s own `(cards.length - 1 + TAIL)` viewport-heights
// exactly, with no gap or overlap between the last transition ending
// and the blackout starting. Confirmed by building the identical
// structure against real GSAP and reading back every child's
// start/end time, not by trusting the arithmetic on sight.
//
// The mark's rotation is driven straight off `self.progress` in
// onUpdate rather than a `yoyo`/`repeat` tween inside the scrub: a
// repeating tween scrubbed backwards behaves unpredictably when the
// visitor flicks up and down quickly, whereas a pure function of
// progress is correct in both directions by construction.
function setupStack(stage, blackout) {
  const cards = Array.from(stage.querySelectorAll('[data-pillar-card]'))
  const frame = stage.querySelector('[data-pillars-frame]')
  const progress = stage.querySelector('[data-pillars-progress]')
  const progressFill = stage.querySelector('[data-pillars-progress-fill]')
  const mark = stage.querySelector('[data-pillars-mark]')

  const splitTexts = cards.map(
    (card) =>
      new SplitText(
        card.querySelectorAll(
          '[data-slide-heading], [data-slide-qualifier], [data-slide-description]',
        ),
        { type: 'words' },
      ),
  )

  // Card 0 on screen, every other one exactly one height below it and
  // clipped away by the frame's overflow. `transformOrigin` is set here
  // too, not only in the tween, so the very first frame already matches
  // the state the timeline animates toward.
  // Words settle in from ABOVE, unblurring as they land — the BlurText
  // look, expressed as GSAP state rather than that component itself.
  // BlurText fires once off an IntersectionObserver, which can't work
  // here: all five cards sit absolutely inside a frame that's on screen
  // the whole time, so every card's text would trigger at once, most of
  // it animating invisibly behind the active card. Driving the same
  // properties from this scrub keeps the reveal tied to scroll position
  // and reversible on the way back up.
  const WORD_HIDDEN = { autoAlpha: 0, yPercent: -40, filter: 'blur(10px)' }
  const WORD_SHOWN = { autoAlpha: 1, yPercent: 0, filter: 'blur(0px)' }

  gsap.set(cards[0], {
    yPercent: 0,
    scale: 1,
    rotation: 0,
    transformOrigin: 'top center',
  })
  gsap.set(splitTexts[0].words, WORD_SHOWN)
  cards.slice(1).forEach((card, i) => {
    gsap.set(card, {
      yPercent: 100,
      scale: 1,
      rotation: 0,
      transformOrigin: 'top center',
    })
    gsap.set(splitTexts[i + 1].words, WORD_HIDDEN)
  })

  // Scroll budget per card, in timeline units (1 unit = 1 viewport
  // height of scroll). Each card's beat runs: the swap (SHIFT), then
  // its text filling in, then a real hold with everything complete
  // before the next card starts — that hold is the whole point, and is
  // just STEP minus the phases before it.
  //
  // TEXT_SPREAD is a stagger `amount`, not a per-word `each`: the
  // description runs ~40 words, so a per-word stagger of even 0.02
  // silently consumed 0.8 units on its own and would drift every time
  // the copy changed length. `amount` distributes one fixed total no
  // matter the word count, which is what makes the dwell below
  // predictable rather than incidental.
  const SHIFT = 1 // card swap
  const TEXT_IN = 0.7 // text starts once the incoming card is ~70% home
  const TEXT_DUR = 0.6 // per-word duration
  const TEXT_SPREAD = 0.5 // total stagger across all words
  const STEP = 3.2 // per card — text is complete at 1.8, so 1.4 of dwell
  const TAIL = 0.6 // timeline units reserved for the blackout handoff
  const TOTAL = (cards.length - 1) * STEP + TAIL

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: stage,
      start: 'top top',
      end: () => `+=${window.innerHeight * TOTAL}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (progressFill)
          gsap.set(progressFill, { width: `${self.progress * 100}%` })
        if (mark) gsap.set(mark, { rotation: self.progress * 180 })
        // One write on the frame, inherited by all five cards
        // (`--border-angle` is declared `inherits: true` in index.css).
        // Three turns across the chapter reads as a clear sweep at
        // normal scroll speed without spinning fast enough to strobe.
        if (frame) {
          gsap.set(frame, { '--border-angle': `${self.progress * 1080}deg` })
        }
      },
      onEnter: () => gsap.to([progress, mark], { opacity: 1, duration: 0.3 }),
      onLeave: () => gsap.to([progress, mark], { opacity: 0, duration: 0.3 }),
      onEnterBack: () =>
        gsap.to([progress, mark], { opacity: 1, duration: 0.3 }),
      onLeaveBack: () =>
        gsap.to([progress, mark], { opacity: 0, duration: 0.3 }),
    },
  })

  for (let i = 0; i < cards.length - 1; i++) {
    const base = i * STEP

    // `transformOrigin: 'top center'` (the same value ScrollStack's own
    // CSS uses) keeps the receding card's top edge pinned to the frame
    // top as it shrinks. With the default centre origin the top edge
    // pulls inward instead, opening a visible gap above it mid-
    // transition. 0.92/2deg rather than 0.7/5deg: at full-screen size a
    // 0.7 scale collapses the card into a small rectangle floating in
    // the middle of the frame.
    tl.to(
      cards[i],
      {
        scale: 0.92,
        rotation: 2,
        transformOrigin: 'top center',
        duration: SHIFT,
        ease: 'none',
      },
      base,
    )
    tl.to(cards[i + 1], { yPercent: 0, duration: SHIFT, ease: 'none' }, base)
    tl.fromTo(
      splitTexts[i + 1].words,
      WORD_HIDDEN,
      {
        ...WORD_SHOWN,
        duration: TEXT_DUR,
        stagger: { amount: TEXT_SPREAD },
        ease: 'power2.out',
      },
      base + TEXT_IN,
    )
  }

  // Tail: last card settled, blackout hands off into Chapter 05. Placed
  // at the end of the last card's own dwell, so TOTAL above matches the
  // timeline's real duration and the scrub maps 1:1 with no dead zone.
  if (blackout) {
    tl.to(
      blackout,
      { opacity: 1, duration: TAIL, ease: 'none' },
      (cards.length - 1) * STEP,
    )
  }

  // From the Skiper reference, and not optional: `pin` freezes the
  // element's measurements taken when the ScrollTrigger is built. If
  // anything settles after that — web fonts, the cards' own
  // `loading="lazy"` photos, Fase A above changing height as its
  // SplitText reveal runs — those stale numbers stay frozen. Observing
  // the stage and refreshing re-measures whenever its box actually
  // changes, which window-resize handling alone would never catch.
  const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh())
  resizeObserver.observe(stage)

  return () => {
    resizeObserver.disconnect()
    splitTexts.forEach((split) => split.revert())
  }
}
