import { gsap, ScrollTrigger } from '../lib/gsap'

/*
 * Floatbar growth (PO request — see DECISION_LOG.md): the pill widens
 * continuously with the scroll (scrub, not a binary toggle) and only
 * reaches 100% of the viewport when Chapter 02 arrives — the same
 * +=160% range the hero pin occupies.
 *
 * The pill's starting width must fit its content (logo + links +
 * Login + CTA ≈ 1050px on desktop) or the CTA overflows the rounded
 * border. Values are recorded at creation — invalidateOnRefresh would
 * re-capture the from-state mid-scroll on the window load refresh and
 * lose the pill's max-width. No gsap.matchMedia here (its cleanup is
 * not captured by the useGSAP context — see hero.timeline.js).
 */
const pillState = () => ({
  maxWidth: Math.min(1120, window.innerWidth - 32),
  marginTop: 20,
  borderRadius: 28,
})

const barState = () => ({
  maxWidth: window.innerWidth,
  marginTop: 0,
  borderRadius: 0,
})

export function createNavbarTimeline(header) {
  const nav = header.querySelector('nav')
  const navLogo = header.querySelector('[data-nav-logo]')

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(nav, pillState())
    ScrollTrigger.create({
      start: 80,
      onEnter: () => gsap.set(nav, barState()),
      onLeaveBack: () => gsap.set(nav, pillState()),
    })
    return
  }

  // Direct style writes from the raw scroll progress — no GSAP value
  // capture at all. Both fromTo and lazy .to() lost the pill's
  // max-width on fast scroll cycles (capture raced the window-load
  // ScrollTrigger refresh — see DECISION_LOG.md); interpolating by
  // hand makes progress 0 land on the exact pill, always. The scroll
  // is already Lenis-smoothed, so no scrub smoothing is needed here.
  const apply = (progress) => {
    const pill = pillState()
    const bar = barState()
    const lerp = (a, b) => a + (b - a) * progress
    nav.style.maxWidth = `${lerp(pill.maxWidth, bar.maxWidth)}px`
    nav.style.marginTop = `${lerp(pill.marginTop, bar.marginTop)}px`
    nav.style.borderRadius = `${lerp(pill.borderRadius, bar.borderRadius)}px`

    // The navbar's own mark only starts appearing once the pill has
    // fully become a bar — the last 10% of this same scroll range
    // fades it from 0 to 1. `progress` here is a real 0-1 fraction of
    // the scroll (unlike the hero's own scrub timeline, whose internal
    // position numbers are NOT fractions of 1 — see hero.timeline.js),
    // so this is the only place that can reliably drive the handoff.
    if (navLogo) {
      navLogo.style.opacity = gsap.utils.clamp(0, 1, (progress - 0.9) / 0.1)
    }
  }

  apply(0)
  ScrollTrigger.create({
    trigger: '#inicio',
    start: 'top top',
    end: '+=160%',
    onUpdate: (self) => apply(self.progress),
  })
}
