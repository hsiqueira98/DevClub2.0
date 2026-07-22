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
  const journey = section.querySelector('[data-journey]')
  const journeyLine = section.querySelector('[data-journey-line]')
  const journeySteps = section.querySelectorAll('[data-journey-step]')

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

    // Career journey: one scrub timeline (the same scaleY line-draw as
    // Chapter 07's method path). The connecting line grows top→bottom
    // over the whole timeline; each milestone lights up at a sequential
    // position, so it fires exactly as the line's leading edge reaches
    // it — all in ONE timeline, not a timeline per point. Dim/scaled
    // start state lives here (no-preference only), so reduced-motion
    // users see every milestone already lit.
    if (journeyLine && journeySteps.length) {
      const span = journeySteps.length - 1 // one time-unit per gap
      const dots = section.querySelectorAll('[data-journey-dot]')

      gsap.set(journeySteps, { opacity: 0.3 })
      gsap.set(dots, { scale: 0.5, transformOrigin: 'center' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: journey,
          start: 'top 78%',
          end: 'bottom 45%',
          scrub: 1,
        },
      })

      tl.fromTo(
        journeyLine,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, ease: 'none', duration: span },
        0,
      )

      journeySteps.forEach((step, i) => {
        const dot = step.querySelector('[data-journey-dot]')
        tl.to(step, { opacity: 1, duration: 0.4, ease: EASE.out }, i)
        tl.to(dot, { scale: 1, duration: 0.4, ease: EASE.out }, i)
      })
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
