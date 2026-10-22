import { useEffect, useRef } from 'react'

type Pixel = {
  x: number
  y: number
  size: number
  speed: number
  phase: number
  drift: number
}

export function AmbientHeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const hero = canvas.closest<HTMLElement>('.commercial-hero')
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
      active: false,
      known: false,
    }

    const pixels: Pixel[] = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height

      canvas.width = Math.max(1, Math.floor(width * ratio))
      canvas.height = Math.max(1, Math.floor(height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      pixels.length = 0
      const count = Math.max(300, Math.floor((width * height) / 2800))

      for (let index = 0; index < count; index += 1) {
        pixels.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + .65,
          speed: Math.random() * .3 + .06,
          phase: Math.random() * Math.PI * 2,
          drift: Math.random() * .24 - .12,
        })
      }
    }

    const syncPointerWithHero = () => {
      if (!hero || !pointer.known) {
        pointer.active = false
        targetPresence = 0
        return
      }

      const rect = hero.getBoundingClientRect()
      const inside =
        pointer.clientX >= rect.left &&
        pointer.clientX <= rect.right &&
        pointer.clientY >= rect.top &&
        pointer.clientY <= rect.bottom

      pointer.active = inside
      targetPresence = inside ? 1 : 0

      if (inside) {
        pointer.x = pointer.clientX - rect.left
        pointer.y = pointer.clientY - rect.top
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        pointer.active = false
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
      pointer.active = false
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

      if (presence > 0) {
        const lightX = pointer.x
        const lightY = pointer.y
        const glowRadius = Math.max(240, Math.min(width, height) * .56)

        drawGlow(lightX, lightY, glowRadius, .42 * presence)

        const heroRect = hero?.getBoundingClientRect()
        const visualRect = hero?.querySelector<HTMLElement>('.hero-visual')?.getBoundingClientRect()
        const isMobile = width <= 760

        const logoGlowX = visualRect && heroRect
          ? visualRect.left - heroRect.left + visualRect.width / 2
          : width * (isMobile ? .68 : .72)

        const logoGlowY = visualRect && heroRect
          ? visualRect.top - heroRect.top + visualRect.height / 2
          : height * (isMobile ? .7 : .48)

        const logoGlowRadius = Math.max(220, Math.min(width, height) * .46)

        drawGlow(
          logoGlowX,
          logoGlowY,
          logoGlowRadius,
          .19 * presence,
          '226, 38, 170',
          '128, 58, 238',
        )

        for (const pixel of pixels) {
          if (!reduceMotion) {
            pixel.y -= pixel.speed
            pixel.x += pixel.drift

            if (pixel.y < -6) pixel.y = height + 6
            if (pixel.x < -6) pixel.x = width + 6
            if (pixel.x > width + 6) pixel.x = -6
          }

          const dx = pixel.x - lightX
          const dy = pixel.y - lightY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const influence = Math.max(0, 1 - distance / 300)

          const logoDx = pixel.x - logoGlowX
          const logoDy = pixel.y - logoGlowY
          const logoDistance = Math.sqrt(logoDx * logoDx + logoDy * logoDy)
          const logoInfluence = Math.max(0, 1 - logoDistance / 260)

          const shimmer = reduceMotion
            ? .36
            : .24 + Math.sin(frame * .024 + pixel.phase) * .14

          const combinedInfluence = Math.max(influence, logoInfluence * .72)
          const alpha = Math.min(.98, shimmer + combinedInfluence * .84) * presence
          const size = pixel.size + combinedInfluence * 2.9

          context.fillStyle = combinedInfluence > .08
            ? `rgba(255, 82, 184, ${alpha})`
            : `rgba(226, 214, 240, ${alpha * .55})`

          context.fillRect(pixel.x, pixel.y, size, size)

          if (combinedInfluence > .5) {
            context.fillStyle = `rgba(255, 184, 226, ${combinedInfluence * .46 * presence})`
            context.fillRect(pixel.x - 5, pixel.y, size + 10, 1)
          }
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
