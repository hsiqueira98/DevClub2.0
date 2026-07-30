import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ChevronDown } from 'lucide-react'
import { createHeroTimeline } from '../animations/hero.timeline'
import { useTypewriter } from '../hooks/useTypewriter'
import logoDevClub from '../assets/img/LogoDevClub.png'

const ROLES = ['Front-End', 'Back-End', 'FullStack', 'Mobile']

/*
 * Chapter 01 — The First Decision.
 * Opens with the Prólogo beat: minimal, dark, typography-first
 * (docs/STORYBOARD.md). Choreography lives in
 * animations/hero.timeline.js (assemble → rest → shatter); the cycling
 * role line is DevClub's own typewriter hero device (docs/BRAND.md).
 */
export default function FirstDecision() {
  const sectionRef = useRef(null)
  const role = useTypewriter(ROLES)

  useGSAP(() => createHeroTimeline(sectionRef.current), { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="inicio"
      data-chapter
      className="bg-night-950 relative flex min-h-screen flex-col overflow-hidden px-6 md:px-12"
    >
      {/* Layered backdrop (PO request — see DECISION_LOG.md):
          photo blurred at the bottom of the stack, purple mask
          obscuring it, black mask that the shatter phase fades in. */}
      <img
        src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1920&q=70"
        alt=""
        aria-hidden="true"
        data-hero-photo
        className="absolute inset-0 size-full scale-105 object-cover blur-sm"
      />
      <div
        aria-hidden="true"
        className="from-night-950/80 to-night-950/95 absolute inset-0 bg-gradient-to-b via-purple-950/80"
      />

      {/* Ambient purple glow — atmosphere only, never a surface color */}
      <div
        aria-hidden="true"
        data-hero-glow
        className="pointer-events-none absolute top-1/4 left-1/2 size-[60rem] -translate-x-1/2 rounded-full bg-purple-700/25 blur-[160px]"
      />

      {/* Fades to black in sync with the shatter, handing off to Ch02 */}
      <div
        aria-hidden="true"
        data-hero-blackout
        className="bg-night-950 pointer-events-none absolute inset-0 opacity-0"
      />

      <div
        data-hero-content
        className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center justify-center pt-24 pb-24 text-center"
      >
        {/* Stays centered and only shrinks + dims as the hero shatters
            (never flies) — see hero.timeline.js. The navbar's own mark
            takes over separately, once the pill finishes becoming a
            full-width bar — see navbar.timeline.js. */}
        <div data-hero-logo aria-hidden="true" className="mb-8">
          <img src={logoDevClub} alt="" className="size-12" />
        </div>

        <p
          data-hero-kicker
          className="font-display mb-8 text-sm font-semibold tracking-[0.3em] text-green-500 lowercase"
        >
          início
          <span aria-hidden="true" className="animate-blink">
            _
          </span>
        </p>

        {/* Solid green accent (not the gradient signature): SplitText
            re-wraps every char in its own transformed span, which
            background-clip:text does not survive. */}
        <h1
          data-hero-headline
          className="font-display max-w-5xl text-5xl leading-tight font-extrabold text-white md:text-7xl lg:text-8xl"
        >
          Toda carreira em tecnologia começa com{' '}
          <em className="text-green-500 italic">uma decisão</em>.
        </h1>

        <p
          data-hero-typeline
          className="mt-10 font-sans text-xl text-gray-400 md:text-2xl"
        >
          E a sua pode ser em{' '}
          <span className="font-display text-green-500">
            {role}
            <span aria-hidden="true" className="animate-blink">
              _
            </span>
          </span>
        </p>
      </div>

      <a
        href="#mercado"
        data-hero-cue
        className="duration-fast relative z-10 mx-auto mb-10 flex flex-col items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-400"
      >
        role para começar
        <ChevronDown size={18} aria-hidden="true" />
      </a>
    </section>
  )
}
