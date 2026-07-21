import { gsap } from '../lib/gsap'
import { DURATION, EASE } from './motion.tokens'

/*
 * Global reveal system (docs/MOTION.md): everything marked
 * [data-reveal] enters with direction and purpose; [data-reveal-group]
 * staggers its children. In-section reveals are time-based
 * (toggleActions), play on enter and reverse on scroll back up.
 * Under prefers-reduced-motion, movement is replaced by an
 * opacity-only fade at `fast` duration — never removed.
 */
export function initReveals(scope) {
  const mm = gsap.matchMedia(scope)

  mm.add(
    {
      motionOk: '(prefers-reduced-motion: no-preference)',
      reduced: '(prefers-reduced-motion: reduce)',
    },
    (ctx) => {
      const { motionOk } = ctx.conditions
      const move = motionOk ? { y: 32 } : {}
      const duration = motionOk ? DURATION.base : DURATION.fast

      scope.querySelectorAll('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          ...move,
          duration,
          ease: EASE.out,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      scope.querySelectorAll('[data-reveal-group]').forEach((group) => {
        gsap.from(group.children, {
          autoAlpha: 0,
          ...move,
          duration,
          ease: EASE.out,
          stagger: motionOk ? 0.12 : 0,
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    },
  )

  return mm
}
