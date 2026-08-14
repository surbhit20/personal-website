import { motion } from 'framer-motion'
import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react'

export default function ProjectCard({ project, index }) {
  const hasLiveLink = project.link && project.link !== '#'
  const hasGithub = project.github && project.github !== '#'

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden"
    >
      {/* Thumbnail — links to live demo if available, else GitHub */}
      <a
        href={hasLiveLink ? project.link : (hasGithub ? project.github : undefined)}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        data-cursor-hover
      >
        <div
          className="relative w-full aspect-video overflow-hidden mb-5"
          style={{ backgroundColor: project.color }}
        >
          {/* Placeholder gradient */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at 30% 40%, ${project.accent}, transparent 60%)`,
            }}
          />

          {/* Animated accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 w-0"
            style={{ backgroundColor: project.accent }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* App icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
            >
              {project.Icon && (
                <project.Icon
                  size={96}
                  weight="thin"
                  style={{ color: project.accent, opacity: 0.5 }}
                />
              )}
            </motion.div>
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-end p-6"
            style={{ backgroundColor: 'rgba(8,8,8,0.7)' }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-text-primary text-sm font-body leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          {/* Arrow icon */}
          <motion.div
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center border border-surface-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={16} className="text-text-primary" />
          </motion.div>
        </div>
      </a>

      {/* Card meta */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading font-semibold text-text-primary text-lg group-hover:text-accent transition-colors duration-200">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs text-text-muted font-body">
                {tag}
              </span>
            ))}
          </div>

          {/* Links row */}
          <div className="flex items-center gap-4 mt-3">
            {hasLiveLink && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-accent hover:underline font-body"
                data-cursor-hover
              >
                Live demo <ArrowUpRight size={12} />
              </a>
            )}
            {hasGithub && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-text-muted hover:text-accent transition-colors font-body"
                data-cursor-hover
              >
                <GithubLogo size={13} /> GitHub
              </a>
            )}
          </div>
        </div>
        <span className="shrink-0 text-xs text-text-muted border border-surface-2 px-2 py-1 font-body">
          {project.type}
        </span>
      </div>
    </motion.div>
  )
}
