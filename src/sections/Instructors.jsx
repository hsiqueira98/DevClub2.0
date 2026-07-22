import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import AccentText from '../components/AccentText'
import { INSTRUCTORS } from '../data/instructors'
import { createFilmstripTimeline } from '../animations/filmstrip.timeline'

/*
 * Chapter 06 — Conheça Quem Ensina. A horizontal film-strip of
 * portraits, like a documentary cast list (docs/STORYBOARD.md) — no
 * bio-card grid. The duotone grade unifies placeholder photos into the
 * cinematic imagery style from docs/BRAND.md; hover/focus lights a
 * portrait up (color, lifted grade, caption). Touch has no hover, so
 * captions stay visible there (see index.css). The strip itself is
 * pinned and scrubbed by filmstrip.timeline.js.
 */
export default function Instructors() {
  const sectionRef = useRef(null)

  useGSAP(() => createFilmstripTimeline(sectionRef.current), {
    scope: sectionRef,
  })

  return (
    <Chapter
      ref={sectionRef}
      id="tutores"
      bg="bg-night-900"
      className="overflow-hidden"
      innerClassName="max-w-none px-0 py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1280px]">
        <Kicker className="mb-6" data-reveal>
          quem ensina
        </Kicker>

        <h2
          data-reveal
          className="font-display max-w-3xl text-4xl leading-tight text-white md:text-6xl"
        >
          Quem ensina, <AccentText color="purple">vive disso</AccentText>.
        </h2>

        <p data-reveal className="mt-6 max-w-xl text-lg text-gray-500">
          Especialistas que trabalham no mercado — não slides gravados.
        </p>
      </div>

      <ul
        data-filmstrip
        data-reveal-group
        className="mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 pl-[max(1.5rem,calc((100vw-1280px)/2))]"
      >
        {INSTRUCTORS.map((person) => (
          <li key={person.name} className="shrink-0 snap-center">
            <figure
              tabIndex={0}
              className="group bg-night-800 relative h-[26rem] w-[19rem] overflow-hidden rounded-2xl"
            >
              {/* Eager: lazy-load inside a transformed (pinned) strip
                  defers offscreen portraits and they pop in mid-scrub */}
              <img
                src={person.photo}
                alt={`Retrato de ${person.name}`}
                className="duration-slow size-full object-cover grayscale transition-all group-hover:scale-[1.04] group-hover:grayscale-0 group-focus-visible:scale-[1.04] group-focus-visible:grayscale-0"
              />
              {/* Duotone grade over the placeholder portraits — full in
                  the resting state (unifies the photos), lifted on
                  hover/focus so the portrait reads as lit up. */}
              <div
                aria-hidden="true"
                data-grade
                className="from-night-950 duration-slow absolute inset-0 bg-gradient-to-t via-purple-950/40 to-transparent transition-opacity group-hover:opacity-60 group-focus-visible:opacity-60"
              />
              <figcaption className="duration-base absolute inset-x-0 bottom-0 translate-y-2 p-6 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <p className="font-display text-xl text-white">{person.name}</p>
                <p className="mt-1 text-sm text-green-500">{person.role}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Chapter>
  )
}
