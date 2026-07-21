# DevClub Premium

# Frontend Architecture

## Purpose

This document defines the architectural standards for the DevClub Premium project.

The goal is to ensure scalability, maintainability, readability and production-level quality.

Every implementation must follow these standards.

---

# Architecture Philosophy

This is not a prototype.

This is a production-grade frontend application.

The architecture must prioritize:

- Simplicity
- Predictability
- Reusability
- Scalability
- Performance

Named explicitly, since they're the same thing: SOLID, DRY, KISS.

Always choose the simplest solution that satisfies the requirements.

---

# Technology Stack

Core

- React
- Vite

Styling

- Tailwind CSS

Animation

- GSAP
- ScrollTrigger
- SplitText
- Lenis
- Framer Motion — fallback only, for the rare case a specific interaction is awkward in GSAP. GSAP is the default; do not reach for Framer Motion first.

Icons

- Lucide React

Utilities

- clsx
- tailwind-merge

Quality

- ESLint
- Prettier

Deployment

- Vercel

---

# Project Structure

src/

app/

components/

features/

hooks/

layouts/

lib/

styles/

assets/

data/

types/

utils/

animations/

providers/

sections/

pages/

main.jsx

---

# Folder Responsibilities

## app

Application setup.

Providers.

Global configuration.

---

## components

Reusable UI.

Never contain business logic.

Buttons.

Cards.

Inputs.

Containers.

Badges.

---

## sections

Landing page chapters.

Hero.

Community.

Journey.

Testimonials.

CTA.

Each section should be independent.

---

## features

Feature-specific logic.

Only create when complexity justifies.

---

## animations

GSAP timelines.

ScrollTrigger logic.

Animation helpers.

No animation code inside UI components unless trivial.

---

## hooks

Reusable custom hooks.

Never duplicate behavior.

---

## lib

Third-party wrappers.

Utilities.

Configurations.

---

## utils

Pure utility functions.

No React code.

---

## data

Static content.

Numbers.

Testimonials.

Timeline.

Company logos.

Avoid hardcoded content inside components.

---

# Component Standards

One responsibility.

Small files.

Composable.

Reusable.

Readable.

Prefer composition over inheritance.

---

# Component Naming

PascalCase

HeroSection

JourneyTimeline

CompanyCarousel

TestimonialCard

PrimaryButton

---

# Hooks

Prefix:

use

Examples

useScrollProgress

useRevealAnimation

useHeroTimeline

useIntersection

---

# Animation Architecture

GSAP should be isolated.

Never mix large animation logic with JSX.

Create dedicated animation files whenever possible.

Example

animations/

hero.timeline.js

journey.timeline.js

numbers.timeline.js

---

# Styling

Tailwind only.

Avoid inline styles.

Avoid duplicated utility classes.

Extract reusable patterns into components.

---

# State Management

Prefer local state.

Avoid global state unless required.

Do not introduce complexity prematurely.

---

# Performance

Lazy-load heavy sections when appropriate.

Optimize images.

Reduce layout shift.

Avoid unnecessary renders.

Memoize only when measurable.

---

# Accessibility

Semantic HTML first.

Keyboard navigation.

Visible focus.

Proper heading hierarchy.

Descriptive buttons.

Accessible forms.

---

# Responsive Strategy

Design desktop-first.

Adapt intentionally.

Do not simply collapse layouts.

Maintain storytelling across all breakpoints.

---

# SEO

Semantic headings.

Structured metadata.

Meaningful alt text.

Fast loading.

Proper title hierarchy.

---

# Code Quality

Readable over clever.

Explicit over implicit.

Consistency over personal preference.

Every file should have one clear purpose.

---

# Pull Request Mindset

Before considering a task complete, verify:

- Readability
- Reusability
- Accessibility
- Performance
- Consistency
- Storytelling alignment

---

# Definition of Done

A feature is complete only if:

✓ Functional

✓ Responsive

✓ Accessible

✓ Animated (when required)

✓ Matches the design system

✓ Matches the storyboard

✓ Production-ready

If any item fails, the task is not complete.