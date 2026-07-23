# DevClub Premium

# Storyboard

## Purpose

This document defines the complete narrative experience of the landing page.

This is NOT a sitemap.

This is NOT a wireframe.

This is the emotional journey that every visitor should experience while scrolling.

Every section must answer one question.

Every transition must prepare the visitor for the next chapter.

The visitor is the protagonist.

DevClub is the guide.

---

# Experience Principles

The experience should feel like an interactive documentary.

Not a sales page.

Not an online course website.

Not a marketing funnel.

Scrolling should feel natural.

The visitor should never feel overwhelmed.

Large sections are acceptable.

Repetitive sections are not.

Alternate rhythm between:

- Storytelling
- Data
- Motion
- Proof
- Emotion
- Interaction

Every chapter must have a clear objective.

---

# Chapter 01 — The First Decision

Opens with a Prólogo beat — not a separate chapter, just its first few seconds: the "assemble" phase of the signature motion in `MOTION.md`, before the headline settles into rest. Nothing is asked of the visitor yet, only shown.

## Emotional Goal

Curiosity.

Possibility.

Hope.

## Message

Every software engineer started exactly where you are today.

Everyone had a first line of code.

Everyone had a first commit.

Your future starts with one decision.

## Visual Direction

Minimal.

Large typography.

Dark background.

Strong contrast.

Few visual elements.

## Motion

Smooth reveal.

Split text animation — see the signature "assemble → rest → shatter" scrub technique in `MOTION.md` (from the navbardigital.com reference) as the concrete execution of this.

Background movement.

Soft parallax.

Consider the current site's own typewriter hero device (see `BRAND.md`) — a role name with a blinking cursor cycling through Front-End_ / Back-End_ / FullStack_ — as a detail once the headline reaches rest, echoing existing DevClub identity rather than only the borrowed shatter technique.

## CTA

Continue scrolling.

---

# Chapter 02 — Why Technology?

## Emotional Goal

Identification.

## Message

Technology changes lives.

Programming is not about writing code.

It is about solving problems.

Creating opportunities.

Building freedom.

## Visual Direction

Large cards.

Statistics.

Real numbers.

Icons.

Timeline.

## Motion

Reveal on scroll.

Counters.

Horizontal movement.

---

# Chapter 03 — The Challenge

## Emotional Goal

Empathy.

## Message

Learning alone is difficult.

Too much information.

No direction.

No feedback.

No community.

Many people quit before they even begin.

## Visual Direction

More contrast.

Broken layouts.

Smaller elements.

Visual tension.

## Motion

Scroll transitions.

Fade.

Blur.

Depth.

---

# Chapter 04 — Meet DevClub

## Emotional Goal

Trust.

## Message

DevClub is not just another course.

It is a community.

A methodology.

A roadmap.

Mentorship.

Support.

Consistency.

## Visual Direction

Premium containers.

Videos.

Community photos.

Platform preview.

## Motion

Section reveal.

Cards.

Floating elements.

---

# Chapter 05 — Trilhas de Formação

## Emotional Goal

Aspiration.

Specificity.

## Message

DevClub is not one course. It is a catalog of learning tracks — Front-end, Back-end, Full Stack, Mobile, AI & Automation, Data.

Whatever direction fits your goal already exists here.

This chapter exists to satisfy a concrete requirement: the page must show "as formações" — the actual course catalog, by name.

## Visual Direction

No cards. A large typographic list — track names set in big type, one per line, in the style of a numbered index (the Navbar Digital services-list principle from `DESIGN_SYSTEM.md`, not a card grid).

Each line: number, track name, one short qualifier (e.g. "01 — Front-end — do zero ao avançado"). Nothing else competing for attention.

The current site gives each track its own accent color (JS=yellow, Front-end=cyan, Back-end=green, Mobile=blue, MBA=teal — see `BRAND.md`). Echo this with a small colored marker per line (a dot, the number itself, or a thin left rule) — enough to preserve that real distinction without reintroducing a card-tile grid.

This deliberately avoids the "online course catalog" look the PO flagged as a risk — it should read as an index in a story, not a product list.

## Motion

Lines stagger-reveal as the section enters view, each with a slight upward motion — not a horizontal carousel.

## CTA

Continue scrolling.

---

# Chapter 06 — Conheça Quem Ensina

## Emotional Goal

Trust in specific people, not just the institution.

## Message

Behind every track are real specialists who work in the market, not just pre-recorded slides.

This chapter exists to satisfy a concrete requirement: the page must show "nossos tutores" — named instructors, by face and role.

## Visual Direction

No card grid. A horizontal film-strip of portraits — instructors presented like a cast list in a documentary, one continuous row.

Name and role stay hidden by default, revealed on hover/focus or as each portrait nears center on scroll — the photo carries the section, not a bio card.

This deliberately avoids the "meet our teachers" course-website trope the PO flagged as a risk.

## Motion

Horizontal scroll-linked reveal of the strip.

Name/role fade in per portrait as it reaches the focal point, fade out as it passes.

## CTA

Continue scrolling.

---

# Chapter 07 — How It Works

## Emotional Goal

Clarity.

## Message

Learning should be simple.

Step by step.

Structured.

Practical.

Project-based.

## Visual Direction

Timeline.

Journey.

Progress.

## Motion

Scroll-driven timeline.

Animated path.

---

# Chapter 08 — Real Results

## Emotional Goal

Confidence.

## Message

Thousands of students have transformed their careers.

Show real stories.

Companies.

Achievements.

Numbers.

Signature moment: an animated salary comparison bar chart — Junior/Pleno/Senior, gray → purple → green, exactly as the current DevClub site already does (real existing content, not a borrowed idea — see `BRAND.md`). Keep the source-citation line (e.g. "Fonte: GlassDoor e LinkedIn...") even with invented numbers — it's a cheap, real credibility signal already in use.

Second signature moment, beside the bars: "Quanto custa NÃO começar hoje?" — a stylized payslip ("Contracheque") card that transforms in place from sparse/gray (today's salary, R$2.000) to full/green (first dev job, R$3.800 + a "+R$21.600/ano" badge) as the visitor scrolls into it. Ties directly to this chapter's own bridging copy ("o contracheque no fim do mês") — a concrete, recognizable object rather than an abstract chart or number (see `DECISION_LOG.md` for the full evolution of this block — this is the final iteration, not another checkpoint).

## Visual Direction

Testimonials.

Companies.

Metrics.

Community.

Animated horizontal bar chart, three bars (Junior/Pleno/Senior) growing to different lengths with the gray→purple→green progression already used on the current site.

The comparison: two thin vertical lines side by side, each with small dot markers and short labels — minimal, more "commit log" than the descriptive step-list already used in Chapter 07's method timeline. "Esperar 1 ano" in muted gray tones (echoing the Júnior bar), "Começar hoje" in green (echoing the Sênior bar) — no new color introduced for "loss," the existing gray→green logic already carries the meaning.

## Motion

Carousel.

Count-up.

Reveal.

Hover interactions.

Bars grow into place on scroll entry, staggered per row.

The payslip transforms once on scroll entry (`toggleActions: "play none none reverse"`, per `MOTION.md`) — a single sequential timeline, not continuous scrub: gray line item first, then the green "+ diferença" line fades in, then the total counts up (reusing the existing `data-countup` mechanic from the salary bars), then the yearly badge lands last.

---

# Chapter 09 — Beyond Code

## Emotional Goal

Belonging.

## Message

DevClub is more than programming.

It is friendships.

Networking.

Support.

Growth.

Events.

Community.

## Visual Direction

Photos.

Gallery.

Human moments.

Large spacing.

## Motion

Masonry reveal.

Horizontal gallery.

---

# Chapter 10 — Your Future Starts Now

## Emotional Goal

Action.

## Message

The only difference between who you are today and the developer you want to become...

...is the decision to start.

## Visual Direction

Minimal.

Almost empty.

Powerful typography.

Strong CTA.

Consider a full-bleed inversion to the primary green or secondary purple background with dark text, per the Navbar Digital reference in `DESIGN_SYSTEM.md` — restraint in content, boldness in color, not a contradiction.

## Motion

Very subtle.

Long pause.

Large spacing.

Final fade.

Closes with an Epílogo beat — not a separate chapter, just the last few seconds: after the CTA, one final breath of empty space and fade before the footer, echoing the Prólogo's restraint from Chapter 01.

---

# Ending

The visitor should leave with only one thought:

"The next success story could be mine."

---

# Validation Checklist

Every chapter must:

✓ Have one emotional objective

✓ Have one communication objective

✓ Have one visual objective

✓ Have one motion objective

✓ Naturally lead to the next chapter

If a section does not contribute to the story, remove it.
