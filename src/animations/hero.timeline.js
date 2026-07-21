import { gsap, SplitText } from '../lib/gsap'
import { DURATION, EASE } from './motion.tokens'

/*
 * Chapter 01 signature moment (docs/MOTION.md — navbardigital.com
 * reference): assemble → rest → shatter, driven by ONE scrub-linked
 * timeline while the hero stays pinned.
 *
 *  - assemble (0 → 0.30): the headline starts oversized, cropped by
 *    the viewport edges (the Prólogo — nothing asked, only shown),
 *    and scales down into a legible lockup.
 *  - rest (0.30 → 0.62): composition holds; kicker + typewriter line
 *    breathe in over an intensified glow. The hold is deliberate dead
 *    time so the visitor can actually read.
 *  - shatter (0.62 → 1): SplitText chars tumble apart with randomized
 *    stagger and 3D rotation — a deliberate exception to the
 *    "avoid rotation" note, it narrates disintegration
 *    (docs/DECISION_LOG.md).
 *
 * Reduced motion: no pin, no scrub — a single opacity fade.
 */
export function createHeroTimeline(section) {
  const headline = section.querySelector('[data-hero-headline]')
  const kicker = section.querySelector('[data-hero-kicker]')
  const typeLine = section.querySelector('[data-hero-typeline]')
  const glow = section.querySelector('[data-hero-glow]')
  const cue = section.querySelector('[data-hero-cue]')

  const mm = gsap.matchMedia(section)

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.from([headline, kicker, typeLine], {
      autoAlpha: 0,
      duration: DURATION.fast,
      stagger: 0.1,
    })
  })

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const split = new SplitText(headline, { type: 'chars,words' })
    gsap.set(headline, { transformPerspective: 800 })
    // Hidden until the rest phase — the Prólogo shows, never asks.
    gsap.set([kicker, typeLine], { autoAlpha: 0 })

    const tl = gsap.timeline({
      defaults: { ease: EASE.inOut },
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=280%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    // Prólogo/assemble — oversized and cropped, settling into rest.
    tl.fromTo(
      headline,
      { scale: 2.8, yPercent: 18 },
      { scale: 1, yPercent: 0, duration: 0.3 },
      0,
    )

    // Rest — supporting cast breathes in while the composition holds.
    tl.fromTo(glow, { opacity: 0.4 }, { opacity: 1, duration: 0.12 }, 0.3)
    tl.fromTo(
      [kicker, typeLine],
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.08, stagger: 0.04, ease: EASE.out },
      0.32,
    )
    tl.to({}, { duration: 0.18 }) // deliberate hold

    // Shatter — chars tumble away with randomized stagger.
    tl.to([kicker, typeLine, cue], { autoAlpha: 0, duration: 0.06 }, 0.62)
    tl.to(
      split.chars,
      {
        x: () => gsap.utils.random(-420, 420),
        y: () => gsap.utils.random(-260, 520),
        rotation: () => gsap.utils.random(-140, 140),
        rotationY: () => gsap.utils.random(-90, 90),
        autoAlpha: 0,
        duration: 0.34,
        stagger: { each: 0.006, from: 'random' },
        ease: EASE.inOut,
      },
      0.64,
    )
    tl.to(glow, { opacity: 0, duration: 0.2 }, 0.75)

    // Load-in beat (time-based, once): the page breathes into view.
    gsap.from(section, {
      autoAlpha: 0,
      duration: DURATION.cinematic / 2,
      ease: EASE.out,
    })

    return () => split.revert()
  })

  return mm
}
