import { useEffect, useState, type ReactNode } from 'react'
import type { Project } from '../data/projects'

const spacoLogo =
  'https://raw.githubusercontent.com/Spaco-Liss/spaco-liss/main/public/brand/spaco-liss-logo-oficial.png'
const spacoHero =
  'https://raw.githubusercontent.com/Spaco-Liss/spaco-liss/main/public/images/principal.png'
const mexeLogo =
  'https://raw.githubusercontent.com/Marcus-W-Camargo/Mexe-Pilates/main/public/logo.png'
const karinaPortrait =
  'https://raw.githubusercontent.com/Marcus-W-Camargo/Mexe-Pilates/main/public/images/embaixadora/karina-retrato-embaixadora.png'
const listeLogo =
  'https://raw.githubusercontent.com/Marcus-W-Camargo/liste-e-compre/main/src/assets/liste-%26-compre.png'
const listeBackground =
  'https://raw.githubusercontent.com/Marcus-W-Camargo/liste-e-compre/main/public/background-corrigido.webp'
const listeAppLogo =
  'https://raw.githubusercontent.com/Marcus-W-Camargo/Liste-Compre-APP/main/src/assets/ListeLogo.png'

type Props = {
  variant: Project['variant']
}

type PreviewCarouselProps = {
  variant: string
  slides: ReactNode[]
}

function PreviewCarousel({ variant, slides }: PreviewCarouselProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, 3000)

    return () => window.clearInterval(interval)
  }, [variant, slides.length])

  return (
    <div className={`project-preview-carousel project-preview-carousel-${variant}`}>
      <div className="project-preview-carousel-viewport">
        {slides.map((slide, slideIndex) => (
          <div
            className={`project-preview-carousel-slide ${slideIndex === index ? 'is-active' : ''}`}
            key={slideIndex}
            aria-hidden={slideIndex !== index}
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="project-preview-carousel-meta" aria-hidden="true">
        <span className="project-preview-carousel-count">
          {index + 1}/{slides.length}
        </span>
        <span className="project-preview-carousel-track">
          <i className="project-preview-carousel-progress" key={`${variant}-${index}`} />
        </span>
      </div>
    </div>
  )
}

function BrowserFrame({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`faithful-browser-frame ${className}`}>
      <div className="faithful-browser-bar"><i /><i /><i /></div>
      <div className="faithful-browser-content">{children}</div>
    </div>
  )
}

function SpacoHomeScene() {
  return (
    <BrowserFrame className="spaco-scene spaco-home-scene">
      <div className="spaco-header-mini">
        <img src={spacoLogo} alt="" />
        <div><span>Profissionais</span><span>Serviços</span><span>HeadSpa</span><span>Estética</span><b>Agende seu horário</b></div>
      </div>
      <div className="spaco-home-hero">
        <div className="spaco-home-copy">
          <small>BELEZA · ESTÉTICA · EXPERIÊNCIA</small>
          <h3>Seu momento de se cuidar começa aqui</h3>
          <p>Beleza, cuidado e experiências pensadas para valorizar você em cada detalhe.</p>
          <button type="button">Agende seu horário</button>
        </div>
        <div className="spaco-home-photo">
          <img src={spacoHero} alt="" />
          <span>SPAÇO LISS</span>
        </div>
      </div>
    </BrowserFrame>
  )
}

function SpacoBookingScene() {
  return (
    <BrowserFrame className="spaco-scene spaco-booking-scene">
      <div className="spaco-booking-banner">
        <small>AGENDAMENTO</small>
        <h3>Monte seu dia de cuidados</h3>
        <p>Escolha um ou mais atendimentos para a mesma data.</p>
      </div>
      <div className="spaco-booking-body">
        <div className="spaco-booking-form">
          <small>01 · SEU SERVIÇO</small>
          <strong>O que você deseja fazer?</strong>
          <label>Categoria<span>Cabelos⌄</span></label>
          <label>Serviço<span>Mechas⌄</span></label>
          <small>02 · PROFISSIONAL</small>
          <label>Profissional<span>Rose⌄</span></label>
          <div className="spaco-booking-row">
            <label>Data<span>14/11/2026</span></label>
            <label>Horário<span>14:30</span></label>
          </div>
        </div>
        <aside className="spaco-booking-summary">
          <small>SEU DIA NO SPAÇO LISS</small>
          <h4>Resumo</h4>
          <div><span>Cliente</span><b>Marcus</b></div>
          <div><span>Serviço</span><b>Mechas</b></div>
          <div><span>Profissional</span><b>Rose</b></div>
          <div><span>Horário</span><b>14:30</b></div>
          <button type="button">Adicionar atendimento</button>
        </aside>
      </div>
    </BrowserFrame>
  )
}

function SpacoPanelScene() {
  return (
    <BrowserFrame className="spaco-scene spaco-panel-scene">
      <div className="spaco-panel-backdrop">
        <div className="spaco-panel-card">
          <div className="spaco-panel-brand">
            <img src={spacoLogo} alt="" />
            <span><b>SPAÇO LISS</b><small>Painel interno</small></span>
          </div>
          <small>ACESSO INTERNO</small>
          <h3>Entrar no painel</h3>
          <p>Conecte seu usuário para acessar agenda, clientes, caixa e demais ferramentas.</p>
          <label>Profissional<span>Selecione seu usuário⌄</span></label>
          <label>Senha<span>••••••••　◉</span></label>
          <button type="button">Entrar no painel</button>
          <em>Este dispositivo continuará conectado até você usar o botão Sair.</em>
        </div>
      </div>
    </BrowserFrame>
  )
}

function MexeHomeScene() {
  return (
    <BrowserFrame className="mexe-scene mexe-home-scene">
      <div className="mexe-header-mini">
        <span className="mexe-brand-small">MEXE<br /><b>PILATES</b></span>
        <div><span>Nossa prática</span><span>O Mexe</span><span>Profissionais</span><span>Cursos</span><span>Espaço</span><b>Aula Teste</b></div>
      </div>
      <div className="mexe-home-grid">
        <div className="mexe-home-copy">
          <small>MEXE_PILATES · JARDIM BONIFÁCIO</small>
          <h3>Seu <em>corpo</em><br />foi feito para<br />estar em<br /><em>movimento</em></h3>
          <p>Pilates acessível a todos. Sem julgamento, sem corpo perfeito e no seu tempo.</p>
          <button type="button">Agendar Aula Teste · R$ 10,00</button>
        </div>
        <div className="mexe-logo-orbit">
          <img src={mexeLogo} alt="" />
          <span>RESPIRE</span><i>MOVA</i>
        </div>
      </div>
    </BrowserFrame>
  )
}

function MexeAmbassadorScene() {
  return (
    <BrowserFrame className="mexe-scene mexe-ambassador-scene">
      <div className="mexe-header-mini">
        <span className="mexe-brand-small">MEXE<br /><b>PILATES</b></span>
        <div><span>Nossa prática</span><span>O Mexe</span><span>Profissionais</span><b>Embaixadora</b><span>Aula Teste</span></div>
      </div>
      <div className="mexe-ambassador-grid">
        <div className="mexe-ambassador-copy">
          <small>EMBAIXADORA · CONGRESSO 360 · MOBILIZE PILATES</small>
          <h3>Karina<br /><em>Marques Dias</em></h3>
          <p>Fisioterapeuta, mestre em Ciências da Saúde, professora e formadora de profissionais.</p>
          <div><span>CREFITO 3/71038-F</span><span>FISIOTERAPEUTA · PILATES CLÍNICO · DOCÊNCIA</span></div>
        </div>
        <div className="mexe-ambassador-photo">
          <img src={karinaPortrait} alt="" />
          <span>EMBAIXADORA</span>
        </div>
      </div>
    </BrowserFrame>
  )
}

function MexeBookingScene() {
  const days = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
  return (
    <BrowserFrame className="mexe-scene mexe-booking-scene">
      <div className="mexe-booking-layout">
        <div className="mexe-booking-intro">
          <small>AULA TESTE</small>
          <h3>Seu primeiro<br /><em>movimento</em></h3>
          <div><span>VALOR DA AULA TESTE</span><strong>R$ 10,00</strong><small>Pagamento presencial, diretamente no estúdio.</small></div>
        </div>
        <div className="mexe-booking-calendar">
          <div className="mexe-stepper"><b>01 DATA E HORÁRIO</b><span /><small>02 SEUS DADOS</small></div>
          <small>01 · DATA E HORÁRIO</small>
          <h4>Quando você prefere se mover?</h4>
          <div className="mexe-calendar-box">
            <header><b>‹</b><strong>Novembro de 2026</strong><b>›</b></header>
            <div className="mexe-calendar-week"><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span></div>
            <div className="mexe-calendar-days">
              {days.map((day) => <i className={day === 10 ? 'active' : ''} key={day}>{day}</i>)}
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

function LetreiroLandingScene() {
  return (
    <BrowserFrame className="letreiro-faithful-scene letreiro-landing-scene">
      <div className="letreiro-controls"><span>💡</span><span>🌙</span></div>
      <div className="letreiro-landing-center">
        <h3>🎬 Letreiro</h3>
        <p>Adivinhe o filme do dia, letra por letra.</p>
        <div className="letreiro-language-grid">
          <div className="selected"><b>PT-BR</b><span><strong>Português</strong><small>Brasil</small></span><i>✓</i></div>
          <div><b>EN-US</b><span><strong>English</strong><small>United States</small></span><i /></div>
        </div>
        <button type="button">Jogar</button>
        <button className="outline" type="button">Como Jogar?</button>
      </div>
    </BrowserFrame>
  )
}

function LetreiroGameScene() {
  const keys = ['QWERTYUIOP','ASDFGHJKL','ZXCVBNM']
  return (
    <BrowserFrame className="letreiro-faithful-scene letreiro-game-scene">
      <div className="letreiro-game-head"><span>💡　📅</span><b>🎬 LETREIRO</b><span>?　🌙</span></div>
      <small className="letreiro-date">10 De Novembro De 2026</small>
      <div className="letreiro-board">
        <div>{'DOUTOR'.split('').map((l,i)=><i className={i===0?'green':i===2?'yellow':''} key={i}>{l}</i>)}</div>
        <div>{'ESTRANHO'.split('').map((l,i)=><i className={i===3?'purple':i===6?'gray':''} key={i}>{l}</i>)}</div>
      </div>
      <div className="letreiro-keyboard-faithful">
        {keys.map((row,ri)=><div key={row}>{row.split('').map(k=><b key={k}>{k}</b>)}{ri===2&&<b>⌫</b>}</div>)}
        <strong>ENTER</strong>
      </div>
    </BrowserFrame>
  )
}

function LetreiroCalendarScene() {
  return (
    <BrowserFrame className="letreiro-faithful-scene letreiro-calendar-scene">
      <div className="letreiro-game-head"><span>💡</span><b>🎬 Letreiro</b><span>🌙</span></div>
      <h3>Letreiros anteriores</h3>
      <div className="letreiro-month"><b>‹</b><strong>Novembro De 2026</strong><b>›</b></div>
      <div className="letreiro-calendar-grid">
        {Array.from({length:30},(_,i)=>i+1).map(day=>(
          <div className={day>10?'disabled':day===7?'done':''} key={day}>
            <span><i /><i /><i /></span><b>{day}</b>
          </div>
        ))}
      </div>
      <div className="letreiro-calendar-legend"><span>■ Incompleto</span><span>■ Concluído</span></div>
    </BrowserFrame>
  )
}

function ListeWebHomeScene() {
  return (
    <BrowserFrame className="liste-web-scene liste-web-home-scene">
      <div className="liste-web-wallpaper" style={{ backgroundImage: `url("${listeBackground}")` }}>
        <div className="liste-web-login"><b>Entrar</b><b>Cadastrar</b><i>●</i></div>
        <img className="liste-web-main-logo" src={listeLogo} alt="" />
        <div className="liste-web-home-actions">
          <button type="button">Crie sua lista　→</button><span>↓</span>
          <button type="button">Faça sua compra　→</button><span>↓</span>
          <button type="button">Histórico de compras　→</button>
        </div>
      </div>
    </BrowserFrame>
  )
}

function ListeWebListScene() {
  const items=[['Arroz','Mercearia','2 un'],['Feijão','Mercearia','0,500 Kg'],['Leite','Laticínios','2 un']]
  return (
    <BrowserFrame className="liste-web-scene liste-web-list-scene">
      <div className="liste-web-appbar"><img src={listeLogo} alt="" /><span>Olá, Marcus Camargo.　●</span></div>
      <div className="liste-web-workspace">
        <aside><h4>📋 Minhas Listas</h4><div><b>Final de Semana</b><small>4 itens</small></div><div><b>Compra do mês</b><small>18 itens</small></div></aside>
        <main>
          <h3>📝 Criar Lista</h3>
          <div className="liste-web-form">
            <label>Nome do Produto<span>Maçã verde</span></label>
            <div><label>Categoria<span>🍎 Hortifrúti⌄</span></label><label>Quantidade<span>2</span></label><label>Medida<span>un</span></label></div>
            <button type="button">Adicionar à Lista</button>
          </div>
          <div className="liste-web-items">
            <header><b>Itens da Lista</b><span>Geral (Todos)⌄</span></header>
            {items.map(([n,c,q])=><div key={n}><span><b>{n}</b><small>{c}</small></span><strong>{q}</strong><i>🗑</i></div>)}
            <button type="button">💾 Salvar Lista</button>
          </div>
        </main>
      </div>
    </BrowserFrame>
  )
}

function ListeWebPurchaseScene() {
  const rows=[['Arroz','R$ 24,90','2','un'],['Feijão','R$ 8,79','1','un'],['Banana','R$ 6,49','1,2','Kg']]
  return (
    <BrowserFrame className="liste-web-scene liste-web-purchase-scene">
      <div className="liste-web-appbar"><img src={listeLogo} alt="" /><span>Compra do mês　●</span></div>
      <div className="liste-web-purchase">
        <header><div><small>PROGRESSO</small><strong>7 / 18 itens</strong></div><div className="liste-progress-ring">39%</div><div><small>TOTAL PARCIAL</small><strong>R$ 98,42</strong></div></header>
        <section><h4>🍞 Mercearia <span>3 itens</span></h4>
          {rows.map(([n,p,q,u],i)=><div className={i<2?'done':''} key={n}><i>{i<2?'✓':''}</i><b>{n}</b><span>{p}</span><span>{q}</span><span>{u}</span></div>)}
        </section>
        <button type="button">+ Adicionar item</button>
      </div>
    </BrowserFrame>
  )
}

function AppPhone({ children, active }: { children: ReactNode; active: string }) {
  const tabs=[['⌂','Início'],['☷','Listas'],['$','Comprar'],['◷','Histórico']]
  return (
    <div className="liste-native-phone">
      <div className="liste-native-status"><span>9:41</span><span>● ● ●</span></div>
      <div className="liste-native-screen">
        {children}
        <div className="liste-native-tabs">
          {tabs.map(([icon,label])=><span className={active===label?'active':''} key={label}><b>{icon}</b><small>{label}</small></span>)}
        </div>
      </div>
    </div>
  )
}

function ListeAppHomeScene() {
  return (
    <div className="liste-app-faithful-scene">
      <AppPhone active="Início">
        <div className="liste-native-decor one" /><div className="liste-native-decor two" />
        <div className="liste-native-top"><img src={listeAppLogo} alt="" /><span>Olá, Marcus<br /><b>●</b></span></div>
        <h3>Por onde começamos?</h3>
        <div className="liste-native-flow">
          <div><i>📝</i><b>Crie sua lista</b></div><span>↓</span>
          <div><i>🛒</i><b>Faça sua compra</b></div><span>↓</span>
          <div><i>🧾</i><b>Histórico de compras</b></div>
        </div>
        <div className="liste-native-summary"><b>Resumo rápido</b><div><span><strong>4</strong><small>listas</small></span><span><strong>12</strong><small>compras</small></span><span><strong>✓</strong><small>nuvem</small></span></div></div>
      </AppPhone>
    </div>
  )
}

function ListeAppListsScene() {
  return (
    <div className="liste-app-faithful-scene">
      <AppPhone active="Listas">
        <div className="liste-native-top"><img src={listeAppLogo} alt="" /><span><b>●</b></span></div>
        <div className="liste-native-pagehead"><span><b>Minhas listas</b><small>Listas sincronizadas com a sua conta.</small></span><button type="button">+ Nova lista</button></div>
        <div className="liste-native-listcards">
          <div><span><b>Compra do mês</b><small>18 itens · 15/11/2026</small></span><strong>›</strong></div>
          <div><span><b>Final de Semana</b><small>8 itens · 21/11/2026</small></span><strong>›</strong></div>
          <div><span><b>Churrasco</b><small>12 itens · sem data</small></span><strong>›</strong></div>
        </div>
      </AppPhone>
    </div>
  )
}

function ListeAppPurchaseScene() {
  const rows=[['Arroz','R$ 24,90','2','un',true],['Feijão','R$ 8,79','1','un',true],['Banana','R$ 6,49','1,2','Kg',false]]
  return (
    <div className="liste-app-faithful-scene">
      <AppPhone active="Comprar">
        <div className="liste-native-top compact"><img src={listeAppLogo} alt="" /><span><b>●</b></span></div>
        <div className="liste-native-pagehead simple"><span><b>Compra do mês</b><small>A compra fica protegida neste aparelho.</small></span></div>
        <div className="liste-native-purchase-summary"><span><small>PROGRESSO</small><b>7 / 18</b></span><span><small>TOTAL</small><b>R$ 98,42</b></span></div>
        <div className="liste-native-product-list">
          {rows.map(([n,p,q,u,done])=><div className={done?'done':''} key={String(n)}>
            <i>{done?'✓':''}</i><span><b>{n}</b><small>Mercearia</small></span>
            <em>{p}</em><em>{q}</em><em>{u}</em>
          </div>)}
        </div>
        <button className="liste-native-extra" type="button">+ Adicionar item extra</button>
      </AppPhone>
    </div>
  )
}

export function ProjectPreview({ variant }: Props) {
  if (variant === 'spaco-liss') {
    return <PreviewCarousel variant={variant} slides={[<SpacoHomeScene />, <SpacoBookingScene />, <SpacoPanelScene />]} />
  }

  if (variant === 'mexe-pilates') {
    return <PreviewCarousel variant={variant} slides={[<MexeHomeScene />, <MexeAmbassadorScene />, <MexeBookingScene />]} />
  }

  if (variant === 'letreiro') {
    return <PreviewCarousel variant={variant} slides={[<LetreiroLandingScene />, <LetreiroGameScene />, <LetreiroCalendarScene />]} />
  }

  if (variant === 'lista') {
    return <PreviewCarousel variant={variant} slides={[<ListeWebHomeScene />, <ListeWebListScene />, <ListeWebPurchaseScene />]} />
  }

  if (variant === 'lista-app') {
    return <PreviewCarousel variant={variant} slides={[<ListeAppHomeScene />, <ListeAppListsScene />, <ListeAppPurchaseScene />]} />
  }

  return (
    <div className="project-coming-soon-preview" aria-hidden="true">
      <span>Case</span>
      <strong>Em breve...</strong>
      <i />
    </div>
  )
}
