import {
  ArrowUpRight,
  Bot,
  CalendarDays,
  Cloud,
  Code2,
  Database,
  PanelsTopLeft,
  Smartphone,
  Workflow,
} from 'lucide-react'
import { Header } from './components/Header'

const services = [
  {
    icon: Code2,
    index: '01',
    title: 'Sites profissionais',
    summary: 'Sites institucionais, páginas comerciais e experiências públicas com identidade própria — não templates apenas preenchidos.',
    details: [
      'Arquitetura de páginas e navegação pensadas para o objetivo do negócio',
      'Responsividade tratada de verdade em desktop e mobile',
      'SEO técnico, metadados, canonical, sitemap e preparação para indexação',
      'Domínio, publicação e evolução contínua sem depender de reconstruir tudo',
    ],
  },
  {
    icon: CalendarDays,
    index: '02',
    title: 'Agendamento e operação',
    summary: 'Sistemas para negócios que precisam organizar agenda, clientes, profissionais, bloqueios, serviços e rotina interna.',
    details: [
      'Agenda pública e painel interno com regras diferentes por perfil',
      'Horários, duração de serviços, bloqueios, exceções e disponibilidade',
      'Cadastro e histórico de clientes, observações e fluxos operacionais',
      'Regras comerciais como comissão, caixa, permissões e visibilidade',
    ],
  },
  {
    icon: PanelsTopLeft,
    index: '03',
    title: 'Sistemas sob medida',
    summary: 'Quando planilha, formulário ou ferramenta pronta começa a limitar a operação, construo a interface em torno do processo real.',
    details: [
      'Painéis administrativos e áreas privadas',
      'Autenticação, níveis de acesso e estados específicos por usuário',
      'Fluxos internos desenhados para reduzir trabalho manual',
      'Evolução modular para o sistema crescer sem precisar ser refeito',
    ],
  },
  {
    icon: Workflow,
    index: '04',
    title: 'Automações e integrações',
    summary: 'Conecto serviços e automatizo rotinas repetitivas quando isso elimina trabalho operacional ou torna o produto mais confiável.',
    details: [
      'Integrações com APIs e serviços externos',
      'Rotinas automáticas e tarefas programadas',
      'Sincronização de dados entre interface, banco e serviços',
      'GitHub Actions e pipelines para tarefas e publicação',
    ],
  },
  {
    icon: Smartphone,
    index: '05',
    title: 'Aplicações web e mobile',
    summary: 'Produtos que precisam ir além de uma página: conta, estado, histórico, banco, experiência recorrente e, quando faz sentido, aplicativo.',
    details: [
      'Aplicações React com TypeScript',
      'Experiências Android em React Native + Expo',
      'Persistência local combinada com dados sincronizados',
      'Câmera, galeria, gestos, safe areas e fluxos específicos do mobile',
    ],
  },
  {
    icon: Database,
    index: '06',
    title: 'Dados, autenticação e backend',
    summary: 'Estruturo a camada de dados para que a interface não dependa de improviso quando o projeto começa a crescer.',
    details: [
      'Supabase Auth, PostgreSQL e Storage',
      'Modelagem de dados orientada aos fluxos do produto',
      'Isolamento por usuário e permissões',
      'Consultas, histórico, sincronização e regras de persistência',
    ],
  },
]

const foundations = [
  { icon: Cloud, title: 'Publicação', text: 'Cloudflare Workers, Vercel, domínio próprio e pipelines de deploy fazem parte da entrega.' },
  { icon: Bot, title: 'Manutenção', text: 'Corrijo regressões, acompanho comportamento em produção e evoluo o projeto sem refatorar por hábito.' },
]

export function ServicesPage() {
  return (
    <div className="public-detail-page services-page">
      <Header />

      <main className="public-detail-main">
        <section className="public-detail-hero">
          <span className="public-detail-kicker">Serviços / desenvolvimento sob medida</span>
          <h1>Eu não vendo só uma página. Eu construo a parte digital que o negócio realmente precisa usar.</h1>
          <p>
            Posso entrar desde uma presença pública bem resolvida até um sistema com agenda, autenticação,
            banco, automações e operação interna. O escopo muda; a lógica é a mesma: entender o processo antes
            de decidir a tecnologia.
          </p>
        </section>

        <section className="services-editorial-list" aria-label="Serviços oferecidos">
          {services.map(({ icon: Icon, index, title, summary, details }) => (
            <article className="service-editorial-item" key={title}>
              <div className="service-editorial-heading">
                <span>{index}</span>
                <Icon size={24} strokeWidth={1.6} />
                <h2>{title}</h2>
              </div>
              <div className="service-editorial-copy">
                <p>{summary}</p>
                <ul>
                  {details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </section>

        <section className="services-foundations">
          <div>
            <span className="public-detail-kicker">A entrega não termina no layout</span>
            <h2>Infraestrutura e manutenção também fazem parte do trabalho.</h2>
          </div>
          <div className="services-foundation-grid">
            {foundations.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <Icon size={22} strokeWidth={1.6} />
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="public-detail-cta">
          <div>
            <span className="public-detail-kicker">Tem um processo que ainda depende de improviso?</span>
            <h2>Me mostra como ele funciona hoje. A solução começa daí.</h2>
          </div>
          <a href="/projetos">Ver projetos <ArrowUpRight size={17} /></a>
        </section>
      </main>
    </div>
  )
}
