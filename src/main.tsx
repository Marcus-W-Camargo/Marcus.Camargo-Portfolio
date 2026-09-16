import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './identity-overrides.css'
import './hero-stats-overrides.css'
import './about-overrides.css'
import './contact-overrides.css'
import './section-kicker-overrides.css'
import './header-overrides.css'
import './github-button-overrides.css'
import './project-preview-overrides.css'
import './liste-real-preview.css'
import './liste-app-preview.css'
import './liste-app-single-phone.css'
import './liste-closed-state-overrides.css'
import './preview-harmony-overrides.css'
import './mobile-project-preview-overrides.css'
import './letreiro-keyboard-layout-overrides.css'
import './logo-overrides.css'
import './privacy.css'
import './commercial-recruiter.css'
import './commercial-recruiter-refinements.css'
import './commercial-recruiter-visual-fixes.css'
import './hero-orbit-icons.css'
import './apoie.css'
import App from './App'
import { ApoiePage } from './ApoiePage'
import { PrivacyPage } from './PrivacyPage'
import { RecruiterPage } from './RecruiterPage'

const SITE_URL = 'https://marcuscamargo-portfolio.com.br'

const seoPages: Record<
  string,
  { title: string; description: string; index: boolean }
> = {
  '/': {
    title: 'Marcus Camargo | Portfólio',
    description:
      'Marcus Camargo — desenvolvimento de sites, aplicações web e mobile, integrações, automações e chatbots.',
    index: true,
  },
  '/recrutadores': {
    title: 'Para recrutadores | Marcus Camargo',
    description:
      'Conheça a experiência, os projetos, as competências técnicas e a forma de trabalho de Marcus Camargo.',
    index: true,
  },
  '/privacidade': {
    title: 'Política de Privacidade | Marcus Camargo',
    description:
      'Consulte a Política de Privacidade do portfólio de Marcus Camargo e saiba como os dados são tratados.',
    index: true,
  },
  '/apoie': {
    title: 'Apoie | Marcus Camargo',
    description:
      'Conheça formas de apoiar os projetos independentes desenvolvidos por Marcus Camargo.',
    index: true,
  },
}

const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
const seoPage = seoPages[pathname] ?? {
  title: 'Marcus Camargo | Portfólio',
  description:
    'Projetos reais, soluções digitais e evolução técnica em desenvolvimento web e mobile.',
  index: false,
}
const canonicalPath = seoPages[pathname] ? pathname : '/'
const canonicalUrl = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`

const setMetaByName = (name: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('name', name)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

const setMetaByProperty = (property: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`,
  )

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('property', property)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

const setCanonical = (href: string) => {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }

  canonical.setAttribute('href', href)
}

document.title = seoPage.title
setMetaByName('description', seoPage.description)
setMetaByName('robots', seoPage.index ? 'index, follow' : 'noindex, nofollow')
setCanonical(canonicalUrl)
setMetaByProperty('og:title', seoPage.title)
setMetaByProperty('og:description', seoPage.description)
setMetaByProperty('og:url', canonicalUrl)
setMetaByName('twitter:title', seoPage.title)
setMetaByName('twitter:description', seoPage.description)

const Page = pathname === '/privacidade'
  ? PrivacyPage
  : pathname === '/recrutadores'
    ? RecruiterPage
    : pathname === '/apoie'
      ? ApoiePage
      : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
