import { gsap } from '../lib/gsap'

/*
 * Chapter 08's ambient backdrop: a field of faint points drifting
 * continuously — texture, not a moment. Never resolves into a fixed
 * shape and never stops, low opacity throughout, so it reads as
 * atmosphere behind the chapter's real content rather than a
 * competing element. Same idle-float spirit as createOrbitAnimations
 * in chapters.timeline.js (per-item drift, randomized duration/phase),
 * just canvas-drawn instead of per-DOM-node tweens.
 *
 * Each particle's gray-to-green tone is fixed at creation — a
 * per-particle blend, not a global transition — giving the field a
 * subtle two-tone texture instead of a one-time colour sweep.
 *
 * Driven by gsap.ticker (the same clock Lenis/ScrollTrigger already
 * run on — see SmoothScrollProvider.jsx), so cleanup is a single
 * listener removal, no separate rAF loop to manage.
 */
export function createParticleField(canvas) {
  const ctx = canvas.getContext('2d')
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const COUNT = 70
  const GRAY = [102, 102, 102] // --color-gray-600
  const GREEN = [57, 211, 83] // --color-green-500

  let width = 0
  let height = 0
  let points = []

  function layout() {
    const rect = canvas.getBoundingClientRect()
    width = rect.width
    height = rect.height
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    points = Array.from({ length: COUNT }, () => {
      const tone = Math.random()
      const [r, g, b] = GRAY.map((c, i) =>
        gsap.utils.interpolate(c, GREEN[i], tone),
      )
      return {
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        ampX: gsap.utils.random(6, 22),
        ampY: gsap.utils.random(6, 22),
        freqX: gsap.utils.random(0.15, 0.35),
        freqY: gsap.utils.random(0.15, 0.35),
        phase: gsap.utils.random(0, Math.PI * 2),
        size: gsap.utils.random(1, 2.5),
        color: `rgba(${r}, ${g}, ${b}, ${gsap.utils.random(0.12, 0.28)})`,
      }
    })
  }

  layout()
  window.addEventListener('resize', layout)

  function draw(time) {
    ctx.clearRect(0, 0, width, height)
    points.forEach((point) => {
      const x = point.baseX + Math.sin(time * point.freqX + point.phase) * point.ampX
      const y = point.baseY + Math.cos(time * point.freqY + point.phase) * point.ampY
      ctx.fillStyle = point.color
      ctx.beginPath()
      ctx.arc(x, y, point.size, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  gsap.ticker.add(draw)

  return {
    cleanup: () => {
      gsap.ticker.remove(draw)
      window.removeEventListener('resize', layout)
    },
  }
}
