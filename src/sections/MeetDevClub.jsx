import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import AvatarCluster from '../components/AvatarCluster'
import StarBadge from '../components/StarBadge'
import PillarStack from '../components/PillarStack'
import { STATS } from '../data/stats'
import { PILLARS } from '../data/pillars'
import { createPillarsTimeline } from '../animations/pillars.timeline'

/*
 * Chapter 04 — Meet DevClub. Trust: the answer to Chapter 03. One
 * column: full-screen pillar cards are the whole chapter's own Fase B.
 * No WebGL centerpiece in Fase A anymore (a Prism accent briefly lived
 * here — removed once this chapter's real mechanism settled, no longer
 * needed). Opens with the centered institutional case (Fase A, normal
 * document flow), then the pillar stack (Fase B): all 5 cards
 * absolutely positioned inside one pinned, full-bleed stage, a single
 * scrubbed GSAP timeline stacking them — the previous card shrinking
 * and rotating in place as the next rises over it — handing off into
 * Chapter 05 via `Chapter`'s own `backdrop` blackout. See DECISION_LOG.md for
 * the full history of this chapter's mechanisms and why Chapter 01's
 * own restraint decision doesn't apply here.
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
      // bg-night-850 below the runway spacer at the end of the pillar
      // stack — the stack's own blackout is already this chapter's
      // real close.
      // Needs both pb-0 AND md:pb-0: Chapter.jsx's default is
      // `py-28 md:py-40`, and Tailwind's compiled output places
      // unprefixed `pb-0` BEFORE `md:py-40` in the stylesheet — same
      // specificity, so source order wins, and `md:py-40` would win
      // at exactly the desktop widths this chapter is visible at
      // (confirmed by inspecting the built CSS, not assumed). A plain
      // `pb-0` alone silently only works below the md breakpoint.
      innerClassName="pb-0 md:pb-0"
      // Lives in Chapter's own backdrop, not inside PillarStack itself,
      // so it's this chapter's real close regardless of what PillarStack's
      // own internal structure looks like — driven by the last card's
      // own pin progress in pillars.timeline.js.
      backdrop={
        <div
          data-pillars-blackout
          aria-hidden="true"
          className="bg-gradient-to-t from-night-950 via-night-950/70 to-transparent pointer-events-none absolute inset-0 z-40 opacity-0"
        />
      }
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Kicker className="mb-6" data-reveal>
          apresentação
        </Kicker>

        <h2
          data-pillars-title
          className="font-display text-4xl leading-tight text-white md:text-6xl"
        >
          O DevClub não é um curso. É um{' '}
          <em className="text-green-500 italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
            caminho
          </em>
          .
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

      <PillarStack pillars={PILLARS} />
    </Chapter>
  )
}
