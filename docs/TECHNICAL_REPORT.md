# DevClub Premium

# Technical Report

## Purpose and how to use this document

This is not a substitute for understanding your own code — it's a study aid for the interview line the contest brief itself sets: "eu vou abrir o seu código e perguntar por que você fez cada escolha." Read it once, then open the actual files it points to. If a question comes up in the interview that this document doesn't answer well enough to satisfy you, that's a signal to go re-read that file before submission, not to memorize a paragraph.

It does **not** transcribe every line of every file — a literal line-by-line transcript of ~60 files would be enormous and mostly restate what well-named code already says. Instead, for every file it answers three questions: what it's for, what's *not* obvious just from reading it, and why it exists in the shape it does. Anything genuinely non-obvious already has a comment in the code itself, pointing here or to `DECISION_LOG.md` — this report is the organized, narrated version of that same trail.

Three companion documents this report leans on constantly:

- **`ARCHITECTURE.md`** — the stack and folder-structure rules, decided before any code existed.
- **`STORYBOARD.md`** — the 10 chapters, their emotional/visual/motion intent, the spec every section implements.
- **`DECISION_LOG.md`** — the chronological record of every decision and why, including the ones this report references directly. If this report and `DECISION_LOG.md` ever disagree, trust `DECISION_LOG.md` — it's the primary source, this is a synthesis.

---

## 1. How the page boots

`index.html` loads `src/main.jsx`, which mounts `<App />` inside `React.StrictMode` (dev-only double-invoke of effects — explains a couple of harmless double-fired console warnings you may see in `npm run dev` that don't happen in the production build).

`src/app/App.jsx` is the composition root: it renders `<Navbar />`, then the 10 chapters in `STORYBOARD.md` order inside `<main>`, then `<Footer />`, wrapped in `<SmoothScrollProvider>`, with a fixed `.grain` overlay `div` on top of everything. It also calls `initReveals()` and `initCounters()` once, scoped to `<main>` — these are the *global* animation systems every chapter's content opts into via `data-*` attributes, as opposed to the *per-chapter* choreography each section wires up itself. This split (global systems in `App.jsx`, chapter-specific timelines inside each section) is the core organizing idea of the whole animation layer — see §3.

**Why 10 chapters, not the sections a normal institutional site would have** ("Hero", "Sobre", "Cursos"...): the brief and `PROJECT_VISION.md` frame this as a narrative journey, not a sitemap. `STORYBOARD.md` is the spec; `DECISION_LOG.md`'s early entries explain why it grew from an original 8 chapters to 10 (the contest brief required showing "formações" and "tutores" explicitly, which became their own chapters instead of being folded into existing ones).

---

## 2. `src/lib/` — the shared primitives everything else imports

| File | What it's for | Why it exists as its own file |
|---|---|---|
| `gsap.js` | The **only** place `gsap.registerPlugin()` runs (`ScrollTrigger`, `SplitText`). Every other file imports `gsap`/`ScrollTrigger`/`SplitText` from here, never from the `gsap` package directly. | If every timeline file registered plugins itself, a plugin could get registered twice or (worse) a file could forget to register it and fail silently in production. One entry point makes that a whole category of bug that can't happen. |
| `cn.js` | `cn(...)` = `twMerge(clsx(inputs))`. Used everywhere a className is conditionally built. | `clsx` alone doesn't resolve conflicting Tailwind classes (e.g. two different `text-*` classes both present) — `twMerge` does. Every component that takes a `className` prop and merges it with its own defaults needs this, or a caller-supplied class can silently lose to the component's own class depending on Tailwind's internal ordering, not the order they appear in code (this exact issue is why `Kicker`'s `tone` is a prop, not a className override — see the component itself and `DECISION_LOG.md`). |
| `constants.js` | Exports `WHATSAPP_ENROLL_URL`, the one real "backend" this page has. | The page has no checkout — every conversion button opens a real WhatsApp chat instead of pointing nowhere. One constant means the phone number/message changes in one place, not five. |

---

## 3. The motion system — read this section before any `animations/*` file

Everything under `src/animations/` builds on three small files:

**`motion.tokens.js`** — `DURATION` (fast/base/slow/cinematic, in seconds) and `EASE` (`out` = `power2.out`, `inOut` = `power1.inOut`). Two eases cover the entire site on purpose — `MOTION.md` explicitly rules out bounce/elastic eases as inconsistent with a "premium, confident" tone. If you're asked "why only two easing curves," that's the answer, not "I didn't get to the rest."

**`reveals.js`** — the *default* reveal mechanic. Anything marked `data-reveal` fades/rises in once, the first time it's 85% into the viewport (`toggleActions: 'play none none reverse'` — plays on the way down, reverses on the way back up, never replays on re-entry). `data-reveal-group` does the same to a container's children with a stagger. This is why most section files barely mention animation at all — they just sprinkle `data-reveal` on JSX, and `App.jsx` wires the behavior up once, globally. Under `prefers-reduced-motion: reduce`, the `y` movement is dropped and duration shortens to `fast` — content still reveals, it just doesn't travel.

**`counters.js`** — `makeCountUp(el, {from, to})` returns the tween vars and a live counter object *without* attaching a trigger, specifically so the same count-up logic can be a standalone reveal (`initCounters`, used for the stat cards and salary bars) **or** one step inside a longer sequence (the Chapter 08 payslip's total). This indirection exists to prevent a second, slightly-different counter implementation from being written for the payslip — read the comment at the top of the file if a reviewer asks why counting up a number isn't just an inline `gsap.to`.

Every other file in `animations/` is a **per-chapter timeline function**, taking the chapter's root DOM node and wiring up whatever `data-*` hooks that chapter's JSX exposes. The pattern repeats: `const el = section.querySelector('[data-something]')`, then a `gsap.matchMedia(section)` block gated on `(prefers-reduced-motion: no-preference)` (sometimes further gated on `(pointer: fine)` for hover-dependent effects), containing the actual tween/timeline/ScrollTrigger.

**`hero.timeline.js`** is the most complex file in the codebase and the one most worth being able to explain unprompted — it's the site's signature moment. Two rules in its own comments, both earned the hard way (full story in `DECISION_LOG.md`):

1. The time-based intro ("Prólogo": photo + content fade in on load) and the scroll-scrubbed timeline ("rest → shatter") animate **completely different DOM elements** — the intro touches the content wrapper and photo, the scrub touches the headline characters, kicker, glow and blackout. Two animation owners on one element, with a `ScrollTrigger.refresh()` landing between them, was the actual root cause of characters freezing mid-shatter on scroll-direction changes.
2. Reduced motion is checked with a plain `window.matchMedia(...).matches`, not `gsap.matchMedia()`, because `gsap.matchMedia`'s cleanup function isn't captured by the `useGSAP()` React hook's context — under React StrictMode's dev-only double-mount, that left orphaned tweens and a duplicate `SplitText` instance.

If asked "what does `SplitText` do here": it wraps the hero headline so each character is its own DOM node with an independent transform, which is what lets the shatter phase throw every character to a random `x`/`y`/`rotation`/`rotationY` (`gsap.utils.random(...)` per character, staggered `from: 'random'`) instead of moving the whole heading as one block.

`navbar.timeline.js` is the second-most-worth-explaining file: it does **not** use `gsap.to()`/`fromTo()` to animate the navbar's width/margin/radius. It reads raw scroll progress from a `ScrollTrigger.create({ onUpdate })` and hand-interpolates (`lerp`) the CSS values every frame. The comment explains why: `fromTo`/lazy `.to()` both lost the pill's `max-width` on fast scroll-direction changes because GSAP's value capture raced a `ScrollTrigger.refresh()` that fires on the window `load` event. Hand-writing the styles from progress means there's no "captured start value" to lose — progress `0` always renders the exact same pill, deterministically.

`filmstrip.timeline.js` (Chapter 06) only pins and horizontally scrubs the instructor strip — it used to also toggle an `.is-focal` class based on scroll position, but that was removed (the PO wanted portrait "lighting" to answer the visitor's own pointer, not the scroll position) in favor of pure CSS `:hover`/`:focus-visible`, with a `(hover: none), (pointer: coarse)` media query making captions permanently visible on touch, since there's no hover there to reveal them.

`chapters.timeline.js` bundles five smaller, one-off timelines (Chapters 03, the "virada" interstitial, 04, 07, 10) that didn't each earn their own file. Each is documented inline with which `STORYBOARD.md` motion note it implements.

`results.timeline.js` (Chapter 08) is the newest and simplest: salary bars grow via `scaleX` (never `width` — `MOTION.md`'s transform-only rule), and the "Contracheque" payslip plays one sequenced `gsap.timeline()` on scroll entry (green difference line grows → total counts up via the shared `makeCountUp` → badge stamps in with a `back.out` overshoot). This block has been rebuilt four times over the course of the project (a line chart → a career-journey timeline → a two-path loss-aversion comparison → this) — if asked why, the honest answer is iterative product feedback in a time-boxed project, and `DECISION_LOG.md` has the full trail with the reasoning at each step, including why each version was rejected.

---

## 4. `src/components/` — the reusable, brand-specific UI

These are small on purpose (all comfortably under the ~200-line guideline in the root `CLAUDE.md`) and each solves exactly one problem:

- **`Chapter.jsx`** — every chapter is a `<section>` with a shifting background color and large rounded top corners that "rise" over the previous section (the Amphora-inspired chapter-transition technique in `DESIGN_SYSTEM.md`). This is why individual section files rarely set their own section-level layout — they wrap their content in `<Chapter>` and get the container, max-width, and vertical padding for free.
- **`Kicker.jsx`** — the terminal-cursor eyebrow label (`mercado_`, `faq_`...) that's real, native DevClub vocabulary (confirmed from the actual current site, not invented — see `BRAND.md`). Takes a `tone` prop (`green` default, `dark` for light backgrounds) *instead of* a className override, specifically because Tailwind doesn't guarantee a later class in a string wins over an earlier one — this was a real, shipped contrast bug (green-on-light-background, ~1.85:1) caught in review and fixed this way, not by luck.
- **`AccentText.jsx`** — the italic gradient accent word inside headlines (`uma <AccentText>decisão</AccentText>`). The `pr-[0.12em]` on the element isn't arbitrary spacing — `background-clip: text` only paints inside the element's box, and an italic glyph's rightmost tip slants past that box without the padding, rendering visibly clipped. This was also a real, caught-and-fixed bug.
- **`Button.jsx`** — one component, three `variant`s (`primary`, `secondary`, `inverted`). `inverted` exists specifically for Chapter 10's full-bleed green background, where the default white focus outline would be invisible and needs a dark one instead.
- **`AvatarCluster.jsx`**, **`StarBadge.jsx`**, **`LogoMark.jsx`** — each renders one native DevClub device confirmed from the real site (overlapping student avatars with a green ring; the green 5.0 rating badge; the pixel-grid "D" mark, rebuilt as inline SVG so it's crisp at favicon scale and its color follows `currentColor` rather than being a static image asset).
- **`NewsletterForm.jsx`** — demo-only (no backend): submitting flips local component state to a confirmation message. If asked "does this actually subscribe anyone" — no, and that's disclosed here and in `DECISION_LOG.md`, not hidden.

---

## 5. `src/layouts/` — the two elements outside the chapter flow

**`Navbar.jsx`** — floating pill that grows into a full-width bar (driven by `navbar.timeline.js`, described above). Links are same-page anchors to each chapter's `id`. "Login" points to an invented-but-plausible external student-platform URL; "Matricule-se" opens WhatsApp.

**`Footer.jsx`** — newsletter band, brand + three link columns (Navegação/Formações/Recursos), legal line. The legal line ("Página conceitual — conteúdo ilustrativo") is a deliberate, honest disclosure that this is a contest artifact with invented content, not a real DevClub page. Sitemap link data lives in this file (`COLUMNS`, `SOCIAL` constants) rather than `src/data/`, since it's link/navigation structure, not narrative content — a judgment call, not a rule enforced anywhere; defensible either way if asked.

---

## 6. `src/sections/` — one file per chapter

Every section follows the same shape: a `<Chapter>` wrapper, a `<Kicker>`, an `<AccentText>`-accented `<h2>`, then the chapter's specific content, wired to its own `create*Animations(section)` timeline via `useGSAP(..., { scope: sectionRef })`. Rather than re-describe each one (that's what `STORYBOARD.md` already does, chapter by chapter), here's what's specifically *not* obvious from either the storyboard or the code comments alone:

- **`FirstDecision.jsx` (Ch.01)** — the hero background is four stacked layers (photo → purple gradient mask → ambient glow → black mask), each with its own `data-hero-*` attribute the timeline targets independently. The role-cycling text ("Front-End_", "Back-End_"...) is `useTypewriter.js`, a small custom hook (character-by-character type/delete/hold loop) — not a library, because the behavior needed (matching the site's own terminal-cursor visual language exactly) is about 40 lines and didn't justify a dependency.
- **`TheChallenge.jsx` (Ch.03)** — the five "struggle" fragments are deliberately misaligned (`FRAGMENT_STYLES`, hand-authored offsets/rotations per item) — the one intentionally "broken" layout on the page, per `STORYBOARD.md`'s direction for this chapter's visual tension.
- **`TheTurn.jsx`** — not one of the 10 storyboard chapters; an interstitial added after the initial build, between Chapters 03 and 04, because early PO review wanted "more tchan" at the narrative hinge. Its CTA ("Ver trilhas") deliberately does **not** go to WhatsApp — it's an internal anchor to Chapter 05, a judgment call recorded in `DECISION_LOG.md`: sending someone to a sales conversation before they've seen a single course track contradicts `DESIGN_SYSTEM.md`'s "buttons invite, they never pressure."
- **`Tracks.jsx` (Ch.05)** — a native `<details name="tracks">` accordion, not a card grid and not a JS-driven modal (an earlier version *was* a modal; it was deliberately replaced — see `DECISION_LOG.md` — to reuse the same zero-JS accordion mechanism as the FAQ). The click affordance (`.track-summary::before` in `index.css`) is two different effects for two different input types: a cursor-following radial glow gated to `(hover: hover) and (pointer: fine)`, and a permanently-visible left-edge glow for everything else — because a hover effect is undiscoverable on a touchscreen.
- **`Instructors.jsx` (Ch.06)** — a horizontal film-strip, not a bio-card grid, on purpose (`STORYBOARD.md`: "like a documentary cast list"). Portraits are Unsplash placeholders, unified into one look by a CSS duotone grade (`[data-grade]`) so they read as one cohesive cast despite being stock photos of different people.
- **`HowItWorks.jsx` (Ch.07)** — the one light-background chapter on the page. Confirmed pattern, not a one-off: both `amphora-it.com` and `navbardigital.com` (the two PO-supplied references) break their own dark themes with a light section partway down, for rhythm.
- **`RealResults.jsx` (Ch.08)** — see §3 above for the payslip's animation; the numbers strip beneath it (`+30 mil`, `+400`, `+12`, `5.0`) reads from `stats.js`, the single source that fixes a real inconsistency on the current live devclub.com.br site (which shows three different, disagreeing student counts across its own sections).
- **`BeyondCode.jsx` (Ch.09)** — a CSS-columns masonry gallery (`columns-1 sm:columns-2 lg:columns-3`), not a JS masonry library — pure CSS achieves the same visual result with zero extra dependency weight for a page that's already animation-heavy elsewhere.
- **`Blog.jsx`** — also not one of the 10 storyboard chapters; added in a later PO round as an editorial teaser section, surface-level only (links to `blog.devclub.com.br`, no real posts behind it).
- **`Faq.jsx`** — native `<details name="faq">`, same mechanism as Tracks — the shared `name` attribute is what makes the accordion mutually exclusive (opening one closes the others) with no React state at all.
- **`FutureCta.jsx` (Ch.10)** — the one full-bleed color-inversion chapter (solid green background, dark text) — a confirmed pattern from `navbardigital.com`'s own closing CTA, not an invented idea. Ends with the "Epílogo" beat (`data-epilogue`): a slow, separate fade-in after the CTA, echoing Chapter 01's restraint before the footer.

---

## 7. `src/data/` — every invented number and word, in one place

Per the contest's own rules, none of this content has to be real — but it has to be *consistent* and *plausible*, and centralizing it here is what makes that achievable:

- **`stats.js`** — the single source for site-wide numbers (student count, rating, hiring companies) plus Chapter 02's market stats (each with its own cited source string).
- **`tracks.js`** — the 5 course tracks, each with its own accent color token (a real, confirmed DevClub device — different tracks get different colors on the live site) and a description used by Chapter 05's accordion.
- **`instructors.js`** — 7 invented instructors (one, Rodolfo Mori, mirrors the real founder's public identity — everyone else is invented). Photos are plain Unsplash URLs pasted directly (not built from a helper function) specifically so a future edit is "paste a different URL," not "understand a function."
- **`testimonials.js`** — 3 invented testimonials, the salary table (`SALARIES`, feeding both the Chapter 08 bar chart and the payslip), and the list of real, named hiring companies (the company names are real; the claim that DevClub alumni work there is invented).
- **`faq.js`**, **`blog.js`**, **`journey.js`** (Chapter 07's method steps + Chapter 09's gallery captions) — same pattern: invented content, kept internally consistent with `stats.js`.

---

## 8. `src/providers/` and `src/hooks/`

**`SmoothScrollProvider.jsx`** — initializes Lenis and feeds its `scroll` event into `ScrollTrigger.update`, with both driven by the same GSAP ticker (`gsap.ticker.add`) so scroll-smoothing and animation timing share one clock instead of drifting against each other. Disabled entirely under `prefers-reduced-motion: reduce` — native scroll stays fully functional, just not smoothed.

**`useTypewriter.js`** — described in §6 (`FirstDecision.jsx`). The only custom hook in the project; everything else that could be a hook is either a GSAP timeline (belongs in `animations/`) or doesn't need to be one.

---

## 9. `src/styles/index.css` — where the brand tokens actually live

Every color, font, and duration used anywhere in the codebase is a Tailwind `@theme` token defined here (`--color-green-500`, `--font-display`, `--duration-slow`, etc.), sourced from `BRAND.md`/`MOTION.md` — no component ever hardcodes a raw hex value or a bare duration number. If asked "why not just use Tailwind's default palette," the answer is that the brand's real green/purple/near-black scale (extracted from the current live site, not invented) doesn't exist in Tailwind's defaults, so it's defined once here and referenced everywhere as `bg-green-500`, `text-purple-700`, etc.

The file also carries a few small pieces of global, non-component CSS that don't belong to any single React component: the `:focus-visible` outline rule (global baseline, per the Contest Context Override's accessibility floor), the `.grain` film-grain overlay (a CSS `feTurbulence` SVG data-URI, stepped via a keyframe animation, disabled under reduced motion), and the `.track-summary`/`.track-row` glow rules described in §6.

---

## 10. What's real, what's invented, what's a demo-only stub — the honesty map

An interviewer's fastest way to catch someone who "just accepted AI suggestions" is asking what's real. Here's the accurate answer, all in one place:

**Real:** the brand colors/fonts/logo mark/UI devices (terminal-cursor kickers, typewriter hero, per-track colors, avatar-cluster, star badge, salary-chart-with-citation) — all confirmed by directly inspecting the current live devclub.com.br's CSS/JS bundle and screenshots, documented in `BRAND.md`. The WhatsApp number and enrollment flow are real and functional. The hiring-company names (Itaú, Nubank, iFood...) are real companies.

**Invented but plausible, per the contest's own rules:** every number (student counts, salaries, market stats), every testimonial and instructor name/photo, every FAQ answer, every blog post teaser.

**Demo-only, explicitly not wired to anything real:** the newsletter form (local state only, no email actually sent anywhere), the "Área do aluno" / Login link (points to an invented URL, no such platform exists), the Blog section's link target.

---

## 11. Likely interview questions, and where the real answer lives

| If asked... | Point to | One-line answer |
|---|---|---|
| "Why GSAP and not Framer Motion / CSS animations?" | `ARCHITECTURE.md`, `DECISION_LOG.md` | Animation is 30% of the grading rubric; GSAP + ScrollTrigger's scrub/pin primitives are what make scroll-driven choreography (the hero shatter, the pinned filmstrip) possible without hand-rolling scroll math. Framer Motion is installed only as a documented fallback and was never actually needed. |
| "Why does the hero text explode into pieces — isn't that excessive motion?" | `MOTION.md`, `DECISION_LOG.md` | It's a direct, deliberate reference to a specific reference site (navbardigital.com) the CEO shared, adapted with DevClub's own colors/typography — and it's the one place on the page rotation is used, because it communicates disintegration/transition, not decoration. |
| "Why doesn't the site look like a typical course-sales page?" | `PROJECT_VISION.md`, `STORYBOARD.md` | Explicit PO direction: avoid the "cara de curso online" pattern (course-catalog card grids, generic hero with logos). Chapters 05/06 specifically were redesigned away from card grids into an editorial list and a film-strip for exactly this reason. |
| "Why is [some number] not real?" | This report §10, `DECISION_LOG.md` | Contest rule: invented content is explicitly allowed and expected; what's not allowed is being unable to say so, which is why the footer discloses it and `stats.js` centralizes it for consistency. |
| "Walk me through one bug you found and fixed." | `DECISION_LOG.md` | Two good, concrete ones: the `Kicker` contrast bug (green-on-light-background, ~1.85:1, fixed with a `tone` prop) and the hero shatter's character-freeze bug (two animation owners on one element racing a `ScrollTrigger.refresh()`, fixed by giving intro and scrub disjoint target elements). |
| "Why is this a single page, not multiple routes?" | `ARCHITECTURE.md`, `STORYBOARD.md` | It's one continuous narrative, not a set of independent destinations — a router would add complexity (code-splitting, route transitions) the actual content doesn't need. |
| "What would you do differently with more time?" | `ROADMAP.md` Phase 4/5 | Full accessibility audit (only the baseline was done, deliberately, per the Contest Context Override), a real backend for the newsletter/enrollment flow, replacing Unsplash/randomuser.me placeholders with real photography. |

---

## 12. Housekeeping this report surfaced (not yet actioned)

While assembling this report, two small cleanup items surfaced that are unrelated to any of the above but worth doing before the public submission — see the accompanying prompt for the implementation session:

- Several `src/*/.gitkeep` files are now dead weight (their folders already contain real, tracked files).
- `src/features/`, `src/pages/`, `src/types/`, `src/utils/` are empty and don't match how the project actually organized itself (no routing, no TypeScript, `lib/` already covers utilities) — worth removing rather than leaving unexplained empty scaffolding in a public repo. `src/assets/` is the one empty folder kept, since it has an articulated future purpose (swapping placeholder photos for real ones).
