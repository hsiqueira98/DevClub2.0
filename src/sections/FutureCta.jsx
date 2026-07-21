import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Chapter from '../components/Chapter'
import Button from '../components/Button'
import { ArrowRight } from 'lucide-react'
import { createEpilogueAnimations } from '../animations/chapters.timeline'

/*
 * Chapter 10 — Your Future Starts Now. Full inversion to solid green
 * with dark text (docs/STORYBOARD.md + Navbar Digital closing move):
 * restraint in content, boldness in color. Ends with the Epílogo beat —
 * one final breath of near-empty space before the footer.
 */
export default function FutureCta() {
  const sectionRef = useRef(null)

  useGSAP(() => createEpilogueAnimations(sectionRef.current), {
    scope: sectionRef,
  })

  return (
    <Chapter
      ref={sectionRef}
      id="futuro"
      bg="bg-green-500"
      innerClassName="py-40 md:py-56"
    >
      <div className="flex flex-col items-center text-center">
        <p
          data-reveal
          className="font-display text-night-950/70 text-sm tracking-[0.3em] lowercase"
        >
          sua vez
          <span aria-hidden="true" className="animate-blink">
            _
          </span>
        </p>

        <h2
          data-reveal
          className="font-display text-night-950 mt-8 max-w-4xl text-5xl leading-tight md:text-7xl"
        >
          A única diferença entre você e um dev é a decisão de começar.
        </h2>

        <Button
          href="#inicio"
          variant="inverted"
          data-reveal
          className="mt-14 px-10 py-5 text-lg"
        >
          Começar minha jornada
          <ArrowRight size={20} aria-hidden="true" />
        </Button>
      </div>

      {/* Epílogo — the closing breath (docs/STORYBOARD.md) */}
      <div
        data-epilogue
        className="flex flex-col items-center pt-48 pb-10 text-center md:pt-64"
      >
        <p className="font-display text-night-950/60 text-lg">
          A próxima história de sucesso pode ser a sua
          <span aria-hidden="true" className="animate-blink">
            _
          </span>
        </p>
      </div>
    </Chapter>
  )
}
