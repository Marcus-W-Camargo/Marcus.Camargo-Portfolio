import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Header } from './components/Header'
import { ProjectPreview } from './components/ProjectPreview'
import type { Project } from './data/projects'

type ProjectCasePageProps = {
  project: Project
}

export function ProjectCasePage({ project }: ProjectCasePageProps) {
  if (project.comingSoon) {
    return (
      <div className="project-case-page">
        <Header />

        <main className="project-case-main project-case-coming-soon">
          <a className="project-case-back" href="/projetos">
            <ArrowLeft size={16} /> Todos os projetos
          </a>

          <section className="project-coming-soon-page">
            <span>{project.category} · {project.year}</span>
            <h1>{project.title}</h1>
            <p>Em breve...</p>
            <div className="project-coming-soon-line" aria-hidden="true" />
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="project-case-page">
      <Header />

      <main className="project-case-main">
        <a className="project-case-back" href="/projetos">
          <ArrowLeft size={16} /> Todos os projetos
        </a>

        <section className="project-case-hero">
          <div className="project-case-heading">
            <span>{project.category} · {project.year}</span>
            <h1>{project.title}</h1>
            <p>{project.eyebrow}</p>
          </div>

          <div className={`project-case-preview project-${project.variant}`}>
            <ProjectPreview variant={project.variant} />
          </div>
        </section>

        <section className="project-case-story">
          <div className="project-case-story-title">
            <span>Contexto</span>
            <h2>O projeto por trás da interface.</h2>
          </div>

          <div className="project-case-story-copy">
            <p className="project-case-lead">{project.description}</p>
            <p>{project.story}</p>
          </div>
        </section>

        <section className="project-case-stack">
          <div>
            <span>Stack & integrações</span>
            <h2>Tecnologia usada com propósito.</h2>
          </div>

          <div className="project-case-stack-list">
            {project.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </section>

        {project.liveUrl && project.liveLabel && (
          <section className="project-case-visit">
            <span>Projeto publicado</span>
            <h2>Agora que você conhece o contexto, veja a experiência funcionando.</h2>
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              {project.liveLabel} <ArrowUpRight size={18} />
            </a>
          </section>
        )}
      </main>
    </div>
  )
}
