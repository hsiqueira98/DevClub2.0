import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import { JOURNEY_STEPS } from '../data/journey'

/*
 * Chapter 07 — How It Works. The one light section on the page: both
 * reference sites confirm a light break partway through a dark page
 * (docs/DESIGN_SYSTEM.md). Clarity chapter → clearest background.
 * Vertical timeline; the connecting path is animated in Phase 3.
 */
export default function HowItWorks() {
  return (
    <Chapter id="metodo" bg="bg-white-warm">
      <Kicker className="mb-6">método</Kicker>

      <h2 className="font-display max-w-3xl text-4xl leading-tight text-night-950 md:text-6xl">
        Simples. Estruturado.{' '}
        <em className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text italic text-transparent">
          Passo a passo
        </em>
        .
      </h2>

      <ol className="relative mt-20 max-w-3xl">
        {/* Timeline path — Phase 3 draws this line on scroll */}
        <div
          aria-hidden="true"
          data-timeline-path
          className="absolute top-2 bottom-2 left-[1.35rem] w-px bg-night-950/15"
        />

        {JOURNEY_STEPS.map((step) => (
          <li key={step.number} data-step className="relative flex gap-8 pb-16 last:pb-0">
            <span
              aria-hidden="true"
              className="font-display z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-night-950 text-sm text-green-500"
            >
              {step.number}
            </span>
            <div className="pt-1.5">
              <h3 className="font-display text-2xl text-night-950 md:text-3xl">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-night-500">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Chapter>
  )
}
