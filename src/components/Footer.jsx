export default function Footer() {
  return (
    <footer className="section py-8 border-t border-surface-2">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-text-muted text-sm font-body">
        <span>© {new Date().getFullYear()} Surbhit Pratik — All rights reserved</span>
        <span className="flex items-center gap-1">
          Built with React &amp; Framer Motion
        </span>
      </div>
    </footer>
  )
}
