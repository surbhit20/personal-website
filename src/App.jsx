import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Work from './components/Work'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { getSectionFromURL } from './utils/sections'

const SECTION_COMPONENTS = {
  work: Work,
  projects: Projects,
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
    setActiveTab(tab)
    const url = new URL(window.location.href)
    url.searchParams.set('section', tab)
    window.history.pushState({}, '', url)
  }

  const ActiveSection = SECTION_COMPONENTS[activeTab]

  return (
    <>
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
      <main>
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
