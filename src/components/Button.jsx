import { cn } from '../lib/cn'

/*
 * CTA button. "Buttons invite, they never pressure" — hover states are
 * responsive, not exaggerated (docs/DESIGN_SYSTEM.md).
 * `inverted` exists for Chapter 10's green full-bleed section.
 */
const VARIANTS = {
  primary:
    'bg-green-500 text-night-950 hover:bg-green-400 focus-visible:outline-white',
  secondary:
    'border border-night-500 text-gray-300 hover:border-gray-500 hover:text-white',
  inverted:
    'bg-night-950 text-white hover:bg-night-800 focus-visible:outline-night-950',
}

export default function Button({
  href,
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      href={href}
      // A bare <button> defaults to type="submit": dropped inside any
      // form (the footer newsletter, say) it would submit it. Callers
      // can still override via ...props.
      {...(href ? null : { type: 'button' })}
      className={cn(
        'duration-fast inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-sans text-base font-semibold transition-colors',
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
