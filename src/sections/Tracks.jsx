import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import AccentText from '../components/AccentText'
import { TRACKS } from '../data/tracks'

/*
 * Chapter 05 — Trilhas de Formação. Deliberately NOT a card grid: a
 * large typographic numbered index (docs/STORYBOARD.md), with the
 * per-track accent color as a small marker — DevClub's real per-track
 * color device (docs/BRAND.md) without the course-catalog look.
 */
export default function Tracks() {
  return (
    <Chapter id="formacoes" bg="bg-night-950">
      <Kicker className="mb-6" data-reveal>
        formações
      </Kicker>

      <h2
        data-reveal
        className="font-display max-w-3xl text-4xl leading-tight text-white md:text-6xl"
      >
        Uma trilha para <AccentText color="green">cada destino</AccentText>.
      </h2>

      <ol data-reveal-group className="mt-20">
        {TRACKS.map((track) => (
          <li
            key={track.number}
            data-track-line
            className="group border-night-600 border-t last:border-b"
          >
            <a
              href="#futuro"
              className="duration-fast flex flex-col gap-2 py-8 transition-colors md:flex-row md:items-baseline md:gap-10 md:py-10"
            >
              <span
                className={`font-display text-sm ${track.textClass}`}
                aria-hidden="true"
              >
                {track.number}
              </span>
              <span className="font-display duration-fast flex items-center gap-4 text-3xl text-white transition-transform group-hover:translate-x-3 md:text-5xl">
                <span
                  aria-hidden="true"
                  className={`size-2.5 shrink-0 rounded-full ${track.colorClass}`}
                />
                {track.name}
              </span>
              <span className="duration-fast text-lg text-gray-600 transition-colors group-hover:text-gray-400 md:ml-auto">
                {track.qualifier}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </Chapter>
  )
}
