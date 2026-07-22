# DevClub Premium

# Brand

## Purpose

This document defines the brand tokens extracted from the current DevClub website.

These are facts, not proposals. They exist so that visual decisions in this project start from the real DevClub identity instead of invented values.

Source: https://www.devclub.com.br/ (analyzed 2026-07-21).

---

# Logo & Mark

The current mark is a geometric pixel-block glyph, rendered in the primary green, referencing a "D" through a grid of squares.

The mark works as a small icon (favicon-scale) and should remain legible at that size.

Preserve the geometric, grid-based construction. Do not soften it into a rounded or organic shape.

---

# Typography

## Sora (superseding Aldrich + Albert Sans)

Both the original display font (Aldrich, geometric/monospace-adjacent) and body font (Albert Sans) were replaced by a PO decision with **Sora** (variable weight 100–800) site-wide — see `DECISION_LOG.md`.

This is a deliberate identity change, not an implementation detail: Aldrich was real, extracted DevClub typography, and it's what gave the terminal-cursor kicker labels and typewriter hero their "geometric/code" flavor. Sora is rounder and more generic-SaaS. Keep the kicker/typewriter _devices_ (the underscore cursor, the cycling role text) — they're still DevClub's own vocabulary — just rendered in Sora now instead of Aldrich.

Use font-weight for the hierarchy Aldrich used to carry from typeface alone: heaviest weights (700–800) for headlines, mid weights (500–600) for sub-heads/labels, 400 for body.

---

# Color System

## Primary Green

Base: `#39D353`

Light: `#5BF175`, `#49EB64`, `#4AE363`

Dark: `#23A639`, `#148527`, `#0CAE53`

Purpose: action, progress, growth — matches Project Vision's "green avocado identity."

## Secondary Purple

Base: `#8532F2`

Light: `#A855F7`, `#C084FC`, `#984BFF`

Dark: `#5217A0`, `#5300C2`, `#721AE7`, `#1C0830`

Purpose: vision, community, atmosphere — used for glows, gradients and accent lighting, never as a dominant surface color.

## Neutral Dark Scale (dominant backgrounds)

`#0A0A0A` → `#141414` → `#181719` → `#1A1A1A` → `#1E1E1E` → `#202227` → `#222222` → `#262527` → `#333333`

This scale, not pure black or pure white, is what should dominate section backgrounds.

## Gray Text Scale

`#C8CACC`, `#AAAEB3`, `#91959A`, `#777C81`, `#5E6368`

Use to build hierarchy between headline, body and muted/secondary text.

## White

`#FFFFFF` for high-contrast text and icons. `#FBF5FF` as a warmer off-white when placed on or near purple.

## Not brand colors

The current site also uses generic UI-state colors — red `#EF4444`, yellow `#EAB308`, blue `#3B82F6`. These read as default Tailwind/form-state colors (error/warning/info), not brand identity. Reuse the pattern (a reserved color per state) only if the new site needs form/status feedback — do not treat them as brand accents.

---

# Imagery Style

Real, cinematic photography — not stock photos. Confirmed from current site assets:

- Founder/team portraits: studio lighting, dark desaturated background, duotone-leaning color grade (cool shadows, warm skin tones).
- Lifestyle/hero imagery: moody, low-key, backlit or golden-hour lighting (e.g. hands on a laptop keyboard against a blurred night skyline).

This confirms the Design System's "prefer authentic images" rule with a concrete direction: dark, moody, cinematically graded — not bright/flat corporate photography.

---

# Signature UI Devices (from real screenshots of the current site)

These are DevClub's own existing devices — not borrowed from any reference — confirmed from a full screenshot review (see `DECISION_LOG.md`). Prefer these over any equivalent borrowed pattern, since preserving the brand means using DevClub's real vocabulary first.

- **Terminal-cursor kicker labels.** Every section eyebrow ends in a blinking underscore, like a terminal prompt — `apresentação_`, `indicação_`, `salário_`, `depoimentos_`, `faq_`. This takes precedence over the parenthetical-kicker device noted from Navbar Digital in `DESIGN_SYSTEM.md` — it's DevClub's own, and more on-brand for a programming school.
- **Typewriter hero headline.** "Transforme sua carreira com **Front-End_**" — the role name after "com" carries a blinking cursor, implying a cycling/typewriter effect (Front-End_, Back-End_, FullStack_...). A strong, concrete, on-brand candidate for Chapter 01's hero motion.
- **Per-track accent color.** Each course/track gets its own accent (JS=yellow, Front-end=cyan, Back-end=green, Mobile=blue, MBA=teal, institutional=purple) inside the overall green/purple system. Worth echoing as a small color marker per line in Chapter 05, without reintroducing the card-tile grid look.
- **Avatar-cluster social proof.** Overlapping circular student photos with a green ring border, next to a "+N mil alunos" count. Used repeatedly.
- **Green star-rating badge.** A filled green circle with a white star and a numeric rating (e.g. "5.0"), attached to testimonial avatars.
- **Cited data.** The real salary comparison (Junior/Pleno/Senior) already exists on the current site, with a source citation ("Fonte: GlassDoor e LinkedIn. *Valores aproximados..."). This is existing DevClub content to preserve/evolve, not an idea borrowed from the reference sites — see the correction in `DECISION_LOG.md`. Even with invented numbers (per contest rules), keep a plausible citation line — it's a cheap, real credibility signal worth keeping.

---

# Voice & Tone (from current copy)

Tagline: "A Escola das Profissões do Futuro."

The current site's voice is aspirational and outcome-driven, built around three pillars that should survive into Premium's storytelling:

- **Career transformation** — "Transforme sua carreira", "Construa sua carreira em tecnologia com o DevClub."
- **Market proof** — "Mercado Aquecido", salary figures, "Ganhe em moeda estrangeira", "Trabalhe onde quiser."
- **Institutional trust** — "Reconhecido pelo MEC", "Certificações internacionais", founder-led credibility, "Reconhecimento 5 estrelas no mercado."

Course/offer naming already in use: Formação Fullstack JavaScript, Formação Front-end, Formação Back-end, mobile (React Native), MBA/Pós-graduação (MEC-accredited).

Premium's job is to keep these three pillars but deliver them through the Storyboard's emotional chapters instead of a flat feature/price list.
