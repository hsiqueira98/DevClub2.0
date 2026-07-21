/*
 * Chapter 06 cast list. Names and roles are invented (contest rules),
 * except the founder reference which mirrors public DevClub identity.
 * Portraits: high-res Unsplash placeholders unified by the duotone CSS
 * treatment in the film-strip — stand-ins for the real cinematic
 * portraits described in docs/BRAND.md (Imagery Style).
 */
const unsplash = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=640&h=860&q=80`

export const INSTRUCTORS = [
  {
    name: 'Rodolfo Mori',
    role: 'Fundador · DevClub',
    photo: unsplash('photo-1507003211169-0a1dd7228f2d'),
  },
  {
    name: 'Marina Castro',
    role: 'Tech Lead Front-end',
    photo: unsplash('photo-1494790108377-be9c29b29330'),
  },
  {
    name: 'Diego Ferraz',
    role: 'Engenheiro Back-end Sênior',
    photo: unsplash('photo-1500648767791-00dcc994a43e'),
  },
  {
    name: 'Aline Nogueira',
    role: 'Especialista Mobile · React Native',
    photo: unsplash('photo-1438761681033-6461ffad8d80'),
  },
  {
    name: 'Caio Sampaio',
    role: 'Arquiteto de Software',
    photo: unsplash('photo-1472099645785-5658abf4ff4e'),
  },
  {
    name: 'Renata Lopes',
    role: 'Engenheira de Dados',
    photo: unsplash('photo-1544005313-94ddf0286df2'),
  },
  {
    name: 'Bruno Tavares',
    role: 'DevOps & Cloud',
    photo: unsplash('photo-1506794778202-cad84cf45f1d'),
  },
]
