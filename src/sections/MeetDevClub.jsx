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
import { createPresentationAnimations } from '../animations/presentation.timeline'

const CREDENTIALS = [
  'Pós-graduação reconhecida pelo MEC',
  'Certificações internacionais',
  'Garantia de 7 dias',
]

/*
 * Chapter 04 — Meet DevClub. Trust: the answer to Chapter 03.
 *
 * The layout is editorial rather than card-grid: a ruled masthead, one
 * oversized headline, and the five pillars as a slim vertical index
 * down the right — a contents page, not a feature list. The full-screen
 * pinned stack below (PillarStack) is the desktop expansion of those
 * same five, which is why the index stays deliberately small: it is a
 * promise of what is coming, not a competing account of it.
 *
 * Surfaces come from the luxe tokens in index.css (hairline / glass /
 * shadow-luxe) so the panels read as cut glass over black instead of
 * flat grey rectangles — see that block for why they are alpha-based.
 *
 * Wiring the rest of the chapter assumes:
 *  - [data-pillars-title]  — Fase A's SplitText reveal (the h2). It
 *    carries NO data-reveal: the global reveal system and the title
 *    timeline would be two owners on one element.
 *  - [data-pillars-stack] / [data-pillars-blackout] — Fase B's pinned
 *    stage, both inside PillarStack.
 *  - [data-pillars-column] / [data-pillar-enter] / [data-pillar-sheen]
 *    — presentation.timeline.js; see it for the one-owner split.
 */
export default function MeetDevClub() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      // createPillarsTimeline hands back a cleanup (SplitText revert);
      // createPresentationAnimations hands back a matchMedia, which the
      // useGSAP context captures on its own.
      const cleanupPillars = createPillarsTimeline(sectionRef.current)
      createPresentationAnimations(sectionRef.current)
      return cleanupPillars
    },
    { scope: sectionRef },
  )

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

      <div className="relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          {/* Ruled masthead — the chapter announces itself like a
              contents page: label left, what it contains right. */}
          <div
            data-reveal
            className="border-hairline flex items-baseline justify-between gap-6 border-b pb-4"
          >
            <Kicker>apresentação</Kicker>
            <span className="font-display text-[0.68rem] tracking-[0.32em] text-gray-600 uppercase">
              cinco pilares
            </span>
          </div>

          <h2
            data-pillars-title
            className="font-display mt-8 max-w-2xl text-3xl leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl"
          >
            O DevClub não é um curso. É um{' '}
            <AccentText color="green" data-split-ignore>
              caminho
            </AccentText>
            .
          </h2>

          <p
            data-reveal
            className="mt-7 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg"
          >
            Uma metodologia que já formou {STATS.studentsLong}, com roadmap
            claro, mentoria de quem está no mercado e uma comunidade que não
            deixa ninguém travado para trás.
          </p>

          {/* Social proof as one contained strip, not two floating
              chips — it reads as a single credential, which is what it
              is. */}
          <div
            data-reveal
            className="border-hairline bg-glass shadow-luxe mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-2xl border p-4 backdrop-blur-sm"
          >
            <AvatarCluster label={`${STATS.students} alunos formados`} />
            <StarBadge rating={STATS.rating} className="ml-auto" />
          </div>

          <ul
            data-reveal
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500"
          >
            {CREDENTIALS.map((item, i) => (
              <li key={item} className="flex items-center gap-5">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="bg-hairline-lit hidden h-3 w-px sm:block"
                  />
                )}
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div data-pillars-column>
          <ul
            data-presentation-pillars
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-2.5"
          >
            {PILLARS.map(({ name }, index) => (
              <li
                key={name}
                data-pillar-enter
                style={{ '--pillar-step': index }}
              >
                <article
                  data-pillar-chip
                  className="group border-hairline bg-glass shadow-luxe ease-luxe hover:border-hairline-lit hover:bg-glass-lit hover:shadow-luxe-lit relative h-full overflow-hidden rounded-xl border p-4 backdrop-blur-sm transition-[background-color,border-color,box-shadow,transform] duration-500 hover:-translate-y-1.5 lg:h-44"
                >
                  {/* Rail: the path running through this stage. Idle it
                      is a hairline stub; hover draws it the full height. */}
                  <span
                    aria-hidden="true"
                    className="ease-luxe absolute inset-y-0 left-0 w-px origin-top scale-y-[0.18] bg-green-500/80 transition-transform duration-700 group-hover:scale-y-100"
                  />

                  {/* The travelling light — presentation.timeline.js
                      rides one of these through all five in order. */}
                  <span
                    data-pillar-sheen
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent"
                  />

                  <span className="font-display relative text-[0.65rem] tracking-[0.3em] text-green-500">
                    0{index + 1}
                  </span>
                  <p className="font-display relative mt-5 text-[0.9rem] text-white lg:mt-7 lg:rotate-180 lg:[writing-mode:vertical-rl]">
                    {name}
                  </p>
                </article>
              </li>
            ))}
          </ul>

          {/* Sets up the pinned stack that follows, so the index reads
              as a promise rather than as the whole account of the five. */}
          <p
            data-reveal
            className="border-hairline mt-8 border-t pt-4 text-xs tracking-[0.18em] text-gray-600 uppercase lg:mt-10"
          >
            cada pilar, em tela cheia, a seguir
          </p>
        </div>
      </div>

      <PillarStack pillars={PILLARS} />
    </Chapter>
  )
}
