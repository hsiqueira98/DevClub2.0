import { gsap, SplitText } from '../lib/gsap'
import { DURATION, EASE } from './motion.tokens'

/*
 * Chapter 01 signature moment (docs/MOTION.md, revised after PO review
 * — see DECISION_LOG.md): the headline must NEVER read as broken on
 * load, so the Prólogo/assemble phase is a time-based entrance, and
 * only rest → shatter stays scroll-scrubbed.
 *
 *  - load-in (time-based, once): chars rise into the lockup with a
 *    stagger; kicker, typewriter line and scroll cue breathe in after.
 *  - rest (scrub 0 → 0.25): the pinned composition holds — deliberate
 *    dead time so the visitor reads before anything is asked.
 *  - shatter (scrub 0.25 → 1): SplitText chars tumble apart with
 *    randomized stagger and 3D rotation — a deliberate exception to
 *    the "avoid rotation" note, it narrates disintegration
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
  const photo = section.querySelector('[data-hero-photo]')
  const blackout = section.querySelector('[data-hero-blackout]')

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

    // Prólogo — a settled, legible opening. Time-based, plays once.
    const intro = gsap.timeline({ defaults: { ease: EASE.out } })
    intro.from([glow, photo], { opacity: 0, duration: DURATION.cinematic })
    intro.from(
      split.chars,
      { autoAlpha: 0, y: 56, duration: DURATION.slow, stagger: 0.016 },
      0.15,
    )
    intro.from(
      [kicker, typeLine, cue],
      { autoAlpha: 0, y: 20, duration: DURATION.base, stagger: 0.12 },
      '-=0.5',
    )

    // Rest → shatter, tied to the visitor's own scroll.
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
    // The black mask surfaces while the text breaks apart, so the
    // scene lands on Ch02's dark background, not on the photo.
    tl.to(blackout, { opacity: 1, duration: 0.45 }, 0.35)
    tl.to(glow, { opacity: 0, duration: 0.25 }, 0.6)

    return () => split.revert()
  })

  return mm
}
