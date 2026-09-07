import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, Github, ShieldCheck, Wrench } from 'lucide-react'
import logo from './assets/Marcus-Camargo-Logo-Transparente.png'

const cases = [
  {
    title: 'Letreiro',
    subtitle: 'Jogo diário de descoberta de filmes',
    problem: 'Criar uma experiência simples de entender, mas com motivo para o usuário voltar todos os dias, sem depender de conteúdo manual novo a cada partida.',
    motivation: 'O projeto começou como um desafio de produto: transformar a descoberta de filmes em um hábito diário curto, com identidade própria e espaço para evoluir sem virar apenas mais um clone visual de jogos de palavras.',
    evolution: 'A solução ganhou desafio diário, dicas progressivas, calendário de partidas anteriores, persistência local e automação para selecionar e publicar o filme do dia.',
    challenges: [
      'Automatizar o sorteio diário sem repetir conteúdo e mantendo filtros de qualidade.',
      'Integrar TMDB, GitHub Actions e Supabase em um fluxo previsível de publicação.',
      'Resolver diferenças entre ambiente local e produção, incluindo variáveis de ambiente e deploy na Vercel.',
      'Manter a experiência consistente em desktop e mobile, inclusive no teclado virtual.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'TMDB', 'GitHub Actions', 'Vercel'],
    learning: 'O projeto reforçou a importância de separar automação, dados e interface, além de tratar deploy e observabilidade como parte do produto — não como etapa posterior.',
    liveUrl: 'https://letreiro-cine-puzzle.vercel.app/pt-br',
    liveLabel: 'Projeto publicado',
    repoUrl: 'https://github.com/Marcus-W-Camargo/Letreiro',
  },
  {
    title: 'Liste & Compre',
    subtitle: 'Aplicação para acompanhar uma compra do planejamento à conclusão',
    problem: 'Listas de compra tradicionais resolvem o que levar, mas não ajudam bem durante a compra: quantidade, peso, preço, andamento e reaproveitamento do histórico ficam espalhados ou simplesmente não existem.',
    motivation: 'A ideia nasceu da necessidade de acompanhar uma compra real, e não somente criar um checklist. O objetivo foi aproximar planejamento, execução e histórico em uma única experiência.',
    evolution: 'O projeto evoluiu para contas individuais, listas sincronizadas, histórico, foto de perfil, controle por unidade ou quilograma, compra ativa isolada localmente e reutilização de compras anteriores.',
    challenges: [
      'Equilibrar persistência em nuvem com dados temporários que fazem mais sentido no dispositivo durante a compra.',
      'Projetar isolamento por usuário, Storage privado e acesso seguro a fotos por URLs assinadas.',
      'Tratar autenticação, verificação de e-mail, limites de envio e fluxos de recuperação sem expor dados desnecessários.',
      'Manter responsividade e legibilidade em campos densos de preço, quantidade e peso no mobile.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Supabase Auth', 'PostgreSQL', 'Storage', 'Vercel Functions'],
    learning: 'Esse projeto aprofundou decisões de arquitetura, segurança por usuário, sincronização e desenho de estados. A principal evolução foi aprender a escolher onde cada dado deve viver em vez de simplesmente colocar tudo no banco.',
    liveUrl: 'https://listeecompre.vercel.app/',
    liveLabel: 'Projeto publicado',
    repoUrl: 'https://github.com/Marcus-W-Camargo/liste-e-compre',
  },
  {
    title: 'Liste & Compre App',
    subtitle: 'Aplicativo Android independente e integrado ao ecossistema Liste & Compre',
    problem: 'A versão web funciona no celular, mas acompanhar uma compra dentro do mercado pede outra ergonomia: toque, gestos, teclado numérico contextual, estado persistente no aparelho e navegação pensada para uma tela que está sempre na mão.',
    motivation: 'Em vez de transformar o site em um WebView, a decisão foi criar uma aplicação mobile própria que compartilha conta e dados com o serviço web, mas pode evoluir com fluxos e comportamentos específicos de aplicativo.',
    evolution: 'A V1 passou a reunir listas, compra em andamento, valores e pesos, itens extras, histórico, perfil com câmera ou galeria, autenticação completa e navegação horizontal por gestos, mantendo a sessão de compra local e os dados da conta sincronizados.',
    challenges: [
      'Construir uma base React Native + Expo separada da aplicação web sem quebrar a integração com o mesmo backend Supabase.',
      'Persistir a compra em andamento por usuário no dispositivo e sincronizar somente os dados que realmente pertencem à conta remota.',
      'Tratar conflitos de sincronização por revisão para evitar sobrescrever silenciosamente alterações mais recentes feitas em outro dispositivo.',
      'Adaptar a interface Android a safe areas, teclado numérico, câmera, galeria, gestos e diferentes formas de navegação do sistema.',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Expo Router', 'Supabase Auth', 'PostgreSQL', 'Storage', 'Android'],
    learning: 'O aplicativo reforçou que compartilhar produto e backend não significa compartilhar interface. Separar responsabilidades entre web, mobile, estado local e sincronização tornou o ecossistema mais coerente e criou espaço para evoluir cada plataforma de acordo com seu contexto de uso.',
    liveUrl: null,
    liveLabel: 'Aplicativo Android',
    repoUrl: 'https://github.com/Marcus-W-Camargo/Liste-Compre-APP',
  },
]

const principles = [
  {
    icon: Wrench,
    title: 'Como trabalho',
    text: 'Começo pelo problema, construo uma primeira solução funcional e uso os limites encontrados para orientar as próximas decisões técnicas.',
  },
  {
    icon: ShieldCheck,
    title: 'O que passei a priorizar',
    text: 'Segurança, isolamento de dados, deploy previsível, responsividade e documentação deixaram de ser “acabamento” e passaram a fazer parte da definição de pronto.',
  },
  {
    icon: Github,
    title: 'O que quero demonstrar',
    text: 'Capacidade de investigar, corrigir, iterar e explicar decisões — inclusive quando a primeira abordagem não é a melhor.',
  },
]

export function RecruiterPage() {
  const [activePrinciple, setActivePrinciple] = useState<number | null>(null)

  return (
    <div className="recruiter-page">
      <header className="recruiter-header">
        <a href="/" className="recruiter-brand">
          <img src={logo} alt="" />
          <span><strong>Marcus Camargo</strong><small>Área para recrutadores</small></span>
        </a>
        <a className="recruiter-back" href="/"><ArrowLeft size={16} /> Voltar para a página comercial</a>
      </header>

      <main className="recruiter-main">
        <section className="recruiter-hero recruiter-animate">
          <div>
            <span className="section-kicker">Engenharia em evolução</span>
            <h1>Mais do que listar tecnologias, quero mostrar como eu penso quando um projeto começa a ficar difícil.</h1>
            <p>Esta área concentra contexto, decisões, dificuldades e aprendizados dos projetos. O objetivo é facilitar uma avaliação técnica mais honesta do meu momento como desenvolvedor júnior e da direção em que estou evoluindo.</p>
          </div>
          <div className="recruiter-snapshot">
            <div><strong>03</strong><span>projetos publicados ou consolidados em destaque</span></div>
            <div><strong>Produto + código</strong><span>decisões guiadas por problema real</span></div>
            <div><strong>Aprendizado contínuo</strong><span>arquitetura, segurança, deploy e UX</span></div>
          </div>
        </section>

        <section className="recruiter-principles recruiter-animate" aria-label="Princípios de trabalho">
          {principles.map(({ icon: Icon, title, text }, index) => {
            const active = activePrinciple === index
            return (
              <button
                type="button"
                key={title}
                className={`recruiter-principle-card ${active ? 'active' : ''}`}
                onClick={() => setActivePrinciple(active ? null : index)}
                aria-expanded={active}
              >
                <div className="recruiter-principle-front">
                  <div className="recruiter-principle-icon"><Icon size={40} strokeWidth={1.6} /></div>
                  <h2>{title}</h2>
                </div>
                <div className="recruiter-principle-detail">
                  <div className="recruiter-principle-detail-heading">
                    <Icon size={22} strokeWidth={1.8} />
                    <h2>{title}</h2>
                  </div>
                  <p>{text}</p>
                </div>
              </button>
            )
          })}
        </section>

        <section className="recruiter-cases recruiter-animate">
          {cases.map((item, index) => (
            <article className="recruiter-case" key={item.title}>
              <div className="recruiter-case-heading">
                <span>CASE {String(index + 1).padStart(2, '0')}</span>
                <div><h2>{item.title}</h2><p>{item.subtitle}</p></div>
              </div>

              <div className="recruiter-case-grid">
                <div className="recruiter-story">
                  <section><small>Problema</small><p>{item.problem}</p></section>
                  <section><small>Motivação</small><p>{item.motivation}</p></section>
                  <section><small>Evolução</small><p>{item.evolution}</p></section>
                  <section><small>Principal aprendizado</small><p>{item.learning}</p></section>
                </div>

                <aside className="recruiter-technical">
                  <div><small>Stack principal</small><div className="recruiter-stack">{item.stack.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
                  <div><small>Dificuldades que exigiram mais investigação</small><ul>{item.challenges.map((challenge) => <li key={challenge}>{challenge}</li>)}</ul></div>
                  <div className="recruiter-links">
                    {item.liveUrl && <a href={item.liveUrl} target="_blank" rel="noreferrer">{item.liveLabel} <ArrowUpRight size={15} /></a>}
                    <a href={item.repoUrl} target="_blank" rel="noreferrer">Repositório <Github size={15} /></a>
                  </div>
                </aside>
              </div>
            </article>
          ))}
        </section>

        <section className="recruiter-closing recruiter-animate">
          <span className="section-kicker">Próximo nível</span>
          <h2>Meu objetivo não é parecer pleno antes da hora. É construir repertório para chegar lá com fundamento.</h2>
          <p>Hoje eu me posiciono como desenvolvedor júnior em evolução, com projetos reais que já me obrigaram a lidar com integração, dados, segurança, automação, deploy e experiência do usuário. Procuro oportunidades em que eu possa continuar aumentando a qualidade das decisões técnicas, trabalhando com revisão, padrões e colaboração de equipe.</p>
          <a href="https://github.com/Marcus-W-Camargo?tab=repositories" target="_blank" rel="noreferrer">Ver GitHub <ArrowUpRight size={16} /></a>
        </section>
      </main>
    </div>
  )
}
