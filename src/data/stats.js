/*
 * Single source of truth for every number shown on the page.
 * The current devclub.com.br shows three different student counts
 * (+25 mil, +10 mil, +55 mil) — an oversight we deliberately fix by
 * making every section read from here (see docs/DECISION_LOG.md).
 * All values are invented but plausible, per the contest rules.
 */
export const STATS = {
  students: '+30 mil',
  studentsLong: 'mais de 30 mil alunos',
  rating: '5.0',
  hiringCompanies: '+400',
  tracks: '5',
  projectsBuilt: '+12',
}

/*
 * Chapter 02 counters. `value` is the numeric target for the Phase 3
 * count-up animation; prefix/suffix render around it.
 */
export const MARKET_STATS = [
  {
    value: 159,
    suffix: ' mil',
    label: 'vagas de tecnologia abertas por ano no Brasil',
    source: 'projeção Brasscom',
  },
  {
    value: 53,
    suffix: '%',
    label: 'das vagas ficam sem profissional qualificado para ocupá-las',
    source: 'estimativa do setor',
  },
  {
    value: 3,
    suffix: 'x',
    label: 'de crescimento salarial médio nos primeiros 5 anos de carreira',
    source: 'Glassdoor e LinkedIn',
  },
]
