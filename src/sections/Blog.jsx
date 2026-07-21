import { ArrowRight } from 'lucide-react'
import Chapter from '../components/Chapter'
import Kicker from '../components/Kicker'
import AccentText from '../components/AccentText'
import { BLOG_POSTS } from '../data/blog'

/*
 * Blog teasers (PO request — see DECISION_LOG.md): the story keeps
 * giving after the visit. Editorial cards, no images — typography
 * carries them, per DESIGN_SYSTEM.md.
 */
export default function Blog() {
  return (
    <Chapter id="blog" bg="bg-night-900">
      <Kicker className="mb-6" data-reveal>
        blog
      </Kicker>

      <h2
        data-reveal
        className="font-display max-w-3xl text-4xl leading-tight text-white md:text-6xl"
      >
        Conteúdo que continua{' '}
        <AccentText color="green">depois daqui</AccentText>.
      </h2>

      <ul data-reveal-group className="mt-16 grid gap-6 lg:grid-cols-3">
        {BLOG_POSTS.map((post) => (
          <li key={post.title}>
            <a
              href="https://blog.devclub.com.br"
              className="group border-night-600 bg-night-800 duration-fast flex h-full flex-col rounded-3xl border p-8 transition-colors hover:border-gray-600"
            >
              <p
                className={`text-xs font-semibold tracking-widest uppercase ${post.categoryClass}`}
              >
                {post.category}
              </p>
              <h3 className="font-display mt-4 text-xl leading-snug text-white md:text-2xl">
                {post.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                {post.excerpt}
              </p>
              <p className="mt-auto flex items-center gap-4 pt-8 text-xs text-gray-600">
                {post.date} · {post.readTime} de leitura
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="duration-fast ml-auto text-green-500 transition-transform group-hover:translate-x-1"
                />
              </p>
            </a>
          </li>
        ))}
      </ul>
    </Chapter>
  )
}
