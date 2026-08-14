import { motion } from 'framer-motion'

const tools = [
  'Python', 'JavaScript', 'React', 'Node.js',
  'C#', 'Unity', 'Firebase', 'Looker Studio',
  'FastAPI', 'Django', 'AWS', 'Docker',
  'PostgreSQL', 'PyTorch', 'LangChain', 'LlamaIndex',
]

const experience = [
  {
    company: 'Easley Dunn Productions, Inc.',
    role: 'Software Engineer',
    period: 'Feb 2026 — Present',
    location: 'Torrance, CA',
    current: true,
    bullets: [
      'Engineered Firebase Analytics event tracking (C#) across 70+ gameplay events and 12 user flows in Unity, enhancing player engagement and conversion funnel insights.',
      'Built automated Looker Studio dashboards visualizing 17 key metrics — retention, funnels, feature usage — for product and design teams.',
      'Architected scalable analytics pipelines (event schemas, ingestion flows) using Firebase with integration testing for QA.',
    ],
  },
  {
    company: 'Amphenol Advanced Sensors',
    role: 'Software Engineering Intern',
    period: 'May 2025 — Aug 2025',
    location: 'Saint Marys, PA',
    current: false,
    bullets: [
      'Built a C# Windows Forms dashboard for Calibration, Screening, Functional, and End-of-Line tests using SQL Server, significantly reducing manual diagnostic effort.',
      'Implemented a Python/Flask webhook to auto-generate unified project naming across Jira and GitHub — cutting project setup time by 30%+.',
      'Developed a Flask dashboard for Sample Component tracking (AX/XA), reducing quoting errors by 23%.',
    ],
  },
  {
    company: 'HighRadius Corporation',
    role: 'Software Developer Intern',
    period: 'Jan 2022 — Apr 2022',
    location: 'Remote',
    current: false,
    bullets: [
      'Designed a React-based UI with JDBC backend connectivity, achieving a 22.66% improvement in data retrieval speed and 20.8% boost in team collaboration via Agile.',
      'Built predictive AI models using Random Forest and Gradient Boosting, reducing loan repayment discrepancies by 14.3%.',
    ],
  },
  {
    company: 'Coal India Ltd',
    role: 'Software Developer Intern',
    period: 'Sep 2021 — Oct 2021',
    location: 'Ranchi, India',
    current: false,
    bullets: [
      'Architected a backend using MVC + Django + PostgreSQL managing 3,230+ employee booking records with secure, scalable data handling.',
      'Built an HTML/CSS/JS accommodation search app for employees, reducing booking time by 17%.',
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function About() {
  return (
    <section id="about" className="section py-32 border-t border-surface-2">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Header */}
        <motion.p variants={fadeUp} custom={0} className="text-text-muted text-sm uppercase tracking-widest mb-4 font-body">
          About
        </motion.p>
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-end">
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-tight"
          >
            Software engineer building across the full stack.
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-text-muted leading-relaxed text-base font-body">
            MS Computer Science student at USC. I&apos;ve shipped production software across game analytics, fintech, and AI — and published IEEE research in ML and EV energy modeling. Based in Los Angeles, CA.
          </motion.p>
        </div>

        {/* Experience timeline */}
        <motion.p variants={fadeUp} custom={3} className="text-text-muted text-sm uppercase tracking-widest mb-10 font-body">
          Experience
        </motion.p>

        <div className="space-y-0">
          {experience.map((job, i) => (
            <motion.div
              key={job.company}
              variants={fadeUp}
              custom={4 + i}
              className="grid md:grid-cols-[260px_1fr] gap-6 md:gap-12 py-8 border-t border-surface-2 group"
            >
              {/* Left col — meta */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-semibold text-text-primary text-sm">
                    {job.company}
                  </span>
                  {job.current && (
                    <span className="flex items-center gap-1 text-[10px] text-accent font-body uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping inline-block" />
                      Now
                    </span>
                  )}
                </div>
                <span className="text-text-muted text-sm font-body">{job.role}</span>
                <span className="text-text-muted text-xs font-body mt-1">{job.period}</span>
                <span className="text-text-muted text-xs font-body">{job.location}</span>
              </div>

              {/* Right col — bullets */}
              <ul className="space-y-3">
                {job.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-3 text-text-muted text-sm font-body leading-relaxed">
                    <span className="mt-2 w-1 h-1 shrink-0 rounded-full bg-text-muted" />
                    <span className="group-hover:text-text-primary transition-colors duration-300">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Skills */}
        <div className="mt-16 pt-10 border-t border-surface-2">
          <motion.p variants={fadeUp} custom={9} className="text-text-muted text-sm uppercase tracking-widest mb-6 font-body">
            Tools &amp; stack
          </motion.p>
          <motion.div variants={fadeUp} custom={10} className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 border border-surface-2 text-text-muted text-sm font-body hover:border-accent hover:text-accent transition-colors duration-200"
              >
                {tool}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
