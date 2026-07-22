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
  SALARY_GROWTH,
  GROWTH_SOURCE,
  COMPANIES,
} from '../data/testimonials'
import { STATS } from '../data/stats'
import SalaryGrowthChart from '../components/SalaryGrowthChart'
import { createResultsAnimations } from '../animations/results.timeline'

/*
 * Chapter 08 — Real Results. Signature moment: the salary bar chart
 * that already exists on the current DevClub site (gray→purple→green,
 * with source citation — docs/BRAND.md "Cited data"). Bars grow and
 * values count up on scroll entry; companies loop as a continuous
 * marquee (duplicated list for a seamless -50% translate).
 */
export default function RealResults() {
  const sectionRef = useRef(null)

  useGSAP(() => createResultsAnimations(sectionRef.current), {
    scope: sectionRef,
  })

  return (
    <Chapter ref={sectionRef} id="resultados" bg="bg-night-950">
      <Kicker className="mb-6" data-reveal>
        salário
      </Kicker>

      <h2
        data-reveal
        className="font-display max-w-3xl text-4xl leading-tight text-white md:text-6xl"
      >
        Histórias <AccentText color="green">reais</AccentText>. Salários reais.
      </h2>

      {/* Bridge: connect the transformation stories to the salary data
          — answer "why does this matter to me" before the numbers */}
      <p
        data-reveal
        className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-400"
      >
        Motorista de aplicativo, atendente, analista financeiro — cada aluno
        chegou de um lugar diferente. O que muda quando a transição dá certo é a
        mesma coisa para todos: o contracheque no fim do mês.
      </p>

      {/* Two complementary charts: the market as a snapshot (bars) and
          the individual trajectory over time (line) — not the same
          data twice (PO round — see DECISION_LOG.md) */}
      <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div data-salary-chart>
          <p className="font-display mb-8 text-lg font-semibold text-white">
            O mercado hoje
          </p>
          <dl className="flex flex-col gap-8">
            {SALARIES.map((row) => (
              <div key={row.level} data-salary-row>
                <dt className="flex items-baseline justify-between text-lg text-gray-400">
                  {row.level}
                  <span
                    data-countup={row.amount}
                    data-countup-format="brl"
                    className="font-display text-2xl text-white md:text-3xl"
                  >
                    R$ {row.amount.toLocaleString('pt-BR')}
                  </span>
                </dt>
                <dd className="bg-night-750 mt-3 h-3 overflow-hidden rounded-full">
                  <div
                    data-salary-bar
                    className={`h-full rounded-full ${row.barClass}`}
                    style={{ width: `${row.widthPct}%` }}
                  />
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs text-gray-600">{SALARY_SOURCE}</p>
        </div>

        <SalaryGrowthChart
          data={SALARY_GROWTH}
          title="Sua evolução em 3 anos"
          source={GROWTH_SOURCE}
        />
      </div>

      {/* Numbers strip — every value from the single source in stats.js */}
      <dl
        data-reveal-group
        className="border-night-700 mt-24 grid grid-cols-2 gap-10 border-t pt-12 md:grid-cols-4"
      >
        {[
          { value: STATS.students, label: 'alunos formados' },
          { value: STATS.hiringCompanies, label: 'empresas contratando' },
          { value: STATS.projectsBuilt, label: 'projetos por formação' },
          { value: STATS.rating, label: 'avaliação dos alunos' },
        ].map((stat) => (
          <div key={stat.label}>
            <dd className="font-display text-4xl text-white md:text-5xl">
              {stat.value}
            </dd>
            <dt className="mt-2 text-sm text-gray-500">{stat.label}</dt>
          </div>
        ))}
      </dl>

      {/* Minimal testimonials */}
      <ul data-reveal-group className="mt-28 grid gap-10 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <li key={t.name} className="flex flex-col">
            <blockquote className="text-xl leading-relaxed text-gray-300">
              “{t.quote}”
            </blockquote>
            <figure className="mt-6 flex items-center gap-4">
              <img
                src={t.photo}
                alt=""
                loading="lazy"
                className="size-12 rounded-full ring-2 ring-green-500"
              />
              <figcaption>
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </figcaption>
              <StarBadge rating={STATS.rating} className="ml-auto" />
            </figure>
          </li>
        ))}
      </ul>

      {/* Hiring companies — text wordmarks in a continuous marquee */}
      <div data-reveal className="mt-28">
        <p className="text-sm text-gray-600">
          Alunos contratados por {STATS.hiringCompanies} empresas, incluindo
        </p>
        <div className="mt-8 overflow-hidden">
          <ul data-marquee-inner className="flex w-max">
            {[...COMPANIES, ...COMPANIES].map((company, i) => (
              <li
                key={`${company}-${i}`}
                aria-hidden={i >= COMPANIES.length || undefined}
                className="font-display pr-14 text-2xl whitespace-nowrap text-gray-600"
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
