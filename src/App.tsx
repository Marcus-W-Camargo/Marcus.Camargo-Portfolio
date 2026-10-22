import { useEffect } from 'react'
import {
  ArrowUpRight,
  Bot,
  Database,
  Globe2,
  Instagram,
  PanelsTopLeft,
  Workflow,
} from 'lucide-react'
import logo from './assets/Marcus-Camargo-Logo-Transparente.png'
import { Header } from './components/Header'
import { AmbientHeroField } from './components/AmbientHeroField'

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

  return (
    <>
      <div className="page-glow page-glow-one" aria-hidden="true" />
      <div className="page-glow page-glow-two" aria-hidden="true" />
      <Header />

      <main>
        <section className="hero section commercial-hero" id="inicio">
          <AmbientHeroField />

          <div className="hero-copy" data-reveal>
            <div className="eyebrow"><span />Desenvolvimento & soluções digitais</div>
            <h1>
              Ideias que viram
              <span>experiências digitais reais.</span>
            </h1>
            <p className="hero-text">
              Sites, sistemas e automações construídos para funcionar, comunicar e evoluir.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="/projetos">Explorar projetos <ArrowUpRight size={18} /></a>
              <a className="button button-secondary button-contact-animated" href="#contato">Contato</a>
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

        <section className="home-project-gateway" data-reveal>
          <div className="home-project-gateway-card">
            <div className="home-project-gateway-copy">
              <span>Projetos</span>
              <h2>Os trabalhos agora têm espaço para contar a história inteira.</h2>
            </div>
            <a className="home-project-gateway-link" href="/projetos">
              Abrir projetos <ArrowUpRight size={17} />
            </a>
          </div>
        </section>

        <section className="home-endcap" id="sobre" data-reveal>
          <div className="home-endcap-grid">
            <div className="home-endcap-statement">
              <span className="section-kicker">Sobre meu trabalho</span>
              <h2>Eu começo pelo motivo. O código vem depois.</h2>
              <p>
                Antes de pensar em tecnologia, eu tento entender o que precisa melhorar e transformar isso em uma experiência digital clara, funcional e coerente com quem vai usar.
              </p>
            </div>

            <div className="home-endcap-links">
              <a href="/recrutadores">
                <small>Perfil técnico</small>
                <strong>Para recrutadores</strong>
                <ArrowUpRight size={18} />
              </a>
              <button type="button" onClick={() => openContact('whatsapp')}>
                <small>Contato direto</small>
                <strong>WhatsApp Business</strong>
                <ArrowUpRight size={18} />
              </button>
              <button type="button" onClick={() => openContact('instagram')}>
                <small>Conteúdo & contato</small>
                <strong>Instagram</strong>
                <Instagram size={18} />
              </button>
            </div>
          </div>

          <div className="home-endcap-meta" id="contato">
            <a href="/" className="home-endcap-brand">
              <img className="footer-logo-transparent" src={logo} alt="" />
              <span>Marcus Camargo Portfólio</span>
            </a>
            <p>Experiências digitais • Sistemas • Automação</p>
            <p>© {new Date().getFullYear()} Marcus Camargo. · <a className="footer-privacy-link" href="/privacidade">Privacidade</a></p>
          </div>
        </section>
      </main>

    </>
  )
}

export default App
