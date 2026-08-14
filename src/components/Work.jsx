import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

export default function Work() {
  return (
    <section id="work" className="section py-32 border-t border-surface-2">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-end justify-between mb-16"
      >
        <div>
          <p className="text-text-muted text-sm uppercase tracking-widest mb-4 font-body">
            Selected work
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-none">
            Projects
          </h2>
        </div>
        <p className="text-text-muted font-body text-sm hidden md:block">
          {projects.length} projects
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
