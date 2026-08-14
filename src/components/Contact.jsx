import { motion } from 'framer-motion'
import {
  LinkedinLogo,
  GithubLogo,
  ArrowUpRight,
} from '@phosphor-icons/react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/surbhit-pratik', Icon: LinkedinLogo },
  { label: 'GitHub', href: 'https://github.com/surbhit20', Icon: GithubLogo },
]

export default function Contact() {
  return (
    <section id="contact" className="section py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-3xl"
      >
        <motion.p variants={fadeUp} custom={0} className="text-text-muted text-sm uppercase tracking-widest mb-6 font-body">
          Get in touch
        </motion.p>

        <motion.h2
          variants={fadeUp}
          custom={1}
          className="font-heading text-5xl md:text-7xl font-bold text-text-primary leading-none mb-12"
        >
          Let&apos;s build something{' '}
          <span className="text-accent">great.</span>
        </motion.h2>

        <motion.a
          variants={fadeUp}
          custom={2}
          href="mailto:surbhitpratik15@gmail.com"
          className="group inline-flex items-center gap-3 px-8 py-4 border border-text-muted hover:border-accent hover:bg-accent hover:text-bg transition-all duration-300 font-heading font-semibold text-lg mb-16"
          data-cursor-hover
        >
          surbhitpratik15@gmail.com
          <ArrowUpRight
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </motion.a>

        <motion.div variants={fadeUp} custom={3} className="flex items-center gap-6">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors duration-200 font-body text-sm"
              data-cursor-hover
            >
              <Icon size={20} />
              {label}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
