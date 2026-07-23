# DevClub Premium

# Decision Log

## Purpose

Record decisions that aren't derivable from reading the code — the "why" behind a choice, so it doesn't need to be re-litigated or re-explained from scratch later (including in the hiring interview).

---

## 2026-07-21 — This project is a hiring contest submission

DevClub Premium is being built for a hiring contest run by Rodolfo Mori (DevClub CEO) for a Full Stack Programmer position. Deadline: July 23. Deliverable: an institutional landing page, publicly deployed + public GitHub repo, submitted by email with a written justification of every technical choice (they will open the code in the interview and ask "why").

**Why it matters:** the contest has its own grading rubric (see next entry), which does not match a typical production checklist. It also explicitly allows invented content — testimonials, student names, hiring companies, numbers, logos do not need to be real.

**How to apply:** prioritize a page that reads as authentically DevClub (real brand: colors, logo, type, tone — see `BRAND.md`) filled with invented but plausible narrative content. Every implementation decision should be defensible out loud, not just functional.

---

## 2026-07-21 — Decision Hierarchy reprioritized for the contest submission

The contest's grading weights are: 50% visual impact/originality, 30% animation/microinteractions, 20% code quality. Accessibility and performance are not scored.

**Why:** this conflicts with the root `CLAUDE.md` Decision Hierarchy (UX > Accessibility > Performance > Maintainability > Visual Beauty), which was written for long-term production work, not a graded contest entry. Flagged to the PO rather than assumed away.

**Decision:** for this submission, prioritize visual impact and animation density first, code defensibility second, and keep only the cheap accessibility baseline (semantic HTML, contrast, visible focus, keyboard reachability) without a full audit or deep performance optimization pass. See the "Contest Context Override" section added to `CLAUDE.md`.

**How to apply:** don't hold back on animation/motion richness to protect performance budgets or accessibility completeness beyond the baseline. Do not remove the baseline either — it's cheap and reads as engineering maturity in the interview. This override is scoped to the contest deliverable only; if DevClub Premium continues after hiring, the original hierarchy in `CLAUDE.md` applies again.

---

## 2026-07-21 — Added two dedicated chapters to the Storyboard: Trilhas de Formação and Conheça Quem Ensina

The official contest brief explicitly requires the page to show "as formações" (course catalog) and "nossos tutores" (named instructors) — neither existed as a distinct beat in the original 8-chapter `STORYBOARD.md`, which was written before the official brief was available.

**Why:** rather than fold these into existing chapters (which would risk burying an explicit grading requirement inside a broader beat), the PO chose to give both their own dedicated chapters so the requirement is unambiguously visible to an evaluator skimming the page.

**Decision:** `STORYBOARD.md` now has 10 chapters. Chapter 05 (Trilhas de Formação) and Chapter 06 (Conheça Quem Ensina) were inserted between the original Chapter 04 (Meet DevClub) and Chapter 05 (How It Works) — the remaining chapters were renumbered accordingly (old 05→07, 06→08, 07→09, 08→10).

**How to apply:** when implementing Phase 2 of `ROADMAP.md`, build all 10 chapters in the new numbering — do not build against the original 8-chapter numbering from memory.

---

## 2026-07-21 — Kept the minimal, restrained Chapter 01 hero despite denser reference material

The reference moodboard the CEO shared (`Referências.pdf`) shows hero patterns from other sites (Adapta, Asimov Academy) that open dense — trust logos, dashboard screenshots, stat counters, all above the fold.

**Why:** `STORYBOARD.md` Chapter 01 deliberately opens minimal (large typography, dark, few elements) to set up the cinematic/emotional-journey framing from `PROJECT_VISION.md`. A judge evaluating many contest entries has likely seen many dense, logo-heavy bootcamp heroes already — restraint at the very first screen is itself a differentiator, not a weakness, and it's consistent with "impacto visual e originalidade" being about standing out, not about matching a familiar template.

**Decision:** did not change Chapter 01. Trust-signal density (student count, hiring-company logos) still happens, just in Chapter 02 onward, not competing with the opening beat.

**How to apply:** if this choice is questioned later, this is the reasoning to point to — it was a deliberate call, not an oversight of the reference material.

---

## 2026-07-21 — Confirmed the two PO-supplied inspiration sites via real screenshots

Initial analysis of amphora-it.com and navbardigital.com used WebFetch, which only sees HTML converted to markdown — no real layout, color or motion. The PO later supplied actual screenshots/PDF exports of both sites, which replaced that low-confidence reading with real detail.

**Why it matters:** the earlier text-only analysis was directionally correct (containers, minimalism, motion quality) but missed all specifics. The concrete techniques worth reusing are now written into `DESIGN_SYSTEM.md` (Amphora and Navbar Digital reference sections) and `MOTION.md` (the Navbar Digital shatter-text signature moment).

**How to apply:** treat the reference sections in `DESIGN_SYSTEM.md`/`MOTION.md` as the source of truth for these two sites, not any earlier verbal description in this conversation.

---

## 2026-07-21 — PO summary cross-check: four resolved tensions

The PO supplied a full project summary to cross-check against the docs. Most of it already matched (brand colors, protagonist framing, cinematic principles). Four points needed an explicit decision:

1. **Chapters 05/06 vs. "no cara de curso online."** The PO's new narrative structure (Prólogo → Decisão → Descoberta → Caminho → Evolução → Resultados → Comunidade → Futuro → Epílogo) has no obvious slot for "Trilhas de Formação" / "Conheça Quem Ensina," and the PO explicitly asked to avoid a course-catalog/course-website feel and excess cards — which is exactly what those two chapters risked becoming as originally specified (card grids). **Decision:** kept both chapters (the contest brief still requires showing formações and tutores), but rewrote their Visual Direction in `STORYBOARD.md` to editorial, non-card treatments — a large typographic numbered list for tracks, a horizontal film-strip cast reveal for instructors. Satisfies the literal requirement without the course-site look.

2. **Rotation in the shatter effect vs. "avoid excessive rotation."** The PO's new anti-goal list includes avoiding excess rotation, which is in tension with the navbardigital.com-inspired shatter transition documented in `MOTION.md`, whose climax is per-character rotation. **Decision:** kept the rotation as a deliberate exception — it communicates disintegration/transition with narrative purpose, unlike a gratuitous spin. No change made to `MOTION.md`.

3. **Central tagline.** Replaced "Every developer has a first commit" with "Toda carreira em tecnologia começa com uma decisão" as the project's primary mantra in `PROJECT_VISION.md` — more universal, less programmer-jargon, better aligned with not feeling like a course site. "First commit" survives as supporting texture, not the headline.

4. **Prólogo / Epílogo.** Not built as two extra chapters (would have made 12). They're the opening seconds of Chapter 01 (the "assemble" phase of the signature motion, before anything is asked of the visitor) and the closing seconds of Chapter 10 (a final breath after the CTA, before the footer) — see the notes added directly in `STORYBOARD.md`.

**How to apply:** if asked why Chapters 05/06 don't look like typical course-site sections, or why a rotation effect exists despite the "avoid rotation" note, point here.

---

## 2026-07-21 — Full screenshot review of the current devclub.com.br site

Earlier analysis of the current site (see the first entries in this log) was limited to CSS/JS-bundle string extraction — colors, fonts, copy text, but no real layout. The PO supplied full-page screenshots of the actual current site, which is the real source of truth for "preserve the brand, evolve the experience."

**New findings, folded into `BRAND.md`:** DevClub already has its own terminal-cursor kicker label device (`salário_`, `faq_`...), a typewriter/cycling-role hero headline device, per-track accent colors, avatar-cluster social proof, and a green star-rating badge. These are native DevClub devices, not borrowed — they now take precedence over any equivalent pattern noted from the reference sites (e.g. the parenthetical kicker from Navbar Digital).

**Correction:** the Junior/Pleno/Senior salary bar chart planned for Chapter 08 is **existing DevClub content** (already on the current site, complete with a source citation), not an idea borrowed from `Referências.pdf`. The Brazil-vs-international comparison layer is the one part that's genuinely inspired by the reference moodboard, layered on top as an optional enhancement — see the correction made directly in `STORYBOARD.md` Chapter 08.

**Lesson, not yet a decision:** the current site shows inconsistent student counts across sections (+25 mil in the hero, +10 mil mid-page, +55 mil near the end) — almost certainly an oversight, not intentional variation. Since Chapter 4 content is invented anyway, use one consistent number everywhere on the new page. Small, but exactly the kind of "attention to detail" the PO's stated goal (making Rodolfo think "this is the developer I'd hire") depends on — doing this one thing better than the original is free.

**How to apply:** when implementing Phase 2, treat `BRAND.md`'s "Signature UI Devices" section as the primary source for kicker labels, hero motion and social-proof styling — the reference-site sections in `DESIGN_SYSTEM.md`/`MOTION.md` fill gaps the current site doesn't cover (chapter-transition technique, shatter motion, editorial list/filmstrip layouts), not replace what DevClub already does well.

---

## 2026-07-21 — Private GitHub repo created by the PO for this project

The PO created `https://github.com/hsiqueira98/DevClub2.0` as a **private** repo, to avoid competitors seeing the idea while it's being built.

**Why it matters:** the contest submission requires sending a repo link the evaluator can open. A private repo with no collaborator access defeats that. Confirmed on this machine: Git Credential Manager is configured (`credential.helper=manager`) but no GitHub credential is cached yet — the first `git push` will pop up an interactive browser login that only the PO can complete; after that it's cached and automatic.

**Decision:** keep the repo private through development (Phases 1–4). Before Phase 5 (submission), either flip the repo to public or add Rodolfo as a collaborator — see the reminder added to `ROADMAP.md` Phase 5.

**How to apply:** Phase 1 of `ROADMAP.md` now includes connecting the local repo to this exact remote and pushing. The PO needs to be present for the first push on this machine to approve the GitHub login popup.

---

## 2026-07-21 — PO review of the Phase 1–4 build: five changes

After reviewing the running site, the PO requested:

1. **Hero must not open scattered.** The scrub-linked "assemble" phase meant scroll-position 0 showed oversized cropped letters — the PO's first impression was "the site is broken". **Decision:** the Prólogo/assemble became a time-based entrance (chars rise into the settled lockup on load); only rest → shatter remains scroll-scrubbed. The shatter — which the PO explicitly praised — is untouched. The navbardigital.com reference used scrub for all three phases; deviating is deliberate, first impressions outrank reference fidelity.
2. **Italic accent glyphs rendered cut off.** `background-clip: text` only paints inside the element box and the last italic glyph slants past it. Fixed with trailing padding in `AccentText` (and the one inline gradient em in HowItWorks).
3. **Floating navbar** (was deliberately absent — STORYBOARD had no nav): a centered pill over the hero that expands to a full-width blurred bar on scroll. PO asked for it explicitly ("floatbar animado que ocupa toda a largura ao dar scroll").
4. **FAQ chapter** before the final CTA, using the site's own `faq_` terminal-cursor device. Native details/summary for zero-JS accessibility. Answers stay consistent with `src/data/stats.js`.
5. **More story/information density**: an interstitial "virada" beat between The Challenge and Meet DevClub ("E se você não precisasse fazer isso sozinho?", word-by-word scrub reveal — the narrative hinge Chapter 04 answers); institutional trust chips in Chapter 04 (MEC, certificações, garantia — BRAND.md trust pillar); a numbers strip in Chapter 08 fed from the single stats source.

The PO's reference screenshot (parenthetical kicker, "Matricule-se" nav) was treated as intent — hero legible at load, nav present — not as layout to copy; DevClub's native devices (terminal-cursor kicker, typewriter) still take precedence per `BRAND.md`.

**How to apply:** the page now has 12 scroll beats (10 storyboard chapters + virada interstitial + FAQ); STORYBOARD.md numbering still refers to the 10 core chapters.

---

## 2026-07-21 — PO review, second round: product surface + atmosphere

Requested on top of the first review round:

1. **Login button** in the navbar linking to the students' platform (`alunos.devclub.com.br` — invented but plausible URL; the real product has a separate logged area).
2. **Newsletter capture** — a band at the top of the footer, demo-only submit (no backend; flips to a confirmation state).
3. **Blog section** (`#blog`, between Beyond Code and FAQ) — three invented editorial teasers, no images, category colors reusing the per-track accent device. Also added to navbar and footer.
4. **Sitemap footer** — newsletter band, brand column + Navegação/Formações/Recursos columns, legal line.
5. **Global film grain** ("granulado com profundidade") — fixed SVG-turbulence overlay, `mix-blend-mode: overlay`, stepped shift animation, static under reduced motion.
6. **FAQ centered.**
7. **Hero backdrop photo** — blurred low-key photo (BRAND.md imagery style) under a purple gradient mask that obscures it; during the shatter phase a black mask fades in scrub-linked, so the scene lands on Chapter 02's dark background. Mirrors the PO's reference print in intent (photo + colored mask + dark handoff) without copying its layout.

**How to apply:** the hero now has four stacked backdrop layers (photo → purple mask → glow → blackout) — the blackout is driven by `hero.timeline.js`, everything else is static CSS. Newsletter/Blog/Login are surface-level demo affordances; no backend exists.

---

## 2026-07-21 — PO review, third round: three scroll-behavior fixes

1. **Shatter didn't fully reconstruct when scrolling back up.** Two real root causes, found by DOM forensics (frozen chars kept mid-animation inline styles while the timeline reported progress 0):
   - The load-in intro and the scrub timeline animated the SAME elements. Any kill/refresh landing between two owners (the window `load` event fires a ScrollTrigger refresh right in that window) froze the loser's styles. **Rule: intro and scrub share NO targets** — the intro rises the content wrapper and fades the photo; chars/kicker/glow/blackout belong exclusively to the scrub.
   - `gsap.matchMedia` cleanups are not captured by the `useGSAP` context, leaving ghost tweens/SplitText on remount. `hero.timeline.js` and `navbar.timeline.js` now use a plain `window.matchMedia` check (a live OS motion-setting change needs a reload — acceptable).
   - The scrub tweens are plain `.to()`s again: lazy start-capture is safe now precisely because the targets are always settled when captured. An intermediate `fromTo + immediateRender:false` attempt left frozen mixed per-property states on fast scroll cycles — do not reintroduce it.
2. **Floatbar now grows with the scroll** (was a binary toggle at 80px, which could also get stuck expanded), reaching 100% width exactly when Chapter 02 arrives (the hero pin's `+=160%` range). Implementation: manual lerp writes in a ScrollTrigger `onUpdate` — both `fromTo` and lazy `.to()` dropped the pill's `max-width` when value capture raced the window-load refresh. No GSAP value capture, so progress 0 always lands on the exact pill.
3. **"Matricule-se" rendered outside the pill.** The pill's `max-width` (48rem) was smaller than its content (~1050px with logo + 7 links + Login + CTA), so the CTA overflowed the rounded border. The pill now starts at `min(1120px, viewport - 32px)`.

**How to apply:** navbar width/margin/radius are driven inline by `animations/navbar.timeline.js` — don't reintroduce those as Tailwind classes on the nav, they'd fight the writes. Verified in dev and production builds with fast full-page scroll cycles in both directions.

---

## 2026-07-21 — Small additive updates from the PO's summary

Added without needing a decision (purely additive, no conflict): Stripe as a sixth reference (experience quality) and an explicit "never copy layouts, only UX principles" rule in `PROJECT_VISION.md`; Framer Motion as a fallback-only animation tool in `ARCHITECTURE.md`; SOLID/DRY/KISS named explicitly alongside the existing architecture principles in `ARCHITECTURE.md`; basic SEO (title, meta description, OG tags, favicon, one `<h1>` per page) folded into Phase 4 of `ROADMAP.md`, since it was missing from every doc and is a cheap, credibility-building win.

---

## 2026-07-21 — Post-Phase-4 code review found one real bug: Kicker contrast on light background

A full review (lint, production build, headless-browser walkthrough of all chapters, and a targeted stress test of the shatter-reconstruction) found the build otherwise clean: no console errors, no stuck animation state after scrolling into the shatter zone and back, all files well under the ~200-line guideline.

**Bug found:** `Kicker` hardcodes `text-green-500`. On Chapter 07 (`bg-white-warm`), that's roughly a 1.85:1 contrast ratio — far under the 4.5:1 baseline the Contest Context Override in `CLAUDE.md` still requires. Chapter 10's own on-brand kicker (built separately, not via the shared component) correctly uses a dark tone on its green background, so the component needs a tone/variant prop rather than relying on `className` override precedence, which Tailwind doesn't guarantee.

**How to apply:** fix `Kicker` to accept a tone prop (e.g. dark for light/bright backgrounds) before treating Chapter 07 as done. This is folded into the next round of changes below, since that round already touches Chapter 07's background.

---

## 2026-07-21 — PO round: photo treatment refinements + Tracks interaction reversal

After seeing the previous round built, the PO requested:

1. **Chapters 03 and 07 photos become full-bleed** — edge-to-edge, full section height on the right, not a contained block. Chapter 07's gets a scroll-linked zoom-in (subtle Ken Burns). Chapter 03's gets a scroll-linked opacity fade instead — full → 0 across the section's own scroll range, so the photo is gone by the time the "virada" (TheTurn) appears next, keeping the reading focus on the struggle-fragment text as intended.
2. **Chapters 05 (Tracks) reverses from popup modal to in-place accordion**, reusing the exact `<details name="...">` mechanism just built for the FAQ, instead of a separate modal component — CTA lives inside each row's expanded content.
3. **The Tracks hover-glow is desktop-only by design, not an oversight.** The PO caught that a hover effect is meaningless on touch — no cursor, no way to discover it's clickable. Decision: gate the cursor-following glow behind `(hover: hover) and (pointer: fine)`, and give touch/coarse-pointer devices a permanently-visible subtle border glow instead. Two different affordances for two different input types, not one effect that silently does nothing on mobile.
4. **Chapter 08's right column was empty and unjustified** ("por que isso tá aqui?"). Proposed and accepted: a second chart — a 3-year salary growth line ("Sua evolução em 3 anos"), animated as a drawn path on scroll entry. Complements the Jr/Pleno/Sr bars (market bands, a snapshot) with an individual growth arc (progress over time) rather than duplicating the same data in a second shape.

**How to apply:** the Tracks modal component built in the previous round should be removed/replaced, not kept alongside the accordion — one interaction pattern per chapter, not two competing ones.

---

## 2026-07-21 — PO round: narrative/marketing refinements + typography swap

Six changes requested after reviewing the running build, plus a font change:

1. **Chapter 03 (The Challenge)** gets a photo on the right — same layered technique as the hero backdrop (photo, edge gradient fading into `bg-night-950`, a 50%-opacity black mask on top so the photo reads as present but subdued, not decorative).
2. **The "virada" interstitial** gets a second beat: after the word-by-word question reveals and holds, a short answer line + a CTA ("Ver trilhas") fade in, scrolling to Chapter 05 on click. Chosen over inventing a new mechanism — it extends the existing scrub timeline in `chapters.timeline.js` by one more phase, and creates continuity with change 3 below (the virada invites, Trilhas delivers).
3. **Chapter 05 (Trilhas de Formação)** rows become clickable, opening an animated modal per track (what the track means + a CTA), with a hover/idle affordance that invites clicking. This does NOT reintroduce the card-grid look ruled out earlier (see the "PO summary cross-check" entry above) — the typographic list stays as-is, the affordance and modal are additive interaction, not a layout change.
4. **Chapter 07 (How It Works)** background becomes an off-white (not pure white) with the existing global film-grain visible, plus a very-subdued photo (heavy white mask, edge gradient into the background) beside the content, mirroring change 1's technique in light-mode form. The `Kicker` contrast fix above is applied as part of this same change, since it's the same file.
5. **Chapter 08 (Real Results)** headline "Histórias reais. Salários reais." reads as vague — add a bridging line connecting the transformation stories to the salary data before the chart, so the "why does this matter" question is answered before the numbers.
6. **FAQ** accordion becomes mutually exclusive (opening one closes the others) via the native `<details name="faq">` grouping — no JS state needed, keeping the zero-JS accessibility property already in place.

**Typography:** Sora (weight 100–800) replaces both Aldrich and Albert Sans site-wide — see the correction in `BRAND.md`. Deliberate identity trade-off, decided by the PO: Sora reads as more generic-SaaS than Aldrich's geometric/terminal character, but the signature devices (kicker underscore, typewriter cycling) stay, just rendered in the new typeface.

**How to apply:** none of this changes `STORYBOARD.md`'s chapter structure or content intent — it's presentation and interaction refinement on chapters that already exist.

---

## 2026-07-21 — Full re-review after the photo/accordion/chart round: one real finding

Re-ran lint, build, and a headless-browser walkthrough (desktop + mobile viewport, plus targeted checks) after the previous round shipped. Verified, not just eyeballed: `Kicker`'s `tone="dark"` resolves to `purple-700`, which computes to ~9.1:1 contrast on `bg-white-warm` (comfortably past AA); the mobile/touch context correctly resolves `(hover: none)` and renders the permanent border-glow on `.track-summary`, while desktop resolves `(hover: hover) and (pointer: fine)` and gets the cursor glow; Chapter 03's photo fade and Chapter 07's full-bleed photo both render correctly through the whole section height; the Chapter 08 growth-line chart's anchor values match the bar chart's (R$3.800 Início = Júnior, consistent).

**Finding:** Chapter 05 (Tracks) rows butt directly against each other (`border-t`/`border-b`, no gap, no radius) — reads as too dry/flat, and the per-row hover/glow effect looks visually clipped by the hard rectangle edges. PO feedback: wants a small gap between rows (~8px or less) and rounded corners.

**Decision:** add a small gap between `<details>` rows and round their corners — enough to let each row read as a soft, separate surface (which also gives the glow effect a contained edge to work within), without turning them into the card grid that was explicitly ruled out earlier in this log. Spacing/radius only, not a layout change.

**Implemented (resolving the open hairline-vs-fill question):** with an 8px `gap-2` on the flex container, the old `border-t`/`border-b` hairlines no longer share an edge — each row would gain its own full outline top *and* bottom, which reads as the boxed/outlined card look we're avoiding. So the hairlines were dropped in favour of a subtle `bg-night-900/40` fill per `<details>`, plus `rounded-2xl` (the site's existing surface radius — Instructors cards, BeyondCode figures) and `overflow-hidden` so the glow `::before` (cursor-follow radial on fine pointers, permanent left-edge linear on coarse) is clipped to the rounded corners instead of bleeding past them. Content is inset from the surface (`px-6` on mobile; on desktop `md:pl-12 md:pr-8`, a slightly larger left indent — PO follow-up — so the description + CTA read as a body block hanging just inside the left border rather than flush against it). Verified desktop + mobile: computed container `gap` is exactly 8px, radius 16px, `overflow: hidden`; both glow affordances render legibly within the rounded edges; no console errors; lint + build clean.

---

## 2026-07-22 — PO round: instructor lighting becomes hover-only

The PO edited the film-strip directly, wanting the portrait "lighting" to respond only to the visitor's own pointer — and removed the automatic `.is-focal` scroll state from `filmstrip.timeline.js` (a sound simplification, kept). The accompanying `opacity-0` on `[data-grade]`, though, broke the resting presentation: that gradient is not the lighting effect but the duotone grade that unifies the placeholder portraits (BRAND.md imagery style). With it off, resting cards became raw flat grayscale, and hover *darkened* the card (grade 0 → 0.6) instead of lighting it.

**Fix + improvements, keeping the PO's intent:**
- Resting state restored: grayscale + full grade (moody, unified). Hover/focus lifts the grade to 0.6, returns color, reveals the caption — reads as the portrait lighting up. Kept the PO's `group-focus-visible` addition on the grade (it was a real inconsistency).
- Subtle hover zoom on the portrait (`scale 1.04`, clipped by the rounded card) — approach/focus, matching the lighting metaphor.
- Touch affordance: hover doesn't exist on coarse pointers, so captions (and the grade backing them) stay permanently visible there — the same input-type split decided for the track rows. Replaces the now-dead `.is-focal` CSS.

**How to apply:** portrait treatment is CSS-only now; `filmstrip.timeline.js` only pins/scrubs the strip. Don't reintroduce a scroll-driven focal state.

---

## 2026-07-22 — Post-round-2 fine-tooth review: no new defects

Re-ran lint, production build, and a headless-browser walkthrough (desktop + mobile, keyboard tab-through) after the Tracks spacing fix and the instructor hover-lighting change. Both confirmed working as intended (Tracks: 8px gap, 16px radius, glow contained within it; Instructors: hover lights exactly one portrait, others stay dimmed). Chased one suspected bug — the newsletter "Assinar" button's keyboard-focus outline looked black-on-black in an initial check — and ruled it out: that check used a scripted `.focus()`, which Chromium doesn't treat as genuine keyboard navigation, so `:focus-visible` styling never engaged and a different native fallback rendered instead. A real mouse-click-then-Tab sequence (matching how an actual user tabs through the page) confirmed the outline is green and clearly visible. No code change made. Zero console/page errors across every test.

---

## 2026-07-22 — CTA buttons now redirect to WhatsApp; "Ver trilhas" stays internal

The page has no real checkout or enrollment backend (see the "hiring contest submission" entry near the top of this log) — the PO decided actual conversion buttons should open a real WhatsApp conversation (`https://api.whatsapp.com/send/?phone=5516990482444&text=quero%20me%20matricular...`) instead of pointing nowhere or scrolling to a CTA section with no real destination.

**Why "Ver trilhas" is excluded:** that button (in the "virada" interstitial) was deliberately built as an internal, exploratory link — "the virada invites, Formações delivers" (see the earlier entry adding it). Sending someone straight to a sales conversation before they've seen a single track contradicts `DESIGN_SYSTEM.md`'s "buttons invite, they never pressure." It keeps scrolling to `#formacoes`.

**Decision:** WhatsApp now backs every button whose own label is a conversion action — "Matricule-se" (navbar), "Começar minha jornada" (Chapter 10), "Quero essa trilha" (each of the 5 tracks in Chapter 05), and the "Matricule-se" sitemap link in the footer. The WhatsApp URL lives in one place (a shared constant), not pasted per-file, so the number/message can change in one spot later.

**How to apply:** if a new CTA-labeled button is added later, ask whether it's a conversion action (→ WhatsApp) or an exploratory/internal one (→ anchor link) — don't default to WhatsApp just because it looks like a button.

---

## 2026-07-22 — Chapter 08's growth chart replaced by a scroll-lit career journey

The PO felt the "Sua evolução em 3 anos" line chart (added a few rounds ago to fill the empty right column — see the earlier "empty and unjustified" entry) still didn't land: it's data, but not a story.

**Decision:** replace it with a vertical career journey — "Você hoje" → learning milestones → first project → first interview → first job → promotion → a final salary figure — each point lighting up as a scroll-drawn line reaches it. Reuses the exact scrub-linked line-draw technique already built for Chapter 07's method timeline, so it's proven, not new.

**Why it's not just Chapter 07 again:** Chapter 07's timeline is a descriptive step-list (numbered circles, paragraph-length explanations, light background) about the *method*. Chapter 08's journey is deliberately terser — a dot and a short label per milestone, dark background — about the *outcome*. Different content, different density, positioned two capítulos apart in the rhythm (`DESIGN_SYSTEM.md`: alternate storytelling/data/proof, avoid repetitive layouts) so they don't read as the same device twice in a row.

**How to apply:** the bar chart (Júnior/Pleno/Sênior market snapshot) stays untouched on the left — only the right column's second element changes, from a line chart to this journey. See `STORYBOARD.md` Chapter 08 for the updated Visual Direction/Motion.

---

## 2026-07-22 — Chapter 08's journey evolves into a loss-aversion comparison

The single-path career journey (above) worked, but the PO pushed it further: instead of one path showing progress, two paths compared side by side — "Esperar 1 ano" (stay at today's salary, R$2.000, ending in "Perdeu R$21.600 em diferença salarial") next to "Começar hoje" (first job at R$3.800, ending in "+R$1.800/mês, +R$21.600/ano"). Headline: "Quanto custa NÃO começar hoje?"

**Why this is stronger:** it's an opportunity-cost/loss-aversion frame, not just a progress illustration — and both paths land on the exact same number (R$21.600), once as a loss and once as a gain. That symmetry is the point: same 12 months, same magnitude, opposite outcome depending on the decision. The two final figures should animate into place at the same moment so the comparison reads instantly, not sequentially.

**Decision:** replace the single vertical journey with two parallel scroll-lit paths (still reusing the Chapter 07 line-draw scrub technique, just duplicated into two columns instead of one). Color: keep within the existing palette rather than introducing red for "loss" — the gray→green logic already used in the salary bars right next to this block (gray = Júnior/inaction, green = growth/action) carries the same meaning without a new brand color.

**How to apply:** this supersedes the single-journey entry above — implement the two-path comparison, not both versions. The bar chart on the left is still untouched.

---

## 2026-07-22 — Chapter 08's second moment simplifies to one assembling number

Asked for options stronger than the two-path comparison. Chosen: drop the diagram entirely — one giant number, "R$21.600," assembles on screen from a scattered state, the mirror image of Chapter 01's shatter (same technique — `SplitText` + randomized per-character x/y/rotation — run in reverse: chars start scattered like the shatter's end-state and animate into their settled position, not literally the same function). A deliberate callback to the site's opening signature moment, at another emotionally loaded beat.

**Why this over the two-path diagram:** simpler to build correctly with a day left (no syncing two parallel timelines), and it leans into `DESIGN_SYSTEM.md`'s "typography is the main visual element" instead of adding a second diagram type to the page. The loss/gain duality (the same R$21.600, once lost, once gained) is now carried by a caption line under the number, not by two separate paths.

**Decision:** headline stays "Quanto custa NÃO começar hoje?" Supporting line after the number settles: something like "R$1.800 a mais por mês. R$21.600 a mais por ano. A diferença entre esperar e começar." — one line doing what two columns did before. Motion: one-shot reveal on scroll entry (`toggleActions: "play none none reverse"`, per `MOTION.md`'s own rule for single-headline reveals), not continuous scrub — this is a single dramatic beat, not something to scrub back and forth through.

**How to apply:** this supersedes the two-path comparison entry above — remove that code, don't keep both. The bar chart on the left remains untouched throughout all three iterations of this block.

---

## 2026-07-22 — Chapter 08's second moment, final iteration: a transforming payslip

Fourth pass at this one block (bars-only → line chart → career journey → two-path comparison → assembling number → this). Chosen: a stylized "Contracheque" (payslip) card that visually transforms from sparse/gray (today's salary) to full/green (first dev job) as the visitor scrolls — ties directly to the chapter's own bridging copy ("o contracheque no fim do mês"), a concrete, culturally recognizable object rather than an abstract number.

**Why this is the last iteration on this block:** the deadline is tomorrow (July 23) and this is one element among ten chapters — every round past this point costs review time the rest of the page also needs. This is the version to build and keep, not another checkpoint to re-open.

**Decision:** a payslip card, header "Contracheque," transforming in place (not two side-by-side elements, avoiding the earlier sync problem):
- Starts (on scroll entry): "Salário Base — R$2.000," muted/gray, sparse.
- Transforms: a new line fades in, "+ Diferença DevClub — R$1.800" (green), the total count-up animates R$2.000 → R$3.800 (reuse the existing `data-countup` mechanic already used for the salary bars — don't build a second counter system), a small badge fades in last: "+R$21.600/ano."
- One sequential timeline, scroll-triggered once on entry (not continuous scrub) — same reveal category as the assembling-number idea it replaces.
- Headline above stays "Quanto custa NÃO começar hoje?"

**How to apply:** remove whichever previous version is currently in place (line chart, journey, two-path comparison, or assembling number — check what's actually in `RealResults.jsx` before assuming) and replace with this. The bar chart on the left is untouched, as it has been through every iteration of this block.

**Implemented:** the URL is a single export, `WHATSAPP_ENROLL_URL` in `src/lib/constants.js` (alongside the existing `cn.js`/`gsap.js` lib modules), imported into Navbar, FutureCta, Tracks and Footer — never pasted raw. All four open in a new tab (`target="_blank" rel="noopener noreferrer"`, since they now leave the site). The footer's links are data-driven, so the "Matricule-se" row carries an `external: true` flag and the row map spreads the target/rel only when that flag is set — keeping the internal anchors (and the untouched "Área do aluno" link) as same-tab navigation. Verified: all four resolve to the exact WhatsApp URL (number 5516990482444, message "quero me matricular"), a real click opens a popup to that URL, and "Ver trilhas" still scrolls to `#formacoes`; lint + build clean.

**Implemented:** `SalaryGrowthChart.jsx` and its `SALARY_GROWTH`/`GROWTH_SOURCE` data were deleted (no dead code left in the bundle — the JS chunk got slightly smaller). The journey is a new presentational `CareerJourney.jsx` (a fixed-height `<ol>` so the absolutely-positioned line passes through every dot's centre) fed by `CAREER_JOURNEY` in `testimonials.js`, whose final step ("Sênior — R$ 14.500+") repeats the Sênior bar figure for consistency. Motion lives in `createResultsAnimations` (Chapter 08's existing function): ONE scrub timeline reusing Chapter 07's scaleY line-draw — the line grows top→bottom over the whole timeline while each milestone lights up (opacity 0.3→1, dot scale 0.5→1) at sequential integer positions, so a point brightens exactly as the line's leading edge reaches it. The dim start state is set only under `no-preference`, so reduced-motion users see every milestone already lit. Verified desktop + mobile: points light strictly in order (leading-edge mid-transition captured, e.g. `[1, 1, 0.66, 0.3, …]`), reverses on scroll-up, zero console errors, lint + build clean.

**Implemented:** the single `CareerJourney` was deleted and replaced by `CareerComparison.jsx` (fed by `CAREER_COMPARISON` in `testimonials.js`). Both columns are fixed-height 3-row timelines; the "Começar hoje" column leads with a blank row (the "↓"), so its two real milestones share indices 1 and 2 with the other column — putting both final figures on the same row. Motion is ONE scrub timeline in `createResultsAnimations`: both `[data-path-line]`s draw from position 0 (in sync), and every `[data-path-row]` lights (node opacity 0.3→1, dot scale 0.5→1) at time = its row index. Since both finals sit at the same index, they brighten at the identical scroll position — verified desktop + mobile with a per-frame opacity probe: the two finals' opacity delta was exactly 0.00 at every scroll sample (0.3→0.88→1 together), lines drew in lockstep, blank leading row correctly skipped (3 nodes left / 2 right), reverses on scroll-up, zero console errors, lint + build clean. Colour stays gray (inaction) vs green (action), no red.

**Implemented:** `CareerComparison.jsx` and `CAREER_COMPARISON` were deleted; the right column is now inline markup in `RealResults.jsx` (label + a giant `[data-cost-number]` + `[data-cost-caption]`), mirroring the left bars column which is also inline. Data is `COST_REVEAL` in `testimonials.js`. Motion is a new `createCostReveal` in `results.timeline.js`, run from its own `useGSAP` hook so the returned `() => split.revert()` cleanup reaches useGSAP. It mirrors the hero shatter — `SplitText` into chars, `gsap.from` with the hero's exact random ranges (x ±420, y −260/+520, rotation ±140, rotationY ±90) — run forwards (scattered → settled), plus the caption after the number lands, on a `toggleActions: 'play none none reverse'` timeline (one-shot reveal, not scrub). Follows the hero's two hard-won rules: plain `window.matchMedia` (NOT `gsap.matchMedia`, whose add-callback isn't captured by useGSAP) and a returned split cleanup, so a StrictMode remount can't strand chars. The number is solid green (not a gradient clip — background-clip:text doesn't survive SplitText char spans, same reason as the hero). Verified desktop + mobile with a per-char transform/opacity probe: first entry settles cleanly (8/8 chars identity transform, opacity 1), leaving upward reverses to fully scattered/invisible, and RE-ENTRY replays with zero stranded chars (8/8 settled again); the caption surfaces after the number lands; mid-frame probe confirms the scattered→settled assembly; zero console errors; lint + build clean.

**Implemented:** the assembling-number (`createCostReveal`, `COST_REVEAL`, its own useGSAP hook) was removed; the right column is now an inline "Contracheque" card in `RealResults.jsx` (`[data-payslip]` → header, "Salário Base R$2.000" gray, a green "+ Diferença DevClub R$1.800" line, a "Total" with `[data-payslip-total]`, and a corner stamp `[data-payslip-badge]` "+R$21.600/ano"). The count-up mechanic was extracted from `counters.js` into a shared `makeCountUp(el, {from, to})` (render + tween vars, no trigger); `initCounters` now uses it for the bars, and the payslip's total reuses it for R$2.000→R$3.800 inside the sequence — one mechanic, not two. Motion lives in `createResultsAnimations` (no SplitText, so no separate hook): ONE `toggleActions: 'play none none reverse'` timeline — the green line grows in (height+margin+autoAlpha from 0), the total counts up as it lands, and the badge stamps in last (scale+rotation via `back.out`). The hidden/dim start state is set only under `no-preference`, so reduced-motion users see the finished payslip (green line, total already R$3.800, badge). Verified desktop + mobile with a timed probe: sequence fires strictly in order (gray/total 2.000/badge hidden → green line h 0→24 & total counting → badge op 0→1, scale 0.5→1), reverses when parked at top, replays on re-entry, and the salary-bar count-up still works after the refactor (R$0→R$3.800); zero console errors; lint + build clean.

---

## 2026-07-22 — Preparing the repo to go public: technical report, doc visibility, housekeeping

The PO is about to flip the GitHub repo from private to public, ahead of submission. Three things followed from that.

**Documentation for the "you must understand what the AI did" requirement.** Wrote `docs/TECHNICAL_REPORT.md` — a directory-by-directory, file-by-file walkthrough (what each file does, what's not obvious, why it exists in that shape) plus an explicit "what's real vs. invented vs. demo-only" map and a table of likely interview questions with pointers to where the real answer lives. Deliberately **not** a literal line-by-line transcript of every file — that would mostly restate what well-named code already says. It leans on this log constantly rather than repeating it.

**Whether to hide `docs/*.md` from the public repo.** The PO's instinct was to gitignore "the prompts" so competitors can't copy the strategy. Raised the conflict directly: these files (this log especially) are the primary evidence of the exact reasoning the evaluator says he'll interrogate in the interview — hiding them removes the PO's best defense, not just a competitive edge. Also: there are no literal prompt-transcript files anywhere in the repository to hide (checked the full file tree) — every prompt used to direct implementation work lived outside this repo, in the planning session's own scratch space, never committed here. **Decision: keep `docs/` (and `.claude/CLAUDE.md`, the project's root instructions — same reasoning applies) fully public.** The repo was already private through all of development specifically to cover the "don't let competitors see the strategy before submission" concern (see the earlier private-repo entry) — that concern is about timing, not permanence.

**What's actually worth hiding, then:** almost nothing. `.claude/settings.local.json` is a local Bash-permission allowlist with zero content value to a public reader (see it yourself — one line) and is `.local.` by Claude Code's own naming convention, meaning it isn't meant to be shared. Added to `.gitignore` and untracked with `git rm --cached` (the working copy stays on disk, unaffected).

**Housekeeping surfaced along the way (unrelated to hiding anything, just tidiness before going public):** several `src/*/.gitkeep` files are dead weight now that their folders hold real, tracked files (`components/`, `data/`, `hooks/`, `layouts/`, `providers/`, `sections/`) — removed. `src/features/`, `src/pages/`, `src/types/`, `src/utils/` are empty and don't match how the project actually organized itself (no routing, no TypeScript, `lib/` already covers utilities) — removed rather than left as unexplained empty scaffolding for a public visitor to wonder about. `src/assets/` is the one empty folder kept — it has an articulated future purpose (real photos replacing the Unsplash/randomuser.me placeholders), noted in `TECHNICAL_REPORT.md` §12.

**How to apply:** if asked why an AI-authored technical report exists in the repo at all, the honest answer is in its own opening section — it's a study aid for defending the code, not a replacement for understanding it.

**Implemented:** removed the six orphan `.gitkeep` files (`components/`, `data/`, `hooks/`, `layouts/`, `providers/`, `sections/` — all now hold real tracked files) and the four empty scaffolding folders (`features/`, `pages/`, `types/`, `utils/`); kept `src/assets/.gitkeep`. Added `.claude/settings.local.json` to `.gitignore` and untracked it with `git rm --cached` (the note: `*.local` already in the ignore file does NOT match it — the filename ends in `.json`, so the explicit line was required); the working copy is untouched. `docs/` and `.claude/CLAUDE.md` stay tracked/public by design. `docs/TECHNICAL_REPORT.md` (new), `docs/DECISION_LOG.md`, and `README.md` committed. Lint + build clean after the folder removals (no import referenced them — grep-confirmed before deleting). Repo is ready for the PO to flip public.
