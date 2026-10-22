import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  size: number
  speed: number
  phase: number
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
    const pointer = { x: -9999, y: -9999 }
    const particles: Particle[] = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * ratio))
      canvas.height = Math.max(1, Math.floor(height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      particles.length = 0
      const count = Math.max(90, Math.floor((width * height) / 9000))
      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.6 + 0.35,
          speed: Math.random() * 0.22 + 0.05,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }

    const onPointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      frame += 1

      for (const particle of particles) {
        if (!reduceMotion) {
          particle.y -= particle.speed
          if (particle.y < -4) {
            particle.y = height + 4
            particle.x = Math.random() * width
          }
        }

        const dx = particle.x - pointer.x
        const dy = particle.y - pointer.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - distance / 190)
        const shimmer = reduceMotion ? 0.42 : 0.32 + Math.sin(frame * 0.018 + particle.phase) * 0.14
        const alpha = Math.min(0.95, shimmer + influence * 0.75)
        const radius = particle.size + influence * 2.6

        context.beginPath()
        context.fillStyle = influence > 0.15
          ? `rgba(255, 42, 154, ${alpha})`
          : `rgba(220, 205, 238, ${alpha * 0.68})`
        context.arc(particle.x, particle.y, radius, 0, Math.PI * 2)
        context.fill()
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
