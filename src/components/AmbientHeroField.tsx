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
    let scrollProgress = 0

    const pointer = { x: -9999, y: -9999, active: false }
    const pixels: Pixel[] = []

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value))

    const updateScrollProgress = () => {
      if (!hero) {
        scrollProgress = 0
        return
      }

      const rect = hero.getBoundingClientRect()
      const travel = Math.max(rect.height * .72, 1)
      scrollProgress = clamp(-rect.top / travel, 0, 1)
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

      updateScrollProgress()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!hero) return

      const rect = hero.getBoundingClientRect()
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom

      if (!inside) {
        pointer.active = false
        return
      }

      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }

    const onPointerLeaveWindow = () => {
      pointer.active = false
    }

    const drawGlow = (
      x: number,
      y: number,
      radius: number,
      alpha: number,
      core = '255, 36, 153',
      secondary = '160, 62, 255',
    ) => {
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

      const scrollShift = height * (.16 + scrollProgress * .46)
      const autoX = width * (.43 + Math.sin(frame * .0048) * .28)
      const autoY = clamp(
        scrollShift + Math.cos(frame * .0036) * height * .07,
        height * .14,
        height * .82,
      )

      const pointerScrollOffset = (scrollProgress - .5) * height * .09
      const lightX = pointer.active ? pointer.x : autoX
      const lightY = pointer.active
        ? clamp(pointer.y + pointerScrollOffset, height * .08, height * .9)
        : autoY

      const glowRadius = Math.max(240, Math.min(width, height) * .56)
      drawGlow(lightX, lightY, glowRadius, pointer.active ? .42 : .31)

      // Secondary ambient light deliberately lives behind the logo/orbit region.
      const heroRect = hero?.getBoundingClientRect()
      const visualRect = hero?.querySelector<HTMLElement>('.hero-visual')?.getBoundingClientRect()
      const isMobile = width <= 760

      const logoGlowX = visualRect && heroRect
        ? visualRect.left - heroRect.left + visualRect.width / 2
        : width * (isMobile ? .68 : .72)

      const logoGlowYBase = visualRect && heroRect
        ? visualRect.top - heroRect.top + visualRect.height / 2
        : height * (isMobile ? .7 : .48)

      const logoGlowY = logoGlowYBase + height * scrollProgress * (isMobile ? .05 : .08)
      const logoGlowRadius = Math.max(220, Math.min(width, height) * .46)
      drawGlow(
        logoGlowX,
        logoGlowY,
        logoGlowRadius,
        .19,
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
        const alpha = Math.min(.98, shimmer + combinedInfluence * .84)
        const size = pixel.size + combinedInfluence * 2.9

        context.fillStyle = combinedInfluence > .08
          ? `rgba(255, 82, 184, ${alpha})`
          : `rgba(226, 214, 240, ${alpha * .55})`

        context.fillRect(pixel.x, pixel.y, size, size)

        if (combinedInfluence > .5) {
          context.fillStyle = `rgba(255, 184, 226, ${combinedInfluence * .46})`
          context.fillRect(pixel.x - 5, pixel.y, size + 10, 1)
        }
      }

      if (!reduceMotion) {
        raf = window.requestAnimationFrame(draw)
      }
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeaveWindow)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeaveWindow)
    }
  }, [])

  return <canvas className="ambient-hero-field" ref={canvasRef} aria-hidden="true" />
}
