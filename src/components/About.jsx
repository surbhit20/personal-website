import { tools } from '../data/tools'
import { education } from '../data/education'

export default function About() {
  return (
    <section className="section pb-24">
      <p className="text-text-primary text-sm font-body leading-relaxed max-w-2xl mb-10">
        Software Engineer at Easley Dunn Productions, building LLM-powered analytics and agent tooling. MS Computer Science from USC. I&apos;ve shipped production software across game analytics, fintech, and AI — and published IEEE research in ML and EV energy modeling. Based in San Francisco, CA.
      </p>

      <div className="space-y-4 mb-10">
        {education.map((entry) => (
          <div key={entry.school} className="flex flex-col gap-0.5">
            <span className="text-text-primary text-sm font-body font-medium">{entry.school}</span>
            <span className="text-text-muted text-sm font-body">{entry.degree}</span>
            <span className="text-text-muted text-xs font-body">{entry.period}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-2">
        {tools.map((tool) => (
          <span key={tool} className="text-text-muted text-sm font-body">
            {tool}
          </span>
        ))}
      </div>
    </section>
  )
}
