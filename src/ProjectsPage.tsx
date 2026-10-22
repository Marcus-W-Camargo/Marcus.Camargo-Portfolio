import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { ProjectPreview } from './components/ProjectPreview'
import { projects } from './data/projects'

export function ProjectsPage() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [mobileSlug, setMobileSlug] = useState<string | null>(null)
  const activeProject = projects.find((project) => project.slug === activeSlug) ?? null
  const mobileProject = projects.find((project) => project.slug === mobileSlug) ?? null

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)')
    const list = document.querySelector<HTMLElement>('.editorial-project-list')

    const updateMobileProject = () => {
      if (!media.matches || !list) {
        setMobileSlug(null)
        return
      }

      const rows = Array.from(list.querySelectorAll<HTMLElement>('[data-project-slug]'))
      const listRect = list.getBoundingClientRect()

      const visibleRows = rows.filter((row) => {
        const rect = row.getBoundingClientRect()
        return rect.bottom > listRect.top + 2 && rect.top < listRect.bottom - 2
      })

      const selected = visibleRows.at(-1) ?? rows.at(-1) ?? null
      setMobileSlug(selected?.dataset.projectSlug ?? null)
    }

    updateMobileProject()
    list?.addEventListener('scroll', updateMobileProject, { passive: true })
    window.addEventListener('resize', updateMobileProject)
    media.addEventListener('change', updateMobileProject)

    return () => {
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

          <div className="editorial-project-list" onMouseLeave={() => setActiveSlug(null)}>
            {projects.map((project, index) => (
              <article
                className={`editorial-project-row editorial-project-row-${index + 1} ${(activeSlug === project.slug || mobileSlug === project.slug) ? 'is-active' : ''}`}
                key={project.slug}
                data-project-slug={project.slug}
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
            ))}
          </div>

          <div className="editorial-mobile-list-hint" aria-hidden="true">
            <span>role para explorar</span>
            <i />
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
