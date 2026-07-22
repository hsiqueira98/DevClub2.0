import { useState } from 'react'
import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import AccentText from '../components/AccentText'
import TrackModal from '../components/TrackModal'
import { TRACKS } from '../data/tracks'

/*
 * Chapter 05 — Trilhas de Formação. Deliberately NOT a card grid: a
 * large typographic numbered index (docs/STORYBOARD.md), with the
 * per-track accent color as a small marker. The PO round added
 * interaction ON TOP of the unchanged list (see DECISION_LOG.md):
 * each row opens a per-track modal, and a cursor-following glow in
 * the track's color invites the click.
 */
export default function Tracks() {
  const [openTrack, setOpenTrack] = useState(null)

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

      <ol data-reveal-group className="mt-20">
        {TRACKS.map((track) => (
          <li
            key={track.number}
            data-track-line
            className="group border-night-600 relative border-t last:border-b"
          >
            <button
              type="button"
              onClick={() => setOpenTrack(track)}
              onMouseMove={trackGlow}
              style={{ '--track-glow': track.glow }}
              className="track-row relative flex w-full cursor-pointer flex-col gap-2 py-8 text-left md:flex-row md:items-baseline md:gap-10 md:py-10"
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
            </button>
          </li>
        ))}
      </ol>

      {openTrack && (
        <TrackModal track={openTrack} onClose={() => setOpenTrack(null)} />
      )}
    </Chapter>
  )
}
