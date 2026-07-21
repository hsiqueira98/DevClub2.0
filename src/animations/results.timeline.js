import { gsap } from '../lib/gsap'
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
