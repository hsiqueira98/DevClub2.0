import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'
import { vertex, fragment } from './magicRingsShader'

/*
 * Concentric rings that expand and fade on a loop — React Bits'
 * MagicRings, with its shader kept verbatim (magicRingsShader.js) and
 * its plumbing moved from Three.js to ogl.
 *
 * Why ogl: the original touches only WebGLRenderer, OrthographicCamera,
 * PlaneGeometry, ShaderMaterial and Mesh — a fraction of Three.js that
 * maps one-to-one onto ogl's Renderer/Program/Mesh/Triangle, the same
 * pattern this project's earlier WebGL pieces already used. Three.js
 * would have been ~600KB of bundle for a decorative backdrop; ogl is
 * ~50KB, and the visual output is identical because the GLSL didn't
 * change.
 *
 * The mouse/hover/click uniforms from the original are dropped rather
 * than wired up: this renders as a `pointer-events: none` overlay above
 * the pillar cards, so it can never receive pointer events anyway, and
 * carrying dead interaction state would just be noise. The rings
 * animate off `uTime` on their own.
 *
 * Two render guards, both real: an IntersectionObserver stops the loop
 * whenever the element leaves the viewport (this lives in one chapter
 * of a thirteen-chapter page, so that's most of the time), and
 * `visibilitychange` stops it in a backgrounded tab. Reduced motion
 * skips WebGL setup entirely — no context, no canvas.
 */
function hexToRgb(hex) {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!match) return [1, 1, 1]
  return [
    parseInt(match[1], 16) / 255,
    parseInt(match[2], 16) / 255,
    parseInt(match[3], 16) / 255,
  ]
}

export default function MagicRings({
  color = '#39d353',
  colorTwo = '#8532f2',
  speed = 1,
  ringCount = 6,
  attenuation = 10,
  lineThickness = 2.5,
  baseRadius = 0.41,
  radiusStep = 0.12,
  scaleRate = 0.1,
  opacity = 1,
  noiseAmount = 0.1,
  rotation = 0,
  ringGap = 1.5,
  fadeIn = 0.7,
  fadeOut = 0.5,
}) {
  const mountRef = useRef(null)

  const settings = {
    color,
    colorTwo,
    speed,
    ringCount,
    attenuation,
    lineThickness,
    baseRadius,
    radiusStep,
    scaleRate,
    opacity,
    noiseAmount,
    rotation,
    ringGap,
    fadeIn,
    fadeOut,
  }

  // The reference assigns this ref straight from the render body, which
  // React forbids (and this project's lint enforces): a render can be
  // thrown away or replayed, so mutating during it isn't safe. Seeding
  // via useRef's initial value covers the first frame, and an effect
  // with no dependency array — deliberate, not an omission — re-syncs
  // after every subsequent render. The render loop only ever reads this
  // from a rAF callback, well after both effects have run.
  const propsRef = useRef(settings)
  useEffect(() => {
    propsRef.current = settings
  })

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let renderer
    try {
      renderer = new Renderer({
        alpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      })
    } catch {
      return // no WebGL — the card keeps its flat background, nothing breaks
    }

    const gl = renderer.gl
    Object.assign(gl.canvas.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      display: 'block',
    })
    mount.appendChild(gl.canvas)

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new Float32Array([1, 1]) },
      uColor: { value: new Float32Array([1, 1, 1]) },
      uColorTwo: { value: new Float32Array([1, 1, 1]) },
      uAttenuation: { value: 10 },
      uLineThickness: { value: 2 },
      uBaseRadius: { value: 0.35 },
      uRadiusStep: { value: 0.1 },
      uScaleRate: { value: 0.1 },
      uRingCount: { value: 6 },
      uOpacity: { value: 1 },
      uNoiseAmount: { value: 0.1 },
      uRotation: { value: 0 },
      uRingGap: { value: 1.5 },
      uFadeIn: { value: 0.7 },
      uFadeOut: { value: 0.5 },
    }

    const program = new Program(gl, { vertex, fragment, uniforms, transparent: true })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    const resize = () => {
      renderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1)
      uniforms.uResolution.value[0] = gl.drawingBufferWidth
      uniforms.uResolution.value[1] = gl.drawingBufferHeight
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(mount)

    // Hex parsing is a regex, so cache per colour rather than re-parsing
    // both strings on every one of 60 frames a second.
    let lastColor = null
    let lastColorTwo = null

    let raf = 0
    let elapsed = 0
    let lastTime = 0
    let isVisible = false
    let isPageVisible = !document.hidden

    const render = (time) => {
      raf = requestAnimationFrame(render)
      const p = propsRef.current

      // Clamped delta: a tab that was throttled or a long frame would
      // otherwise jump the cycle forward by whole seconds at once.
      const delta = lastTime === 0 ? 0 : Math.min(time - lastTime, 100)
      lastTime = time
      elapsed += delta * 0.001 * p.speed

      if (p.color !== lastColor) {
        lastColor = p.color
        uniforms.uColor.value.set(hexToRgb(p.color))
      }
      if (p.colorTwo !== lastColorTwo) {
        lastColorTwo = p.colorTwo
        uniforms.uColorTwo.value.set(hexToRgb(p.colorTwo))
      }

      uniforms.uTime.value = elapsed
      uniforms.uAttenuation.value = p.attenuation
      uniforms.uLineThickness.value = p.lineThickness
      uniforms.uBaseRadius.value = p.baseRadius
      uniforms.uRadiusStep.value = p.radiusStep
      uniforms.uScaleRate.value = p.scaleRate
      uniforms.uRingCount.value = p.ringCount
      uniforms.uOpacity.value = p.opacity
      uniforms.uNoiseAmount.value = p.noiseAmount
      uniforms.uRotation.value = (p.rotation * Math.PI) / 180
      uniforms.uRingGap.value = p.ringGap
      uniforms.uFadeIn.value = p.fadeIn
      uniforms.uFadeOut.value = p.fadeOut

      renderer.render({ scene: mesh })
    }

    const tryStart = () => {
      if (isVisible && isPageVisible && raf === 0) {
        lastTime = 0 // don't bill the paused stretch to the next delta
        raf = requestAnimationFrame(render)
      }
    }
    const tryStop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) tryStart()
        else tryStop()
      },
      { threshold: 0 },
    )
    io.observe(mount)

    const onVisibility = () => {
      isPageVisible = !document.hidden
      if (isPageVisible) tryStart()
      else tryStop()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      tryStop()
      io.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      if (gl.canvas.parentElement === mount) mount.removeChild(gl.canvas)
    }
  }, [])

  return <div ref={mountRef} className="relative size-full" />
}
