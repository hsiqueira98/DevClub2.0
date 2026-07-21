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
