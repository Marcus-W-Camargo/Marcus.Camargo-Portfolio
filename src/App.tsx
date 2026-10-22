import { useEffect } from 'react'
import {
  ArrowUpRight,
  Bot,
  Database,
  Globe2,
  PanelsTopLeft,
  Workflow,
} from 'lucide-react'
import profile from './assets/Perfil Marcus Camargo - Portifolio.png'
import { Header } from './components/Header'
import { AmbientHeroField } from './components/AmbientHeroField'

const orbitIcons = [
  { icon: Globe2, label: 'Presença', className: 'orbit-bubble-one' },
  { icon: Database, label: 'Organização', className: 'orbit-bubble-two' },
  { icon: Bot, label: 'Agilidade', className: 'orbit-bubble-three' },
  { icon: Workflow, label: 'Integrações', className: 'orbit-bubble-four' },
  { icon: PanelsTopLeft, label: 'Sistemas', className: 'orbit-bubble-five' },
]

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

  return (
    <div className="home-page-shell">
      <div className="page-glow page-glow-one" aria-hidden="true" />
      <div className="page-glow page-glow-two" aria-hidden="true" />
      <div className="home-intro-shell">
        <AmbientHeroField />
        <Header />

        <section className="hero section commercial-hero" id="inicio">
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
                <a
                  className="button button-secondary button-contact-animated"
                  href="https://wa.me/message/S2FPE7ASPUHHM1"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contato
                </a>
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

                <div className="hero-profile-card hero-photo-card">
                  <img className="hero-photo-image" src={profile} alt="Foto de Marcus Camargo" />
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
      </div>

    </div>
  )
}

export default App
