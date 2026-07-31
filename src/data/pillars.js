/*
 * Chapter 04's five method pillars, carried through the full-screen
 * rolodex in animations/pillars.timeline.js. `icon` is a lucide-react
 * export name — the consumer maps name → component (see
 * components/PillarRolodex.jsx), the same pattern already used for
 * WhyTechnology.jsx's FREEDOMS list. `photo` is a hotlinked Unsplash
 * URL, same pattern as the hero backdrop in FirstDecision.jsx.
 */
export const PILLARS = [
  {
    name: 'Comunidade',
    qualifier: 'ninguém fica travado sozinho',
    icon: 'Users',
    photo:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=70',
    description:
      'Milhares de alunos e ex-alunos trocando código, dúvida e oportunidade todos os dias. Quando você trava, alguém no grupo já passou exatamente por ali — e te tira de lá.',
  },
  {
    name: 'Método',
    qualifier: 'um roteiro, não um labirinto',
    icon: 'Route',
    photo:
      'https://images.unsplash.com/photo-1677506048148-0c914dd8197b?auto=format&fit=crop&w=1600&q=70',
    description:
      'Nada de decidir sozinho o que estudar depois. Um roadmap claro, testado em mais de 30 mil formações, leva você do primeiro "Hello, World" à primeira vaga sem perder tempo com o que não importa.',
  },
  {
    name: 'Mentoria',
    qualifier: 'quem te ensina, está no mercado hoje',
    icon: 'UserCheck',
    photo:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=70',
    description:
      'Instrutores que resolvem os mesmos problemas em produção, não só em slide. A dúvida que trava seu código já travou o mentor antes — e ele sabe exatamente como destravar a sua.',
  },
  {
    name: 'Projetos',
    qualifier: 'portfólio, não certificado',
    icon: 'FolderKanban',
    photo:
      'https://images.unsplash.com/photo-1774901128302-e2bbd154da44?auto=format&fit=crop&w=1600&q=70',
    description:
      'Você sai com aplicações reais no GitHub, não com um PDF de conclusão. É o que o recrutador abre primeiro — e o que prova que você sabe entregar, não só entender.',
  },
  {
    name: 'Suporte',
    qualifier: 'nunca sozinho num erro',
    icon: 'LifeBuoy',
    photo:
      'https://images.unsplash.com/photo-1714079761488-e0c9b9ac4138?auto=format&fit=crop&w=1600&q=70',
    description:
      'Dúvida não espera até segunda. Suporte ativo pra destravar o que te trava agora — porque um erro sem resposta é o motivo nº 1 de quem desiste no meio do caminho.',
  },
]
