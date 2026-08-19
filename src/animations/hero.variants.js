import { cubicBezier } from 'framer-motion'

/*
 * Chapter 01's entrance choreography (FirstDecision.jsx) — a
 * depth-of-field settle: layers arrive at different depths, the far
 * ones bigger, softer and slower, the near ones tighter and later, so
 * the scene reads as a camera pulling focus rather than a stack of
 * elements fading in together.
 *
 * This is the one place in the project that animates with
 * framer-motion instead of GSAP, and the split is by responsibility,
 * not preference: entrances are time-based and orchestrated, which is
 * what framer-motion's variants and springs are built for, while the
 * hero's *exit* stays on GSAP because it's scroll-scrubbed and has to
 * stay on the shared Lenis/ScrollTrigger clock (SmoothScrollProvider
 * runs Lenis on gsap.ticker). framer-motion's own useScroll would be a
 * second, unsynced scroll listener.
 *
 * There is deliberately no `motion.section` orchestration parent here,
 * even though staggerChildren would be tidier. The section is the
 * element GSAP pins, and handing a second library any claim on its
 * transform is the exact hazard hero.timeline.js already warns about.
 * Each layer carries its own explicit delay instead — more verbose,
 * but nothing but GSAP ever touches the pinned node.
 */

// Expo-out: a long, decelerating settle. Reads as weight coming to
// rest rather than a UI element snapping into place.
const EASE = cubicBezier(0.16, 1, 0.3, 1)

/*
 * `depth` scales all three cues at once (offset, scale and blur), so
 * one number moves a layer nearer or further without re-tuning it
 * piece by piece. 0 is the focal plane; higher is further back.
 */
export function layer(depth, delay = 0) {
  return {
    hidden: {
      opacity: 0,
      y: 26 * depth,
      scale: 1 - 0.03 * depth,
      filter: `blur(${5 * depth}px)`,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: EASE, delay },
    },
  }
}

/*
 * The backdrop photo is its own case: it holds a permanent `scale-105`
 * and `blur-sm` in CSS (it must — a blurred image needs overscan or its
 * soft edges show), so a generic `layer()` would animate it to
 * `scale: 1, blur: 0` and fight those. It only breathes inward and
 * fades in.
 */
export const backdrop = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.8, ease: EASE },
  },
}
