# DevClub Premium

Redesign cinematográfico da landing page institucional do DevClub — construído para o desafio de contratação de Full Stack Programmer.

**A página conta uma história em 10 capítulos**: o visitante é o protagonista, o DevClub é o guia. Do primeiro "toda carreira começa com uma decisão" até o CTA final, cada seção tem um objetivo emocional, um visual e um de motion — documentados em [`docs/STORYBOARD.md`](docs/STORYBOARD.md).

> Conteúdo (números, depoimentos, nomes) é inventado, conforme as regras do desafio. A identidade visual (cores, tipografia, dispositivos de UI) é a real do DevClub, extraída do site atual — ver [`docs/BRAND.md`](docs/BRAND.md).

## Rodando

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção
npm run lint     # ESLint
```

## Stack e por quê

| Escolha                              | Por quê                                                                                                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Vite + React**                     | build instantâneo, ecossistema maduro, sem peso de framework SSR que a página não precisa                                             |
| **Tailwind v4 (CSS-first)**          | os tokens da marca vivem em `@theme` no CSS ([`src/styles/index.css`](src/styles/index.css)) — nenhum componente usa hex cru          |
| **GSAP + ScrollTrigger + SplitText** | 30% da avaliação é motion; scrub scroll-linked, pin e split de caracteres são o núcleo da coreografia                                 |
| **Lenis**                            | scroll suave alimentando o ScrollTrigger pelo ticker do GSAP — um relógio só para todo o motion                                       |
| **Framer Motion**                    | instalado apenas como fallback declarado em [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md); GSAP é o padrão (e até agora cobriu tudo) |

## Arquitetura

```
src/
  animations/   timelines GSAP isoladas (uma coreografia por arquivo)
  components/   UI reutilizável dos dispositivos de marca (Kicker, LogoMark…)
  sections/     um arquivo por capítulo do storyboard
  data/         todo conteúdo inventado centralizado — números consistentes
  providers/    Lenis ↔ ScrollTrigger
  hooks/        useTypewriter etc.
```

Decisões de produto e de design têm histórico em [`docs/DECISION_LOG.md`](docs/DECISION_LOG.md); o sistema de motion (durações, easings, reduced-motion) em [`docs/MOTION.md`](docs/MOTION.md).

## Detalhes que importam

- **Assemble → rest → shatter** (Cap. 01): uma única timeline com scrub — a headline monta, descansa e estilhaça em caracteres 3D conforme o scroll.
- **Dispositivos nativos do DevClub preservados**: labels com cursor de terminal (`mercado_`), typewriter no hero, cor por trilha, avatar-cluster, gráfico salarial com citação de fonte.
- **`prefers-reduced-motion`**: todo o sistema degrada para fades curtos sem perder conteúdo.
- **Acessibilidade baseline**: HTML semântico, um `h1`, foco visível, navegação por teclado (inclusive no film-strip de tutores).
- **Números consistentes**: o site atual mostra três contagens de alunos diferentes; aqui, uma fonte única em [`src/data/stats.js`](src/data/stats.js).
