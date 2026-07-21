import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import AccentText from '../components/AccentText'
import { INSTRUCTORS } from '../data/instructors'

/*
 * Chapter 06 — Conheça Quem Ensina. A horizontal film-strip of
 * portraits, like a documentary cast list (docs/STORYBOARD.md) — no
 * bio-card grid. Name/role are hidden until hover/focus; the duotone
 * grade unifies placeholder photos into the cinematic imagery style
 * from docs/BRAND.md. Phase 3 links the strip to scroll.
 */
export default function Instructors() {
  return (
    <Chapter id="tutores" bg="bg-night-900" innerClassName="max-w-none px-0 py-28 md:py-40">
      <div className="mx-auto max-w-[1280px]">
        <Kicker className="mb-6">quem ensina</Kicker>

        <h2 className="font-display max-w-3xl text-4xl leading-tight text-white md:text-6xl">
          Quem ensina, <AccentText color="purple">vive disso</AccentText>.
        </h2>

        <p className="mt-6 max-w-xl text-lg text-gray-500">
          Especialistas que trabalham no mercado — não slides gravados.
        </p>
      </div>

      <ul
        data-filmstrip
        className="mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 pl-[max(1.5rem,calc((100vw-1280px)/2))]"
      >
        {INSTRUCTORS.map((person) => (
          <li key={person.name} className="shrink-0 snap-center">
            <figure
              tabIndex={0}
              className="group relative h-[26rem] w-[19rem] overflow-hidden rounded-2xl bg-night-800"
            >
              <img
                src={person.photo}
                alt={`Retrato de ${person.name}`}
                loading="lazy"
                className="size-full object-cover grayscale transition-all duration-slow group-hover:grayscale-0 group-focus-visible:grayscale-0"
              />
              {/* Duotone grade over the placeholder portraits */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-night-950 via-purple-950/40 to-transparent transition-opacity duration-slow group-hover:opacity-60"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-6 opacity-0 transition-all duration-base group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
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
