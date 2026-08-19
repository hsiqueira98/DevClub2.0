import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import AccentText from '../components/AccentText'
import AvatarCluster from '../components/AvatarCluster'
import StarBadge from '../components/StarBadge'
import PillarStack from '../components/PillarStack'
import { STATS } from '../data/stats'
import { PILLARS } from '../data/pillars'
import { createPillarsTimeline } from '../animations/pillars.timeline'

/*
 * Chapter 04 — Meet DevClub. Trust: the answer to Chapter 03.
 *
 * This file was left half-wired: it used <AccentText> and <PillarStack>
 * without importing either (a ReferenceError on the very first render —
 * the whole page went blank), and it shadowed data/pillars.js's PILLARS
 * with a local array of plain strings, so PillarStack destructured
 * `{ name, qualifier, description, icon }` off a string and rendered
 * ICONS[undefined]. animations/pillars.timeline.js and data/pillars.js
 * were both complete but imported by nothing.
 *
 * The wiring the rest of the chapter already assumes:
 *  - [data-pillars-title]  — Fase A's SplitText reveal (the h2). It
 *    deliberately carries NO data-reveal: the global reveal system and
 *    the title timeline would be two owners on one element, the exact
 *    hazard hero.timeline.js documents.
 *  - [data-pillars-stack]  — Fase B's pinned stage (PillarStack).
 *  - [data-pillars-blackout] — the tail handoff into Chapter 05, which
 *    lives inside the pinned stage so it stays with it (PillarStack).
 */
export default function MeetDevClub() {
  const sectionRef = useRef(null)

  useGSAP(() => createPillarsTimeline(sectionRef.current), {
    scope: sectionRef,
  })

  return (
    <Chapter
      ref={sectionRef}
      id="devclub"
      bg="bg-night-850"
      className="overflow-hidden"
      innerClassName="py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 size-[28rem] translate-x-1/3 -translate-y-1/3 rounded-full bg-purple-700/20 blur-[120px]"
      />

      <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Kicker className="mb-5" data-reveal>
            apresentação
          </Kicker>

          <h2
            data-pillars-title
            className="font-display max-w-2xl text-3xl leading-tight text-white sm:text-4xl md:text-5xl"
          >
            O DevClub não é um curso. É um{' '}
            <AccentText color="green">caminho</AccentText>.
          </h2>

          <p
            data-reveal
            className="mt-6 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg"
          >
            Uma metodologia que já formou {STATS.studentsLong}, com roadmap
            claro, mentoria de quem está no mercado e uma comunidade que não
            deixa ninguém travado para trás.
          </p>

          <div data-reveal className="mt-8 flex flex-wrap items-center gap-4">
            <AvatarCluster label={`${STATS.students} alunos formados`} />
            <StarBadge rating={STATS.rating} />
          </div>

          <ul data-reveal className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
            {[
              'Pós-graduação reconhecida pelo MEC',
              'Certificações internacionais',
              'Garantia de 7 dias',
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-gray-500"
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-green-500"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* The compact index of the five pillars, at every breakpoint —
            the full-screen stack below is the desktop, motion-safe
            treatment of the same five, not a second set. */}
        <ul
          data-presentation-pillars
          data-reveal-group
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-2"
        >
          {PILLARS.map(({ name }, index) => (
            <li
              key={name}
              className="border-night-500 bg-night-900/70 group relative overflow-hidden rounded-2xl border p-5 transition-colors duration-300 hover:border-green-500/60"
            >
              <span className="font-display text-xs tracking-[0.18em] text-green-500">
                0{index + 1}
              </span>
              <p className="font-display mt-7 text-lg text-white lg:mt-10 lg:rotate-180 lg:[writing-mode:vertical-rl]">
                {name}
              </p>
              <span
                aria-hidden="true"
                className="absolute right-0 bottom-0 size-16 translate-x-1/2 translate-y-1/2 rounded-full bg-green-500/10 blur-xl transition-colors duration-300 group-hover:bg-green-500/20"
              />
            </li>
          ))}
        </ul>
      </div>

      <PillarStack pillars={PILLARS} />
    </Chapter>
  )
}
