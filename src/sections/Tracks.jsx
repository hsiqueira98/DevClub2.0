import { Plus, ArrowRight } from 'lucide-react'
import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import AccentText from '../components/AccentText'
import Button from '../components/Button'
import { TRACKS } from '../data/tracks'

/*
 * Chapter 05 — Trilhas de Formação. Typographic numbered index
 * (docs/STORYBOARD.md), never a card grid. Interaction is a native
 * <details name="tracks"> accordion — the same zero-JS mechanism as
 * the FAQ (PO round replaced the popup modal — see DECISION_LOG.md):
 * a row expands in place, pushing the list down, revealing the track's
 * description + CTA. The click affordance splits by input type in CSS
 * (.track-summary): a cursor-following glow on real-mouse desktops, a
 * permanent border glow on touch/coarse pointers (no hover to reveal
 * that a row is clickable).
 */
export default function Tracks() {
  const trackGlow = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

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

      <div data-reveal-group className="mt-20 flex flex-col gap-2">
        {TRACKS.map((track) => (
          <details
            key={track.number}
            name="tracks"
            style={{ '--track-glow': track.glow }}
            className="track-row group bg-night-900/40 overflow-hidden rounded-2xl"
          >
            <summary
              onMouseMove={trackGlow}
              className="track-summary relative flex cursor-pointer list-none flex-col gap-2 px-6 py-8 md:flex-row md:items-baseline md:gap-10 md:px-8 md:py-10 [&::-webkit-details-marker]:hidden"
            >
              <span
                className={`font-display text-sm ${track.textClass}`}
                aria-hidden="true"
              >
                {track.number}
              </span>
              <span className="font-display flex items-center gap-4 text-3xl text-white md:text-5xl">
                <span
                  aria-hidden="true"
                  className={`size-2.5 shrink-0 rounded-full ${track.colorClass}`}
                />
                {track.name}
              </span>
              <span className="text-lg text-gray-600 md:ml-auto">
                {track.qualifier}
              </span>
              <Plus
                size={22}
                aria-hidden="true"
                className="duration-fast hidden shrink-0 self-center text-green-500 transition-transform group-open:rotate-45 md:block"
              />
            </summary>

            <div className="max-w-2xl px-6 pb-10 md:px-8">
              <p className="leading-relaxed text-gray-400">
                {track.description}
              </p>
              <Button href="#futuro" className="mt-6">
                Quero essa trilha
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </details>
        ))}
      </div>
    </Chapter>
  )
}
