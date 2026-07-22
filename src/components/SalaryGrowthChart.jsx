/*
 * Chapter 08 salary-growth line chart (PO round — see DECISION_LOG.md).
 * Pure presentational SVG: points computed from the data, the line and
 * area drawn declaratively. The draw-on-scroll animation is owned by
 * animations/results.timeline.js, which targets the data-attributes
 * below — this component only describes the shape.
 */
const VIEW = { w: 400, h: 260 }
const PAD = { left: 14, right: 22, top: 34, bottom: 44 }

export default function SalaryGrowthChart({ data, title, source }) {
  const amounts = data.map((d) => d.amount)
  const min = Math.min(...amounts)
  const max = Math.max(...amounts)
  const innerW = VIEW.w - PAD.left - PAD.right
  const innerH = VIEW.h - PAD.top - PAD.bottom
  const baseline = PAD.top + innerH

  const points = data.map((d, i) => {
    const x = PAD.left + (innerW * i) / (data.length - 1)
    const t = max === min ? 0 : (d.amount - min) / (max - min)
    const y = PAD.top + innerH * (1 - t)
    return { ...d, x, y }
  })

  const line = points
    .map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ')
  const last = points[points.length - 1]
  const area = `${line} L${last.x.toFixed(1)} ${baseline} L${points[0].x.toFixed(1)} ${baseline} Z`

  return (
    <figure data-growth-chart className="w-full">
      <figcaption className="font-display mb-4 text-lg font-semibold text-white">
        {title}
      </figcaption>

      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        className="w-full"
        role="img"
        aria-label={`${title}: de R$ ${min.toLocaleString('pt-BR')} a R$ ${max.toLocaleString('pt-BR')} em ${data.length - 1} anos.`}
      >
        <defs>
          <linearGradient id="growthArea" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-green-500)"
              stopOpacity="0.28"
            />
            <stop
              offset="100%"
              stopColor="var(--color-green-500)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        <line
          x1={PAD.left}
          y1={baseline}
          x2={VIEW.w - PAD.right}
          y2={baseline}
          stroke="var(--color-night-500)"
          strokeWidth="1"
        />

        <path data-growth-area d={area} fill="url(#growthArea)" opacity="0" />

        <path
          data-growth-path
          d={line}
          fill="none"
          stroke="var(--color-green-500)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((p, i) => {
          const anchor =
            i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'
          return (
            <g key={p.label}>
              <circle
                data-growth-dot
                cx={p.x}
                cy={p.y}
                r="4"
                fill="var(--color-green-500)"
              />
              <text
                x={p.x}
                y={p.y - 12}
                textAnchor={anchor}
                fill="#fff"
                fontSize="12"
                fontWeight="600"
              >
                R$ {p.amount.toLocaleString('pt-BR')}
              </text>
              <text
                x={p.x}
                y={baseline + 22}
                textAnchor={anchor}
                fill="var(--color-gray-600)"
                fontSize="11"
              >
                {p.label}
              </text>
            </g>
          )
        })}
      </svg>

      <p className="mt-4 text-xs text-gray-600">{source}</p>
    </figure>
  )
}
