export type ProjectVariant = 'letreiro' | 'lista' | 'lista-app'

export type Project = {
  slug: string
  title: string
  eyebrow: string
  category: string
  year: string
  description: string
  story: string
  technologies: string[]
  liveUrl: string
  liveLabel: string
  variant: ProjectVariant
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
]

export const findProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug)
