import { gsap } from '../lib/gsap'

/*
 * Chapter 06 (docs/STORYBOARD.md): the instructor film-strip.
 *
 * Two mutually exclusive modes, chosen by matchMedia:
 *
 * PINNED (pointer:fine and no-preference): the strip is pinned and
 * translated horizontally via a GSAP transform, scrubbed by the
 * visitor's own vertical scroll.
 *
 * NATIVE SCROLL (touch or reduced motion): the strip is a plain
 * overflow-x:auto scroller — same content, no pin, no transform. A
 * vertical mouse wheel is redirected into horizontal scroll (see
 * setupNative) since the visible scrollbar that used to be the only
 * way a plain-wheel mouse could move it is hidden (index.css); touch
 * swipe and trackpad two-finger scroll already work natively and are
 * unaffected.
 *
 * Viewport HEIGHT is deliberately not one of these conditions, and
 * this comment used to claim it was — describing a "<1080px tall falls
 * back to native scroll" mode that the code has no query for. The PO
 * wants pin+scrub every time for pointer:fine (docs/DECISION_LOG.md),
 * so short viewports are handled by shrinking instead of by switching
 * modes: the height-only tiers at the end of index.css tighten the
 * chapter's padding and, below 650px, the card itself.
 *
 * GSAP's matchMedia only invokes its callback when at least one named
 * condition matches — `pinned` alone has no "the opposite always
 * matches" partner (unlike prefers-reduced-motion's genuine binary in
 * reveals.js), so `all: 'all'` (GSAP's documented always-true query)
 * guarantees this runs on every load/resize regardless of `pinned`.
 */
export function createFilmstripTimeline(section) {
  const strip = section.querySelector('[data-filmstrip]')

  const mm = gsap.matchMedia(section)

  mm.add(
    {
      pinned: '(prefers-reduced-motion: no-preference) and (pointer: fine)',
      all: 'all',
    },
    (context) =>
      context.conditions.pinned
        ? setupPinned(strip, section)
        : setupNative(strip),
  )

  return mm
}

function setupPinned(strip, section) {
  strip.scrollLeft = 0
  gsap.set(strip, { overflowX: 'visible', scrollSnapType: 'none' })

  const distance = () => strip.scrollWidth - window.innerWidth

  const cards = strip.querySelectorAll('figure')
  const updateFocusability = () => {
    cards.forEach((figure) => {
      const rect = figure.getBoundingClientRect()
      const offscreen = rect.right <= 0 || rect.left >= window.innerWidth
      figure.tabIndex = offscreen ? -1 : 0
    })
  }
  updateFocusability()

  gsap.to(strip, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${distance() * 1.5}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: updateFocusability,
    },
  })

  return () => {
    cards.forEach((figure) => {
      figure.tabIndex = 0
    })
  }
}

function setupNative(strip) {
  strip.setAttribute('data-lenis-prevent', '')

  const onWheel = (event) => {
    if (event.deltaY === 0) return
    const atStart = strip.scrollLeft <= 0
    const atEnd = strip.scrollLeft >= strip.scrollWidth - strip.clientWidth - 1
    if ((event.deltaY < 0 && atStart) || (event.deltaY > 0 && atEnd)) return
    event.preventDefault()
    strip.scrollLeft += event.deltaY
  }

  strip.addEventListener('wheel', onWheel, { passive: false })

  return () => {
    strip.removeEventListener('wheel', onWheel)
    strip.removeAttribute('data-lenis-prevent')
  }
}
