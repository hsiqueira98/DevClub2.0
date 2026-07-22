import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import { JOURNEY_STEPS } from '../data/journey'
import { createMethodAnimations } from '../animations/chapters.timeline'

/*
 * Chapter 07 — How It Works. The one light section on the page: both
 * reference sites confirm a light break partway through a dark page
 * (docs/DESIGN_SYSTEM.md). white-soft instead of white-warm so the
 * global film grain stays visible here (PO round — DECISION_LOG.md);
 * kicker uses tone="dark" for contrast on the light background.
 */
export default function HowItWorks() {
  const sectionRef = useRef(null)

  useGSAP(() => createMethodAnimations(sectionRef.current), {
    scope: sectionRef,
  })

  return (
    <Chapter ref={sectionRef} id="metodo" bg="bg-white-soft">
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

      <div className="grid gap-12 lg:grid-cols-5">
        <ol className="relative mt-20 max-w-3xl lg:col-span-3">
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

        {/* Layered photo, light-mode version of the Ch03 technique:
            heavy white mask + edge gradients into the background —
            present but subdued */}
        <div
          data-reveal
          aria-hidden="true"
          className="relative mt-20 hidden overflow-hidden rounded-3xl lg:col-span-2 lg:block"
        >
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=70"
            alt=""
            className="size-full object-cover"
          />
          <div className="from-white-soft absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
          <div className="from-white-soft absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
          <div className="bg-white-soft/70 absolute inset-0" />
        </div>
      </div>
    </Chapter>
  )
}
