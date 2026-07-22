import { cn } from '../lib/cn'

/*
 * Chapter container (docs/DESIGN_SYSTEM.md — Amphora pattern): each
 * chapter is a full section whose background itself shifts, with large
 * rounded top corners rising over the previous section. Spacing over
 * separators — no borders between chapters.
 */
export default function Chapter({
  id,
  bg = 'bg-night-950',
  className = '',
  innerClassName = '',
  backdrop,
  children,
  ...props
}) {
  return (
    <section
      id={id}
      data-chapter
      className={cn(
        'relative -mt-10 rounded-t-[2.5rem] px-6 md:px-12',
        bg,
        className,
      )}
      {...props}
    >
      {/* Full-bleed layer (e.g. a section-height photo) — a direct
          child of the section, so it escapes the max-width container.
          Callers that use it pass overflow-hidden via className. */}
      {backdrop}
      <div
        className={cn(
          'relative mx-auto max-w-[1280px] py-28 md:py-40',
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  )
}
