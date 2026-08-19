import { COMPANIES } from '../data/testimonials'

/*
 * Chapter 08's hiring band — the wordmarks of companies that hired
 * alumni. Motion lives in animations/marquee.timeline.js; this file is
 * only the structure it needs.
 *
 * Text wordmarks, not logo files: the project has no licensed marks for
 * these companies, and inventing logo images for real brands would be
 * the one dishonest thing on an otherwise clearly-labelled conceptual
 * page (DESIGN_SYSTEM.md — no fake logo files).
 *
 * Two rows on two planes, not one effect doubled. The far row is
 * smaller, dimmer and unfilled — atmospheric perspective, the cheapest
 * honest depth cue there is — so the band reads as a volume the
 * wordmarks travel through rather than as two stripes.
 *
 * Its list is reversed, not rotated: a rotation keeps every wordmark's
 * neighbours, so two counter-scrolling rows would keep re-forming the
 * same adjacent pairs as they slid past each other. Reversed, they
 * never repeat a pairing.
 */
const ROWS = [
  {
    companies: COMPANIES,
    chip: 'border-hairline bg-glass px-7 py-3.5 text-lg text-gray-400 md:text-xl',
  },
  {
    companies: [...COMPANIES].reverse(),
    chip: 'border-hairline px-5 py-2.5 text-sm text-gray-600 md:text-base',
    layer: 'opacity-70',
  },
]

/*
 * Each row holds the list twice so the -50% wrap is seamless. Only the
 * very first track is real content — every other copy is scenery and is
 * hidden from assistive tech, so the companies are announced once.
 */
function Track({ companies, chip, duplicate }) {
  return (
    <ul
      className="flex shrink-0"
      {...(duplicate && { 'data-marquee-dup': '', 'aria-hidden': 'true' })}
    >
      {companies.map((company) => (
        <li key={company} className="px-1.5">
          <span
            className={`ease-luxe font-display hover:border-hairline-lit hover:bg-glass-lit block rounded-full border whitespace-nowrap backdrop-blur-sm transition-colors duration-500 hover:text-white ${chip}`}
          >
            {company}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function CompaniesBand() {
  return (
    /* -mx pulls the band out to the section's own padding edge — with
       the mask fade in index.css it reads as passing through the
       chapter rather than sitting in a box. Not a 100vw breakout: this
       chapter has no overflow-hidden to clip the scrollbar gutter. */
    <div
      data-marquee-band
      className="relative -mx-6 mt-10 flex flex-col gap-4 py-3 md:-mx-12"
    >
      {ROWS.map(({ companies, chip, layer }, row) => (
        <div key={row} data-marquee-skew className={layer}>
          <div
            data-marquee-row={row === 1 ? 'reverse' : ''}
            className="flex w-max"
          >
            <Track companies={companies} chip={chip} duplicate={row === 1} />
            <Track companies={companies} chip={chip} duplicate />
          </div>
        </div>
      ))}
    </div>
  )
}
