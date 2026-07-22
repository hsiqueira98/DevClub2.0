import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ArrowRight, X } from 'lucide-react'
import { gsap } from '../lib/gsap'
import Button from './Button'
import { DURATION, EASE } from '../animations/motion.tokens'

/*
 * Per-track modal (PO round — see DECISION_LOG.md). Native <dialog> +
 * showModal(): focus trap, Esc-to-close and ::backdrop for free —
 * the GSAP entrance only decorates what the platform already does.
 */
export default function TrackModal({ track, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    dialogRef.current.showModal()
  }, [])

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from(dialogRef.current, {
        autoAlpha: 0,
        y: 28,
        scale: 0.96,
        duration: DURATION.base,
        ease: EASE.out,
      })
    },
    { scope: dialogRef },
  )

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      aria-labelledby="track-modal-title"
      className="border-night-600 bg-night-850 m-auto w-[min(34rem,calc(100vw-2rem))] rounded-3xl border p-10 text-left"
    >
      <div className="flex items-start justify-between gap-6">
        <p
          className={`font-display text-sm font-semibold tracking-widest ${track.textClass}`}
        >
          trilha {track.number}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="border-night-600 duration-fast flex size-9 items-center justify-center rounded-full border text-gray-500 transition-colors hover:border-gray-500 hover:text-white"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      <h3
        id="track-modal-title"
        className="font-display mt-4 flex items-center gap-3 text-3xl text-white"
      >
        <span
          aria-hidden="true"
          className={`size-3 shrink-0 rounded-full ${track.colorClass}`}
        />
        {track.name}
      </h3>

      <p className="mt-5 leading-relaxed text-gray-400">{track.description}</p>

      <Button href="#futuro" onClick={onClose} className="mt-8">
        Quero essa trilha
        <ArrowRight size={18} aria-hidden="true" />
      </Button>
    </dialog>
  )
}
