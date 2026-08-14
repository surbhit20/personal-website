import { motion } from 'framer-motion'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const word = {
  hidden: { opacity: 0, y: 60, skewY: 3 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.9 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="section relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Background blob */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-10 pointer-events-none animate-blob"
        style={{ background: 'radial-gradient(circle, #c8ff00 0%, transparent 70%)' }}
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center gap-2 mb-10"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        <span className="text-text-muted text-xs uppercase tracking-widest font-body">
          Software Engineer @ Easley Dunn Productions, Inc.
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={container}
        initial="hidden"
        animate="visible"
        className="font-heading font-bold text-6xl md:text-8xl lg:text-[10rem] leading-none text-text-primary mb-10 overflow-hidden"
      >
        {['Software', 'that', 'ships.'].map((w) => (
          <motion.span key={w} variants={word} className="inline-block mr-4 md:mr-6">
            {w === 'ships.' ? (
              <span className="text-accent">{w}</span>
            ) : (
              w
            )}
          </motion.span>
        ))}
      </motion.h1>

      {/* Sub line + CTA */}
      <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16">
        <motion.p
          custom={0}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-text-muted font-body text-base md:text-lg max-w-sm leading-relaxed"
        >
          Software Engineer at Easley Dunn Productions. MS CS @ USC. I build full-stack systems, analytics pipelines, and AI-powered apps.
        </motion.p>

        <motion.a
          custom={1}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          href="#work"
          className="group flex items-center gap-3 font-heading font-semibold text-sm uppercase tracking-widest text-accent hover:text-text-primary transition-colors duration-200"
          data-cursor-hover
        >
          View Work
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        custom={2}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="absolute bottom-10 left-6 md:left-12 lg:left-24 flex items-center gap-3"
      >
        <div className="w-px h-12 bg-surface-2 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-accent"
            animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="text-text-muted text-xs uppercase tracking-widest font-body rotate-0">
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
