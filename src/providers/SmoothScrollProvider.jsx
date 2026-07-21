import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'

/*
 * Lenis smooth scroll driving GSAP ScrollTrigger (docs/MOTION.md —
 * Scroll Behavior). Lenis raf runs on the GSAP ticker so both share
 * one clock. Disabled entirely under prefers-reduced-motion: native
 * scroll stays fully functional.
 */
export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ autoRaf: false })
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return children
}
