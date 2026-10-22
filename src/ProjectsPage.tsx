import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Header } from './components/Header'
import { ProjectPreview } from './components/ProjectPreview'
import { projects } from './data/projects'

export function ProjectsPage() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const activeProject = projects.find((project) => project.slug === activeSlug) ?? null

  return (
    <div className="editorial-projects-page">
      <Header />

      <main className="editorial-projects-main">
        <div className="editorial-projects-intro">
          <span>Projetos selecionados</span>
          <p>
            Passe pelos projetos para revelar cada experiência. O site oficial aparece apenas dentro do case.
          </p>
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
                  <strong>{activeProject.title}</strong>
                </div>
              </div>
            )}
          </div>

          <div className="editorial-project-list" onMouseLeave={() => setActiveSlug(null)}>
            {projects.map((project, index) => (
              <article
                className={`editorial-project-row ${activeSlug === project.slug ? 'is-active' : ''}`}
                key={project.slug}
                onMouseEnter={() => setActiveSlug(project.slug)}
              >
                <a
                  href={`/projetos/${project.slug}`}
                  onFocus={() => setActiveSlug(project.slug)}
                  onBlur={() => setActiveSlug(null)}
                >
                  <span className="editorial-project-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="editorial-project-title">{project.title}</span>
                  <span className="editorial-project-meta">{project.category} · {project.year}</span>
                  <ArrowUpRight className="editorial-project-arrow" size={24} />
                </a>

                <div className="editorial-mobile-preview">
                  <div className={`editorial-preview project-${project.variant}`}>
                    <ProjectPreview variant={project.variant} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
