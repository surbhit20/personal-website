import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Writing from './components/Writing'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { getSectionFromURL } from './utils/sections'

const SECTION_COMPONENTS = {
  projects: Projects,
  writing: Writing,
  about: About,
  contact: Contact,
}

export default function App() {
  const [activeTab, setActiveTab] = useState(getSectionFromURL)

  useEffect(() => {
    const onPopState = () => setActiveTab(getSectionFromURL())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  function handleTabChange(tab) {
    if (tab === activeTab) return
    setActiveTab(tab)
    window.history.pushState({}, '', `/${tab}`)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const ActiveSection = SECTION_COMPONENTS[activeTab]

  return (
    <>
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="flex-1 pb-16">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          <ActiveSection />
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
