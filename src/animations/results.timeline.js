import { gsap, SplitText } from '../lib/gsap'
import { DURATION, EASE } from './motion.tokens'

/*
 * Chapter 08 (docs/STORYBOARD.md): salary bars grow into place on
 * scroll entry, staggered per row — scaleX, not width, per the
 * transform-only rule in docs/MOTION.md. The companies strip loops as
 * a continuous marquee (docs/DESIGN_SYSTEM.md — Amphora pattern).
 */
export function createResultsAnimations(section) {
  const bars = section.querySelectorAll('[data-salary-bar]')
  const chart = section.querySelector('[data-salary-chart]')
  const marquee = section.querySelector('[data-marquee-inner]')

  const mm = gsap.matchMedia(section)

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from(bars, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: DURATION.slow,
      ease: EASE.out,
      stagger: 0.18,
      scrollTrigger: {
        trigger: chart,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    })

    if (marquee) {
      gsap.to(marquee, {
        xPercent: -50,
        ease: 'none',
        duration: 28,
        repeat: -1,
      })
    }
  })

  return mm
}

/*
 * Chapter 08 second moment (docs/STORYBOARD.md): one giant number that
 * assembles on screen — the mirror of Chapter 01's shatter. Same
 * technique (SplitText into chars + randomized per-char x/y/rotation,
 * the same random ranges as hero.timeline.js) run forwards: chars start
 * scattered/rotated and settle into place, instead of flying apart. Not
 * an import from the hero — the same idea applied to a new element.
 *
 * Motion is a ONE-SHOT reveal on scroll entry (toggleActions
 * play/reverse — docs/MOTION.md's rule for single-headline reveals), NOT
 * a continuous scrub: a single dramatic beat that replays on re-entry.
 *
 * Same robustness rules as the hero (see hero.timeline.js / DECISION_LOG):
 * a plain window.matchMedia check (NOT gsap.matchMedia, whose add-callback
 * isn't captured by the useGSAP context) and a returned cleanup that
 * reverts the split — so a StrictMode remount can't leave a nested split
 * or chars frozen mid-animation. Caller (useGSAP) runs the cleanup.
 */
export function createCostReveal(section) {
  const number = section.querySelector('[data-cost-number]')
  const caption = section.querySelector('[data-cost-caption]')
  if (!number) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.from([number, caption], {
      autoAlpha: 0,
      duration: DURATION.fast,
      stagger: 0.1,
      scrollTrigger: {
        trigger: number,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
    return
  }

  const split = new SplitText(number, { type: 'chars' })
  gsap.set(number, { transformPerspective: 800 })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: number,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  })

  // Reverse of the shatter: from scattered/rotated (the hero's random
  // ranges) into the settled number.
  tl.from(split.chars, {
    x: () => gsap.utils.random(-420, 420),
    y: () => gsap.utils.random(-260, 520),
    rotation: () => gsap.utils.random(-140, 140),
    rotationY: () => gsap.utils.random(-90, 90),
    autoAlpha: 0,
    duration: 0.7,
    ease: EASE.out,
    stagger: { each: 0.03, from: 'random' },
  })

  // The caption surfaces just after the number lands.
  if (caption) {
    tl.from(
      caption,
      { autoAlpha: 0, y: 20, duration: DURATION.base, ease: EASE.out },
      '>-0.15',
    )
  }

  return () => split.revert()
}
