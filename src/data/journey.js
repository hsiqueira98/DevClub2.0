/*
 * Chapter 07 — the method, step by step. Invented copy, real DevClub
 * philosophy (project-based, mentored, structured).
 */
export const JOURNEY_STEPS = [
  {
    number: '01',
    title: 'Fundamentos sem enrolação',
    description:
      'Lógica, HTML, CSS e JavaScript direto ao ponto. Você escreve código desde a primeira aula — nada de três meses só de teoria.',
  },
  {
    number: '02',
    title: 'Projetos reais no portfólio',
    description:
      'Cada módulo termina com um projeto que vai direto para o seu GitHub. Recrutador não lê certificado, lê código.',
  },
  {
    number: '03',
    title: 'Mentoria e comunidade',
    description:
      'Dúvida travada não dura a noite. Mentores e uma comunidade de milhares de alunos respondem todos os dias.',
  },
  {
    number: '04',
    title: 'Preparação para o mercado',
    description:
      'Currículo, LinkedIn, entrevistas técnicas e simulações. A última etapa do curso é conseguir a vaga, não terminar as aulas.',
  },
]

/*
 * Chapter 03 — the pains of learning alone. Each one becomes a
 * fragment in the broken-layout composition.
 */
export const STRUGGLES = [
  'Tutorial atrás de tutorial, e nada de projeto próprio.',
  'Trinta abas abertas. Nenhuma direção.',
  'Ninguém para revisar seu código.',
  'A sensação de estar sempre atrasado.',
  'Estudar sozinho às 23h e travar na primeira dúvida.',
]

/*
 * Chapter 09 — community gallery. High-res Unsplash placeholders of
 * people working/learning together, duotone-graded in CSS, standing in
 * for real community photos per docs/BRAND.md Imagery Style.
 */
const unsplash = (id, h) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=640&h=${h}&q=80`

export const GALLERY = [
  {
    src: unsplash('photo-1522071820081-009f0129c71c', 800),
    caption: 'Imersão presencial · São Paulo',
    tall: true,
  },
  {
    src: unsplash('photo-1531482615713-2afd69097998', 480),
    caption: 'Encontro da comunidade · Recife',
  },
  {
    src: unsplash('photo-1515187029135-18ee286d815b', 480),
    caption: 'Maratona de código · online',
  },
  {
    src: unsplash('photo-1543269865-cbf427effbad', 800),
    caption: 'Primeira vaga celebrada ao vivo',
    tall: true,
  },
  {
    src: unsplash('photo-1556761175-5973dc0f32e7', 480),
    caption: 'Mentoria em grupo · quintas',
  },
  {
    src: unsplash('photo-1517245386807-bb43f82c33c4', 480),
    caption: 'DevClub Conf · 2025',
  },
]
