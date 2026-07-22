import { cn } from '../lib/cn'

/*
 * Chapter 08 — loss-aversion comparison (docs/STORYBOARD.md). Two
 * parallel scroll-lit paths — "Esperar 1 ano" (gray, inaction) vs
 * "Começar hoje" (green, action) — that both land on the SAME figure
 * (R$ 21.600), once lost and once gained. Same scaleY line-draw as
 * Chapter 07, duplicated into two columns driven by ONE synced timeline
 * so the two final numbers light at the exact same scroll position
 * (PO round — see DECISION_LOG.md). No red: gray→green already carries
 * loss→gain, matching the salary bars right beside this block.
 *
 * Presentational only; motion lives in animations/results.timeline.js
 * via the data-attributes. Both columns have the same number of
 * fixed-height rows (the right one leads with a blank row = the "↓"),
 * so the drawn line passes through every dot's centre and, crucially,
 * the two final rows sit at the same index and light together.
 */
const TONE = {
  gray: {
    header: 'text-gray-500',
    line: 'bg-gray-500/40',
    dot: 'bg-gray-500',
    value: 'text-gray-300',
    highlightValue: 'text-gray-100',
  },
  green: {
    header: 'text-green-400',
    line: 'bg-green-500/60',
    dot: 'bg-green-500',
    value: 'text-white',
    highlightValue: 'text-green-400',
  },
}

export default function CareerComparison({ title, note, paths }) {
  return (
    <div data-comparison>
      <h3 className="font-display mb-8 text-xl font-semibold text-white md:text-2xl">
        {title}
      </h3>

      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {paths.map((path) => {
          const t = TONE[path.tone]
          return (
            <div key={path.key} data-path>
              <p
                className={cn(
                  'font-display mb-6 text-sm font-semibold',
                  t.header,
                )}
              >
                {path.title}
              </p>

              <ol className="relative">
                {/* Connecting line — scaleY 0→1 on scroll, top origin.
                    Spans the first row's centre to the last (40px =
                    half an 80px row). */}
                <div
                  aria-hidden="true"
                  data-path-line
                  className={cn(
                    'absolute top-[40px] bottom-[40px] left-[5px] w-0.5',
                    t.line,
                  )}
                />

                {path.rows.map((row, i) => (
                  <li
                    key={row ? row.label : `lead-${i}`}
                    data-path-row
                    className="relative flex h-20 items-center gap-3"
                  >
                    {row && (
                      <>
                        <span
                          aria-hidden="true"
                          data-path-dot
                          className={cn(
                            'relative z-10 size-3 shrink-0 rounded-full',
                            t.dot,
                          )}
                        />
                        <span data-path-node className="flex min-w-0 flex-col">
                          {row.value && (
                            <span
                              className={cn(
                                'font-display text-sm font-semibold whitespace-nowrap md:text-lg',
                                row.highlight ? t.highlightValue : t.value,
                              )}
                            >
                              {row.value}
                            </span>
                          )}
                          <span
                            className={
                              row.value
                                ? 'text-xs text-gray-500'
                                : 'text-sm text-gray-400'
                            }
                          >
                            {row.label}
                          </span>
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )
        })}
      </div>

      {note && <p className="mt-6 text-xs text-gray-600">{note}</p>}
    </div>
  )
}
