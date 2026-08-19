import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import AccentText from '../components/AccentText'
import StarBadge from '../components/StarBadge'
import {
  TESTIMONIALS,
  SALARIES,
  SALARY_SOURCE,
  COMPANIES,
} from '../data/testimonials'
import { STATS } from '../data/stats'
import { createResultsAnimations } from '../animations/results.timeline'

const PROOF_STATS = [
  { value: STATS.students, label: 'alunos formados' },
  { value: STATS.hiringCompanies, label: 'empresas contratando' },
  { value: STATS.projectsBuilt, label: 'projetos por formação' },
  { value: STATS.rating, label: 'avaliação dos alunos' },
]

export default function RealResults() {
  const sectionRef = useRef(null)

  useGSAP(() => createResultsAnimations(sectionRef.current), {
    scope: sectionRef,
  })

  return (
    <Chapter
      ref={sectionRef}
      id="resultados"
      bg="bg-night-950"
      innerClassName="py-20 md:py-32"
    >
      <Kicker className="mb-5" data-reveal>
        resultados
      </Kicker>

      <h2
        data-reveal
        className="font-display max-w-3xl text-3xl leading-tight text-white sm:text-4xl md:text-5xl"
      >
        Histórias <AccentText color="green">reais</AccentText>. Salários reais.
      </h2>

      <p
        data-reveal
        className="mt-5 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg"
      >
        Motorista de aplicativo, atendente, analista financeiro — cada aluno
        chegou de um lugar diferente. Quando a transição dá certo, o resultado
        aparece no contracheque no fim do mês.
      </p>

      <dl
        data-reveal-group
        className="border-night-700 bg-night-900/50 mt-12 grid grid-cols-2 gap-x-6 gap-y-7 rounded-2xl border p-6 sm:grid-cols-4 md:mt-14 md:p-8"
      >
        {PROOF_STATS.map((stat) => (
          // dt before dd (a dd may not precede its own term);
          // flex-col-reverse keeps the number reading first.
          <div key={stat.label} className="flex flex-col-reverse">
            <dt className="mt-1.5 text-xs leading-snug text-gray-500 md:text-sm">
              {stat.label}
            </dt>
            <dd className="font-display text-3xl text-white md:text-4xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* animations/particles.js draws into this canvas, and
          results.timeline.js has always queried [data-particle-canvas]
          for it — but nothing in the markup carried the attribute, so
          the whole ambient field was dead code that never ran. It sits
          behind the chart and the payslip, which is what the timeline's
          own comment describes. */}
      <div className="relative mt-14 lg:mt-16">
        <canvas
          data-particle-canvas
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full"
        />

        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div
            data-salary-chart
            className="bg-night-900/40 rounded-2xl p-5 md:p-7"
          >
            <p className="font-display mb-7 text-base font-semibold text-white">
              O mercado hoje
            </p>
            <dl className="flex flex-col gap-6">
              {SALARIES.map((row) => (
                <div key={row.level} data-salary-row>
                  <dt className="flex items-baseline justify-between gap-4 text-base text-gray-400">
                    {row.level}
                    <span
                      data-countup={row.amount}
                      data-countup-format="brl"
                      className="font-display text-xl whitespace-nowrap text-white md:text-2xl"
                    >
                      R$ {row.amount.toLocaleString('pt-BR')}
                    </span>
                  </dt>
                  <dd className="bg-night-750 mt-3 h-2.5 overflow-hidden rounded-full">
                    <div
                      data-salary-bar
                      className={`h-full rounded-full ${row.barClass}`}
                      style={{ width: `${row.widthPct}%` }}
                    />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs leading-relaxed text-gray-600">
              {SALARY_SOURCE}
            </p>
          </div>

          <div data-payslip>
            <p className="font-display mb-5 text-base font-semibold text-white">
              Quanto custa não começar hoje?
            </p>

            <div className="border-night-700 bg-night-900 relative rounded-2xl border p-6 shadow-2xl shadow-black/20 md:p-8">
              <span
                data-payslip-badge
                className="text-night-950 absolute -top-3 right-5 rounded-full bg-green-500 px-3 py-1 text-xs font-bold shadow-lg shadow-green-500/20"
              >
                +R$ 21.600/ano
              </span>

              <div className="border-night-800 mb-5 flex items-center justify-between border-b pb-4">
                <span className="font-display font-semibold text-white">
                  Contracheque
                </span>
                <span className="text-xs tracking-widest text-gray-600 uppercase">
                  mensal
                </span>
              </div>

              <dl className="flex flex-col">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-gray-400">Salário base</dt>
                  <dd className="font-display whitespace-nowrap text-gray-300">
                    R$ 2.000
                  </dd>
                </div>

                <div
                  data-payslip-diff
                  className="mt-4 flex items-baseline justify-between gap-4 overflow-hidden"
                >
                  <dt className="text-green-400">+ Diferença DevClub</dt>
                  <dd className="font-display whitespace-nowrap text-green-400">
                    + R$ 1.800
                  </dd>
                </div>

                <div className="border-night-800 mt-5 flex items-baseline justify-between border-t pt-5">
                  <dt className="font-display text-lg text-white">Total</dt>
                  <dd
                    data-payslip-total
                    data-countup-format="brl"
                    className="font-display text-2xl font-bold text-white md:text-3xl"
                  >
                    R$ 3.800
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <ul
        data-results-proof
        data-reveal-group
        className="mt-16 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-3"
      >
        {TESTIMONIALS.map((t) => (
          <li
            key={t.name}
            className="border-night-700 bg-night-900/45 flex flex-col rounded-2xl border p-6"
          >
            <blockquote className="text-base leading-relaxed text-gray-300 md:text-lg">
              “{t.quote}”
            </blockquote>
            <figure className="mt-6 flex items-center gap-3">
              <img
                src={t.photo}
                alt=""
                loading="lazy"
                className="size-11 rounded-full ring-2 ring-green-500"
              />
              <figcaption className="min-w-0">
                <p className="truncate font-semibold text-white">{t.name}</p>
                <p className="truncate text-sm text-gray-500">{t.role}</p>
              </figcaption>
              <StarBadge rating={STATS.rating} className="ml-auto shrink-0" />
            </figure>
          </li>
        ))}
      </ul>

      <div
        data-reveal
        className="border-night-800 mt-16 border-t pt-8 md:mt-20"
      >
        <p className="text-sm text-gray-600">
          Alunos contratados por {STATS.hiringCompanies} empresas, incluindo
        </p>
        <div className="mt-6 overflow-hidden">
          <ul data-marquee-inner className="flex w-max">
            {[...COMPANIES, ...COMPANIES].map((company, i) => (
              <li
                key={`${company}-${i}`}
                aria-hidden={i >= COMPANIES.length || undefined}
                className="font-display pr-10 text-xl whitespace-nowrap text-gray-600 md:pr-14 md:text-2xl"
              >
                {company}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Chapter>
  )
}
