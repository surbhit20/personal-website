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
    <footer className="fixed bottom-0 left-0 right-0 py-3 flex justify-center bg-bg">
      <span className="text-text-muted text-xs font-body">
        {time} · los angeles
      </span>
    </footer>
  )
}
