import { SECTIONS } from '../utils/sections'

export default function Navbar({ activeTab, onTabChange }) {
  return (
    <header className="section pt-12 pb-8">
      <h1 className="font-heading font-bold text-text-primary text-lg mb-1">
        Surbhit Pratik
      </h1>
      <p className="text-text-muted text-sm mb-4 font-body">
        Software Engineer @ Easley Dunn Productions, Inc.
      </p>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-accent text-accent text-xs uppercase tracking-wide font-body px-3 py-1.5 rounded-full mb-6 hover:bg-accent hover:text-bg transition-colors duration-150"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        actively looking for work
      </a>
      <nav className="flex items-center gap-6">
        {SECTIONS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            aria-current={activeTab === tab ? 'page' : undefined}
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
