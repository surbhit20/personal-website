import { writing } from '../data/writing'

export default function Writing() {
  if (writing.length === 0) {
    return (
      <section className="section pb-24">
        <p className="text-text-muted text-sm font-body leading-relaxed">
          Nothing published yet — writing is coming soon.
        </p>
      </section>
    )
  }

  return (
    <section className="section pb-24">
      <div className="space-y-4">
        {writing.map((entry) => (
          <div key={entry.id} className="flex items-baseline justify-between gap-3 flex-wrap">
            <a
              href={entry.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary text-sm font-body underline hover:text-accent transition-colors"
            >
              {entry.title}
            </a>
            {entry.code && (
              <a
                href={entry.code}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted text-xs font-body underline hover:text-accent transition-colors shrink-0"
              >
                code
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
