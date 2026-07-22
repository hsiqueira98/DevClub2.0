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
 * smaller elements, contrast).
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
    <Chapter ref={sectionRef} id="desafio" bg="bg-night-950">
      <Kicker className="mb-6" data-reveal>
        o problema
      </Kicker>

      <h2
        data-reveal
        className="font-display max-w-3xl text-4xl leading-tight text-white md:text-6xl"
      >
        Aprender sozinho é <AccentText color="purple">difícil</AccentText>.
      </h2>

      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
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
        </div>

        {/* Layered photo — hero backdrop technique in section form:
            photo, edge gradients into the section bg, 50% black mask
            (depth, not decoration) */}
        <div
          data-reveal
          aria-hidden="true"
          className="relative mt-20 hidden overflow-hidden rounded-3xl lg:col-span-2 lg:block"
        >
          <img
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=70"
            alt=""
            className="size-full object-cover"
          />
          <div className="from-night-950 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
          <div className="from-night-950 absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
          <div className="bg-night-950/50 absolute inset-0" />
        </div>
      </div>
    </Chapter>
  )
}
