import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    let rafId

    const move = (e) => {
      rafId = requestAnimationFrame(() => {
        if (dot.current) {
          dot.current.style.left = `${e.clientX}px`
          dot.current.style.top = `${e.clientY}px`
        }
        if (ring.current) {
          ring.current.style.left = `${e.clientX}px`
          ring.current.style.top = `${e.clientY}px`
        }
      })
    }

    const onEnter = (e) => {
      if (e.target.closest('[data-cursor-hover]') && ring.current) {
        ring.current.classList.add('hovering')
      }
    }

    const onLeave = (e) => {
      if (e.target.closest('[data-cursor-hover]') && ring.current) {
        ring.current.classList.remove('hovering')
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
