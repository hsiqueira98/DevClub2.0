import { cn } from '../lib/cn'

/*
 * Headline signature (docs/DESIGN_SYSTEM.md — Amphora pattern): one
 * accent word per headline, italic, in a brand-color gradient.
 * The trailing padding matters: background-clip:text only paints
 * inside the element's box, and the last italic glyph slants past it —
 * without the padding its tip renders cut off.
 */
const GRADIENTS = {
  green: 'from-green-300 to-green-600',
  purple: 'from-purple-300 to-purple-600',
}

export default function AccentText({
  color = 'green',
  className = '',
  children,
  ...props
}) {
  return (
    <em
      className={cn(
        'bg-gradient-to-r bg-clip-text pr-[0.12em] text-transparent italic',
        GRADIENTS[color],
        className,
      )}
      {...props}
    >
      {children}
    </em>
  )
}
