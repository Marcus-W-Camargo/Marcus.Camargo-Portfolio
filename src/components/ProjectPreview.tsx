import { useEffect, useState, type ReactNode } from 'react'
import type { Project } from '../data/projects'
import profilePhoto from '../assets/Perfil Marcus Camargo - Portifolio.png'

const spacoLogo =
  'https://raw.githubusercontent.com/Spaco-Liss/spaco-liss/main/public/brand/spaco-liss-logo-oficial.png'
const mexeLogo =
  'https://raw.githubusercontent.com/Marcus-W-Camargo/Mexe-Pilates/main/public/logo.png'
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
          <small>BELEZA · ESTÉTICA · BEM-ESTAR</small>
          <h3>Seu momento de se cuidar começa aqui</h3>
          <p>Beleza, cuidado e experiências pensadas para valorizar você em cada detalhe.</p>
          <button type="button">Agende seu horário</button>
        </div>
        <div className="spaco-home-photo">
          <div className="licensed-media-card licensed-media-spaco">
            <span>IMAGEM LICENCIADA</span>
            <strong>Uso exclusivo do Spaço Liss</strong>
            <small>Fotografia original reservada aos proprietários do site.</small>
          </div>
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
  const calendarDays = Array.from({ length: 30 }, (_, index) => index + 1)
  return (
    <BrowserFrame className="spaco-scene spaco-panel-scene">
      <div className="spaco-panel-open">
        <div className="spaco-panel-topbar">
          <div className="spaco-panel-brand-open"><img src={spacoLogo} alt="" /><span><b>PAINEL INTERNO</b><small>Agenda de atendimentos</small></span></div>
          <nav><span>Clientes</span><span>Cupons</span><span>Caixa do Dia</span><span>Catálogo</span><span>Gestão de Horários</span><b>Sair</b></nav>
        </div>
        <div className="spaco-panel-heading">
          <div><h3>Agenda do Spaço Liss</h3><p>Visualize os atendimentos por data e filtre a agenda de cada profissional.</p></div>
          <div className="spaco-panel-counter"><strong>119</strong><small>agendamentos no mês</small></div>
        </div>
        <div className="spaco-panel-filters">
          {['Geral','Rose Britto','Katia Curam','Edino Britto','Suelem Aldevino','Freelancer'].map((name,index)=><span className={index===0?'active':''} key={name}><i>{index===0?'G':name.split(' ').map((part)=>part[0]).join('').slice(0,2)}</i>{name}</span>)}
        </div>
        <div className="spaco-panel-layout">
          <section className="spaco-panel-calendar">
            <header><b>←</b><strong>Novembro <em>2026</em></strong><b>→</b></header>
            <div className="spaco-panel-week"><span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span></div>
            <div className="spaco-panel-days">
              {calendarDays.map((day)=><i className={day===10?'selected':day===7||day===14?'busy':''} key={day}><b>{day}</b>{[3,4,5,6,7,10,11,12,13,14,17,18,19,20,21,26,27,28].includes(day)?<small>{day===7?'22':day===10?'5':day===14?'12':'•'}</small>:null}</i>)}
            </div>
          </section>
          <section className="spaco-panel-day">
            <header><small>AGENDA DO DIA</small><h4>Terça-Feira, 10 De Novembro De 2026</h4><p>5 agendamentos</p></header>
            <div className="spaco-panel-grid-head"><b>HORÁRIO</b><span>Rose Britto</span><span>Katia Curam</span><span>Edino Britto</span><span>Suelem</span></div>
            <div className="spaco-panel-time-grid">
              {['07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00'].map((time,index)=><div key={time}><b>{time}</b><span className={index===6?'appointment rose':''}>{index===6?'Coloração raiz':''}</span><span className={index===5?'appointment katia':''}>{index===5?'Manicure e Pedicure':''}</span><span /><span /></div>)}
            </div>
          </section>
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
          <div className="licensed-media-card licensed-media-mexe">
            <span>IMAGEM LICENCIADA</span>
            <strong>Uso exclusivo do Mexe Pilates</strong>
            <small>Retrato original preservado para os proprietários do site.</small>
          </div>
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
      <div className="liste-web-appbar"><img src={listeLogo} alt="" /><span className="liste-web-account">Olá, Marcus Camargo.<img className="liste-user-avatar" src={profilePhoto} alt="" /></span></div>
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
  const rows=[['Arroz','Mercearia','24,90','2','Un.','R$ 49,80',true],['Feijão','Mercearia','8,79','1','Un.','R$ 8,79',true],['Banana','Hortifrúti','6,49','1,200','Kg.','R$ 7,79',false]]
  return (
    <BrowserFrame className="liste-web-scene liste-web-purchase-scene">
      <div className="liste-web-appbar"><img src={listeLogo} alt="" /><span className="liste-web-account">Compra do mês<img className="liste-user-avatar" src={profilePhoto} alt="" /></span></div>
      <div className="liste-web-purchase-real">
        <header className="liste-web-purchase-top">
          <div className="liste-web-purchase-title"><i>📝</i><span><h3>Compra do mês</h3><small>Agendada para 15/11/2026</small></span></div>
          <div className="liste-web-purchase-progress"><i><span /></i><b>39% concluída</b></div>
          <strong>Total parcial: R$ 66,38</strong>
        </header>
        <section className="liste-web-purchase-section">
          <header><b>Geral (Todos)</b><span><small>3 Itens</small><i>▲</i></span></header>
          <div className="liste-web-purchase-items">
            {rows.map(([name,category,price,qty,measure,total,done])=><div className={done?'done':''} key={String(name)}>
              <i className="liste-web-check">{done?'✓':''}</i>
              <span className="liste-web-category-icon">{category==='Mercearia'?'🍞':'🍎'}</span>
              <span className="liste-web-product-name"><b>{name}</b><small>{category}</small></span>
              <label><small>Preço</small><em>R$ {price}</em></label>
              <label className="measure"><small>Medida</small><em>{measure}<i>{measure==='Kg.'?'⚖️':'📦'}</i></em></label>
              <label><small>Qtd.</small><em>{qty}</em></label>
              <strong>{total}</strong>
              <span className="liste-web-trash">⌫</span>
            </div>)}
          </div>
        </section>
        <div className="liste-web-purchase-actions"><button type="button">+ Adicionar item</button><button type="button">Finalizar compra</button></div>
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
        <div className="liste-native-top"><img src={listeAppLogo} alt="" /><span>Olá, Marcus<br /><img className="liste-native-avatar" src={profilePhoto} alt="" /></span></div>
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
        <div className="liste-native-top"><img src={listeAppLogo} alt="" /><span><img className="liste-native-avatar" src={profilePhoto} alt="" /></span></div>
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
  const rows=[['Arroz','Mercearia','24,90','2','un',true],['Banana','Hortifrúti','6,49','1,200','Kg',false]]
  return (
    <div className="liste-app-faithful-scene">
      <AppPhone active="Comprar">
        <div className="liste-native-top compact"><img src={listeAppLogo} alt="" /><span><img className="liste-native-avatar" src={profilePhoto} alt="" /></span></div>
        <div className="liste-native-pagehead simple"><span><b>‹　Compra do mês</b><small>Agendada para 15/11/2026</small></span></div>
        <div className="liste-native-purchase-summary"><span><b>39% concluída</b><small>7/18 itens</small></span><span><b>R$ 66,38</b></span></div>
        <div className="liste-native-product-list real">
          {rows.map(([name,category,price,qty,measure,done])=><div className={done?'done':''} key={String(name)}>
            <i className="liste-native-check">{done?'✓':''}</i>
            <div className="liste-native-row-body">
              <header><span><b>{name}</b><small>{category}</small></span><strong>×</strong></header>
              <div className="liste-native-row-inputs">
                <label><small>Preço unitário</small><em>R$ {price}</em></label>
                <label><small>Quantidade</small><em>{qty}</em></label>
                <label><small>Medida</small><em>{measure==='Kg'?'⚖️ Kg':'📦 un'}</em></label>
              </div>
              {!done?<small className="liste-native-hint">Toque no círculo para marcar como colocado no carrinho.</small>:null}
            </div>
          </div>)}
        </div>
        <div className="liste-native-actions"><button type="button">+ Adicionar item extra</button><button type="button">Finalizar compra</button></div>
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
