import { useEffect, useRef, useState } from 'react'
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


function MobileServicesDeck() {
  const shellRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const previousStepRef = useRef(0)
  const exitTimerRef = useRef<number | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [exitingStep, setExitingStep] = useState<number | null>(null)
  const [deckReady, setDeckReady] = useState(false)

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    let raf = 0

    const updateDeckReady = () => {
      raf = 0

      const rect = shell.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const tolerance = Math.max(28, viewportHeight * .08)
      const nextReady =
        rect.top <= tolerance &&
        rect.bottom >= viewportHeight - tolerance

      setDeckReady((current) => current === nextReady ? current : nextReady)
    }

    const scheduleUpdate = () => {
      if (raf) return
      raf = window.requestAnimationFrame(updateDeckReady)
    }

    updateDeckReady()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.visualViewport?.addEventListener('resize', scheduleUpdate)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.visualViewport?.removeEventListener('resize', scheduleUpdate)
    }
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const stepElements = Array.from(
      scroller.querySelectorAll<HTMLElement>('[data-mobile-service-step]'),
    )

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting && entry.intersectionRatio >= .6)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visible) return

        const nextStep = Number((visible.target as HTMLElement).dataset.mobileServiceStep)
        if (!Number.isFinite(nextStep)) return

        const previousStep = previousStepRef.current
        if (nextStep === previousStep) return

        if (exitTimerRef.current !== null) {
          window.clearTimeout(exitTimerRef.current)
          exitTimerRef.current = null
        }

        if (nextStep < previousStep) {
          setExitingStep(previousStep)
          setActiveStep(nextStep)

          exitTimerRef.current = window.setTimeout(() => {
            setExitingStep(null)
            exitTimerRef.current = null
          }, 720)
        } else {
          setExitingStep(null)
          setActiveStep(nextStep)
        }

        previousStepRef.current = nextStep
      },
      {
        root: scroller,
        threshold: [.6, .75, .9],
      },
    )

    stepElements.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current)
      }
    }
  }, [])

  return (
    <section className="services-mobile-deck-section" aria-label="Serviços oferecidos">
      <div
        className="services-mobile-deck-shell"
        data-deck-ready={deckReady ? 'true' : 'false'}
        ref={shellRef}
      >
        <div
          className="services-mobile-deck-scroller"
          ref={scrollerRef}
          aria-label="Navegue pelos serviços"
        >
          {services.map((service, index) => (
            <div
              className="services-mobile-snap-step"
              data-mobile-service-step={index}
              aria-hidden="true"
              key={service.title}
            />
          ))}
        </div>

        <div className="services-mobile-deck-visual" aria-live="polite">
          {services.map(({ icon: Icon, title, summary, details }, index) => {
            const state =
              index === 0
                ? 'landed'
                : index === exitingStep
                  ? 'retrieving'
                  : index <= activeStep
                    ? 'landed'
                    : 'hidden'

            return (
              <article
                className="mobile-service-diskette-card"
                data-mobile-card-index={index}
                data-state={state}
                aria-hidden={state === 'hidden'}
                key={title}
              >
                <div className="mobile-service-diskette-shutter" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.55} />
                  <span>MC</span>
                </div>

                <div className="mobile-service-diskette-label">
                  <span className="mobile-service-diskette-type">SERVIÇO / DESENVOLVIMENTO</span>
                  <h2>{title}</h2>
                  <p>{summary}</p>
                  <ul>
                    {details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                </div>

                <span className="mobile-service-diskette-lock" aria-hidden="true" />
                {index > 0 && <span className="mobile-service-diskette-hand" aria-hidden="true" />}
              </article>
            )
          })}

          <div className="services-mobile-deck-progress" aria-hidden="true">
            <span>{String(activeStep + 1).padStart(2, '0')} / 06</span>
            <div>
              {services.map((service, index) => (
                <i className={index <= activeStep ? 'is-active' : ''} key={service.title} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ServicesPage() {
  const servicesStageRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const stage = servicesStageRef.current
    if (!stage) return

    const cards = Array.from(stage.querySelectorAll<HTMLElement>('[data-service-card]'))
    const desktop = window.matchMedia('(min-width: 761px)')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktopViewportOffsets = [.5, .275, .05, -.175, -.4, -.625]
    const removalTimers = new Map<HTMLElement, number>()

    let lastScrollY = window.scrollY
    let initial = true
    let raf = 0

    const clearRemoval = (card: HTMLElement) => {
      const timer = removalTimers.get(card)
      if (timer) {
        window.clearTimeout(timer)
        removalTimers.delete(card)
      }
    }

    const showCard = (card: HTMLElement) => {
      clearRemoval(card)
      if (card.dataset.state !== 'landed') {
        card.dataset.state = 'landed'
      }
    }

    const hideCard = (card: HTMLElement, animatePickup: boolean) => {
      clearRemoval(card)

      if (!animatePickup || reduceMotion.matches) {
        card.dataset.state = 'hidden'
        return
      }

      if (card.dataset.state !== 'retrieving') {
        card.dataset.state = 'retrieving'
      }

      const timer = window.setTimeout(() => {
        card.dataset.state = 'hidden'
        removalTimers.delete(card)
      }, 720)

      removalTimers.set(card, timer)
    }

    const update = () => {
      raf = 0

      if (!desktop.matches) {
        lastScrollY = window.scrollY
        initial = false
        return
      }

      const rect = stage.getBoundingClientRect()
      const currentScrollY = window.scrollY
      const scrollingUp = currentScrollY < lastScrollY - 1
      const scrollingDown = currentScrollY > lastScrollY + 1

      cards.forEach((card, index) => {
        const shouldBeVisible =
          rect.top <= window.innerHeight * desktopViewportOffsets[index]

        if (shouldBeVisible) {
          showCard(card)
          return
        }

        if (initial || scrollingDown || card.dataset.state === 'hidden') {
          clearRemoval(card)
          card.dataset.state = 'hidden'
          return
        }

        if (scrollingUp && card.dataset.state === 'landed') {
          hideCard(card, true)
        }
      })

      lastScrollY = currentScrollY
      initial = false
    }

    const scheduleUpdate = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    desktop.addEventListener('change', scheduleUpdate)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      desktop.removeEventListener('change', scheduleUpdate)
      removalTimers.forEach((timer) => window.clearTimeout(timer))
      removalTimers.clear()
    }
  }, [])

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

          <div className="services-transition-cue" aria-hidden="true">
            <div className="services-transition-copy">
              <span className="services-transition-eyebrow">O que eu construo na prática</span>
              <p>Cada projeto começa com uma necessidade real. O formato muda. A lógica acompanha o problema.</p>
            </div>

            <div className="services-transition-loader">
              <div className="services-transition-loader-head">
                <span>SERVIÇOS / 06 MÓDULOS</span>
                <small>ROLE PARA CARREGAR ↓</small>
              </div>
              <div className="services-transition-track">
                <i />
                <b />
              </div>
            </div>
          </div>
        </section>

        <section
          className="services-diskette-stage"
          aria-label="Serviços oferecidos"
          ref={servicesStageRef}
        >
          <div className="services-diskette-sticky">
            <div className="services-diskette-board">
              {services.map(({ icon: Icon, title, summary, details }) => (
                <article
                  className="service-diskette-card"
                  data-service-card
                  data-state="hidden"
                  key={title}
                >
                  <div className="service-diskette-shutter" aria-hidden="true">
                    <Icon size={19} strokeWidth={1.55} />
                    <span>MC</span>
                  </div>

                  <div className="service-diskette-label">
                    <span className="service-diskette-type">SERVIÇO / DESENVOLVIMENTO</span>
                    <h2>{title}</h2>
                    <p>{summary}</p>
                    <ul>
                      {details.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                  </div>

                  <span className="service-diskette-lock" aria-hidden="true" />
                  <span className="service-diskette-hand" aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <MobileServicesDeck />

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
