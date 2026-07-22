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
  const comparison = section.querySelector('[data-comparison]')
  const paths = section.querySelectorAll('[data-path]')

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

    // Loss-aversion comparison: TWO scroll-lit paths (the same scaleY
    // line-draw as Chapter 07's method path, duplicated) sharing ONE
    // scrub timeline. Both lines draw from position 0, and each row
    // lights up at time = its row index — so the two columns' final rows
    // (same index) brighten at the exact same scroll position, which is
    // the whole point (same R$ 21.600, once lost, once gained). The
    // dim/scaled start state lives here (no-preference only), so
    // reduced-motion users see both paths already fully lit.
    if (comparison && paths.length) {
      const nodes = section.querySelectorAll('[data-path-node]')
      const dots = section.querySelectorAll('[data-path-dot]')
      const rowCount = paths[0].querySelectorAll('[data-path-row]').length

      gsap.set(nodes, { opacity: 0.3 })
      gsap.set(dots, { scale: 0.5, transformOrigin: 'center' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: comparison,
          start: 'top 75%',
          end: 'bottom 55%',
          scrub: 1,
        },
      })

      paths.forEach((path) => {
        const line = path.querySelector('[data-path-line]')
        tl.fromTo(
          line,
          { scaleY: 0, transformOrigin: 'top center' },
          { scaleY: 1, ease: 'none', duration: rowCount - 1 },
          0,
        )

        path.querySelectorAll('[data-path-row]').forEach((row, i) => {
          const node = row.querySelector('[data-path-node]')
          const dot = row.querySelector('[data-path-dot]')
          if (!node) return // blank leading row (the "↓")
          tl.to(node, { opacity: 1, duration: 0.5, ease: EASE.out }, i)
          tl.to(dot, { scale: 1, duration: 0.5, ease: EASE.out }, i)
        })
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
