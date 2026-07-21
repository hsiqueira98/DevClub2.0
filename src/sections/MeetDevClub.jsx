import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import AccentText from '../components/AccentText'
import AvatarCluster from '../components/AvatarCluster'
import StarBadge from '../components/StarBadge'
import LogoMark from '../components/LogoMark'
import { STATS } from '../data/stats'
import { createOrbitAnimations } from '../animations/chapters.timeline'

/*
 * Chapter 04 — Meet DevClub. Trust: the answer to Chapter 03. The five
 * method pillars orbit the mark in a radial layout (docs/DESIGN_SYSTEM.md
 * — Amphora orbital pattern) instead of a card grid.
 */
const PILLARS = ['Comunidade', 'Método', 'Mentoria', 'Projetos', 'Suporte']

// Precomputed positions on the orbit circle (5 points, starting at top).
const ORBIT_POSITIONS = [
  'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'top-[38%] right-0 translate-x-1/2 -translate-y-1/2',
  'bottom-0 right-[19%] translate-y-1/2',
  'bottom-0 left-[19%] translate-y-1/2',
  'top-[38%] left-0 -translate-x-1/2 -translate-y-1/2',
]

export default function MeetDevClub() {
  const sectionRef = useRef(null)

  useGSAP(() => createOrbitAnimations(sectionRef.current), {
    scope: sectionRef,
  })

  return (
    <Chapter
      ref={sectionRef}
      id="devclub"
      bg="bg-night-850"
      className="overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 size-[40rem] translate-x-1/3 -translate-y-1/3 rounded-full bg-purple-700/25 blur-[140px]"
      />

      <div className="relative grid items-center gap-20 lg:grid-cols-2">
        <div>
          <Kicker className="mb-6" data-reveal>
            apresentação
          </Kicker>

          <h2
            data-reveal
            className="font-display text-4xl leading-tight text-white md:text-6xl"
          >
            O DevClub não é um curso. É um{' '}
            <AccentText color="green">caminho</AccentText>.
          </h2>

          <p
            data-reveal
            className="mt-8 max-w-xl text-xl leading-relaxed text-gray-400"
          >
            Uma metodologia que já formou {STATS.studentsLong}, com roadmap
            claro, mentoria de quem está no mercado e uma comunidade que não
            deixa ninguém travado para trás.
          </p>

          <div data-reveal className="mt-10 flex flex-wrap items-center gap-6">
            <AvatarCluster label={`${STATS.students} alunos formados`} />
            <StarBadge rating={STATS.rating} />
          </div>

          {/* Institutional trust — BRAND.md voice pillar */}
          <ul data-reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
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

        {/* Orbital pillars — desktop; collapses to pills on mobile */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
          <div
            aria-hidden="true"
            className="border-night-500 absolute inset-0 rounded-full border border-dashed"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <LogoMark size={72} className="text-green-500" />
          </div>
          <ul>
            {PILLARS.map((pillar, i) => (
              <li
                key={pillar}
                data-orbit-pillar
                className={`border-night-500 bg-night-750 absolute rounded-full border px-5 py-2.5 text-sm font-medium text-gray-300 ${ORBIT_POSITIONS[i]}`}
              >
                {pillar}
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex flex-wrap gap-3 lg:hidden">
          {PILLARS.map((pillar) => (
            <li
              key={pillar}
              className="border-night-500 bg-night-750 rounded-full border px-5 py-2.5 text-sm font-medium text-gray-300"
            >
              {pillar}
            </li>
          ))}
        </ul>
      </div>
    </Chapter>
  )
}
