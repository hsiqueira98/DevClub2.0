import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import { JOURNEY_STEPS } from '../data/journey'
import { createMethodAnimations } from '../animations/chapters.timeline'

/*
 * Chapter 07 — How It Works. The one light section on the page: both
 * reference sites confirm a light break partway through a dark page
 * (docs/DESIGN_SYSTEM.md). white-soft background keeps the global film
 * grain visible; kicker uses tone="dark" for contrast. A full-bleed
 * photo fills the right of the section with a scroll-linked Ken Burns
 * zoom (PO round — see DECISION_LOG.md), heavily masked so it reads as
 * light-mode atmosphere behind the method steps.
 */
export default function HowItWorks() {
  const sectionRef = useRef(null)

  useGSAP(() => createMethodAnimations(sectionRef.current), {
    scope: sectionRef,
  })

  return (
    <Chapter
      ref={sectionRef}
      id="metodo"
      bg="bg-white-soft"
      className="overflow-hidden"
      backdrop={
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 overflow-hidden lg:block"
        >
          <img
            data-method-photo
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=70"
            alt=""
            className="size-full object-cover"
          />
          {/* left edge + top/bottom fade into the light background */}
          <div className="from-white-soft absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
          <div className="from-white-soft via-white-soft/30 absolute inset-0 bg-gradient-to-t to-transparent" />
          {/* heavy white mask — present but subdued */}
          <div className="bg-white-soft/70 absolute inset-0" />
        </div>
      }
    >
      <Kicker tone="dark" className="mb-6" data-reveal>
        método
      </Kicker>

      <h2
        data-reveal
        className="font-display text-night-950 max-w-3xl text-4xl leading-tight md:text-6xl"
      >
        Simples. Estruturado.{' '}
        {/* pr: last italic glyph slants past the clip box — see AccentText */}
        <em className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text pr-[0.12em] text-transparent italic">
          Passo a passo
        </em>
        .
      </h2>

      <ol className="relative mt-20 max-w-2xl">
        {/* Timeline path — drawn on scroll */}
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
