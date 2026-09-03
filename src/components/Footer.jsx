import { useEffect, useState } from 'react'

function formatTime(date) {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: 'America/Los_Angeles',
  })
}

export default function Footer() {
  const [time, setTime] = useState(() => formatTime(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 30 * 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer className="fixed bottom-0 left-0 right-0 py-3 bg-bg">
      <div className="section flex flex-col sm:flex-row items-center justify-between gap-1 text-xs font-body text-text-muted">
        <div className="flex items-center gap-3">
          <a
            href="mailto:surbhitpratik15@gmail.com"
            className="hover:text-accent transition-colors"
          >
            surbhitpratik15@gmail.com
          </a>
          <span>·</span>
          <a
            href="https://linkedin.com/in/surbhit-pratik"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            linkedin
          </a>
          <span>·</span>
          <a
            href="https://github.com/surbhit20"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            github
          </a>
        </div>
        <span>{time} · san francisco</span>
      </div>
    </footer>
  )
}
