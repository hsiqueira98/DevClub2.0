# DevClub Premium

# Motion

## Purpose

This document defines the global motion system: the tokens every animation in the project must draw from.

It does not choreograph individual chapters — per-chapter motion direction already lives in `STORYBOARD.md` as intent ("soft parallax", "count-up", "masonry reveal"). This document defines the shared vocabulary (easing, duration, triggers) so that intent is implemented consistently instead of every component inventing its own timing.

Detailed per-chapter choreography (exact ScrollTrigger configs, stagger values) is deliberately out of scope for the first implementation pass — see `ROADMAP.md` Phase 3.

---

# Motion Principles

Motion must justify itself. Per the root CLAUDE.md: if an animation communicates nothing, it should not exist.

Prefer:

- Reveal over appear (things enter with direction and purpose, never just fade in from nowhere).
- One clear motion per element. Avoid stacking multiple simultaneous effects on the same element.
- Scroll-linked motion (`scrub`) for storytelling that should track the visitor's own pace.
- Time-based motion (`toggleActions`) only for short, self-contained reveals (cards, counters).

---

# Duration Scale

- `fast` — 200ms — micro-interactions (hover, button press, focus).
- `base` — 500ms — standard reveal (text, cards, images entering view).
- `slow` — 900ms — chapter-level transitions (background shifts, large layout moves).
- `cinematic` — 1400ms+ — reserved for Chapter 01 and Chapter 08, where the Storyboard explicitly calls for restraint ("very subtle", "long pause").

---

# Easing

Two curves cover nearly everything. Do not introduce more without a specific reason.

- `power2.out` — default for anything entering the screen (reveals, cards, text).
- `power1.inOut` — default for anything continuous or looping (parallax, background drift, scroll-linked scrub).

Avoid bounce/elastic eases — they contradict the "premium, confident" tone in `DESIGN_SYSTEM.md`.

---

# Scroll Behavior

- Lenis provides the smooth-scroll base; GSAP ScrollTrigger reads from it as the scroller.
- Section-level transitions (chapter-to-chapter) use `scrub` so they feel tied to the visitor's scroll, not autoplayed.
- In-section reveals (a single card, a headline) use `toggleActions: "play none none reverse"` — they play once on enter, reverse on scroll back up, and never replay on every re-entry.

---

# Reduced Motion

`prefers-reduced-motion: reduce` must be respected globally, not per-component:

- Disable scroll-linked parallax and background drift entirely.
- Keep reveals, but replace movement with an opacity-only transition at `fast` duration.
- Never disable functionality, only motion — content must remain fully readable and navigable with zero animation.

This is an accessibility requirement, not an optimization — see the Accessibility section of the root CLAUDE.md.

---

# Reference: Signature Scroll Moment (navbardigital.com)

Confirmed from real scroll-position screenshots (see `DECISION_LOG.md`). This is the strongest concrete "wow" animation reference gathered so far — worth adapting as a signature moment, most likely for the Chapter 01 → Chapter 02 transition, executing the "split text animation" already called for in `STORYBOARD.md`.

Technique, in three scrub-linked phases (one scroll-linked GSAP timeline, not time-based):

1. **Assemble** — the headline starts oversized, cropped by the viewport edges (only fragments of each word visible at the far left/right). As the visitor scrolls, it scales down and re-centers into a clean, fully legible lockup.
2. **Rest** — the composition holds centered, with a radial vignette behind it and a small tracked-caps tagline revealing underneath.
3. **Shatter** — continued scrolling breaks the text apart: first into horizontal slices, then into smaller confetti-like fragments, then those fragments rotate in 3D and tumble away as the section exits.

Build with `SplitText` (already in `ARCHITECTURE.md`) breaking the headline into characters, each character's transform (x, y, rotation, opacity) driven by a single `scrub`-linked ScrollTrigger timeline — not three separate animations. Stagger the shatter phase per character with a randomized offset so it reads as breaking apart, not sliding away uniformly.

---

# Performance Rules

- Animate `transform` and `opacity` only. Never animate `width`, `height`, `top`/`left`, or box-shadow directly.
- One ScrollTrigger per section, not one per element, wherever batching is possible.
- Kill/refresh ScrollTrigger instances on route or viewport changes to avoid orphaned listeners.
