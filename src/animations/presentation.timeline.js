import { gsap } from '../lib/gsap'
import { DURATION, EASE } from './motion.tokens'

/*
 * Chapter 04's compact pillar index — the five cards beside the
 * headline. Three scroll/time behaviours, each on its OWN element, so
 * nothing is ever animated by two owners (the rule hero.timeline.js
 * learned the hard way):
 *
 *   [data-pillars-column] → scroll-linked parallax (this file)
 *   [data-pillar-enter]   → entrance stagger        (this file)
 *   [data-pillar-sheen]   → the travelling light    (this file)
 *   [data-pillar-chip]    → hover/focus             (CSS only)
 *
 * Hover deliberately stays in CSS. GSAP leaves an inline transform on
 * whatever it animates, so a `hover:-translate-y-*` utility on the same
 * node would silently lose to it — and wiring pointer listeners here
 * would mean per-card state and cleanup for something one transition
 * already does correctly, on the shared --ease-luxe curve.
 */
export function createPresentationAnimations(section) {
  const column = section.querySelector('[data-pillars-column]')
  const wrappers = section.querySelectorAll('[data-pillar-enter]')
  const sheens = section.querySelectorAll('[data-pillar-sheen]')

  const mm = gsap.matchMedia(section)

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    if (wrappers.length) {
      gsap.from(wrappers, {
        autoAlpha: 0,
        y: 34,
        duration: DURATION.slow,
        ease: EASE.out,
        stagger: 0.08,
        scrollTrigger: {
          trigger: column || section,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }

    /*
     * The light passes through all five cards in order, then repeats.
     *
     * This is the chapter's own sentence made visible — "não é um
     * curso, é um caminho": five stages that one thing travels
     * through, not five items in a grid. A per-card loop with random
     * phases would have read as five independent decorations and said
     * the opposite. The stagger is what carries the meaning, so it is
     * a sequence, not five tweens.
     *
     * Each sheen is a gradient transparent at both ends riding inside
     * its card's overflow-hidden, so it needs no opacity bookkeeping:
     * it is simply off-card at both extremes.
     */
    if (sheens.length) {
      const travel = gsap.timeline({ repeat: -1, repeatDelay: 2.4 })
      sheens.forEach((sheen, i) => {
        travel.fromTo(
          sheen,
          { yPercent: -110 },
          { yPercent: 210, duration: 1.15, ease: 'none' },
          i * 0.22,
        )
      })
    }

    /*
     * A slow counter-drift against the text column: the cards sit a
     * little further back in space, so they move a little less than
     * the copy they sit beside. Depth, and the reason the two columns
     * never read as one flat slab.
     */
    if (column) {
      gsap.fromTo(
        column,
        { y: 26 },
        {
          y: -26,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        },
      )
    }
  })

  return mm
}
