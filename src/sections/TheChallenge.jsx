import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import AccentText from '../components/AccentText'
import { STRUGGLES } from '../data/journey'
import { createChallengeAnimations } from '../animations/chapters.timeline'

/*
 * Chapter 03 — The Challenge. Visual tension on purpose: the struggle
 * fragments sit deliberately misaligned and slightly rotated — the only
 * "broken" layout on the page (docs/STORYBOARD.md: broken layouts,
 * smaller elements, contrast). A full-bleed photo fills the right of
 * the section as atmosphere and fades to nothing across the section's
 * own scroll (PO round — see DECISION_LOG.md), so reading focus stays
 * on the text and the photo is gone before the "virada" arrives.
 */
const FRAGMENT_STYLES = [
  'md:ml-0 md:-rotate-2',
  'md:ml-[30%] md:rotate-1',
  'md:ml-[8%] md:-rotate-1',
  'md:ml-[42%] md:rotate-2',
  'md:ml-[18%] md:-rotate-1',
]

export default function TheChallenge() {
  const sectionRef = useRef(null)

  useGSAP(() => createChallengeAnimations(sectionRef.current), {
    scope: sectionRef,
  })

  return (
    <Chapter
      ref={sectionRef}
      id="desafio"
      bg="bg-night-950"
      className="overflow-hidden"
      backdrop={
        <div
          data-challenge-photo
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block"
        >
          <img
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=70"
            alt=""
            className="size-full object-cover"
          />
          {/* left edge + top/bottom fade into the section background */}
          <div className="from-night-950 absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
          <div className="from-night-950 via-night-950/30 absolute inset-0 bg-gradient-to-t to-transparent" />
          {/* black mask — photo is atmosphere, text is priority */}
          <div className="bg-night-950/50 absolute inset-0" />
        </div>
      }
    >
      <Kicker className="mb-6" data-reveal>
        o problema
      </Kicker>

      <h2
        data-reveal
        className="font-display max-w-3xl text-4xl leading-tight text-white md:text-6xl"
      >
        Aprender sozinho é <AccentText color="purple">difícil</AccentText>.
      </h2>

      <ul className="mt-20 flex max-w-3xl flex-col gap-6">
        {STRUGGLES.map((struggle, i) => (
          <li
            key={struggle}
            data-struggle
            className={`border-night-600 bg-night-850 w-fit rounded-xl border px-6 py-4 text-lg text-gray-500 ${FRAGMENT_STYLES[i]}`}
          >
            {struggle}
          </li>
        ))}
      </ul>

      <p
        data-reveal
        className="mt-20 max-w-2xl text-2xl leading-relaxed text-gray-300 md:text-3xl"
      >
        Muita gente desiste antes mesmo de começar.
        <span className="mt-4 block text-gray-600">
          Não por falta de capacidade — por falta de direção.
        </span>
      </p>
    </Chapter>
  )
}
