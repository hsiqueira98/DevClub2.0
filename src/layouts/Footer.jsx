import LogoMark from '../components/LogoMark'
import NewsletterForm from '../components/NewsletterForm'

/*
 * Sitemap footer (PO request — see DECISION_LOG.md): newsletter band
 * on top, then brand + three link columns, then the legal line.
 * Text social links: lucide-react 1.x dropped brand icons, and mixing
 * icon libraries is forbidden by DESIGN_SYSTEM.md.
 */
const COLUMNS = [
  {
    title: 'Navegação',
    links: [
      { href: '#inicio', label: 'Início' },
      { href: '#mercado', label: 'Mercado' },
      { href: '#virada', label: 'A virada' },
      { href: '#metodo', label: 'Método' },
      { href: '#resultados', label: 'Resultados' },
      { href: '#comunidade', label: 'Comunidade' },
    ],
  },
  {
    title: 'Formações',
    links: [
      { href: '#formacoes', label: 'Fullstack JavaScript' },
      { href: '#formacoes', label: 'Front-end' },
      { href: '#formacoes', label: 'Back-end' },
      { href: '#formacoes', label: 'Mobile · React Native' },
      { href: '#formacoes', label: 'MBA · Pós-graduação' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { href: '#blog', label: 'Blog' },
      { href: '#faq', label: 'FAQ' },
      { href: '#tutores', label: 'Quem ensina' },
      { href: 'https://alunos.devclub.com.br', label: 'Área do aluno' },
      { href: '#futuro', label: 'Matricule-se' },
    ],
  },
]

const SOCIAL = [
  { href: 'https://instagram.com/devclub', label: 'Instagram' },
  { href: 'https://youtube.com/@devclub', label: 'YouTube' },
  { href: 'https://linkedin.com/company/devclub', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-night-950 relative px-6 pt-16 pb-10 md:px-12">
      <div className="mx-auto max-w-[1280px]">
        {/* Newsletter band */}
        <div className="border-night-700 flex flex-col gap-6 border-b pb-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-xl text-white">
              Um guia de carreira por semana
              <span aria-hidden="true" className="animate-blink text-green-500">
                _
              </span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Sem spam. Um e-mail por semana, direto ao ponto, sobre entrar e
              crescer em tecnologia.
            </p>
          </div>
          <NewsletterForm />
        </div>

        {/* Sitemap */}
        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <LogoMark size={24} className="text-green-500" />
              <div>
                <p className="font-display text-white">DevClub</p>
                <p className="text-sm text-gray-600">
                  A Escola das Profissões do Futuro.
                </p>
              </div>
            </div>
            <ul className="mt-8 flex gap-3">
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

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="font-display text-sm tracking-widest text-gray-500 uppercase">
                {column.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="duration-fast text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Legal */}
        <div className="border-night-700 flex flex-col gap-3 border-t pt-8 text-xs text-gray-600 md:flex-row md:items-center md:justify-between">
          <p>© 2026 DevClub. Página conceitual — conteúdo ilustrativo.</p>
          <ul className="flex gap-6">
            <li>
              <a
                href="#"
                className="duration-fast transition-colors hover:text-gray-400"
              >
                Termos de uso
              </a>
            </li>
            <li>
              <a
                href="#"
                className="duration-fast transition-colors hover:text-gray-400"
              >
                Privacidade
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
