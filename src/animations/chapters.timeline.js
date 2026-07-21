import { gsap, SplitText } from '../lib/gsap'
import { DURATION, EASE } from './motion.tokens'

/*
 * Per-chapter accents beyond the generic reveal system — each one maps
 * to an explicit motion note in docs/STORYBOARD.md.
 */

/* Chapter 03: fade, blur, depth — fragments sharpen out of a blur and
 * drift at slightly different scroll speeds (visual tension). */
export function createChallengeAnimations(section) {
  const fragments = section.querySelectorAll('[data-struggle]')
  const mm = gsap.matchMedia(section)

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    fragments.forEach((el, i) => {
      gsap.from(el, {
        autoAlpha: 0,
        y: 48,
        filter: 'blur(10px)',
        duration: DURATION.base,
        ease: EASE.out,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      })
      // Depth: alternating parallax drift, scroll-linked.
      gsap.to(el, {
        y: (i % 2 ? -1 : 1) * 28,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })
  })

  return mm
}

/* Interstitial "virada" beat: the line surfaces word by word, tied to
 * scroll — the visitor uncovers the question at their own pace. */
export function createTurnAnimations(section) {
  const line = section.querySelector('[data-turn-line]')
  const mm = gsap.matchMedia(section)

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const split = new SplitText(line, { type: 'words' })

    gsap.fromTo(
      split.words,
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          end: 'center 40%',
          scrub: 1,
        },
      },
    )

    return () => split.revert()
  })

  return mm
}

/* Chapter 04: floating elements — the orbit pillars drift gently. */
export function createOrbitAnimations(section) {
  const pillars = section.querySelectorAll('[data-orbit-pillar]')
  const mm = gsap.matchMedia(section)

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    pillars.forEach((el, i) => {
      gsap.to(el, {
        y: i % 2 ? 10 : -10,
        duration: gsap.utils.random(2.4, 3.4),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.3,
      })
    })
  })

  return mm
}

/* Chapter 07: scroll-driven timeline — the connecting path draws
 * itself as the visitor moves through the steps. */
export function createMethodAnimations(section) {
  const path = section.querySelector('[data-timeline-path]')
  const mm = gsap.matchMedia(section)

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.fromTo(
      path,
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'bottom 75%',
          scrub: 1,
        },
      },
    )
  })

  return mm
}

/* Chapter 10: very subtle, long pause — the Epílogo line breathes in
 * on the visitor's own scroll, the final beat before the footer. */
export function createEpilogueAnimations(section) {
  const epilogue = section.querySelector('[data-epilogue]')
  const mm = gsap.matchMedia(section)

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.fromTo(
      epilogue,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        ease: EASE.inOut,
        scrollTrigger: {
          trigger: epilogue,
          start: 'top 90%',
          end: 'top 55%',
          scrub: 1,
        },
      },
    )
  })

  return mm
}
