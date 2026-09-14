export type Project = {
  title: string
  description: string
  technologies: string[]
  liveUrl: string
  variant: 'letreiro' | 'lista' | 'lista-app'
}

export const projects: Project[] = [
  {
    title: 'Letreiro',
    description:
      'Jogo diário de descoberta de filmes com desafios automáticos, calendário de partidas anteriores, dicas progressivas, persistência local e automação diária integrada ao GitHub Actions.',
    technologies: ['React', 'TypeScript', 'Supabase', 'TMDB'],
    liveUrl: 'https://letreiro.marcuscamargo-portfolio.com.br',
    variant: 'letreiro',
  },
  {
    title: 'Liste & Compre',
    description:
      'Aplicação completa para planejar listas, acompanhar compras, controlar quantidades e preços e consultar histórico sincronizado por conta, com experiência adaptada para desktop e celular.',
    technologies: ['React', 'TypeScript', 'Supabase', 'Vercel'],
    liveUrl: 'https://listeecompre.vercel.app/',
    variant: 'lista',
  },
  {
    title: 'Liste & Compre App',
    description:
      'Aplicativo Android nativo do ecossistema Liste & Compre, criado em React Native e Expo para levar planejamento, compra em andamento, histórico e conta a uma experiência mobile própria, integrada aos mesmos dados do serviço web.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
    liveUrl: 'https://listeecompre.marcuscamargo-portfolio.com.br/aplicativo',
    variant: 'lista-app',
  },
]
