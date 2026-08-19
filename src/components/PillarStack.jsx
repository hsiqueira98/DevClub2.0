import { Users, Route, UserCheck, FolderKanban, LifeBuoy } from 'lucide-react'
import logoDevClub from '../assets/img/LogoDevClub.png'
import MagicRings from './MagicRings'

const ICONS = { Users, Route, UserCheck, FolderKanban, LifeBuoy }

/*
 * Chapter 04's pillar stack (Fase B — see pillars.timeline.js), rebuilt
 * for genuine full-screen cards.
 *
 * Two structural fixes drive this shape, both verified against the real
 * tree rather than assumed:
 *
 * 1. Full-bleed breakout is mandatory here, not decorative. This
 *    renders inside Chapter.jsx's `data-chapter-inner`
 *    (`mx-auto max-w-[1280px]`), so screen-width is impossible without
 *    escaping it. `mx-[calc(50%-50vw)]` + `w-screen` is this project's
 *    standing breakout rule (see DECISION_LOG — it replaced a fragile
 *    `left-1/2` + `-translate-x-1/2` pair that composed two different
 *    percentage bases). `w-screen` is 100vw, which counts the
 *    scrollbar, so the box runs ~15px past the visible viewport on the
 *    right — Chapter's own `overflow-hidden` clips that, which is what
 *    keeps a phantom horizontal scrollbar from appearing.
 *
 * 2. No percentage heights anywhere in this chain. The previous version
 *    sized the card frame with `h-[85%]` against a flex parent that was
 *    itself inside the pinned element — a percentage-through-flex-through
 *    -pin chain, the same fragile class this chapter already hit once
 *    and fixed by switching to `inset`. Here the frame's every edge is
 *    an explicit inset against an `h-screen` parent, so every dimension
 *    resolves deterministically under the pin.
 *
 * The frame's margins are deliberately asymmetric. `top-[9.5rem]`
 * (152px) clears the animated mark, which sits at `top-24` (96px) at
 * `size-10` (40px) and so ends at 136px — 152px leaves real breathing
 * room rather than grazing it. `bottom-0` runs the card flush to the
 * screen's bottom edge, which is why only the top corners are rounded
 * (`rounded-t-[3rem]`): rounding the bottom would expose the chapter
 * background in two corners against the viewport edge. Top-only
 * rounding is also the Amphora language the rest of the site already
 * uses for chapter transitions.
 *
 * The overlays are `absolute`, not `fixed`: the stage itself is pinned
 * (GSAP gives it `position: fixed` while active), so an absolute child
 * already tracks the viewport with it — a second fixed layer would be
 * redundant, and `fixed` descendants are also the ones an ancestor's
 * `overflow-hidden` clips unexpectedly.
 *
 * Each card carries `rounded-t-[3rem]` directly, matching the frame:
 * the glow ring's `::before` (index.css) uses `border-radius: inherit`,
 * which resolves against *this* element, so any mismatch here draws a
 * square-cornered ring over the card's real rounded ones.
 */
export default function PillarStack({ pillars }) {
  return (
    <div
      data-pillars-stack
      className="relative mx-[calc(50%-50vw)] hidden h-screen w-screen overflow-hidden lg:motion-safe:block"
    >
      <div
        data-pillars-frame
        className="absolute inset-x-6 top-[9.5rem] bottom-0 overflow-hidden rounded-t-[3rem] lg:inset-x-12"
      >
        {pillars.map(({ name, qualifier, description, icon }, i) => {
          const Icon = ICONS[icon]
          return (
            <article
              key={name}
              data-pillar-card
              data-glow-border
              className="bg-night-950 absolute inset-0 overflow-hidden rounded-t-[3rem]"
            >
              {/* Rings per card, behind the copy. Five WebGL contexts
                    exist, but at most the one or two cards actually on
                    screen ever render: a card parked at `yPercent: 100`
                    sits outside this frame's `overflow-hidden`, and
                    IntersectionObserver clips a target against its
                    ancestors' clip rects before testing it, so
                    MagicRings' own visibility guard reports those cards
                    as off-screen and stops their loop.
                    `data-rings-mask` (index.css) is what keeps the arcs
                    off the text: the shader's own hole is circular, but
                    the copy is a wide block, so a circular gap large
                    enough to clear it sideways would push the rings off
                    the card entirely. The mask cuts an ellipse instead,
                    shaped like the text. */}
              <div
                data-rings-mask
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-70"
              >
                <MagicRings
                  color="#39d353"
                  colorTwo="#8532f2"
                  ringCount={6}
                  lineThickness={2.5}
                  baseRadius={0.41}
                  radiusStep={0.12}
                  noiseAmount={0.05}
                  rotation={i * 24}
                />
              </div>
              {/* One drop-shadow on the wrapper, not per element: a
                    single filter pass covers icon and all three text
                    blocks. */}
              <div className="relative flex size-full flex-col items-center justify-center px-8 text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                <Icon size={56} className="text-green-400" aria-hidden="true" />
                <h3
                  data-slide-heading
                  className="font-display mt-8 text-5xl text-white md:text-7xl"
                >
                  {name}
                </h3>
                <p data-slide-qualifier className="mt-4 text-xl text-green-400">
                  {qualifier}
                </p>
                <p
                  data-slide-description
                  className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl"
                >
                  {description}
                </p>
              </div>
            </article>
          )
        })}
      </div>

      <div
        data-pillars-progress
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-30 h-1 bg-white/10 opacity-0"
      >
        <div data-pillars-progress-fill className="h-full w-0 bg-green-500" />
      </div>

      {/* top-24, not top-6: Navbar.jsx is `fixed top-0 z-50` and ~46px
            tall with a 75%-opaque blurred background, so anything above
            ~46px here renders behind it. A `top-6` mark (24px, size-10)
            would sit half-buried under that bar — the same "marca
            cortada pelo navbar" defect a previous round already fixed by
            moving to this offset. */}
      <img
        data-pillars-mark
        src={logoDevClub}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-24 left-1/2 z-30 size-10 -translate-x-1/2 opacity-0"
      />

      {/* Tail handoff into Chapter 05 — pillars.timeline.js fades this
            up over the last card's dwell. It belongs INSIDE the stage,
            not beside it: the stage is what GSAP pins, so an absolute
            layer anywhere else would scroll out from under the pin
            instead of covering the frozen viewport. */}
      <div
        data-pillars-blackout
        aria-hidden="true"
        className="bg-night-950 pointer-events-none absolute inset-0 z-40 opacity-0"
      />
    </div>
  )
}
