import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import AccentText from '../components/AccentText'
import StarBadge from '../components/StarBadge'
import { TESTIMONIALS, SALARIES, SALARY_SOURCE, COMPANIES } from '../data/testimonials'
import { STATS } from '../data/stats'

/*
 * Chapter 08 — Real Results. Signature moment: the salary bar chart
 * that already exists on the current DevClub site (gray→purple→green,
 * with source citation — docs/BRAND.md "Cited data"). Bars grow on
 * scroll in Phase 3. Testimonials kept minimal; companies as a text
 * wordmark strip (marquee in Phase 3).
 */
export default function RealResults() {
  return (
    <Chapter id="resultados" bg="bg-night-950">
      <Kicker className="mb-6">salário</Kicker>

      <h2 className="font-display max-w-3xl text-4xl leading-tight text-white md:text-6xl">
        Histórias <AccentText color="green">reais</AccentText>. Salários
        reais.
      </h2>

      {/* Salary comparison chart */}
      <div className="mt-20 max-w-3xl">
        <dl className="flex flex-col gap-8">
          {SALARIES.map((row) => (
            <div key={row.level} data-salary-row>
              <dt className="flex items-baseline justify-between text-lg text-gray-400">
                {row.level}
                <span className="font-display text-2xl text-white md:text-3xl">
                  {row.value}
                </span>
              </dt>
              <dd className="mt-3 h-3 overflow-hidden rounded-full bg-night-750">
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

      {/* Minimal testimonials */}
      <ul className="mt-28 grid gap-10 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <li key={t.name} data-testimonial className="flex flex-col">
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

      {/* Hiring companies — text wordmarks, no fake logo files */}
      <div className="mt-28">
        <p className="text-sm text-gray-600">
          Alunos contratados por {STATS.hiringCompanies} empresas, incluindo
        </p>
        <ul data-marquee className="mt-8 flex flex-wrap gap-x-14 gap-y-6">
          {COMPANIES.map((company) => (
            <li
              key={company}
              className="font-display text-2xl text-gray-600 transition-colors duration-fast hover:text-gray-400"
            >
              {company}
            </li>
          ))}
        </ul>
      </div>
    </Chapter>
  )
}
