export default function Contact() {
  return (
    <section className="section pb-24">
      <p className="text-text-primary text-sm font-body leading-relaxed mb-4">
        Email me at{' '}
        <a
          href="mailto:surbhitpratik15@gmail.com"
          className="underline hover:text-accent transition-colors"
        >
          surbhitpratik15@gmail.com
        </a>
        , or find me on{' '}
        <a
          href="https://linkedin.com/in/surbhit-pratik"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-accent transition-colors"
        >
          LinkedIn
        </a>{' '}
        or{' '}
        <a
          href="https://github.com/surbhit20"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-accent transition-colors"
        >
          GitHub
        </a>
        .
      </p>
      <p className="text-text-muted text-sm font-body">Based in San Francisco, CA.</p>
    </section>
  )
}
