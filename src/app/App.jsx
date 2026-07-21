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
 * The 10 chapters of docs/STORYBOARD.md, in order. Each section is a
 * chapter of the story; the page is the journey.
 */
export default function App() {
  return (
    <>
      <main>
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
    </>
  )
}
