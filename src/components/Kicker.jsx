/*
 * Terminal-cursor section label — DevClub's own eyebrow device
 * (docs/BRAND.md — Signature UI Devices): lowercase tracked text
 * ending in a blinking underscore, like a shell prompt.
 */
export default function Kicker({ children, className = '', ...props }) {
  return (
    <p
      className={`font-display text-sm tracking-[0.3em] text-green-500 lowercase ${className}`}
      {...props}
    >
      {children}
      <span aria-hidden="true" className="animate-blink">
        _
      </span>
    </p>
  )
}
