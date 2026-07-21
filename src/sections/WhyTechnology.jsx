import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import AccentText from '../components/AccentText'
import { Globe, Banknote, Laptop } from 'lucide-react'
import { MARKET_STATS } from '../data/stats'

const FREEDOMS = [
  { icon: Laptop, text: 'Trabalhe de onde quiser' },
  { icon: Banknote, text: 'Ganhe em moeda estrangeira' },
  { icon: Globe, text: 'Carreira sem fronteiras' },
]

/*
 * Chapter 02 — Why Technology? Identification through market proof:
 * large stat cards with count-up targets (Phase 3) and the freedom
 * pillars from DevClub's real voice (docs/BRAND.md).
 */
export default function WhyTechnology() {
  return (
    <Chapter id="mercado" bg="bg-night-900">
      <Kicker className="mb-6" data-reveal>
        mercado
      </Kicker>

      <h2
        data-reveal
        className="font-display max-w-3xl text-4xl leading-tight text-white md:text-6xl"
      >
        Programar não é escrever código. É construir{' '}
        <AccentText color="green">liberdade</AccentText>.
      </h2>

      <dl data-reveal-group className="mt-20 grid gap-6 md:grid-cols-3">
        {MARKET_STATS.map((stat) => (
          <div key={stat.label} className="bg-night-800 rounded-3xl p-10">
            <dd className="font-display text-6xl text-green-500 md:text-7xl">
              <span data-countup={stat.value}>{stat.value}</span>
              <span className="text-4xl md:text-5xl">{stat.suffix}</span>
            </dd>
            <dt className="mt-4 text-lg text-gray-400">{stat.label}</dt>
            <p className="mt-3 text-xs text-gray-600">Fonte: {stat.source}</p>
          </div>
        ))}
      </dl>

      <ul data-reveal-group className="mt-16 flex flex-wrap gap-x-12 gap-y-6">
        {FREEDOMS.map(({ icon: Icon, text }) => (
          <li
            key={text}
            className="flex items-center gap-3 text-lg text-gray-300"
          >
            <Icon size={22} className="text-purple-400" aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
    </Chapter>
  )
}
