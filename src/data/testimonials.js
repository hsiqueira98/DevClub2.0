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
 * Chapter 08 second moment (PO round — see DECISION_LOG.md): one giant
 * number, R$ 21.600, that assembles on screen (the mirror of Chapter
 * 01's shatter). The caption carries the loss/gain duality a two-path
 * diagram used to — the same figure as a monthly and a yearly gain. The
 * maths stays consistent with the bars: R$ 3.800 (≈ the Júnior bar) −
 * R$ 2.000 = R$ 1.800/mês × 12 = R$ 21.600/ano. Invented but plausible.
 */
export const COST_REVEAL = {
  label: 'Quanto custa NÃO começar hoje?',
  amount: 'R$ 21.600',
  caption:
    'R$ 1.800 a mais por mês. R$ 21.600 a mais por ano. A diferença entre esperar e começar.',
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
