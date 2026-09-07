import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Braces,
  Database,
  Github,
  Globe2,
  Instagram,
  PanelsTopLeft,
  Sparkles,
  Workflow,
} from 'lucide-react'
import logo from './assets/Marcus-Camargo-Logo-Transparente.png'
import identityImage from './assets/Identidade Marcus Camargo - Portifolio.png'
import { Header } from './components/Header'
import { ProjectPreview } from './components/ProjectPreview'
import { SectionHeading } from './components/SectionHeading'
import { projects } from './data/projects'

const services = [
  {
    icon: Braces,
    title: 'Sites que apresentam e convencem',
    text: 'Páginas profissionais criadas para transmitir confiança, organizar sua mensagem e transformar visitas em oportunidades reais de contato.',
  },
  {
    icon: PanelsTopLeft,
    title: 'Sistemas que simplificam rotinas',
    text: 'Ferramentas digitais sob medida para organizar processos, centralizar informações e reduzir etapas que hoje dependem de trabalho manual.',
  },
  {
    icon: Workflow,
    title: 'Integrações que economizam tempo',
    text: 'Conexões entre serviços e automações pensadas para eliminar repetições, reduzir erros e deixar o fluxo do negócio mais eficiente.',
  },
  {
    icon: Bot,
    title: 'Atendimento mais ágil',
    text: 'Chatbots e fluxos automatizados para responder melhor, fazer triagens e manter o atendimento disponível mesmo quando você está ocupado.',
  },
]

const orbitIcons = [
  { icon: Globe2, label: 'Presença', className: 'orbit-bubble-one' },
  { icon: Database, label: 'Organização', className: 'orbit-bubble-two' },
  { icon: Bot, label: 'Agilidade', className: 'orbit-bubble-three' },
  { icon: Workflow, label: 'Integrações', className: 'orbit-bubble-four' },
  { icon: PanelsTopLeft, label: 'Sistemas', className: 'orbit-bubble-five' },
]

const contactLinks = {
  whatsapp: 'https://wa.me/message/S2FPE7ASPUHHM1',
  instagram: 'https://www.instagram.com/marcus.camargo_portifolio?igsi=ZmdpOTdzNmIzY25p',
}

function WhatsAppBusinessIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 3.5C9.1 3.5 3.5 8.85 3.5 15.45c0 2.36.72 4.56 1.96 6.42L4.1 28.5l6.96-1.25a13.1 13.1 0 0 0 4.94.95c6.9 0 12.5-5.35 12.5-11.95S22.9 3.5 16 3.5Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M12.2 9.8h4.75c2.35 0 3.75 1.15 3.75 3 0 1.1-.55 1.95-1.55 2.45 1.35.45 2.1 1.45 2.1 2.85 0 2.2-1.65 3.55-4.35 3.55h-4.7V9.8Zm4.35 4.75c1.15 0 1.8-.5 1.8-1.4 0-.85-.65-1.35-1.8-1.35h-1.95v2.75h1.95Zm.25 5.05c1.35 0 2.05-.55 2.05-1.55s-.7-1.55-2.05-1.55h-2.2v3.1h2.2Z" fill="currentColor" />
    </svg>
  )
}

function App() {
  const [projectIndex, setProjectIndex] = useState(0)
  const activeProject = projects[projectIndex]

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const openContact = (type: keyof typeof contactLinks) => {
    window.open(contactLinks[type], '_blank', 'noopener,noreferrer')
  }

  const changeProject = (direction: number) => {
    setProjectIndex((current) => (current + direction + projects.length) % projects.length)
  }

  return (
    <>
      <div className="page-glow page-glow-one" aria-hidden="true" />
      <div className="page-glow page-glow-two" aria-hidden="true" />
      <Header />

      <main>
        <section className="hero section commercial-hero" id="inicio">
          <div className="hero-copy" data-reveal>
            <div className="eyebrow"><span />Soluções digitais pensadas para resolver, não apenas aparecer</div>
            <h1>
              Sua ideia pode virar uma experiência que
              <span>transmite confiança e gera resultado.</span>
            </h1>
            <p className="hero-text">
              Eu transformo necessidades reais em páginas, sistemas e automações claras, modernas e fáceis de usar. Com atenção ao que o seu cliente precisa sentir, entender e fazer.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projetos">Ver soluções na prática <ArrowUpRight size={18} /></a>
              <a className="button button-secondary button-contact-animated" href="#contato">Quero conversar</a>
              <a className="button button-github" href="/recrutadores"><Sparkles size={18} /> Para recrutadores</a>
            </div>
          </div>

          <div className="hero-visual" data-reveal>
            <div className="profile-orbit commercial-orbit">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit-dot dot-one" />
              <div className="orbit-dot dot-two" />

              <div className="hero-orbit-layer hero-orbit-layer-back" aria-hidden="true">
                {orbitIcons.map(({ icon: Icon, label, className }) => (
                  <div className={`hero-orbit-bubble hero-orbit-bubble-back ${className}`} key={`back-${label}`}>
                    <span><Icon size={20} strokeWidth={1.8} /></span>
                  </div>
                ))}
              </div>

              <div className="hero-profile-card hero-logo-card">
                <img className="hero-logo-image" src={logo} alt="Logomarca Marcus Camargo Portfólio" />
              </div>

              <div className="hero-orbit-layer hero-orbit-layer-front" aria-hidden="true">
                {orbitIcons.map(({ icon: Icon, label, className }) => (
                  <div className={`hero-orbit-bubble hero-orbit-bubble-front ${className}`} key={`front-${label}`}>
                    <span><Icon size={20} strokeWidth={1.8} /></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="commercial-value-band" data-reveal>
          <div><Globe2 size={20} /><strong>Presença</strong><span>Uma página que explica seu valor rapidamente.</span></div>
          <div><Database size={20} /><strong>Organização</strong><span>Sistemas que deixam a rotina mais simples.</span></div>
          <div><Bot size={20} /><strong>Agilidade</strong><span>Automação para reduzir tarefas repetitivas.</span></div>
        </section>

        <section className="brand-showcase" aria-label="Identidade visual Marcus Camargo" data-reveal>
          <div className="brand-showcase-inner">
            <div className="brand-showcase-copy">
              <span className="section-kicker">Identidade</span>
              <h2>Tecnologia pode ser sofisticada sem parecer complicada.</h2>
              <p>Minha identidade visual combina contraste, movimento e cores vivas para criar uma experiência marcante sem perder clareza.</p>
            </div>
            <div className="brand-logo-panel"><img src={identityImage} alt="Identidade visual Marcus Camargo Portfólio" /></div>
          </div>
        </section>

        <section className="section services-section" id="servicos" data-reveal>
          <SectionHeading kicker="Como posso ajudar" title="Menos tecnologia na conversa. Mais clareza sobre o resultado." text="Cada solução parte de uma necessidade concreta: apresentar melhor, organizar, agilizar, vender, atender ou eliminar trabalho repetitivo." />
          <div className="service-grid">
            {services.map(({ icon: Icon, title, text }, index) => (
              <article className="service-card commercial-service-card" key={title}>
                <span className="service-index">0{index + 1}</span>
                <div className="service-icon"><Icon size={22} strokeWidth={1.8} /></div>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section projects-section commercial-projects" id="projetos" data-reveal>
          <div className="project-slider-heading">
            <SectionHeading kicker="Projetos em destaque" title="Um projeto por vez. Uma história que vale a pena entender." text="Cada projeto nasce de uma necessidade diferente e mostra como uma ideia pode se transformar em uma experiência útil, clara e publicada." />
            <div className="project-slider-controls" aria-label="Navegação entre projetos">
              <button type="button" onClick={() => changeProject(-1)} aria-label="Projeto anterior"><ArrowLeft size={20} /></button>
              <span>{String(projectIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
              <button type="button" onClick={() => changeProject(1)} aria-label="Próximo projeto"><ArrowRight size={20} /></button>
            </div>
          </div>

          <article className={`project-card project-${activeProject.variant} commercial-project-slide`} key={activeProject.title}>
            <div className="project-preview"><ProjectPreview variant={activeProject.variant} /></div>
            <div className="project-content">
              <span className="commercial-project-label">{activeProject.variant === 'lista-app' ? 'Aplicativo Android' : 'Solução publicada'}</span>
              <h3>{activeProject.title}</h3>
              <p>{activeProject.variant === 'letreiro'
                ? 'Transformei a rotina de descobrir um filme em uma experiência diária: simples de começar, curiosa o suficiente para voltar no dia seguinte e com uma identidade própria.'
                : activeProject.variant === 'lista-app'
                  ? 'Levei o Liste & Compre para uma experiência realmente mobile: um aplicativo próprio para acompanhar a compra com toque, gestos, persistência local da sessão e integração com os mesmos dados da conta usados na versão web.'
                  : 'Nasceu de uma situação cotidiana: fazer compras sem perder controle do que falta, do que já foi colocado no carrinho e de quanto está sendo gasto ao longo do processo.'}
              </p>
              <div className="commercial-project-outcomes">
                {activeProject.variant === 'letreiro'
                  ? <><span>Desafio diário</span><span>Retenção por hábito</span><span>Experiência responsiva</span></>
                  : activeProject.variant === 'lista-app'
                    ? <><span>Experiência mobile nativa</span><span>Dados integrados ao web</span><span>Compra persistida no aparelho</span></>
                    : <><span>Organização prática</span><span>Controle durante a compra</span><span>Histórico reutilizável</span></>}
              </div>
              <a href={activeProject.liveUrl} target="_blank" rel="noreferrer">{activeProject.variant === 'lista-app' ? 'Ver aplicativo no GitHub' : 'Conhecer o projeto'} <ArrowUpRight size={16} /></a>
            </div>
          </article>
        </section>

        <section className="section about-section" id="sobre" data-reveal>
          <div className="about-panel commercial-about-panel">
            <div><span className="section-kicker">Sobre meu trabalho</span><h2>Eu começo pelo motivo. O código vem depois.</h2></div>
            <div className="about-copy">
              <p>Antes de pensar em tecnologia, eu tento entender o que precisa melhorar: uma apresentação confusa, uma rotina repetitiva, um processo sem organização ou uma ideia que ainda não encontrou a melhor forma de existir.</p>
              <p>Meu trabalho é traduzir isso para uma experiência digital clara, funcional e coerente com quem vai realmente usar.</p>
              <a className="inline-recruiter-link" href="/recrutadores">Quer avaliar a parte técnica? Veja a área para recrutadores <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contato" data-reveal>
          <div className="contact-panel commercial-contact-panel">
            <div className="contact-copy"><span className="section-kicker">Vamos conversar?</span><h2>Se existe um processo que pode ficar mais claro, rápido ou profissional, já existe um bom ponto de partida.</h2><p>Conte o contexto primeiro. A tecnologia certa vem depois.</p></div>
            <div className="contact-actions">
              <button className="contact-card whatsapp" type="button" onClick={() => openContact('whatsapp')}><div className="contact-icon"><WhatsAppBusinessIcon /></div><div><small>Contato direto</small><strong>WhatsApp Business</strong></div><ArrowUpRight size={20} /></button>
              <button className="contact-card instagram" type="button" onClick={() => openContact('instagram')}><div className="contact-icon"><Instagram size={23} /></div><div><small>Conteúdo & contato</small><strong>Instagram</strong></div><ArrowUpRight size={20} /></button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <a href="#inicio" className="footer-brand"><img className="footer-logo-transparent" src={logo} alt="" /><span>Marcus Camargo Portfólio</span></a>
        <p>Experiências digitais • Sistemas • Automação</p>
        <p>© {new Date().getFullYear()} Marcus Camargo. · <a className="footer-privacy-link" href="/privacidade">Privacidade</a></p>
      </footer>
    </>
  )
}

export default App
