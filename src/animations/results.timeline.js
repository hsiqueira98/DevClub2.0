import { gsap } from '../lib/gsap'
import { DURATION, EASE } from './motion.tokens'
import { makeCountUp } from './counters'
import { createParticleField } from './particles'

/*
 * Chapter 08 (docs/STORYBOARD.md): salary bars grow into place on
 * scroll entry, staggered per row — scaleX, not width, per the
 * transform-only rule in docs/MOTION.md. The companies strip loops as
 * a continuous marquee (docs/DESIGN_SYSTEM.md — Amphora pattern).
 *
 * Beside the bars, the "Contracheque" (payslip) card transforms once on
 * entry: a green line grows in, the total counts up from R$ 2.000 to
 * R$ 3.800 (reusing the shared count-up mechanic, not a second counter),
 * and a stamp badge lands last. One sequenced timeline, played on entry
 * and reversed on scroll-back (toggleActions play/reverse — a single
 * beat, not a continuous scrub). The dim/hidden start state lives in
 * this no-preference block, so reduced-motion users see the finished
 * payslip (green line, total already R$ 3.800, badge).
 */
export function createResultsAnimations(section) {
  const bars = section.querySelectorAll('[data-salary-bar]')
  const chart = section.querySelector('[data-salary-chart]')
  const marquee = section.querySelector('[data-marquee-inner]')
  const payslip = section.querySelector('[data-payslip]')
  const particleCanvas = section.querySelector('[data-particle-canvas]')

  const mm = gsap.matchMedia(section)

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    let particleCleanup

    // Ambient backdrop behind the chart/payslip below: a continuous,
    // low-opacity drift — texture, not a moment. See
    // animations/particles.js for why it never resolves or stops.
    if (particleCanvas) {
      particleCleanup = createParticleField(particleCanvas).cleanup
    }

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

    if (payslip) {
      const diff = payslip.querySelector('[data-payslip-diff]')
      const total = payslip.querySelector('[data-payslip-total]')
      const badge = payslip.querySelector('[data-payslip-badge]')
      const { counter, to, vars } = makeCountUp(total, { from: 2000, to: 3800 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: payslip,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      // 1. the green "DevClub difference" line grows in
      tl.from(diff, {
        height: 0,
        marginTop: 0,
        autoAlpha: 0,
        duration: DURATION.base,
        ease: EASE.out,
      })
      // 2. the total counts up (shared mechanic), as the difference lands
      tl.to(counter, { value: to, ...vars }, '>-0.1')
      // 3. the badge stamps in last
      tl.fromTo(
        badge,
        { autoAlpha: 0, scale: 0.5, rotation: -8 },
        {
          autoAlpha: 1,
          scale: 1,
          rotation: 3,
          duration: DURATION.base,
          ease: 'back.out(2)',
        },
        '>-0.15',
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

    return () => particleCleanup?.()
  })

  return mm
}
