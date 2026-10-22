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

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20.52 3.48A11.8 11.8 0 0 0 12.12 0C5.58 0 .26 5.32.26 11.86c0 2.09.55 4.13 1.6 5.93L.16 24l6.36-1.67a11.8 11.8 0 0 0 5.6 1.42h.01C18.67 23.75 24 18.43 24 11.89c0-3.17-1.24-6.15-3.48-8.41ZM12.13 21.75h-.01a9.84 9.84 0 0 1-5.01-1.37l-.36-.21-3.77.99 1.01-3.68-.24-.38a9.82 9.82 0 0 1-1.51-5.24C2.24 6.42 6.67 2 12.12 2a9.79 9.79 0 0 1 6.99 2.9A9.81 9.81 0 0 1 22 11.89c0 5.44-4.43 9.86-9.87 9.86Zm5.41-7.39c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.94 8.94 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.34.44-.52.15-.17.2-.3.3-.49.1-.2.05-.37-.02-.52-.08-.15-.66-1.59-.91-2.18-.24-.58-.49-.5-.66-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.08 3.18 5.04 4.46.7.3 1.25.49 1.68.62.71.23 1.35.2 1.86.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z"
        fill="currentColor"
      />
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

          <div className="commercial-hero-inner">
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
                <WhatsAppIcon size={19} />
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
