/*
 * Chapter 08 — the career "journey" shown beside the salary bars
 * (docs/STORYBOARD.md). A terse vertical timeline: a thin connecting
 * line with one dot + short label per milestone — deliberately more
 * "commit log" than the descriptive step-list in Chapter 07, so the two
 * don't read as the same device twice (PO round — see DECISION_LOG.md).
 *
 * Presentational only. The line draws itself and each milestone lights
 * up on scroll — the same scaleY line-draw technique as Chapter 07's
 * method timeline — driven by animations/results.timeline.js via the
 * data-attributes below. Rows are a fixed height so the absolutely
 * positioned line passes exactly through every dot's centre.
 */
export default function CareerJourney({ steps, title = 'Sua jornada' }) {
  return (
    <div data-journey>
      <p className="font-display mb-8 text-lg font-semibold text-white">
        {title}
      </p>

      <ol className="relative">
        {/* Connecting line — scaleY 0→1 on scroll, top origin. Spans the
            first dot's centre to the last (20px = half a 40px row). */}
        <div
          aria-hidden="true"
          data-journey-line
          className="absolute top-[20px] bottom-[20px] left-[5px] w-0.5 bg-green-500/60"
        />

        {steps.map((step) => (
          <li
            key={step.label}
            data-journey-step
            className="relative flex h-10 items-center gap-4"
          >
            <span
              aria-hidden="true"
              data-journey-dot
              className="relative z-10 size-3 shrink-0 rounded-full bg-green-500"
            />
            <span
              className={
                step.highlight
                  ? 'font-display text-base font-semibold text-green-400 md:text-lg'
                  : 'text-sm text-gray-300 md:text-base'
              }
            >
              {step.label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
