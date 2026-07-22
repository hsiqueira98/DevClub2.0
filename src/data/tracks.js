/*
 * Real DevClub track naming (docs/BRAND.md — Voice & Tone) with the
 * per-track accent colors already used on the current site
 * (docs/BRAND.md — Signature UI Devices). Descriptions feed the
 * per-track modal (PO round — see DECISION_LOG.md); `glow` feeds the
 * cursor-following hover effect and always points at a theme token.
 */
export const TRACKS = [
  {
    number: '01',
    name: 'Fullstack JavaScript',
    qualifier: 'do zero à primeira vaga',
    colorClass: 'bg-track-js',
    textClass: 'text-track-js',
    glow: 'var(--color-track-js)',
    description:
      'A trilha mais completa: front-end, back-end e deploy com JavaScript de ponta a ponta. Para quem parte do zero absoluto e quer sair com um portfólio que consegue a primeira vaga.',
  },
  {
    number: '02',
    name: 'Front-end',
    qualifier: 'interfaces que impressionam',
    colorClass: 'bg-track-front',
    textClass: 'text-track-front',
    glow: 'var(--color-track-front)',
    description:
      'Interfaces modernas com HTML, CSS, React e as ferramentas que o mercado realmente usa. Para quem quer construir o que o usuário vê — e sente.',
  },
  {
    number: '03',
    name: 'Back-end',
    qualifier: 'a engenharia por trás de tudo',
    colorClass: 'bg-track-back',
    textClass: 'text-track-back',
    glow: 'var(--color-track-back)',
    description:
      'APIs, bancos de dados, autenticação e arquitetura. A engenharia invisível que sustenta qualquer produto sério — e uma das áreas mais bem pagas do mercado.',
  },
  {
    number: '04',
    name: 'Mobile · React Native',
    qualifier: 'apps na palma da mão',
    colorClass: 'bg-track-mobile',
    textClass: 'text-track-mobile',
    glow: 'var(--color-track-mobile)',
    description:
      'Apps iOS e Android com uma única base de código em React Native — do primeiro componente à publicação nas lojas.',
  },
  {
    number: '05',
    name: 'MBA · Pós-graduação',
    qualifier: 'reconhecido pelo MEC',
    colorClass: 'bg-track-mba',
    textClass: 'text-track-mba',
    glow: 'var(--color-track-mba)',
    description:
      'Pós-graduação reconhecida pelo MEC para quem já programa e quer subir de nível: arquitetura de software, liderança técnica e visão de produto.',
  },
]
