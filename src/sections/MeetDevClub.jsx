import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import AccentText from '../components/AccentText'
import AvatarCluster from '../components/AvatarCluster'
import StarBadge from '../components/StarBadge'
import { STATS } from '../data/stats'

const PILLARS = [
  'Comunidade',
  'Método',
  'Mentoria',
  'Projetos',
  'Suporte',
]

export default function MeetDevClub() {
  return (
    <Chapter
      id="devclub"
      bg="bg-night-850"
      className="overflow-hidden"
      innerClassName="py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 size-[28rem] translate-x-1/3 -translate-y-1/3 rounded-full bg-purple-700/20 blur-[120px]"
      />

      <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Kicker className="mb-5" data-reveal>
            apresentação
          </Kicker>

          <h2
            data-reveal
            className="font-display max-w-2xl text-3xl leading-tight text-white sm:text-4xl md:text-5xl"
          >
            O DevClub não é um curso. É um{' '}
            <AccentText color="green">caminho</AccentText>.
          </h2>

          <p
            data-reveal
            className="mt-6 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg"
          >
            Uma metodologia que já formou {STATS.studentsLong}, com roadmap
            claro, mentoria de quem está no mercado e uma comunidade que não
            deixa ninguém travado para trás.
          </p>

          <div data-reveal className="mt-8 flex flex-wrap items-center gap-4">
            <AvatarCluster label={`${STATS.students} alunos formados`} />
            <StarBadge rating={STATS.rating} />
          </div>

          <ul data-reveal className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
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

        <ul
          data-presentation-pillars
          data-reveal-group
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-2"
        >
          {PILLARS.map((pillar, index) => (
            <li
              key={pillar}
              className="border-night-500 bg-night-900/70 group relative overflow-hidden rounded-2xl border p-5 transition-colors duration-300 hover:border-green-500/60"
            >
              <span className="font-display text-xs tracking-[0.18em] text-green-500">
                0{index + 1}
              </span>
              <p className="font-display mt-7 text-lg text-white lg:mt-10 lg:[writing-mode:vertical-rl] lg:rotate-180">
                {pillar}
              </p>
              <span
                aria-hidden="true"
                className="absolute right-0 bottom-0 size-16 translate-x-1/2 translate-y-1/2 rounded-full bg-green-500/10 blur-xl transition-colors duration-300 group-hover:bg-green-500/20"
              />
            </li>
          ))}
        </ul>
      </div>
    </Chapter>
  )
}
