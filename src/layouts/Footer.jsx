import LogoMark from '../components/LogoMark'

const NAV = [
  { href: '#mercado', label: 'Mercado' },
  { href: '#formacoes', label: 'Formações' },
  { href: '#tutores', label: 'Tutores' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#faq', label: 'FAQ' },
]

// Text links, not icons: lucide-react 1.x dropped brand icons, and
// mixing icon libraries is forbidden by docs/DESIGN_SYSTEM.md.
const SOCIAL = [
  { href: 'https://instagram.com/devclub', label: 'Instagram' },
  { href: 'https://youtube.com/@devclub', label: 'YouTube' },
  { href: 'https://linkedin.com/company/devclub', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-night-950 relative px-6 py-16 md:px-12">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark size={24} className="text-green-500" />
          <div>
            <p className="font-display text-white">DevClub</p>
            <p className="text-sm text-gray-600">
              A Escola das Profissões do Futuro.
            </p>
          </div>
        </div>

        <nav aria-label="Seções da página">
          <ul className="flex flex-wrap gap-6">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="duration-fast text-sm text-gray-500 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-3">
          {SOCIAL.map(({ href, label }) => (
            <li key={label}>
              <a
                href={href}
                className="border-night-600 duration-fast rounded-full border px-4 py-2 text-sm text-gray-500 transition-colors hover:border-green-500 hover:text-green-500"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-12 max-w-[1280px] text-xs text-gray-600">
        © 2026 DevClub. Página conceitual — conteúdo ilustrativo.
      </p>
    </footer>
  )
}
