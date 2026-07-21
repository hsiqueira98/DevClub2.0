import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import { JOURNEY_STEPS } from '../data/journey'
import { createMethodAnimations } from '../animations/chapters.timeline'

/*
 * Chapter 07 — How It Works. The one light section on the page: both
 * reference sites confirm a light break partway through a dark page
 * (docs/DESIGN_SYSTEM.md). Clarity chapter → clearest background.
 * Vertical timeline; the connecting path is animated in Phase 3.
 */
export default function HowItWorks() {
  const sectionRef = useRef(null)

  useGSAP(() => createMethodAnimations(sectionRef.current), {
    scope: sectionRef,
  })

  return (
    <Chapter ref={sectionRef} id="metodo" bg="bg-white-warm">
      <Kicker className="mb-6" data-reveal>
        método
      </Kicker>

      <h2
        data-reveal
        className="font-display text-night-950 max-w-3xl text-4xl leading-tight md:text-6xl"
      >
        Simples. Estruturado.{' '}
        <em className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent italic">
          Passo a passo
        </em>
        .
      </h2>

      <ol className="relative mt-20 max-w-3xl">
        {/* Timeline path — Phase 3 draws this line on scroll */}
        <div
          aria-hidden="true"
          data-timeline-path
          className="bg-night-950/15 absolute top-2 bottom-2 left-[1.35rem] w-px"
        />

        {JOURNEY_STEPS.map((step) => (
          <li
            key={step.number}
            data-step
            data-reveal
            className="relative flex gap-8 pb-16 last:pb-0"
          >
            <span
              aria-hidden="true"
              className="font-display bg-night-950 z-10 flex size-11 shrink-0 items-center justify-center rounded-full text-sm text-green-500"
            >
              {step.number}
            </span>
            <div className="pt-1.5">
              <h3 className="font-display text-night-950 text-2xl md:text-3xl">
                {step.title}
              </h3>
              <p className="text-night-500 mt-3 max-w-xl text-lg leading-relaxed">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Chapter>
  )
}
