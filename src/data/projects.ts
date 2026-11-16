export type ProjectVariant = 'letreiro' | 'lista' | 'lista-app' | 'spaco-liss' | 'mexe-pilates' | 'coming-soon'

export type Project = {
  slug: string
  title: string
  eyebrow: string
  category: string
  year: string
  description: string
  story: string
  technologies: string[]
  capabilities?: string[]
  clientProject?: boolean
  liveUrl?: string
  liveLabel?: string
  variant: ProjectVariant
  comingSoon?: boolean
}

export const projects: Project[] = [
  {
    slug: 'letreiro',
    title: 'Letreiro',
    eyebrow: 'Jogo diário de filmes',
    category: 'Produto digital',
    year: '2026',
    description:
      'Jogo diário de descoberta de filmes com desafios automáticos, calendário de partidas anteriores, dicas progressivas, persistência local e automação diária integrada ao GitHub Actions.',
    story:
      'O Letreiro nasceu como um exercício de produto: criar uma experiência rápida de entender, mas interessante o suficiente para fazer o usuário voltar todos os dias. A solução combina jogo, conteúdo automatizado, histórico e identidade própria sem exigir conta para começar.',
    technologies: ['React', 'TypeScript', 'Supabase', 'TMDB', 'GitHub Actions', 'Cloudflare'],
    liveUrl: 'https://letreiro.marcuscamargo-portfolio.com.br',
    liveLabel: 'Visitar Letreiro',
    variant: 'letreiro',
  },
  {
    slug: 'liste-e-compre',
    title: 'Liste & Compre',
    eyebrow: 'Planejamento e acompanhamento de compras',
    category: 'Aplicação web',
    year: '2026',
    description:
      'Aplicação completa para planejar listas, acompanhar compras, controlar quantidades e preços e consultar histórico sincronizado por conta, com experiência adaptada para desktop e celular.',
    story:
      'O projeto evoluiu de uma lista simples para uma ferramenta que acompanha a compra do planejamento à conclusão. O produto separa o que precisa ficar sincronizado na conta do que faz mais sentido permanecer localmente durante uma compra em andamento.',
    technologies: ['React', 'TypeScript', 'Supabase Auth', 'PostgreSQL', 'Storage', 'Vercel'],
    liveUrl: 'https://listeecompre.vercel.app/',
    liveLabel: 'Visitar Liste & Compre',
    variant: 'lista',
  },
  {
    slug: 'liste-e-compre-app',
    title: 'Liste & Compre App',
    eyebrow: 'Experiência Android do ecossistema Liste & Compre',
    category: 'Aplicativo',
    year: '2026',
    description:
      'Aplicativo Android criado em React Native e Expo para levar planejamento, compra em andamento, histórico e conta a uma experiência mobile própria, integrada aos mesmos dados do serviço web.',
    story:
      'Em vez de colocar o site dentro de um WebView, a versão mobile foi tratada como produto próprio. Ela compartilha conta e backend com a aplicação web, mas trabalha navegação, persistência local, gestos, câmera e galeria de acordo com o contexto de uso no celular.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Android'],
    liveUrl: 'https://listeecompre.marcuscamargo-portfolio.com.br/aplicativo',
    liveLabel: 'Conhecer o aplicativo',
    variant: 'lista-app',
  },
  {
    slug: 'spaco-liss',
    title: 'Spaço Liss',
    eyebrow: 'Presença digital, agendamento e gestão para beleza e estética',
    category: 'Site & sistema de gestão',
    year: '2026',
    description:
      'Projeto desenvolvido para unir a presença digital do negócio à rotina de atendimento em uma experiência integrada: apresentação de serviços, agendamento online e uma área interna voltada à organização do dia a dia.',
    story:
      'O trabalho começou pela necessidade de conectar comunicação pública e operação sem depender de várias ferramentas desconectadas. A solução evoluiu para acompanhar diferentes serviços, profissionais, horários, clientes e rotinas administrativas, com foco em uso simples, experiência consistente em desktop e celular e autonomia para a equipe conduzir a operação.',
    technologies: [],
    capabilities: [
      'Site institucional multipágina',
      'Experiência responsiva',
      'Catálogo de serviços',
      'Agendamento online',
      'Área interna de gestão',
      'Organização de agenda e clientes',
      'Rotinas administrativas',
      'Comunicação e páginas promocionais',
    ],
    clientProject: true,
    variant: 'spaco-liss',
  },
  {
    slug: 'mexe-pilates',
    title: 'Mexe_Pilates',
    eyebrow: 'Site institucional construído ao redor da identidade e da prática do estúdio',
    category: 'Site institucional',
    year: '2026',
    description:
      'Site multipágina criado para apresentar posicionamento, atendimentos, equipe, estrutura, cursos e horários em uma experiência clara, acolhedora e adaptada a desktop e celular.',
    story:
      'O projeto precisava traduzir uma proposta clínica e humana sem cair em uma comunicação genérica de fitness. A solução foi organizada em páginas e seções próprias, com hierarquia editorial, apresentação dos atendimentos e profissionais, cronograma, cursos e um fluxo de contato pensado para reduzir atrito e manter a identidade do estúdio em cada tela.',
    technologies: [],
    capabilities: [
      'Site institucional multipágina',
      'Design responsivo',
      'Apresentação de atendimentos',
      'Perfis profissionais',
      'Cronograma de horários',
      'Cursos e conteúdos',
      'Fluxo de contato',
      'Publicação em domínio próprio',
    ],
    clientProject: true,
    liveUrl: 'https://www.mexepilates.com.br',
    liveLabel: 'Visitar Mexe Pilates',
    variant: 'mexe-pilates',
  },
  {
    slug: 'es-tudo-interativo',
    title: 'Es-Tudo Interativo',
    eyebrow: 'Case em preparação',
    category: 'Plataforma educacional',
    year: '2026',
    description: 'O case completo do Es-Tudo Interativo será apresentado em breve.',
    story: '',
    technologies: [],
    variant: 'coming-soon',
    comingSoon: true,
  },
]

export const findProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug)
