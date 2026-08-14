import { projects } from '../data/projects'

export default function Projects() {
  return (
    <section className="section pb-24">
      <div className="space-y-8">
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col gap-1">
            <div className="flex items-baseline gap-3 flex-wrap">
              {project.link && project.link !== '#' ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-primary text-sm font-body underline hover:text-accent transition-colors"
                >
                  {project.title}
                </a>
              ) : (
                <span className="text-text-primary text-sm font-body">{project.title}</span>
              )}
              <span className="text-text-muted text-xs font-body">{project.type}</span>
              {project.github && project.github !== '#' && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted text-xs font-body underline hover:text-accent transition-colors"
                >
                  GitHub
                </a>
              )}
            </div>
            <p className="text-text-muted text-sm font-body leading-relaxed max-w-2xl">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {project.tags.map((tag) => (
                <span key={tag} className="text-text-muted text-xs font-body">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
