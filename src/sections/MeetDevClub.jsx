import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import AccentText from '../components/AccentText'
import AvatarCluster from '../components/AvatarCluster'
import StarBadge from '../components/StarBadge'
import PillarRolodex from '../components/PillarRolodex'
import { STATS } from '../data/stats'
import { PILLARS } from '../data/pillars'
import { createPillarsTimeline } from '../animations/pillars.timeline'

/*
 * Chapter 04 — Meet DevClub. Trust: the answer to Chapter 03. Opens
 * with the centered institutional case (Fase A, normal document flow),
 * then hands off to a pinned rolodex of full-screen pillar cards
 * (Fase B), flipping on scroll and handing off into Chapter 05 via a
 * blackout — see docs/DECISION_LOG.md for the full history of this
 * chapter's five mechanisms and why this one is the one that stuck,
 * and for why Chapter 01's own restraint decision doesn't apply here.
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
      // Chapter's own bottom padding would otherwise show a strip of
      // bg-night-850 below the pinned stage once it unpins — the
      // rolodex's own blackout is already this chapter's real close.
      // Needs both pb-0 AND md:pb-0: Chapter.jsx's default is
      // `py-28 md:py-40`, and Tailwind's compiled output places
      // unprefixed `pb-0` BEFORE `md:py-40` in the stylesheet — same
      // specificity, so source order wins, and `md:py-40` would win
      // at exactly the desktop widths this chapter is visible at
      // (confirmed by inspecting the built CSS, not assumed). A plain
      // `pb-0` alone silently only works below the md breakpoint.
      innerClassName="pb-0 md:pb-0"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 size-[40rem] translate-x-1/3 -translate-y-1/3 rounded-full bg-purple-700/25 blur-[140px]"
      />

      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Kicker className="mb-6" data-reveal>
          apresentação
        </Kicker>

        <h2
          data-pillars-title
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
        <ul
          data-reveal
          className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3"
        >
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

      <PillarRolodex pillars={PILLARS} />
    </Chapter>
  )
}
