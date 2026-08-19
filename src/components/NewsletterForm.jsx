import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

/*
 * Newsletter capture (PO request — see DECISION_LOG.md). Demo-only:
 * no backend, submit flips to a confirmation state. Proper label for
 * screen readers; the visible affordance is the placeholder.
 */
export default function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false)
  const confirmationRef = useRef(null)

  // Submitting unmounts the form, so the focused submit button vanishes
  // and focus falls back to <body> — a keyboard user loses their place
  // in the footer. Move focus onto the confirmation instead.
  useEffect(() => {
    if (subscribed) confirmationRef.current?.focus()
  }, [subscribed])

  if (subscribed) {
    return (
      <p
        ref={confirmationRef}
        tabIndex={-1}
        role="status"
        className="flex items-center gap-2 text-green-500"
      >
        <Check size={18} aria-hidden="true" />
        Inscrição confirmada — o primeiro guia chega esta semana.
      </p>
    )
  }

  return (
    <form
      className="flex w-full max-w-md gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        setSubscribed(true)
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Seu melhor e-mail
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="seu melhor e-mail"
        className="border-night-600 bg-night-800 duration-fast min-w-0 flex-1 rounded-full border px-5 py-3 text-sm text-white transition-colors outline-none placeholder:text-gray-600 focus:border-green-500"
      />
      <button
        type="submit"
        className="duration-fast text-night-950 flex shrink-0 items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-semibold transition-colors hover:bg-green-400"
      >
        Assinar
        <ArrowRight size={16} aria-hidden="true" />
      </button>
    </form>
  )
}
