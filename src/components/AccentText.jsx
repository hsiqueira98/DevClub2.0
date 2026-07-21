import { cn } from '../lib/cn'

/*
 * Headline signature (docs/DESIGN_SYSTEM.md — Amphora pattern): one
 * accent word per headline, italic, in a brand-color gradient.
 */
const GRADIENTS = {
  green: 'from-green-300 to-green-600',
  purple: 'from-purple-300 to-purple-600',
}

export default function AccentText({ color = 'green', className = '', children }) {
  return (
    <em
      className={cn(
        'bg-gradient-to-r bg-clip-text italic text-transparent',
        GRADIENTS[color],
        className,
      )}
    >
      {children}
    </em>
  )
}
