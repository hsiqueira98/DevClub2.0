import { Plus } from 'lucide-react'
import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import AccentText from '../components/AccentText'
import { FAQ } from '../data/faq'

/*
 * FAQ chapter (added on PO review — see DECISION_LOG.md), using the
 * site's own `faq_` terminal-cursor device. Native details/summary:
 * accessible and keyboard-operable with zero JS state.
 */
export default function Faq() {
  return (
    <Chapter id="faq" bg="bg-night-950" innerClassName="text-center">
      <Kicker className="mb-6" data-reveal>
        faq
      </Kicker>

      <h2
        data-reveal
        className="font-display mx-auto max-w-3xl text-4xl leading-tight text-white md:text-6xl"
      >
        Perguntas <AccentText color="green">frequentes</AccentText>.
      </h2>

      <div data-reveal-group className="mx-auto mt-16 max-w-3xl text-left">
        {FAQ.map((item) => (
          <details
            key={item.question}
            className="group border-night-600 border-t last:border-b"
          >
            <summary className="duration-fast flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium text-gray-300 transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
              {item.question}
              <Plus
                size={20}
                aria-hidden="true"
                className="duration-fast shrink-0 text-green-500 transition-transform group-open:rotate-45"
              />
            </summary>
            <p className="max-w-2xl pb-8 leading-relaxed text-gray-500">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </Chapter>
  )
}
