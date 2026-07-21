import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { createTurnAnimations } from '../animations/chapters.timeline'

/*
 * Interstitial beat between The Challenge and Meet DevClub (added on
 * PO review — see DECISION_LOG.md): one line, a full screen, revealed
 * word by word at the visitor's own scroll pace. The narrative hinge
 * of the whole page — the question Chapter 04 answers.
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
      className="bg-night-950 relative -mt-10 flex min-h-[90vh] items-center rounded-t-[2.5rem] px-6 md:px-12"
    >
      <p
        data-turn-line
        className="font-display mx-auto max-w-4xl text-center text-4xl leading-snug text-white md:text-6xl"
      >
        E se você não precisasse fazer isso sozinho?
      </p>
    </section>
  )
}
