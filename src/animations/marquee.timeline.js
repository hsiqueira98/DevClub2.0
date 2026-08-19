import { gsap, ScrollTrigger } from '../lib/gsap'

/*
 * Chapter 08's hiring band (components/CompaniesBand.jsx).
 *
 * The previous version was a single row on a fixed 28s loop: the same
 * motion whether the visitor was racing past or reading. This one is
 * driven BY the visitor — the band reports their scroll back to them.
 *
 *   speed  — scales with scroll velocity, so the band surges while
 *            they move and settles to a drift when they stop.
 *   direction — flips with theirs. Scroll up and the whole band
 *            reverses. This is what makes it read as attached to the
 *            page rather than playing beside it.
 *   skew   — leans into the motion, the same cue a long exposure
 *            gives: a still frame that still says "fast".
 *
 * Two rows travelling opposite ways, so the band has internal parallax
 * and never resolves into one readable line the eye can lock onto —
 * it stays texture, which is the job. The second row is offset by half
 * the list so no wordmark ever sits directly above itself.
 *
 * Ownership is split across two elements on purpose (the rule
 * hero.timeline.js documents): [data-marquee-row] carries the xPercent
 * loop, [data-marquee-skew] wraps it and carries the skew. One
 * transform owner each.
 */
export function createCompaniesMarquee(section) {
  const band = section.querySelector('[data-marquee-band]')
  if (!band) return

  const mm = gsap.matchMedia(band)

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const rows = band.querySelectorAll('[data-marquee-row]')
    const skewLayers = band.querySelectorAll('[data-marquee-skew]')
    if (!rows.length) return

    // Each row holds the list twice, so -50% lands exactly on the
    // start of the second copy — a seamless wrap with no measuring.
    const loops = Array.from(rows, (row, i) => {
      const reverse = row.dataset.marqueeRow === 'reverse'
      return gsap.fromTo(
        row,
        { xPercent: reverse ? -50 : 0 },
        {
          xPercent: reverse ? 0 : -50,
          ease: 'none',
          duration: 32 + i * 10,
          repeat: -1,
        },
      )
    })

    /*
     * One reused tween per channel via quickTo, not a fresh gsap.to on
     * every scroll frame: onUpdate fires on every frame the visitor is
     * moving, and spawning two throwaway tweens each time is a lot of
     * garbage for a decorative band. A proxy object holds the speed and
     * pushes it into every loop's timeScale.
     */
    const speed = { value: 1 }
    const speedTo = gsap.quickTo(speed, 'value', {
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => loops.forEach((loop) => loop.timeScale(speed.value)),
    })
    const skewTo = gsap.quickTo(skewLayers, 'skewX', {
      duration: 0.7,
      ease: 'power3.out',
    })

    const boostOf = gsap.utils.clamp(1, 6)
    const skewOf = gsap.utils.clamp(-9, 9)

    let direction = 1
    let settle

    ScrollTrigger.create({
      trigger: band,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = self.getVelocity()
        direction = self.direction || direction

        // A negative timeScale runs a repeating tween backwards, which
        // is the whole direction flip — no second set of tweens.
        speedTo(direction * boostOf(1 + Math.abs(velocity) / 700))
        skewTo(skewOf(velocity / -260))

        // Scroll produces no "stopped" event, so the resting state is a
        // debounce: the band keeps drifting the way the visitor last
        // went, at its base speed.
        settle?.kill()
        settle = gsap.delayedCall(0.2, () => {
          speedTo(direction)
          skewTo(0)
        })
      },
    })

    return () => settle?.kill()
  })

  return mm
}
