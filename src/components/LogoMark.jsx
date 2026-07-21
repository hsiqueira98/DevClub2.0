/*
 * Recreation of the DevClub mark: a geometric pixel-block "D" built
 * from a grid of squares (docs/BRAND.md — Logo & Mark). Kept as pure
 * SVG so it stays crisp at favicon scale.
 */
const CELL = 6
const GAP = 2

// 4×5 grid, 1 = filled square, reading as a blocky "D".
const GRID = [
  [1, 1, 1, 0],
  [1, 0, 0, 1],
  [1, 0, 0, 1],
  [1, 0, 0, 1],
  [1, 1, 1, 0],
]

export default function LogoMark({ size = 32, className = '' }) {
  const width = GRID[0].length * (CELL + GAP) - GAP
  const height = GRID.length * (CELL + GAP) - GAP

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={size}
      height={size * (height / width)}
      className={className}
      role="img"
      aria-label="DevClub"
    >
      {GRID.flatMap((row, y) =>
        row.map((filled, x) =>
          filled ? (
            <rect
              key={`${x}-${y}`}
              x={x * (CELL + GAP)}
              y={y * (CELL + GAP)}
              width={CELL}
              height={CELL}
              fill="currentColor"
            />
          ) : null,
        ),
      )}
    </svg>
  )
}
