import {
  ArrowUpRight,
  Cloud,
  Code2,
  Database,
  Github,
  Layers3,
  Smartphone,
  Workflow,
} from 'lucide-react'
import profile from './assets/Perfil Marcus Camargo - Portifolio.png'
import { Header } from './components/Header'

const stackGroups = [
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'Vite', 'CSS', 'Responsividade'],
  },
  {
    title: 'Mobile',
    items: ['React Native', 'Expo', 'Expo Router', 'Android'],
  },
  {
    title: 'Dados & backend',
    items: ['Supabase', 'PostgreSQL', 'Auth', 'Storage', 'SQL'],
  },
  {
    title: 'Infra & fluxo',
    items: ['Cloudflare Workers', 'Vercel', 'GitHub', 'GitHub Actions', 'Git'],
  },
]

const experience = [
  {
    icon: Code2,
    title: 'Produto e interface',
    text: 'Construção de experiências públicas, áreas privadas, painéis, fluxos de cadastro, agenda, histórico e interfaces responsivas com decisões orientadas ao uso real.',
  },
  {
    icon: Database,
    title: 'Dados e regras',
    text: 'Autenticação, persistência, PostgreSQL, Storage, isolamento por usuário, regras de acesso, histórico e sincronização entre estado local e remoto.',
  },
  {
    icon: Workflow,
    title: 'Automação e operação',
    text: 'Automação de tarefas recorrentes, integrações, pipelines de publicação e sistemas que substituem partes de uma operação manual.',
  },
  {
    icon: Cloud,
    title: 'Produção e manutenção',
    text: 'Deploy em Cloudflare e Vercel, domínio, troubleshooting em produção, correção de regressões e evolução incremental sem reescrever o projeto inteiro a cada mudança.',
  },
]

export function AboutPage() {
  return (
    <div className="public-detail-page about-page">
      <Header />

      <main className="public-detail-main">
        <section className="about-hero">
          <div className="about-hero-copy">
            <span className="public-detail-kicker">Sobre / Marcus Camargo</span>
            <h1>Eu aprendi desenvolvimento construindo coisas que precisavam funcionar de verdade.</h1>
            <p>
              Sou Marcus Camargo, desenvolvedor em evolução com foco em transformar problema operacional,
              ideia de produto e necessidade de negócio em software utilizável. Minha bagagem vem menos de
              exercícios isolados e mais de projetos que precisaram sobreviver a usuário real, banco real,
              deploy, manutenção e mudança de requisito.
            </p>
          </div>
          <div className="about-portrait">
            <img src={profile} alt="Marcus Camargo" />
            <div>
              <small>Nome profissional</small>
              <strong>Marcus Camargo</strong>
              <span>Desenvolvimento & Soluções Digitais</span>
            </div>
          </div>
        </section>

        <section className="about-positioning">
          <span>Minha bagagem</span>
          <h2>Já passei da fase em que “funciona no meu computador” é suficiente.</h2>
          <p>
            Produtos como Letreiro e Liste & Compre me colocaram diante de autenticação, banco, automação,
            persistência, segurança, deploy e experiência de uso. Projetos comerciais como Spaço Liss, Mexe
            Pilates e Nuvem Agendas adicionaram outra camada: regras específicas de negócio, clientes reais,
            manutenção contínua e mudanças que precisam entrar sem quebrar o que já está funcionando.
          </p>
        </section>

        <section className="about-experience-grid">
          {experience.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={24} strokeWidth={1.5} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className="about-stack">
          <div className="about-stack-heading">
            <span className="public-detail-kicker">Tecnologias com as quais já trabalho</span>
            <h2>Ferramentas são parte do repertório. O critério continua sendo o problema.</h2>
          </div>
          <div className="about-stack-groups">
            {stackGroups.map((group) => (
              <article key={group.title}>
                <strong>{group.title}</strong>
                <div>
                  {group.items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-principle">
          <Layers3 size={26} strokeWidth={1.5} />
          <div>
            <span className="public-detail-kicker">Como eu me posiciono hoje</span>
            <h2>Desenvolvedor júnior, mas com repertório de projeto real maior do que o título sozinho explica.</h2>
            <p>
              Ainda tenho muito para aprofundar em arquitetura, engenharia de software e trabalho em equipes
              maiores. Ao mesmo tempo, já tenho autonomia para investigar, construir, publicar, corrigir e
              explicar decisões em produtos completos. É esse equilíbrio entre ambição e consciência técnica
              que quero continuar levando para os próximos projetos.
            </p>
          </div>
        </section>

        <section className="about-links">
          <a href="/projetos">Ver projetos <ArrowUpRight size={16} /></a>
          <a href="/recrutadores"><Layers3 size={16} /> Área para recrutadores</a>
          <a href="https://github.com/Marcus-W-Camargo?tab=repositories" target="_blank" rel="noreferrer">
            <Github size={16} /> GitHub
          </a>
        </section>

        <div className="about-tech-orbit" aria-hidden="true">
          <Code2 />
          <Database />
          <Smartphone />
        </div>
      </main>
    </div>
  )
}
