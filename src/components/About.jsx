import { skillGroups } from '../data/tools'
import { education } from '../data/education'

export default function About() {
  return (
    <section className="section pb-24">
      <p className="text-text-primary text-sm font-body leading-relaxed max-w-2xl mb-10">
        Software Engineer at Easley Dunn Productions, building LLM-powered analytics and agent tooling. MS Computer Science from USC. I&apos;ve shipped production software across game analytics, fintech, and AI — and published IEEE research in ML and EV energy modeling. Based in San Francisco, CA.
      </p>

      <div className="space-y-4 mb-10">
        {education.map((entry) => (
          <div key={entry.school} className="flex items-start gap-3">
            <img
              src={entry.logo}
              alt={entry.school}
              className="h-16 w-auto max-w-[140px] object-contain object-left shrink-0"
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-text-primary text-sm font-body font-medium">{entry.school}</span>
              <span className="text-text-muted text-sm font-body">{entry.degree}</span>
              <span className="text-text-muted text-xs font-body">{entry.period}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <p className="text-text-muted text-xs uppercase tracking-wide font-body mb-2">
              {group.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-text-muted text-xs font-body border border-surface-2 rounded-full px-3 py-1 hover:border-accent hover:text-accent transition-colors duration-150"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
