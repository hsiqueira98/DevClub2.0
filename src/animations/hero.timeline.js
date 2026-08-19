import { gsap, SplitText } from '../lib/gsap'
import { DURATION, EASE } from './motion.tokens'

/*
 * Chapter 01 signature moment (docs/MOTION.md, revised after PO review
 * — see DECISION_LOG.md): rest → shatter, driven by the visitor's
 * scroll while the hero stays pinned. The opening beat that precedes it
 * is framer-motion's now (hero.variants.js) — this file owns the exit
 * only.
 *
 * Two structural rules, learned the hard way (see DECISION_LOG.md):
 *
 * 1. NO gsap.matchMedia here. Its cleanups are not captured by the
 *    useGSAP context, so React StrictMode's double-mount left ghost
 *    tweens and a nested SplitText that froze chars mid-animation.
 *    Reduced motion is a plain window.matchMedia check instead —
 *    captured, deterministic, reverted on unmount. (A live change of
 *    the OS motion setting needs a reload; acceptable.)
 *
 * 2. The entrance and this scrub share NO targets. Two owners on one
 *    element freeze it whenever a kill or refresh lands between them.
 *    That rule now spans two libraries, so FirstDecision.jsx keeps it
 *    structurally rather than by discipline: every element this file
 *    drives — kicker, typeline, cue, glow, logo, the headline's split
 *    chars — is animated on entrance through its own wrapper element,
 *    never directly. The section itself is likewise untouched by
 *    framer-motion, since GSAP pins it.
 *
 * Caller must run the returned cleanup (useGSAP does this with the
 * callback's return value) so SplitText unwraps the headline.
 */
export function createHeroTimeline(section) {
  const headline = section.querySelector('[data-hero-headline]')
  const kicker = section.querySelector('[data-hero-kicker]')
  const typeLine = section.querySelector('[data-hero-typeline]')
  const glow = section.querySelector('[data-hero-glow]')
  const cue = section.querySelector('[data-hero-cue]')
  const blackout = section.querySelector('[data-hero-blackout]')
  const logo = section.querySelector('[data-hero-logo]')

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.from([headline, kicker, typeLine, logo], {
      autoAlpha: 0,
      duration: DURATION.fast,
      stagger: 0.1,
    })
    return
  }

  const split = new SplitText(headline, { type: 'chars,words' })
  gsap.set(headline, { transformPerspective: 800 })

  // The Prólogo intro that used to live here — a time-based fade of the
  // photo and content wrapper — now belongs to framer-motion
  // (hero.variants.js), which choreographs the same beat as a
  // per-layer, depth-of-field settle. Rule 2 below didn't just survive
  // that move, it's what made it safe: because the intro never shared a
  // target with the scrub, handing it to another library changed
  // nothing about what this file owns.
  //
  // Rest → shatter. Plain .to() tweens: their start values are
  // captured lazily on first render, which is safe precisely BECAUSE
  // the intro never touches these targets — they are always in the
  // settled state when captured, at any scroll timing. (fromTo +
  // immediateRender:false was tried here and left frozen mixed states
  // on fast scroll cycles — see DECISION_LOG.md.)
  const tl = gsap.timeline({
    defaults: { ease: EASE.inOut },
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=160%',
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  })

  tl.to({}, { duration: 0.25 }) // deliberate hold — let the hero rest
  tl.to([kicker, typeLine, cue], { autoAlpha: 0, duration: 0.08 }, 0.25)
  tl.to(
    split.chars,
    {
      x: () => gsap.utils.random(-420, 420),
      y: () => gsap.utils.random(-260, 520),
      rotation: () => gsap.utils.random(-140, 140),
      rotationY: () => gsap.utils.random(-90, 90),
      autoAlpha: 0,
      duration: 0.6,
      stagger: { each: 0.008, from: 'random' },
    },
    0.3,
  )
  // The black mask surfaces while the text breaks apart, so the scene
  // lands on Ch02's dark background, not on the photo.
  tl.to(blackout, { opacity: 1, duration: 0.45 }, 0.35)
  tl.to(glow, { opacity: 0, duration: 0.25 }, 0.6)

  // The mark stays centered — no x/y translation — and only shrinks
  // and dims, in lockstep with scroll (ease: 'none', spanning the tl's
  // full duration so far) rather than as a discrete beat. It hands off
  // to the navbar's own logo, but that fade-in is owned entirely by
  // navbar.timeline.js off its own scroll progress — a scrubbed
  // timeline's position numbers here (0.3, 0.6...) are internal time
  // units, not a 0-1 fraction of the scroll range, so this timeline
  // can't reliably drive a second, independently-scrubbed timeline in
  // another file.
  if (logo) {
    tl.to(
      logo,
      { scale: 0.6, opacity: 0.3, ease: 'none', duration: tl.duration() },
      0,
    )
  }

  return () => split.revert()
}
