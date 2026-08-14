import { experience } from '../data/experience'

export default function Work() {
  return (
    <section className="section pb-24">
      <div className="space-y-10">
        {experience.map((job) => (
          <div key={job.company} className="grid md:grid-cols-[220px_1fr] gap-2 md:gap-8">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-text-primary text-sm font-body font-medium">
                  {job.company}
                </span>
                {job.current && (
                  <span className="text-accent text-[10px] font-body uppercase tracking-wide">
                    now
                  </span>
                )}
              </div>
              <span className="text-text-muted text-sm font-body">{job.role}</span>
              <span className="text-text-muted text-xs font-body">
                {job.period} · {job.location}
              </span>
            </div>
            <ul className="space-y-1.5">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="text-text-muted text-sm font-body leading-relaxed">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
