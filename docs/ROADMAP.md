# DevClub Premium

# Roadmap

## Purpose

This document sequences the project into phases. Each phase has a single objective and a clear definition of done. Do not start a phase before the previous one is approved — this project is not implemented in one pass.

---

# Phase 0 — Foundation (docs)

Objective: every document in "Required Reading" has real content, so no implementation step requires guessing a product decision.

- [x] `PROJECT_VISION.md`, `STORYBOARD.md`, `DESIGN_SYSTEM.md`, `ARCHITECTURE.md` — pre-existing.
- [x] `BRAND.md` — filled from analysis of the current devclub.com.br (colors, type, logo, imagery, voice).
- [x] `MOTION.md` — global motion tokens defined (easing, duration, scroll behavior, reduced motion).
- [x] `ROADMAP.md` — this document.

Definition of done: no empty file remains in the Required Reading list.

---

# Phase 1 — Project Setup

Objective: a running, empty shell that matches `ARCHITECTURE.md` exactly, with no section content yet.

Scope:

- Scaffold Vite + React per `ARCHITECTURE.md`.
- Install and configure: Tailwind CSS, GSAP + ScrollTrigger + SplitText, Lenis, Lucide React, clsx, tailwind-merge.
- ESLint + Prettier configured.
- Tailwind theme extended with the tokens from `BRAND.md` (colors, both font families) and the scale from `MOTION.md` (durations) — so later work references tokens, not raw values.
- Base project structure (`src/app`, `src/components`, `src/features`) per `ARCHITECTURE.md`.
- `git init` + first commit, then connect to the PO's existing remote: `https://github.com/hsiqueira98/DevClub2.0` and push. Note: the first push on this machine will trigger an interactive GitHub login popup (Git Credential Manager) — this needs the PO present to approve it once; it cannot be completed by an agent alone.

Out of scope: any real section/chapter content, any GSAP choreography.

Definition of done: `npm run dev` renders an empty page with the correct fonts, dark background token and no console errors.

---

# Phase 2 — Skeleton of the 10 Chapters

Objective: every chapter from `STORYBOARD.md` exists as a real, navigable section in correct order, with real (invented, per the contest rules) copy and layout — no motion polish yet.

Scope, one section per chapter:

1. The First Decision (hero)
2. Why Technology?
3. The Challenge
4. Meet DevClub
5. Trilhas de Formação (course catalog)
6. Conheça Quem Ensina (named instructors)
7. How It Works
8. Real Results (includes the salary comparison chart)
9. Beyond Code
10. Your Future Starts Now

Each section: semantic HTML, correct heading hierarchy, Tailwind layout matching the "Visual Direction" notes per chapter, real or representative copy (voice from `BRAND.md`), no large placeholder lorem ipsum blocks. Plain CSS transitions only if needed to smoke-test scroll flow — no GSAP choreography yet.

Definition of done: scrolling top to bottom reads as the intended emotional journey even without animation, on both desktop and mobile.

---

# Phase 3 — Motion Choreography

Objective: implement the actual per-chapter motion from `STORYBOARD.md`, using the tokens from `MOTION.md`. This is 30% of the contest grade — it is not optional polish, it is core scope.

One chapter at a time where practical, but do not let phase gating stall momentum — see Working Agreement below.

---

# Phase 4 — Visual Polish, Baseline Accessibility & SEO

Objective: refine invented content (testimonials, logos, numbers) for plausibility, apply the accessibility baseline from the Contest Context Override in `CLAUDE.md` (semantic HTML, contrast, visible focus, keyboard reachability), and add basic SEO (page title, meta description, Open Graph tags, favicon, one `<h1>` per page). Not a full audit, not a performance optimization pass — SEO here means the cheap, obvious wins, not a strategy.

---

# Phase 5 — Deploy & Submission

Objective: production deploy (Vercel, per `ARCHITECTURE.md`) and a repo the evaluator can actually open. Submission itself (email to contato@rodolfomori.com with name, city/state, published link, repo link, LinkedIn + pitch, salary expectation) is a manual step for the PO, not an implementation task.

**Reminder:** the repo (`github.com/hsiqueira98/DevClub2.0`) is currently private — intentional, to protect the idea while building. Before submitting, either flip it to public or add Rodolfo as a collaborator, otherwise the evaluator can't open the code that's being judged.

Deadline: July 23.

---

# Working Agreement

Given the contest deadline, Phases 1–4 are authorized to proceed in the same working session without waiting for a separate approval between each one — the CLAUDE.md communication loop (explain strategy, list affected files, implement) still applies at each phase boundary, but as a checkpoint to report progress, not a hard stop waiting for a go-ahead. Phase 5 (actual submission) is manual and stays with the PO.
