import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from '../lib/gsap'

/*
 * Lenis smooth scroll driving GSAP ScrollTrigger (docs/MOTION.md —
 * Scroll Behavior). Lenis raf runs on the GSAP ticker so both share
 * one clock. Disabled entirely under prefers-reduced-motion: native
 * scroll stays fully functional.
 *
 * `anchors: true` hands in-page "#hash" links to Lenis. Without it the
 * browser ran its own scroll while Lenis kept writing scrollTop from
 * the ticker, and the two fought over every menu click. Lenis reads
 * `scroll-padding-top` off <html> for the landing offset, so the fixed
 * navbar clearance is declared once in CSS and both paths (Lenis here,
 * native scroll under reduced motion) use the same value.
 *
 * lenis.css carries the rules Lenis needs on the root element
 * (`html.lenis, html.lenis body { height: auto }` and the
 * overscroll-containment hooks for [data-lenis-prevent]).
 */
export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ autoRaf: false, anchors: true })
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
    }
  }, [])

  return children
}
