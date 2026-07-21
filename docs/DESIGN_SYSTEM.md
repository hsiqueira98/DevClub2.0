# DevClub Premium

# Design System

## Purpose

This document defines the visual language and interaction principles of the DevClub Premium project.

Every interface decision must reinforce the project's vision, storytelling and brand identity.

Consistency is more important than creativity.

---

# Design Philosophy

The interface should feel:

- Premium
- Modern
- Human
- Cinematic
- Clean
- Confident
- Inspiring

Never:

- Corporate
- Cold
- Generic
- Overloaded
- Noisy
- Flashy

---

# Visual Principles

Large typography over large paragraphs.

Spacing over separators.

Motion over decoration.

Meaning over quantity.

Less elements.

More impact.

---

# Color System

## Primary Green

Purpose

- Progress
- Growth
- Success
- Action

Usage

- Primary CTA
- Highlights
- Interactive elements
- Active states

---

## Secondary Purple

Purpose

- Vision
- Innovation
- Community
- Atmosphere

Usage

- Background glows
- Decorative gradients
- Accent lighting
- Motion effects

---

## Neutral Black

Purpose

Focus.

Depth.

Premium feeling.

Should dominate most sections.

---

## Neutral White

Purpose

Contrast.

Reading.

Balance.

Never use pure white backgrounds.

---

## Gray Scale

Use grays to create rhythm.

Never compete with primary colors.

---

# Typography

Typography is the main visual element.

Headlines must dominate.

Body text should support.

Never the opposite.

---

## Heading Rules

Large.

Bold.

Minimal.

Easy to scan.

Short sentences.

---

## Paragraph Rules

Maximum readability.

Avoid long paragraphs.

Prefer:

- lists
- numbers
- highlighted keywords
- visual rhythm

---

# Layout

Desktop-first.

Responsive by design.

Maximum content width:

1280px

Sections should breathe.

Never compress information.

---

# Spacing

Whitespace is part of the design.

Increase spacing before increasing complexity.

Large sections are encouraged.

Crowded layouts are forbidden.

---

# Containers

Each container represents a new chapter.

Containers should clearly separate moments of the story.

Avoid unnecessary borders.

Use spacing and background changes instead.

## Reference: Amphora execution pattern

Confirmed from a real screenshot review of amphora-it.com (see `DECISION_LOG.md`). Concrete techniques to reuse:

- Background color itself shifts between chapters (dark navy → black → a color-tinted glow → light section for a proof/case-study moment → dark again) instead of relying on dividers.
- Each new container has large rounded top corners and visually "rises" over the previous section as the visitor scrolls past it — reinforces the chapter-change feeling from `STORYBOARD.md` without needing a hard cut.
- Headline pattern: bold sans-serif for most of the sentence, with one accent word set in italic and rendered in a color gradient (green or purple, per `BRAND.md`). Use this consistently as the project's headline signature, the way Amphora uses it in nearly every section.
- A radial/orbital layout (small cards in a circle around a central mark, connected by a dotted orbit line) is an effective, non-generic way to present a small group of related facts (e.g. 5 items) — worth using for a methodology or trust-pillars moment instead of a plain grid.
- Client/trust logos work well as a continuous horizontal marquee strip, not a static grid.

## Reference: Navbar Digital execution pattern

Confirmed from real screenshots of navbardigital.com (see `DECISION_LOG.md`). Additional transferable techniques:

- A small tracked-uppercase "kicker" label above every section headline is a good idea in principle — but DevClub's current site already has its own version of this (the terminal-cursor underscore labels documented in `BRAND.md`, e.g. `salário_`). Use that native device, not the parenthetical style shown here.
- A long catalog (their services, 8 items) reads better as a numbered list with hairline dividers (`01 Website Development`, `02 Mobile App Development`...) than as a card grid — worth considering for `STORYBOARD.md` Chapter 05 (Trilhas de Formação) as an alternative or complement to the horizontal-scroll card layout.
- A light/cream background section breaks the dark rhythm partway through the page (their "How we drive growth" section) — same technique Amphora uses, confirms it's a reliable pattern, not a one-off.
- The final CTA chapter can fully invert to a solid accent-color background with dark text (their whole final section is lime-green, not just a button on dark) — a strong, confident closing move worth considering for Chapter 10 (Your Future Starts Now).
- Testimonials work well minimal — a large centered quote with just a name/title underneath, no card, no avatar — as a second valid option alongside the video-testimonial-card style from Amphora.

---

# Cards

Cards must have clear hierarchy.

Featured cards may break the grid.

Avoid repetitive layouts.

Mix:

- large
- medium
- compact

---

# Buttons

Buttons invite.

They never pressure.

Primary buttons

Confident.

Secondary buttons

Supportive.

Hover states should feel responsive, never exaggerated.

---

# Icons

Use Lucide React.

Outline style.

Consistent stroke width.

Never mix icon libraries.

---

# Images

Prefer authentic images.

Avoid generic stock photos.

Large imagery.

High quality.

Use images to reinforce trust.

---

# Motion Integration

Motion must support the interface.

Never distract.

Every animation should improve comprehension.

---

# Accessibility

Minimum AA contrast.

Visible focus.

Keyboard navigation.

Semantic HTML.

Screen reader friendly.

---

# Responsive Principles

Mobile is not a simplified desktop.

It is a redesigned experience.

Preserve storytelling.

Adapt layouts.

Never simply stack everything.

---

# Performance Principles

Avoid unnecessary DOM nodes.

Prefer CSS when possible.

Use GSAP only when interaction benefits.

Optimize images.

Lazy-load heavy assets.

---

# Component Philosophy

Every component should solve one problem.

Every component should be reusable.

Avoid large components.

Favor composition.

---

# Validation Checklist

Before approving any UI:

✓ Does it improve the story?

✓ Does it improve usability?

✓ Does it respect the brand?

✓ Does it feel premium?

✓ Would Apple, Linear or Vercel ship something with this level of quality?

If not, iterate.