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

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let width = 0
    let height = 0
    let raf = 0
    const pointer = { x: -9999, y: -9999, active: false }
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
      const count = Math.max(220, Math.floor((width * height) / 3600))

      for (let index = 0; index < count; index += 1) {
        pixels.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.9 + 0.7,
          speed: Math.random() * 0.28 + 0.07,
          phase: Math.random() * Math.PI * 2,
          drift: Math.random() * 0.22 - 0.11,
        })
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    const drawGlow = (x: number, y: number, radius: number, alpha: number) => {
      const glow = context.createRadialGradient(x, y, 0, x, y, radius)
      glow.addColorStop(0, `rgba(255, 36, 153, ${alpha})`)
      glow.addColorStop(.38, `rgba(160, 62, 255, ${alpha * .42})`)
      glow.addColorStop(1, 'rgba(8, 6, 13, 0)')
      context.fillStyle = glow
      context.fillRect(x - radius, y - radius, radius * 2, radius * 2)
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      frame += 1

      const autoX = width * (.5 + Math.sin(frame * .005) * .34)
      const autoY = height * (.48 + Math.cos(frame * .0038) * .18)
      const lightX = pointer.active ? pointer.x : autoX
      const lightY = pointer.active ? pointer.y : autoY
      const glowRadius = Math.max(180, Math.min(width, height) * .42)

      drawGlow(lightX, lightY, glowRadius, pointer.active ? .34 : .22)

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
        const influence = Math.max(0, 1 - distance / 245)
        const shimmer = reduceMotion ? .34 : .22 + Math.sin(frame * .024 + pixel.phase) * .13
        const alpha = Math.min(.96, shimmer + influence * .82)
        const size = pixel.size + influence * 2.4

        context.fillStyle = influence > .08
          ? `rgba(255, 80, 180, ${alpha})`
          : `rgba(224, 211, 239, ${alpha * .52})`
        context.fillRect(pixel.x, pixel.y, size, size)

        if (influence > .48) {
          context.fillStyle = `rgba(255, 178, 224, ${influence * .42})`
          context.fillRect(pixel.x - 4, pixel.y, size + 8, 1)
        }
      }

      if (!reduceMotion) raf = window.requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return <canvas className="ambient-hero-field" ref={canvasRef} aria-hidden="true" />
}
