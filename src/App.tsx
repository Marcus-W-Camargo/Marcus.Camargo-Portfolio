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
