import { useEffect, useState } from 'react'

function formatTime(date) {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
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
    <footer className="section py-8 flex justify-center">
      <span className="text-text-muted text-xs font-body">
        {time} · los angeles
      </span>
    </footer>
  )
}
