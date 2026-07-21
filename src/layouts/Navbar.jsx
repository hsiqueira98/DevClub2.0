import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import LogoMark from '../components/LogoMark'
import { createNavbarTimeline } from '../animations/navbar.timeline'

const LINKS = [
  { href: '#mercado', label: 'Mercado' },
  { href: '#formacoes', label: 'Formações' },
  { href: '#tutores', label: 'Tutores' },
  { href: '#metodo', label: 'Método' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#blog', label: 'Blog' },
  { href: '#faq', label: 'FAQ' },
]

// Students' platform — separate product, hence an external URL
// (invented but plausible, per contest rules).
const STUDENT_AREA = 'https://alunos.devclub.com.br'

/*
 * Floating navbar (PO request — see DECISION_LOG.md): rests as a
 * centered pill over the hero and grows continuously with the scroll,
 * reaching full width when Chapter 02 arrives. The growth is a
 * scrub-linked tween in animations/navbar.timeline.js; width, margin
 * and radius are driven inline there, so this markup carries only the
 * static styles.
 */
export default function Navbar() {
  const headerRef = useRef(null)

  useGSAP(() => createNavbarTimeline(headerRef.current), {
    scope: headerRef,
  })

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Navegação principal"
        className="border-night-600 bg-night-950/75 mx-auto flex w-full items-center justify-between gap-6 border px-6 py-2.5 backdrop-blur-md md:px-8"
      >
        <a href="#inicio" className="flex shrink-0 items-center gap-2.5">
          <LogoMark size={22} className="text-green-500" />
          <span className="font-display text-white">DevClub</span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="duration-fast text-sm text-gray-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-4">
          <a
            href={STUDENT_AREA}
            className="duration-fast hidden text-sm font-medium text-gray-300 transition-colors hover:text-white sm:block"
          >
            Login
          </a>
          <a
            href="#futuro"
            className="duration-fast text-night-950 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold transition-colors hover:bg-green-400"
          >
            Matricule-se
          </a>
        </div>
      </nav>
    </header>
  )
}
