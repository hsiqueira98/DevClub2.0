import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'
import Button from '../components/Button'
import { createTurnAnimations } from '../animations/chapters.timeline'

/*
 * Interstitial beat between The Challenge and Meet DevClub (PO rounds
 * — see DECISION_LOG.md): the question surfaces word by word, holds,
 * then a short answer + CTA fade in on the SAME scrub timeline — the
 * virada invites, Trilhas (Chapter 05) delivers.
 */
export default function TheTurn() {
  const sectionRef = useRef(null)

  useGSAP(() => createTurnAnimations(sectionRef.current), {
    scope: sectionRef,
  })

  return (
    <section
      ref={sectionRef}
      id="virada"
      data-chapter
      className="bg-night-950 relative -mt-10 flex min-h-screen items-center rounded-t-[2.5rem] px-6 md:px-12"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <p
          data-turn-line
          className="font-display text-4xl leading-snug text-white md:text-6xl"
        >
          E se você não precisasse fazer isso sozinho?
        </p>

        <p data-turn-answer className="mt-12 text-xl text-gray-400 md:text-2xl">
          Não precisa. Existe um caminho pronto — cinco, na verdade.
        </p>

        <Button
          href="#formacoes"
          data-turn-cta
          variant="primary"
          className="mt-8"
        >
          Ver trilhas
          <ArrowRight size={18} aria-hidden="true" />
        </Button>
      </div>
    </section>
  )
}
