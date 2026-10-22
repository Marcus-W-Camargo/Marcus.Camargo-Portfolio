import { useEffect, useRef, useState } from 'react'
import { Header } from './components/Header'
import { ProjectPreview } from './components/ProjectPreview'
import { projects } from './data/projects'

export function ProjectsPage() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [mobileSlug, setMobileSlug] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const selectorRef = useRef<HTMLDivElement>(null)

  const activeProject = projects.find((project) => project.slug === activeSlug) ?? null
  const mobileProject = projects.find((project) => project.slug === mobileSlug) ?? null
  const mobileIndex = projects.findIndex((project) => project.slug === mobileSlug)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)')
    const list = listRef.current
    let frame = 0

    const updateMobileProject = () => {
      if (!media.matches || !list) {
        setMobileSlug(null)
        return
      }

      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const rows = Array.from(list.querySelectorAll<HTMLElement>('[data-project-slug]'))
        const listRect = list.getBoundingClientRect()
        const selectorRect = selectorRef.current?.getBoundingClientRect()
        const selectorY = selectorRect
          ? selectorRect.top + selectorRect.height / 2
          : listRect.top + listRect.height * 0.34

        let nearestSlug = projects[0]?.slug ?? null
        let nearestDistance = Number.POSITIVE_INFINITY

        for (const row of rows) {
          const rect = row.getBoundingClientRect()
          const rowCenter = rect.top + rect.height / 2
          const distance = Math.abs(rowCenter - selectorY)

          if (distance < nearestDistance) {
            nearestDistance = distance
            nearestSlug = row.dataset.projectSlug ?? nearestSlug
          }
        }

        setMobileSlug(nearestSlug)
      })
    }

    updateMobileProject()
    list?.addEventListener('scroll', updateMobileProject, { passive: true })
    window.addEventListener('resize', updateMobileProject)
    media.addEventListener('change', updateMobileProject)

    return () => {
      window.cancelAnimationFrame(frame)
      list?.removeEventListener('scroll', updateMobileProject)
      window.removeEventListener('resize', updateMobileProject)
      media.removeEventListener('change', updateMobileProject)
    }
  }, [])

  return (
    <div className="editorial-projects-page">
      <Header />

      <main className="editorial-projects-main">
        <div className="editorial-projects-intro">
          <span>Selected work / 2026</span>
          <h1>Projetos</h1>
        </div>

        <section className="editorial-projects-stage" aria-label="Projetos de Marcus Camargo">
          <div className={`editorial-preview-stage ${activeProject ? 'is-active' : ''}`} aria-live="polite">
            {activeProject && (
              <div className="editorial-preview-shell" key={activeProject.slug}>
                <div className={`editorial-preview project-${activeProject.variant}`}>
                  <ProjectPreview variant={activeProject.variant} />
                </div>
                <div className="editorial-preview-caption">
                  <span>{activeProject.category}</span>
                  <strong>{activeProject.year}</strong>
                </div>
              </div>
            )}
          </div>

          <div className="editorial-mobile-wheel">
            <div className="editorial-mobile-selector-line" ref={selectorRef} aria-hidden="true">
              <span />
            </div>

            <div
              className="editorial-project-list"
              ref={listRef}
              onMouseLeave={() => setActiveSlug(null)}
            >
              <div className="editorial-project-spacer" aria-hidden="true" />

              {projects.map((project, index) => {
                const offset = mobileIndex < 0 ? 0 : index - mobileIndex
                const distance = mobileIndex < 0 ? 5 : Math.min(Math.abs(offset), 5)
                const side = offset === 0 ? 'selected' : offset > 0 ? 'below' : 'above'

                return (
                  <article
                    className={`editorial-project-row editorial-project-row-${index + 1} ${activeSlug === project.slug ? 'is-active' : ''}`}
                    key={project.slug}
                    data-project-slug={project.slug}
                    data-mobile-distance={distance}
                    data-mobile-side={side}
                    onMouseEnter={() => setActiveSlug(project.slug)}
                  >
                    <a
                      href={`/projetos/${project.slug}`}
                      onFocus={() => setActiveSlug(project.slug)}
                      onBlur={() => setActiveSlug(null)}
                    >
                      <span className="editorial-project-marker">{project.year} / {String(index + 1).padStart(2, '0')}</span>
                      <span className="editorial-project-title">{project.title}</span>
                      <span className="editorial-project-slash" aria-hidden="true">/</span>
                    </a>
                  </article>
                )
              })}

              <div className="editorial-project-spacer" aria-hidden="true" />
            </div>

            <div className="editorial-mobile-list-hint" aria-hidden="true">
              <span>role para explorar</span>
              <i />
            </div>
          </div>

          <div className={`editorial-mobile-carousel ${mobileProject ? 'is-active' : ''}`} aria-live="polite">
            {mobileProject && (
              <div className="editorial-mobile-carousel-shell" key={mobileProject.slug}>
                <div className={`editorial-preview project-${mobileProject.variant}`}>
                  <ProjectPreview variant={mobileProject.variant} />
                </div>
                <div className="editorial-preview-caption">
                  <span>{mobileProject.category}</span>
                  <strong>{mobileProject.title}</strong>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
