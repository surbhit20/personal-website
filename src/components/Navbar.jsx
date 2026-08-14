import { SECTIONS } from '../utils/sections'

export default function Navbar({ activeTab, onTabChange }) {
  return (
    <header className="section pt-12 pb-8">
      <h1 className="font-heading font-bold text-text-primary text-lg mb-1">
        Surbhit Pratik
      </h1>
      <p className="text-text-muted text-sm mb-6 font-body">
        Software Engineer @ Easley Dunn Productions, Inc.
      </p>
      <nav className="flex items-center gap-6">
        {SECTIONS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`text-sm font-body transition-colors duration-150 ${
              activeTab === tab
                ? 'text-accent'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </header>
  )
}
