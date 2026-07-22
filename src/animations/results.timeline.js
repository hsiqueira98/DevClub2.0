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
  const growthChart = section.querySelector('[data-growth-chart]')
  const growthPath = section.querySelector('[data-growth-path]')
  const growthArea = section.querySelector('[data-growth-area]')
  const growthDots = section.querySelectorAll('[data-growth-dot]')

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

    // Second chart: the line draws itself (stroke-dashoffset), then the
    // area fills and the point markers pop in. Reverses on scroll back.
    if (growthPath) {
      const len = growthPath.getTotalLength()
      gsap.set(growthPath, { strokeDasharray: len, strokeDashoffset: len })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: growthChart,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
      tl.to(growthPath, {
        strokeDashoffset: 0,
        duration: DURATION.cinematic,
        ease: EASE.out,
      })
      tl.to(growthArea, { opacity: 1, duration: DURATION.base }, '-=0.5')
      tl.from(
        growthDots,
        {
          attr: { r: 0 },
          stagger: 0.12,
          duration: DURATION.fast,
          ease: EASE.out,
        },
        '-=0.7',
      )
    }

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
