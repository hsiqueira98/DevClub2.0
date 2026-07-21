import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import AccentText from '../components/AccentText'
import { GALLERY } from '../data/journey'

/*
 * Chapter 09 — Beyond Code. Belonging: a masonry gallery of human
 * moments (CSS columns — no JS needed), duotone-graded placeholders
 * standing in for real community photos (docs/BRAND.md Imagery Style).
 */
export default function BeyondCode() {
  return (
    <Chapter id="comunidade" bg="bg-night-900">
      <Kicker className="mb-6">comunidade</Kicker>

      <h2 className="font-display max-w-3xl text-4xl leading-tight text-white md:text-6xl">
        Mais que código: <AccentText color="purple">pertencimento</AccentText>.
      </h2>

      <p className="mt-8 max-w-xl text-xl leading-relaxed text-gray-400">
        Amizades, networking, eventos e gente que entende exatamente o momento
        que você está vivendo.
      </p>

      <ul className="mt-20 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>li]:mb-6">
        {GALLERY.map((photo) => (
          <li key={photo.src} data-gallery-item className="break-inside-avoid">
            <figure className="group relative overflow-hidden rounded-2xl">
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className={`w-full object-cover grayscale-[0.4] transition-transform duration-slow group-hover:scale-105 ${
                  photo.tall ? 'aspect-[4/5]' : 'aspect-[4/3]'
                }`}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-transparent to-transparent"
              />
              <figcaption className="absolute bottom-0 p-5 text-sm font-medium text-gray-300">
                {photo.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Chapter>
  )
}
