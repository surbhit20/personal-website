import { projects } from '../data/projects'

export default function Projects() {
  return (
    <section className="section pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project) => {
          const primaryLink = project.demo || project.github

          return (
            <div key={project.id}>
              {primaryLink ? (
                <a
                  href={primaryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative h-48 sm:h-64 bg-surface overflow-hidden mb-3 rounded-2xl">
                    {project.thumbnail && (
                      <img
                        src={project.thumbnail}
                        alt={project.tagline}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}
                  </div>
                </a>
              ) : (
                <div className="relative h-48 sm:h-64 bg-surface overflow-hidden mb-3 rounded-2xl" />
              )}

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-1">
                <h3 className="text-base font-medium text-text-primary font-body">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-text-muted hover:text-accent transition-colors font-body"
                    >
                      github
                    </a>
                  )}
                  {project.github && project.demo && (
                    <span className="text-xs text-text-muted font-body">·</span>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-text-muted hover:text-accent transition-colors font-body"
                    >
                      {project.demoLabel}
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm text-text-muted leading-relaxed font-body">
                {project.tagline}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
