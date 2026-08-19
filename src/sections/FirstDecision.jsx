import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { createHeroTimeline } from '../animations/hero.timeline'
import { layer, backdrop } from '../animations/hero.variants'
import { useTypewriter } from '../hooks/useTypewriter'
import logoDevClub from '../assets/img/LogoDevClub.png'

const ROLES = ['Front-End', 'Back-End', 'FullStack', 'Mobile']

/*
 * Chapter 01 — The First Decision.
 *
 * Two animation systems, split strictly by responsibility and never
 * sharing a DOM node:
 *
 *  - framer-motion owns the ENTRANCE (hero.variants.js): a
 *    depth-of-field settle, far layers first, focal plane last.
 *  - GSAP owns the EXIT (hero.timeline.js): the scroll-scrubbed
 *    rest → shatter, plus the blackout handoff into Chapter 02.
 *
 * Every element GSAP's scrub drives — kicker, typeline, cue, glow,
 * logo, the headline's split chars — is wrapped in its own
 * `motion.div` rather than being animated directly. hero.timeline.js
 * documents why: two owners on one element freeze it whenever a kill
 * or refresh lands between them, and that risk only grows across two
 * libraries. The wrapper animates, the inner element stays GSAP's, and
 * the transforms compose.
 *
 * The section itself is plain — GSAP pins it, so framer-motion is kept
 * off it entirely.
 */
export default function FirstDecision() {
  const sectionRef = useRef(null)
  const role = useTypewriter(ROLES)
  const reduced = useReducedMotion()

  useGSAP(() => createHeroTimeline(sectionRef.current), { scope: sectionRef })

  // `initial={false}` skips straight to the settled state — no motion,
  // no layout shift, nothing to wait for.
  const enter = reduced
    ? { initial: false }
    : { initial: 'hidden', animate: 'visible' }

  return (
    <section
      ref={sectionRef}
      id="inicio"
      data-chapter
      className="bg-night-950 relative flex min-h-screen flex-col overflow-hidden px-6 md:px-12"
    >
      {/* Layered backdrop (PO request — see DECISION_LOG.md):
          photo blurred at the bottom of the stack, purple mask
          obscuring it, black mask that the shatter phase fades in.
          The photo is also the LCP element — the largest above-the-fold
          paint, which the Prólogo fades in — so it is fetched at high
          priority instead of queueing behind the lazy portraits and
          gallery further down the document. */}
      <motion.img
        src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1920&q=70"
        alt=""
        aria-hidden="true"
        data-hero-photo
        variants={backdrop}
        {...enter}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 size-full scale-105 object-cover blur-sm"
      />
      <div
        aria-hidden="true"
        className="from-night-950/80 to-night-950/95 absolute inset-0 bg-gradient-to-b via-purple-950/80"
      />

      {/* Ambient purple glow — atmosphere only, never a surface color.
          The wrapper is framer-motion's; the glow itself stays GSAP's
          (the scrub fades it out during the shatter). */}
      <motion.div
        aria-hidden="true"
        variants={layer(3, 0.1)}
        {...enter}
        className="pointer-events-none absolute inset-0"
      >
        <div
          data-hero-glow
          className="absolute top-1/4 left-1/2 size-[60rem] -translate-x-1/2 rounded-full bg-purple-700/25 blur-[160px]"
        />
      </motion.div>

      {/* Fades to black in sync with the shatter, handing off to Ch02 */}
      <div
        aria-hidden="true"
        data-hero-blackout
        className="bg-night-950 pointer-events-none absolute inset-0 opacity-0"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center justify-center pt-24 pb-24 text-center">
        {/* Stays centered and only shrinks + dims as the hero shatters
            (never flies) — see hero.timeline.js. The navbar's own mark
            takes over separately, once the pill finishes becoming a
            full-width bar — see navbar.timeline.js. */}
        <motion.div variants={layer(2, 0.45)} {...enter} className="mb-8">
          <div data-hero-logo aria-hidden="true">
            <img src={logoDevClub} alt="" className="size-12" />
          </div>
        </motion.div>

        <motion.div variants={layer(1.6, 0.6)} {...enter} className="mb-8">
          <p
            data-hero-kicker
            className="font-display text-sm font-semibold tracking-[0.3em] text-green-500 lowercase"
          >
            início
            <span aria-hidden="true" className="animate-blink">
              _
            </span>
          </p>
        </motion.div>

        {/* The focal plane — depth 1, and the last thing to settle.
            Solid green accent (not the gradient signature): SplitText
            re-wraps every char in its own transformed span, which
            background-clip:text does not survive. framer-motion drives
            the <h1> itself while GSAP drives the chars inside it —
            again, different nodes. */}
        <motion.h1
          data-hero-headline
          variants={layer(1, 0.75)}
          {...enter}
          className="font-display max-w-5xl text-5xl leading-tight font-extrabold text-white md:text-7xl lg:text-8xl"
        >
          Toda carreira em tecnologia começa com{' '}
          <em className="text-green-500 italic">uma decisão</em>.
        </motion.h1>

        <motion.div variants={layer(0.8, 0.95)} {...enter} className="mt-10">
          <p
            data-hero-typeline
            className="font-sans text-xl text-gray-400 md:text-2xl"
          >
            E a sua pode ser em{' '}
            <span className="font-display text-green-500">
              {role}
              <span aria-hidden="true" className="animate-blink">
                _
              </span>
            </span>
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={layer(0.5, 1.15)}
        {...enter}
        className="relative z-10 mx-auto mb-10"
      >
        <a
          href="#mercado"
          data-hero-cue
          className="duration-fast flex flex-col items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-400"
        >
          role para começar
          <ChevronDown size={18} aria-hidden="true" />
        </a>
      </motion.div>
    </section>
  )
}
