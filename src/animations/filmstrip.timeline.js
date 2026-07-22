import { gsap } from '../lib/gsap'

/*
 * Chapter 06 (docs/STORYBOARD.md): the instructor film-strip is pinned
 * and translated horizontally by the visitor's scroll (scrub).
 *
 * Portrait treatment (color, grade, caption) is CSS-only: hover/focus
 * on fine pointers, permanently-visible captions on touch — the
 * automatic scroll-focal state was removed (PO round: lighting should
 * respond to the visitor's own pointer, not the scrub).
 *
 * Touch devices and reduced motion keep the native horizontal scroll:
 * same content, no pin.
 */
export function createFilmstripTimeline(section) {
  const strip = section.querySelector('[data-filmstrip]')

  const mm = gsap.matchMedia(section)

  mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
    // The strip is a native scroller on touch/reduced-motion. While
    // pinned we drive it by transform instead, so neutralize the
    // native overflow/snap or its own scrollLeft fights the tween.
    // (gsap.set inline styles are reverted by matchMedia cleanup.)
    strip.scrollLeft = 0
    gsap.set(strip, { overflowX: 'visible', scrollSnapType: 'none' })

    const distance = () => strip.scrollWidth - window.innerWidth

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
      },
    })
  })

  return mm
}
