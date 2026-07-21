import { gsap } from '../lib/gsap'

/*
 * Chapter 06 (docs/STORYBOARD.md): the instructor film-strip is pinned
 * and translated horizontally by the visitor's scroll (scrub). As each
 * portrait crosses the focal zone (viewport center), it gains
 * .is-focal — CSS reveals name/role and lifts the duotone grade —
 * and loses it as it passes.
 *
 * Touch devices and reduced motion keep the native horizontal scroll:
 * same content, no pin.
 */
export function createFilmstripTimeline(section) {
  const strip = section.querySelector('[data-filmstrip]')
  const items = gsap.utils.toArray(strip.children)

  const mm = gsap.matchMedia(section)

  mm.add(
    '(prefers-reduced-motion: no-preference) and (pointer: fine)',
    () => {
      // The strip is a native scroller on touch/reduced-motion. While
      // pinned we drive it by transform instead, so neutralize the
      // native overflow/snap or its own scrollLeft fights the tween.
      // (gsap.set inline styles are reverted by matchMedia cleanup.)
      strip.scrollLeft = 0
      gsap.set(strip, { overflowX: 'visible', scrollSnapType: 'none' })

      const distance = () => strip.scrollWidth - window.innerWidth

      const updateFocal = () => {
        const center = window.innerWidth / 2
        items.forEach((item) => {
          const rect = item.getBoundingClientRect()
          const itemCenter = rect.left + rect.width / 2
          item.classList.toggle(
            'is-focal',
            Math.abs(itemCenter - center) < rect.width * 0.75,
          )
        })
      }

      gsap.to(strip, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          // 1.5× the strip travel: a slower, more cinematic scrub.
          end: () => `+=${distance() * 1.5}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: updateFocal,
        },
      })

      return () => items.forEach((i) => i.classList.remove('is-focal'))
    },
  )

  return mm
}
