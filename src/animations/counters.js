import { gsap } from '../lib/gsap'
import { DURATION, EASE } from './motion.tokens'

/*
 * Count-up numbers (docs/STORYBOARD.md Chapters 02 and 08). Each
 * [data-countup] element counts from 0 to its data-countup value on
 * enter — a short, self-contained reveal, so time-based, played once.
 * data-countup-format="brl" renders as pt-BR currency.
 */
export function initCounters(scope) {
  const mm = gsap.matchMedia(scope)

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    scope.querySelectorAll('[data-countup]').forEach((el) => {
      const target = Number(el.dataset.countup)
      const isBrl = el.dataset.countupFormat === 'brl'
      const counter = { value: 0 }

      const render = () => {
        el.textContent = isBrl
          ? `R$ ${counter.value.toLocaleString('pt-BR')}`
          : `${counter.value}`
      }
      // Start visibly at 0 so the count-up reads as growth, not a
      // flash of the final value. Reduced motion never reaches here,
      // so the server-rendered final value stays put there.
      render()

      gsap.to(counter, {
        value: target,
        duration: DURATION.slow,
        ease: EASE.out,
        snap: { value: 1 },
        onUpdate: render,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      })
    })
  })

  return mm
}
