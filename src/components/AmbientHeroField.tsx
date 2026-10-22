import { useEffect, useRef } from 'react'

type Pixel = {
  baseX: number
  y: number
  size: number
  speed: number
  phase: number
  amplitude: number
  waveSpeed: number
  tone: number
}

export function AmbientHeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const hero =
      canvas.closest<HTMLElement>('.home-intro-shell') ??
      canvas.closest<HTMLElement>('.commercial-hero')

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let frame = 0
    let width = 0
    let height = 0
    let raf = 0
    let presence = 0
    let targetPresence = 0

    const pointer = {
      x: -9999,
      y: -9999,
      clientX: -9999,
      clientY: -9999,
      known: false,
    }

    const pixels: Pixel[] = []

    const seeded = (index: number, salt: number) => {
      const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453
      return value - Math.floor(value)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height

      canvas.width = Math.max(1, Math.floor(width * ratio))
      canvas.height = Math.max(1, Math.floor(height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      pixels.length = 0
      const count = Math.max(230, Math.floor((width * height) / 3900))

      for (let index = 0; index < count; index += 1) {
        pixels.push({
          baseX: seeded(index, 1) * width,
          y: seeded(index, 2) * (height + 180),
          size: .6 + seeded(index, 3) * 1.75,
          speed: .1 + seeded(index, 4) * .34,
          phase: seeded(index, 5) * Math.PI * 2,
          amplitude: 4 + seeded(index, 6) * 22,
          waveSpeed: .004 + seeded(index, 7) * .009,
          tone: seeded(index, 8),
        })
      }
    }

    const syncPointerWithHero = () => {
      if (!hero || !pointer.known) {
        targetPresence = 0
        return
      }

      const rect = hero.getBoundingClientRect()
      const inside =
        pointer.clientX >= rect.left &&
        pointer.clientX <= rect.right &&
        pointer.clientY >= rect.top &&
        pointer.clientY <= rect.bottom

      targetPresence = inside ? 1 : 0

      if (inside) {
        pointer.x = pointer.clientX - rect.left
        pointer.y = pointer.clientY - rect.top
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        pointer.known = false
        targetPresence = 0
        return
      }

      pointer.clientX = event.clientX
      pointer.clientY = event.clientY
      pointer.known = true
      syncPointerWithHero()
    }

    const onPointerLeaveWindow = () => {
      pointer.known = false
      targetPresence = 0
    }

    const onScroll = () => {
      syncPointerWithHero()
    }

    const drawGlow = (
      x: number,
      y: number,
      radius: number,
      alpha: number,
      core = '255, 36, 153',
      secondary = '160, 62, 255',
    ) => {
      if (alpha <= .001) return

      const glow = context.createRadialGradient(x, y, 0, x, y, radius)
      glow.addColorStop(0, `rgba(${core}, ${alpha})`)
      glow.addColorStop(.38, `rgba(${secondary}, ${alpha * .48})`)
      glow.addColorStop(1, 'rgba(8, 6, 13, 0)')
      context.fillStyle = glow
      context.fillRect(x - radius, y - radius, radius * 2, radius * 2)
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      frame += 1

      const easing = reduceMotion ? .34 : .12
      presence += (targetPresence - presence) * easing

      if (presence < .002 && targetPresence === 0) {
        presence = 0
      }

      const heroRect = hero?.getBoundingClientRect()
      const visualRect = hero?.querySelector<HTMLElement>('.hero-visual')?.getBoundingClientRect()
      const isMobile = width <= 760

      const logoGlowX = visualRect && heroRect
        ? visualRect.left - heroRect.left + visualRect.width / 2
        : width * (isMobile ? .68 : .72)

      const logoGlowY = visualRect && heroRect
        ? visualRect.top - heroRect.top + visualRect.height / 2
        : height * (isMobile ? .7 : .48)

      if (presence > 0) {
        const glowRadius = Math.max(240, Math.min(width, height) * .56)
        drawGlow(pointer.x, pointer.y, glowRadius, .42 * presence)

        const logoGlowRadius = Math.max(220, Math.min(width, height) * .46)
        drawGlow(
          logoGlowX,
          logoGlowY,
          logoGlowRadius,
          .17 * presence,
          '226, 38, 170',
          '128, 58, 238',
        )
      }

      for (let index = 0; index < pixels.length; index += 1) {
        const pixel = pixels[index]

        if (!reduceMotion) {
          pixel.y -= pixel.speed

          if (pixel.y < -12) {
            pixel.y = height + 28 + seeded(index, 9) * 150
          }
        }

        const wave =
          Math.sin(frame * pixel.waveSpeed + pixel.phase) * pixel.amplitude +
          Math.sin(frame * .0025 + pixel.phase * 1.7) * pixel.amplitude * .28

        const x = pixel.baseX + wave
        const y = pixel.y

        const ambientPulse = reduceMotion
          ? .1
          : .085 + Math.sin(frame * .014 + pixel.phase) * .025

        let cursorInfluence = 0
        let logoInfluence = 0

        if (presence > 0) {
          const dx = x - pointer.x
          const dy = y - pointer.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          cursorInfluence = Math.max(0, 1 - distance / 310) * presence

          const logoDx = x - logoGlowX
          const logoDy = y - logoGlowY
          const logoDistance = Math.sqrt(logoDx * logoDx + logoDy * logoDy)
          logoInfluence = Math.max(0, 1 - logoDistance / 270) * presence
        }

        const interactiveInfluence = Math.max(cursorInfluence, logoInfluence * .66)
        const ambientAlpha = ambientPulse * (.72 + pixel.tone * .48)
        const interactiveAlpha = interactiveInfluence * .78
        const alpha = Math.min(.95, ambientAlpha + interactiveAlpha)
        const size = pixel.size + interactiveInfluence * 2.8

        if (interactiveInfluence > .07) {
          context.fillStyle = `rgba(255, 80, 181, ${alpha})`
        } else if (pixel.tone > .62) {
          context.fillStyle = `rgba(225, 62, 174, ${alpha * .78})`
        } else {
          context.fillStyle = `rgba(218, 207, 232, ${alpha * .6})`
        }

        context.fillRect(x, y, size, size)

        if (interactiveInfluence > .5) {
          context.fillStyle = `rgba(255, 185, 226, ${interactiveInfluence * .42})`
          context.fillRect(x - 5, y, size + 10, 1)
        }
      }

      raf = window.requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeaveWindow)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeaveWindow)
    }
  }, [])

  return <canvas className="ambient-hero-field" ref={canvasRef} aria-hidden="true" />
}
