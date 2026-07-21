import { useEffect, useState } from 'react'
import LogoMark from '../components/LogoMark'
import { cn } from '../lib/cn'

const LINKS = [
  { href: '#mercado', label: 'Mercado' },
  { href: '#formacoes', label: 'Formações' },
  { href: '#tutores', label: 'Tutores' },
  { href: '#metodo', label: 'Método' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#faq', label: 'FAQ' },
]

/*
 * Floating navbar (PO request — see DECISION_LOG.md): rests as a
 * centered pill over the hero, and expands to a full-width blurred bar
 * once the visitor scrolls. Width/radius/spacing morph via CSS
 * transitions between fixed values (auto keywords don't interpolate).
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Navegação principal"
        className={cn(
          'duration-slow mx-auto flex w-full items-center justify-between gap-6 border backdrop-blur-md transition-all',
          scrolled
            ? 'border-night-700 bg-night-950/85 max-w-[120rem] rounded-none border-x-0 border-t-0 px-6 py-3 md:px-12'
            : 'border-night-600 bg-night-900/60 mt-5 max-w-[calc(100%-3rem)] rounded-full px-6 py-2.5 md:max-w-3xl',
        )}
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

        <a
          href="#futuro"
          className="duration-fast text-night-950 shrink-0 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold transition-colors hover:bg-green-400"
        >
          Matricule-se
        </a>
      </nav>
    </header>
  )
}
