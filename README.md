# DevClub Premium

Redesign cinematográfico da landing page institucional do DevClub — uma experiência narrativa em capítulos, não uma página de seções soltas, construída para comunicar a jornada de transformação de carreira que a marca representa.

## Conceito

A página não segue a estrutura tradicional (Hero, Sobre, Cursos, Depoimentos). Ela conta uma história em 10 capítulos, do primeiro contato ao convite final: o visitante é o protagonista, o DevClub é o guia. Cada capítulo tem um objetivo emocional, uma direção visual e uma coreografia de motion próprios, amarrados por um único fio narrativo — *"toda carreira em tecnologia começa com uma decisão."*

A identidade visual preserva a marca real do DevClub (cores, tipografia, e dispositivos de interface próprios da marca, como os rótulos com cursor de terminal piscante e o efeito de digitação no hero) — a proposta é evoluir a experiência, não substituir a identidade.

## Rodando

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção
npm run lint     # ESLint
```

## Stack e por quê

| Escolha | Por quê |
| --- | --- |
| **Vite + React** | build instantâneo, ecossistema maduro, sem o peso de um framework SSR que esta página não precisa |
| **Tailwind v4 (CSS-first)** | os tokens da marca vivem em `@theme` no CSS (`src/styles/index.css`) — nenhum componente usa hex cru |
| **GSAP + ScrollTrigger + SplitText** | motion é parte central da experiência; scrub scroll-linked, pin e split de caracteres formam o núcleo da coreografia |
| **Lenis** | scroll suave alimentando o ScrollTrigger pelo ticker do GSAP — um relógio só para todo o motion |
| **Framer Motion** | instalado apenas como fallback declarado; GSAP é o padrão e cobre a experiência inteira até aqui |

## Arquitetura

```
src/
  animations/   timelines GSAP isoladas (uma coreografia por arquivo)
  components/   UI reutilizável dos dispositivos de marca (Kicker, StarBadge…)
  sections/     um arquivo por capítulo da narrativa
  data/         todo conteúdo centralizado — números e textos consistentes
  providers/    Lenis ↔ ScrollTrigger
  hooks/        useTypewriter etc.
```

## Detalhes que importam

- **Assemble → rest → shatter** (Capítulo 1): uma única timeline com scrub — a headline monta, descansa e estilhaça em caracteres 3D conforme o scroll.
- **Dispositivos nativos do DevClub preservados**: rótulos com cursor de terminal (`mercado_`), efeito de digitação no hero, cor própria por trilha de formação, avatar-cluster de alunos, gráfico salarial com citação de fonte.
- **`prefers-reduced-motion` respeitado**: todo o sistema de motion degrada para transições curtas sem perder conteúdo — nada depende de animação para ser lido.
- **Acessibilidade de base**: HTML semântico, hierarquia de heading única, foco visível em todo elemento interativo, navegação completa por teclado (inclusive no film-strip de instrutores e no accordion de formações).
- **Fonte única de números**: todo dado exibido na página (alunos, salários, avaliações) vem de um único arquivo de dados — nenhum número é repetido ou digitado duas vezes em lugares diferentes.
