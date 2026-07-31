import { Users, Route, UserCheck, FolderKanban, LifeBuoy } from 'lucide-react'
import logoDevClub from '../assets/img/LogoDevClub.png'

const ICONS = { Users, Route, UserCheck, FolderKanban, LifeBuoy }

/*
 * Chapter 04's pillar rolodex (Fase B — see pillars.timeline.js): a
 * pinned, full-screen card per method pillar, flipping on scroll via
 * rotationX (no GSAP Observer — see docs/DECISION_LOG.md for why). No
 * outer/inner wipe layers here — the flip's own backface-visibility
 * handles hiding an inactive card, so the structure is simpler than
 * the wipe mechanism this replaced. A progress bar and the DevClub
 * mark both react per transition; the last card hands off into
 * Chapter 05 via a blackout.
 *
 * Each card's background is its own photo (data/pillars.js), masked
 * by a dark gradient for text legibility — same photos already
 * verified working, carried over unchanged.
 *
 * Both this stage and the flat fallback below stay in the DOM always —
 * CSS alone decides which renders (`lg:motion-safe:` — both a `lg`
 * viewport AND no reduced-motion preference), so pillars.timeline.js
 * can query [data-pillars-stage] unconditionally and decide there
 * whether to attach anything to it.
 */
export default function PillarRolodex({ pillars }) {
  return (
    <>
      <div
        data-pillars-stage
        className="relative hidden min-h-screen w-screen overflow-hidden mx-[calc(50%-50vw)] [perspective:3000px] lg:motion-safe:block"
      >
        {/* Deliberately not a flex container: centering the list via
            flex made its height ambiguous (percentage heights inside
            flex don't resolve the same deterministic way absolute
            positioning does), which is why content could leak past
            the stage's own bounds. data-pillars-list is `absolute
            inset-0` instead — same fixed-to-parent sizing every card
            inside it already uses, one deterministic chain top to
            bottom, nothing left for flex to get ambiguous about. The
            progress bar and mark below are already absolute with
            their own coordinates, so removing flex here doesn't move
            them. */}
        <div
          data-pillars-progress
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-30 h-1 bg-white/10"
        >
          <div
            data-pillars-progress-fill
            className="h-full w-0 bg-green-500"
          />
        </div>

        <img
          data-pillars-mark
          src={logoDevClub}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-24 left-1/2 z-30 size-10 -translate-x-1/2 opacity-60"
        />

        <ul
          data-pillars-list
          className="absolute inset-0 [transform-style:preserve-3d]"
        >
          {pillars.map(({ name, qualifier, description, icon, photo }) => {
            const Icon = ICONS[icon]
            return (
              <li
                key={name}
                data-pillar-card
                className="absolute inset-0 [backface-visibility:hidden]"
              >
                <div
                  data-slide-bg
                  aria-hidden="true"
                  className="absolute inset-0"
                >
                  <img
                    src={photo}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 size-full scale-105 object-cover blur-sm"
                  />
                  <div className="from-night-950/75 via-night-950/85 to-night-950/95 absolute inset-0 bg-gradient-to-b" />
                </div>
                <div className="relative flex size-full flex-col items-center justify-center px-6 text-center">
                  <Icon
                    size={56}
                    className="text-green-500"
                    aria-hidden="true"
                  />
                  <h3
                    data-slide-heading
                    className="font-display mt-8 text-6xl text-white md:text-8xl"
                  >
                    {name}
                  </h3>
                  <p
                    data-slide-qualifier
                    className="mt-4 text-lg text-green-500"
                  >
                    {qualifier}
                  </p>
                  <p
                    data-slide-description
                    className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400"
                  >
                    {description}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>

        <div
          data-pillars-blackout
          aria-hidden="true"
          className="bg-night-950 pointer-events-none absolute inset-0 z-20 opacity-0"
        />
      </div>

      {/* Reduced motion / below lg: the same flat pill list as
          always, no pin, no 3D. */}
      <ul className="mt-16 flex flex-wrap gap-3 lg:motion-safe:hidden">
        {pillars.map(({ name }) => (
          <li
            key={name}
            className="border-night-500 bg-night-750 rounded-full border px-5 py-2.5 text-sm font-medium text-gray-300"
          >
            {name}
          </li>
        ))}
      </ul>
    </>
  )
}
