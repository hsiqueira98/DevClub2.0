/*
 * Invented testimonials (contest rules). Kept minimal — large quote,
 * name, new role — per the minimal-testimonial pattern in
 * docs/DESIGN_SYSTEM.md (Navbar Digital reference).
 */
export const TESTIMONIALS = [
  {
    quote:
      'Eu era motorista de aplicativo. Doze meses depois da primeira aula, assinei meu primeiro contrato como desenvolvedor.',
    name: 'Felipe Andrade',
    role: 'Desenvolvedor Front-end Júnior',
    photo: 'https://randomuser.me/api/portraits/men/83.jpg',
  },
  {
    quote:
      'A comunidade fez a diferença. Toda dúvida que eu travava às 23h, alguém respondia às 23h05.',
    name: 'Juliana Prado',
    role: 'Desenvolvedora Fullstack Plena',
    photo: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
  {
    quote:
      'Saí do financeiro para a tecnologia sem faculdade de TI. O que me contrataram foi o portfólio que construí aqui.',
    name: 'Rafael Siqueira',
    role: 'Engenheiro Back-end',
    photo: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
]

/*
 * Salary chart data — existing DevClub content evolved, not a borrowed
 * idea (docs/BRAND.md — Cited data). Values invented but plausible;
 * `widthPct` is the bar length the Phase 3 animation grows to.
 */
export const SALARIES = [
  { level: 'Júnior', amount: 3800, widthPct: 32, barClass: 'bg-gray-500' },
  { level: 'Pleno', amount: 8400, widthPct: 62, barClass: 'bg-purple-500' },
  { level: 'Sênior', amount: 14500, widthPct: 100, barClass: 'bg-green-500' },
]

export const SALARY_SOURCE =
  'Fonte: Glassdoor e LinkedIn. *Valores aproximados — variam por região, empresa e senioridade.'

/*
 * Chapter 08 loss-aversion comparison (PO round — see DECISION_LOG.md):
 * two parallel paths landing on the SAME figure (R$ 21.600), once as a
 * loss and once as a gain — the cost of waiting a year vs. starting now.
 * Colour stays in-palette: gray = inaction (echoes the Júnior bar),
 * green = action (echoes the Sênior bar) — no red. The maths is
 * consistent: R$ 3.800 (a first dev salary, = the Júnior bar) − R$ 2.000
 * = R$ 1.800/mês × 12 = R$ 21.600/ano. The right column leads with a
 * blank row (the "↓") so both final rows share an index and light in
 * sync. Invented but plausible.
 */
export const CAREER_COMPARISON = {
  title: 'Quanto custa NÃO começar hoje?',
  note: '*Diferença de 12 meses entre R$ 2.000 e um primeiro salário dev (R$ 3.800).',
  paths: [
    {
      key: 'wait',
      title: 'Esperar 1 ano',
      tone: 'gray',
      rows: [
        { value: 'R$ 2.000', label: 'Salário atual' },
        { label: 'Continuar igual' },
        { value: 'R$ 21.600', label: 'perdidos em diferença salarial', highlight: true },
      ],
    },
    {
      key: 'start',
      title: 'Começar hoje',
      tone: 'green',
      rows: [
        null,
        { value: 'R$ 3.800', label: 'Primeiro emprego' },
        { value: '+R$ 21.600/ano', label: '+R$ 1.800 por mês', highlight: true },
      ],
    },
  ],
}

/*
 * Hiring-company wordmarks, rendered as styled text (no fake logo
 * files). Real companies; the claim of hired alumni is invented but
 * plausible, per contest rules.
 */
export const COMPANIES = [
  'Itaú',
  'Nubank',
  'iFood',
  'Mercado Livre',
  'Stone',
  'Globo',
  'PicPay',
  'Ambev Tech',
  'TOTVS',
  'XP Inc.',
]
