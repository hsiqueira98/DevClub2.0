import { gsap } from '../lib/gsap'

/*
 * Chapter 08's ambient backdrop: a field of faint points drifting
 * continuously — texture, not a moment. Never resolves into a fixed
 * shape and never stops, low opacity throughout, so it reads as
 * atmosphere behind the chapter's real content rather than a
 * competing element. Same idle-float spirit as other ambient
 * animations in this project (per-item drift, randomized
 * duration/phase), just canvas-drawn instead of per-DOM-node tweens.
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
  // These must stay the literal values of the tokens they name: #666 was
  // not --color-gray-600 (that token is #777c81), so the field was drawn
  // in a grey the design system does not contain.
  const GRAY = [119, 124, 129] // --color-gray-600  #777c81
  const GREEN = [57, 211, 83] // --color-green-500  #39d353

  let width = 0
  let height = 0
  let points = []

  function seed() {
    return Array.from({ length: COUNT }, () => {
      const tone = Math.random()
      // Rounded: interpolate returns floats, and the legacy comma form of
      // rgba() is only reliably parsed with integer channels — a rejected
      // fillStyle is silently ignored, leaving the previous particle's
      // colour.
      const [r, g, b] = GRAY.map((c, i) =>
        Math.round(gsap.utils.interpolate(c, GREEN[i], tone)),
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

  // Resize re-measures and rescales the existing field; it does NOT
  // re-seed it. `resize` fires continuously while a window is dragged,
  // and building a whole new random field on every event made the
  // backdrop visibly teleport mid-drag instead of drifting.
  function layout() {
    const rect = canvas.getBoundingClientRect()
    const nextWidth = rect.width || 1
    const nextHeight = rect.height || 1
    const scaleX = width ? nextWidth / width : 1
    const scaleY = height ? nextHeight / height : 1

    width = nextWidth
    height = nextHeight
    // Assigning width/height resets the context, transform included.
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    if (points.length === 0) {
      points = seed()
      return
    }
    points.forEach((point) => {
      point.baseX *= scaleX
      point.baseY *= scaleY
    })
  }

  layout()
  window.addEventListener('resize', layout)

  function draw(time) {
    ctx.clearRect(0, 0, width, height)
    points.forEach((point) => {
      const x =
        point.baseX + Math.sin(time * point.freqX + point.phase) * point.ampX
      const y =
        point.baseY + Math.cos(time * point.freqY + point.phase) * point.ampY
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
