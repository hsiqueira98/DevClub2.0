import LogoMark from '../components/LogoMark'
import Kicker from '../components/Kicker'
import AccentText from '../components/AccentText'
import { ChevronDown } from 'lucide-react'

/*
 * Chapter 01 — The First Decision.
 * Opens with the Prólogo beat: minimal, dark, typography-first
 * (docs/STORYBOARD.md). The headline receives the assemble→rest→shatter
 * choreography in Phase 3; the cycling role line is DevClub's own
 * typewriter hero device (docs/BRAND.md).
 */
export default function FirstDecision() {
  return (
    <section
      id="inicio"
      data-chapter
      className="relative flex min-h-screen flex-col overflow-hidden bg-night-950 px-6 md:px-12"
    >
      {/* Ambient purple glow — atmosphere only, never a surface color */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 size-[60rem] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[160px]"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-[1280px] items-center gap-3 py-8">
        <LogoMark size={28} className="text-green-500" />
        <span className="font-display text-lg tracking-wide text-white">
          DevClub
        </span>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center justify-center pb-24 text-center">
        <Kicker className="mb-8">início</Kicker>

        <h1
          data-hero-headline
          className="font-display max-w-5xl text-5xl leading-tight text-white md:text-7xl lg:text-8xl"
        >
          Toda carreira em tecnologia começa com{' '}
          <AccentText color="green">uma decisão</AccentText>.
        </h1>

        <p className="mt-10 font-sans text-xl text-gray-400 md:text-2xl">
          E a sua pode ser em{' '}
          <span data-typewriter className="font-display text-green-500">
            Front-End
            <span aria-hidden="true" className="animate-blink">
              _
            </span>
          </span>
        </p>
      </div>

      <a
        href="#mercado"
        className="relative z-10 mx-auto mb-10 flex flex-col items-center gap-2 text-sm text-gray-600 transition-colors duration-fast hover:text-gray-400"
      >
        role para começar
        <ChevronDown size={18} aria-hidden="true" />
      </a>
    </section>
  )
}
