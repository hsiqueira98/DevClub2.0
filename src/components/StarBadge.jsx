import { Star } from 'lucide-react'

/*
 * Green star-rating badge — signature UI device from the current site
 * (docs/BRAND.md): filled green circle, white star, numeric rating.
 */
export default function StarBadge({ rating, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1 text-sm font-bold text-white ${className}`}
    >
      <Star size={14} fill="currentColor" aria-hidden="true" />
      {rating}
    </span>
  )
}
