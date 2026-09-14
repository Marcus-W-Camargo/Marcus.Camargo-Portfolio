import { useState } from 'react'
import { ArrowLeft, Check, Copy, Heart, ServerCog, Sparkles } from 'lucide-react'
import logo from './assets/Marcus-Camargo-Logo-Transparente.png'

const PIX_KEY = 'marcuscamargo.portifolio@gmail.com'
const PIX_CODE = '00020126560014BR.GOV.BCB.PIX0134marcuscamargo.portifolio@gmail.com5204000053039865802BR5914MARCUS CAMARGO6009SAO PAULO62070503***6304BC54'

const QR_ROWS = [
  '111111100110101100110010001011010100101111111',
  '100000101011110001000010000000001101001000001',
  '101110100100000101001011010000001001001011101',
  '101110100001011001111001011000100101101011101',
  '101110101111110111001111110101110011101011101',
  '100000100110111011001000110111101100001000001',
  '111111101010101010101010101010101010101111111',
  '000000000101100110001000110111100100100000000',
  '101010100000100000111111101110111010100010010',
  '000111001010100100011101010000011010110011110',
  '000010110011000100001011001000011010101011001',
  '100001010100011000101011111000001110011000010',
  '110011111000011010000101010010111101010010001',
  '100011000000100100001100110001001110000101010',
  '111100101111001111111111001010001111010010101',
  '101111001011100110110100010101111111010101001',
  '110010100000011010110110011111000100101010110',
  '101011010010111110011110110000010001010111010',
  '100110100110111111111101110111100010110011001',
  '111110000100001100010100010011001001001010110',
  '100011111111000010011111111011000111111110111',
  '001110001000100010011000110010010110100011010',
  '001010101111100111001010111010100100101010101',
  '101010001011001001101000100110010001100011001',
  '100111111000011011011111101111100110111110100',
  '001100001100110111010101000011010101010101110',
  '110010100000100110100001101001100010101101001',
  '100010000111000100100011011101001101110101010',
  '010001100110001010100111110100001100101010101',
  '110011000110110111010011000111001110010001010',
  '110010101011111101100001101100100001110010111',
  '100000010111101110110101010011011101011101001',
  '001110101110110011000011110111101011000010100',
  '110000000101101010110101001101001000000101110',
  '000010100110110111101101100111011000111001101',
  '011110010010011101010111101101101111001101010',
  '100110100100100110001111100011001010111110000',
  '000000001001000100011000101110010000100010000',
  '111111100000011001011010101001011011101010101',
  '100000100101101001101000100010100000100011001',
  '101110101011100100001111111111100110111110100',
  '101110100000001001001011011010100001010011100',
  '101110101110001100100010000101111100010111001',
  '100000100010101011000111111101010101110101111',
  '111111101011110001000101110010111100110011101',
] as const

function PixQr() {
  return (
    <div className="support-qr" role="img" aria-label="QR Code PIX para apoiar Marcus Camargo">
      {QR_ROWS.map((row, rowIndex) => (
        <div className="support-qr-row" key={rowIndex}>
          {[...row].map((module, columnIndex) => (
            <span
              className={module === '1' ? 'support-qr-module support-qr-module-dark' : 'support-qr-module'}
              key={`${rowIndex}-${columnIndex}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const area = document.createElement('textarea')
  area.value = text
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  document.execCommand('copy')
  area.remove()
}

export function ApoiePage() {
  const [copied, setCopied] = useState(false)

  async function copyPix() {
    await copyText(PIX_CODE)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="support-page-shell">
      <div className="page-glow page-glow-one" aria-hidden="true" />
      <div className="page-glow page-glow-two" aria-hidden="true" />

      <header className="support-header">
        <a className="support-brand" href="/">
          <img src={logo} alt="Marcus Camargo Portfólio" />
          <span><strong>Marcus Camargo</strong><small>Desenvolvimento & Soluções Digitais</small></span>
        </a>
        <a className="support-back" href="/"><ArrowLeft size={17} /> Voltar ao portfólio</a>
      </header>

      <main className="support-main">
        <section className="support-intro">
          <span className="support-kicker"><Sparkles size={15} /> Projetos independentes</span>
          <h1>Apoie meu trabalho</h1>
          <p>
            Se algum dos meus projetos já foi útil, interessante ou inspirou uma ideia,
            você pode contribuir diretamente para a continuidade desse trabalho.
          </p>
        </section>

        <section className="support-grid">
          <div className="support-story-card">
            <div className="support-heart"><Heart size={30} fill="currentColor" /></div>
            <span className="support-label">Por que apoiar?</span>
            <h2>Mais tempo para construir, melhorar e publicar boas ideias.</h2>
            <p>
              Desenvolvo e mantenho projetos próprios, experiências web, aplicativos e ferramentas
              que exigem infraestrutura, serviços externos, domínios, testes e manutenção contínua.
            </p>
            <p>
              O apoio ajuda a manter essa estrutura e abre espaço para novas funcionalidades e novos projetos.
            </p>
            <div className="support-note">
              <ServerCog size={19} />
              <span><strong>O apoio é totalmente opcional.</strong> Nenhum projeto ou recurso depende de uma contribuição para ser acessado.</span>
            </div>
          </div>

          <div className="support-pix-card">
            <div className="support-pix-heading">
              <span className="support-label">Apoiar via PIX</span>
              <h2>Escolha o valor que fizer sentido para você.</h2>
              <p>Não existe valor mínimo ou sugerido.</p>
            </div>

            <div className="support-qr-wrap"><PixQr /></div>

            <div className="support-key-block">
              <span>Chave PIX · E-mail</span>
              <strong>{PIX_KEY}</strong>
            </div>

            <button className={`support-copy-button ${copied ? 'is-copied' : ''}`} type="button" onClick={() => void copyPix()}>
              {copied ? <><Check size={18} /> Código PIX copiado</> : <><Copy size={18} /> Copiar código PIX</>}
            </button>
          </div>
        </section>
      </main>

      <footer className="support-footer">
        <img src={logo} alt="" />
        <p>© {new Date().getFullYear()} Marcus Camargo. Projetos independentes, construídos com propósito.</p>
      </footer>
    </div>
  )
}
