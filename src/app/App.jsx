import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import SmoothScrollProvider from '../providers/SmoothScrollProvider'
import { initReveals } from '../animations/reveals'
import { initCounters } from '../animations/counters'
import FirstDecision from '../sections/FirstDecision'
import WhyTechnology from '../sections/WhyTechnology'
import TheChallenge from '../sections/TheChallenge'
import MeetDevClub from '../sections/MeetDevClub'
import Tracks from '../sections/Tracks'
import Instructors from '../sections/Instructors'
import HowItWorks from '../sections/HowItWorks'
import RealResults from '../sections/RealResults'
import BeyondCode from '../sections/BeyondCode'
import FutureCta from '../sections/FutureCta'
import Footer from '../layouts/Footer'

/*
 * The 10 chapters of docs/STORYBOARD.md, in order. Global motion
 * systems (reveals, counters) initialize here once; chapter-specific
 * choreography lives inside each section.
 */
export default function App() {
  const mainRef = useRef(null)

  useGSAP(
    () => {
      initReveals(mainRef.current)
      initCounters(mainRef.current)
    },
    { scope: mainRef },
  )

  return (
    <SmoothScrollProvider>
      <main ref={mainRef}>
        <FirstDecision />
        <WhyTechnology />
        <TheChallenge />
        <MeetDevClub />
        <Tracks />
        <Instructors />
        <HowItWorks />
        <RealResults />
        <BeyondCode />
        <FutureCta />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
