import { cn } from '../lib/cn'

/*
 * Terminal-cursor section label — DevClub's own eyebrow device
 * (docs/BRAND.md — Signature UI Devices): lowercase tracked text
 * ending in a blinking underscore, like a shell prompt.
 *
 * `tone` exists because green-500 on a light background is ~1.85:1
 * contrast (docs/DECISION_LOG.md — post-Phase-4 review): light
 * sections must pass tone="dark". A prop, not a className override —
 * Tailwind doesn't guarantee precedence between conflicting classes.
 */
const TONES = {
  green: 'text-green-500',
  dark: 'text-purple-700',
}

export default function Kicker({
  tone = 'green',
  children,
  className = '',
  ...props
}) {
  return (
    <p
      className={cn(
        'font-display text-sm font-semibold tracking-[0.3em] lowercase',
        TONES[tone],
        className,
      )}
      {...props}
    >
      {children}
      <span aria-hidden="true" className="animate-blink">
        _
      </span>
    </p>
  )
}
