import { gsap } from '../lib/gsap'
import { DURATION, EASE } from './motion.tokens'

/*
 * Shared count-up mechanic (docs/STORYBOARD.md Chapters 02 and 08).
 * makeCountUp wires an element's text to a tweenable {value} object and
 * renders it on every update (data-countup-format="brl" → pt-BR
 * currency). It returns the pieces to animate, WITHOUT a trigger — so
 * the same mechanic can be a standalone reveal (initCounters, below) or
 * one step inside a larger sequence (Chapter 08's payslip), never a
 * second counter system.
 */
export function makeCountUp(el, { from = 0, to } = {}) {
  const isBrl = el.dataset.countupFormat === 'brl'
  const counter = { value: from }
  const render = () => {
    el.textContent = isBrl
      ? `R$ ${counter.value.toLocaleString('pt-BR')}`
      : `${counter.value}`
  }
  // Render the start value up front so the count-up reads as growth,
  // not a flash of the final (server-rendered) value.
  render()

  return {
    counter,
    to,
    vars: {
      duration: DURATION.slow,
      ease: EASE.out,
      snap: { value: 1 },
      onUpdate: render,
    },
  }
}

/*
 * Each [data-countup] element counts from 0 to its data-countup value
 * on enter — a short, self-contained reveal, played once. Reduced
 * motion never reaches here, so the rendered final value stays put.
 */
export function initCounters(scope) {
  const mm = gsap.matchMedia(scope)

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    scope.querySelectorAll('[data-countup]').forEach((el) => {
      const { counter, to, vars } = makeCountUp(el, {
        to: Number(el.dataset.countup),
      })

      gsap.to(counter, {
        value: to,
        ...vars,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      })
    })
  })

  return mm
}
