import { useState } from 'react'
import { BriefcaseBusiness, Instagram } from 'lucide-react'
import logo from '../assets/Marcus-Camargo-Logo-Transparente.png'

const links = [
  ['Início', '/'],
  ['Projetos', '/projetos'],
  ['Serviços', '/servicos'],
  ['Sobre', '/sobre'],
]

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

export function Header() {
  const [open, setOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  const closeMenu = () => {
    setOpen(false)
    setContactOpen(false)
  }

  return (
    <header className="site-header">
      <a href="/" className="brand" onClick={closeMenu}>
        <img className="brand-logo-image" src={logo} alt="Logomarca Marcus Camargo" />
        <span className="brand-text">
          <strong>Marcus Camargo</strong>
          <small>Desenvolvimento & Soluções Digitais</small>
        </span>
      </a>

      <button
        className={`menu-toggle ${open ? 'active' : ''}`}
        type="button"
        aria-label="Abrir menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <nav className={`main-nav ${open ? 'open' : ''}`} aria-label="Navegação principal">
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={closeMenu}>
            {label}
          </a>
        ))}
        <a href="/apoie" onClick={closeMenu}>
          Apoie
        </a>
        <a className="nav-recruiter" href="/recrutadores" onClick={closeMenu}>
          <BriefcaseBusiness size={16} />
          Para recrutadores
        </a>

        <div
          className={`nav-contact-menu ${contactOpen ? 'is-open' : ''}`}
          onFocus={() => setContactOpen(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setContactOpen(false)
            }
          }}
        >
          <button
            className="nav-cta nav-contact-trigger"
            type="button"
            aria-haspopup="true"
            aria-expanded={contactOpen}
            onClick={() => setContactOpen((value) => !value)}
          >
            Contato
          </button>

          <div className="nav-contact-popover" role="menu">
            <a
              href="https://wa.me/message/S2FPE7ASPUHHM1"
              target="_blank"
              rel="noreferrer"
              role="menuitem"
              onClick={closeMenu}
            >
              <span className="nav-contact-icon"><WhatsAppIcon size={18} /></span>
              <span>
                <small>Contato direto</small>
                <strong>WhatsApp</strong>
              </span>
            </a>
            <a
              href="https://www.instagram.com/marcus.camargo_portifolio?igsi=ZmdpOTdzNmIzY25p"
              target="_blank"
              rel="noreferrer"
              role="menuitem"
              onClick={closeMenu}
            >
              <span className="nav-contact-icon"><Instagram size={18} /></span>
              <span>
                <small>Conteúdo & contato</small>
                <strong>Instagram</strong>
              </span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
