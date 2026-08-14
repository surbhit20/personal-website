import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-bg/80 border-b border-surface-2' : ''
      }`}
    >
      <div className="section py-5 flex items-center justify-between">
        {/* Logo / Name */}
        <a
          href="#hero"
          className="font-heading font-bold text-text-primary text-sm uppercase tracking-widest hover:text-accent transition-colors duration-200"
          data-cursor-hover
        >
          Surbhit Pratik
        </a>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="text-text-muted hover:text-text-primary transition-colors duration-200 text-sm font-body"
              data-cursor-hover
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
