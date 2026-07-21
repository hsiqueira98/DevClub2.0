/*
 * Single GSAP entry point. Plugins are registered once here;
 * everything else imports gsap from this module so no file ever
 * registers (or forgets to register) a plugin on its own.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export { gsap, ScrollTrigger, SplitText }
