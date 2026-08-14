# Minimal Tab-Based Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio from a dark, scrolling, card-based single page into a light, minimal, tab-switched site (`work` / `projects` / `about` / `contact`) modeled on vitorialima.com, then deploy it to `surbhitpratik.com`.

**Architecture:** `App.jsx` owns `activeTab` state (initialized from `?section=` in the URL, updated via `history.pushState`) and renders exactly one section component at a time inside an `AnimatePresence` crossfade. `Navbar` and `Footer` are always visible. Each section component is self-contained and reads from a plain-data file under `src/data/`.

**Tech Stack:** React 18 + Vite 5 + Tailwind CSS v3 + Framer Motion (crossfade only) + `@phosphor-icons/react` (unused after this redesign — not removed from `package.json`, just no longer imported by any component touched here).

## Global Constraints

- Vite stays pinned to v5 (Node 18 compatibility) — do not touch `package.json` versions.
- Tailwind stays on v3 — do not add Tailwind v4 config or the Oxide engine.
- No React Router. Section switching is `?section=` query param + `useState`, read/written via `src/utils/sections.js`.
- No Google Fonts import. Font family is the system stack: `-apple-system, system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`.
- Color tokens (Tailwind `theme.extend.colors`): `bg: '#fafafa'`, `surface: '#f0f0f0'`, `'surface-2': '#e2e2e2'`, `accent: '#2f7cb0'`, `'text-primary': '#262626'`, `'text-muted': '#666666'`.
- Framer Motion is used only for a 150ms opacity crossfade on tab switch (in `App.jsx`). No scroll-triggered (`whileInView`) animation, no custom cursor, no blob/gradient effects.
- Tab order everywhere (nav, `SECTIONS` array, `SECTION_COMPONENTS` map): `work`, `projects`, `about`, `contact`.
- Footer clock: 24-hour `HH:MM`, `America/Los_Angeles` timezone, format `"{time} · los angeles"`, updates every 30s.
- Deploy target: existing, empty GitHub repo `surbhit20/personal-website`. `gh` CLI is already authenticated as `surbhit20`. Domain `surbhitpratik.com` is registered at Namecheap.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `tailwind.config.js` | Modify | Light-theme color tokens, system font stack, remove unused `blob` keyframes |
| `src/index.css` | Modify | Light theme base styles; remove Google Fonts import, custom cursor CSS, film-grain overlay |
| `src/utils/sections.js` | Create | `SECTIONS` array + `getSectionFromURL()` — single source of truth for valid tabs |
| `src/data/experience.js` | Create | Experience array, extracted from old `About.jsx` |
| `src/data/tools.js` | Create | Tools/stack array, extracted from old `About.jsx` |
| `src/data/projects.js` | Modify | Drop card-only fields (`color`, `accent`, `Icon`) no longer used |
| `src/components/Navbar.jsx` | Rewrite | Static name/role header + tab nav buttons |
| `src/components/Footer.jsx` | Rewrite | Live clock + city, shown on every tab |
| `src/components/Work.jsx` | Rewrite | `work` tab: experience timeline as plain rows |
| `src/components/Projects.jsx` | Create | `projects` tab: plain linked project rows |
| `src/components/ProjectCard.jsx` | Delete | No longer used (was card rendering, replaced by rows in `Projects.jsx`) |
| `src/components/About.jsx` | Rewrite | `about` tab: bio + tools list |
| `src/components/Contact.jsx` | Rewrite | `contact` tab: plain text/links |
| `src/components/Hero.jsx` | Delete | Replaced by the static header in `Navbar.jsx` |
| `src/App.jsx` | Rewrite | Tab-switching shell, crossfade, no `CustomCursor` |
| `public/CNAME` | Create (Task 12) | GitHub Pages custom domain file |

---

### Task 1: Light theme design tokens

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`

**Interfaces:**
- Produces: Tailwind color tokens `bg`, `surface`, `surface-2`, `accent`, `text-primary`, `text-muted` (light values) and `font-heading`/`font-body` (system stack) consumed by every component task below.

- [ ] **Step 1: Replace `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#fafafa',
        surface: '#f0f0f0',
        'surface-2': '#e2e2e2',
        accent: '#2f7cb0',
        'text-primary': '#262626',
        'text-muted': '#666666',
      },
      fontFamily: {
        heading: ['-apple-system', 'system-ui', '"Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        body: ['-apple-system', 'system-ui', '"Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Replace `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-bg text-text-primary font-body;
    margin: 0;
    min-height: 100vh;
  }

  * {
    box-sizing: border-box;
  }

  ::selection {
    background-color: #2f7cb0;
    color: #fafafa;
  }
}

@layer components {
  .section {
    @apply px-6 md:px-12 lg:px-24;
  }
}
```

- [ ] **Step 3: Verify the build succeeds**

Run: `npm run build`
Expected: build succeeds with no errors. Every file referenced by any component still exists at this point (only tokens/styles changed), so the build stays green through every task in this plan — the page will look visually mismatched in the browser (old components still use classnames like `animate-blob` or `cursor-dot` that no longer resolve to anything, which is harmless) until Task 10 rewires everything, but that's a styling gap, not a build error.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.js src/index.css
git commit -m "Switch design tokens to light minimal theme"
```

---

### Task 2: Section routing utility

**Files:**
- Create: `src/utils/sections.js`

**Interfaces:**
- Produces: `SECTIONS` (array of `'work' | 'projects' | 'about' | 'contact'`), `getSectionFromURL()` (returns one of `SECTIONS`, defaulting to `'work'`). Consumed by `Navbar.jsx` (Task 4) and `App.jsx` (Task 10).

- [ ] **Step 1: Create the file**

```js
export const SECTIONS = ['work', 'projects', 'about', 'contact']

export function getSectionFromURL() {
  const params = new URLSearchParams(window.location.search)
  const section = params.get('section')
  return SECTIONS.includes(section) ? section : 'work'
}
```

- [ ] **Step 2: Verify via browser console**

In the Browser pane, use `javascript_tool` on `http://localhost:5173` to confirm the module loads without import errors once referenced (this will be exercised for real in Task 4 — for now just confirm the file has no syntax errors by running `node --check src/utils/sections.js` from the shell).

Run: `node --check src/utils/sections.js`
Expected: no output (syntax OK).

- [ ] **Step 3: Commit**

```bash
git add src/utils/sections.js
git commit -m "Add section routing utility for tab-based navigation"
```

---

### Task 3: Extract data files

**Files:**
- Create: `src/data/experience.js`
- Create: `src/data/tools.js`
- Modify: `src/data/projects.js`

**Interfaces:**
- Produces: `experience` (array of `{company, role, period, location, current, bullets}`) consumed by `Work.jsx` (Task 6). `tools` (array of strings) consumed by `About.jsx` (Task 8). `projects` (array of `{id, title, type, description, link, github, tags}` — no `color`/`accent`/`Icon`) consumed by `Projects.jsx` (Task 7).

- [ ] **Step 1: Create `src/data/experience.js`**

```js
export const experience = [
  {
    company: 'Easley Dunn Productions, Inc.',
    role: 'Software Engineer',
    period: 'Feb 2026 — Present',
    location: 'Torrance, CA',
    current: true,
    bullets: [
      'Engineered Firebase Analytics event tracking (C#) across 70+ gameplay events and 12 user flows in Unity, enhancing player engagement and conversion funnel insights.',
      'Built automated Looker Studio dashboards visualizing 17 key metrics — retention, funnels, feature usage — for product and design teams.',
      'Architected scalable analytics pipelines (event schemas, ingestion flows) using Firebase with integration testing for QA.',
    ],
  },
  {
    company: 'Amphenol Advanced Sensors',
    role: 'Software Engineering Intern',
    period: 'May 2025 — Aug 2025',
    location: 'Saint Marys, PA',
    current: false,
    bullets: [
      'Built a C# Windows Forms dashboard for Calibration, Screening, Functional, and End-of-Line tests using SQL Server, significantly reducing manual diagnostic effort.',
      'Implemented a Python/Flask webhook to auto-generate unified project naming across Jira and GitHub — cutting project setup time by 30%+.',
      'Developed a Flask dashboard for Sample Component tracking (AX/XA), reducing quoting errors by 23%.',
    ],
  },
  {
    company: 'HighRadius Corporation',
    role: 'Software Developer Intern',
    period: 'Jan 2022 — Apr 2022',
    location: 'Remote',
    current: false,
    bullets: [
      'Designed a React-based UI with JDBC backend connectivity, achieving a 22.66% improvement in data retrieval speed and 20.8% boost in team collaboration via Agile.',
      'Built predictive AI models using Random Forest and Gradient Boosting, reducing loan repayment discrepancies by 14.3%.',
    ],
  },
  {
    company: 'Coal India Ltd',
    role: 'Software Developer Intern',
    period: 'Sep 2021 — Oct 2021',
    location: 'Ranchi, India',
    current: false,
    bullets: [
      'Architected a backend using MVC + Django + PostgreSQL managing 3,230+ employee booking records with secure, scalable data handling.',
      'Built an HTML/CSS/JS accommodation search app for employees, reducing booking time by 17%.',
    ],
  },
]
```

- [ ] **Step 2: Create `src/data/tools.js`**

```js
export const tools = [
  'Python', 'JavaScript', 'React', 'Node.js',
  'C#', 'Unity', 'Firebase', 'Looker Studio',
  'FastAPI', 'Django', 'AWS', 'Docker',
  'PostgreSQL', 'PyTorch', 'LangChain', 'LlamaIndex',
]
```

- [ ] **Step 3: Rewrite `src/data/projects.js`**

Note: the original file included a `year` implicitly nowhere (there was no year field), and card-only fields `color`, `accent`, `Icon` (and its `TreeStructure`/`Brain` icon import) that no longer apply once projects render as plain rows instead of cards. Dropping them rather than inventing a `year` value that isn't verified.

```js
export const projects = [
  {
    id: 'codesense',
    title: 'CodeSense',
    type: 'AI / Full-Stack',
    description: 'RAG-powered codebase exploration tool — query 100+ file repos through a dual-mode Streamlit + React Flow visualization engine using OpenAI GPT and Function Calling.',
    link: 'https://codesensegit.streamlit.app/',
    github: 'https://github.com/surbhit20/CodeSense',
    tags: ['Python', 'OpenAI', 'Streamlit', 'React Flow'],
  },
  {
    id: 'ml-rag-system',
    title: 'Probabilistic ML RAG System',
    type: 'ML / AI',
    description: 'RAG pipeline on Llama 3.2 parsing 50+ technical PDFs with sub-3s query response, powered by LlamaIndex, LlamaParser, and Pinecone vector embeddings.',
    link: 'https://ml-concepts-rag.streamlit.app/',
    github: 'https://github.com/surbhit20/RAG',
    tags: ['LlamaIndex', 'Pinecone', 'Streamlit', 'Python'],
  },
]
```

- [ ] **Step 4: Verify syntax**

Run: `node --check src/data/experience.js && node --check src/data/tools.js && node --check src/data/projects.js`
Expected: no output (all OK).

- [ ] **Step 5: Commit**

```bash
git add src/data/experience.js src/data/tools.js src/data/projects.js
git commit -m "Extract experience/tools data, trim projects to row-friendly fields"
```

---

### Task 4: Navbar — static header + tab nav

**Files:**
- Modify: `src/components/Navbar.jsx`

**Interfaces:**
- Consumes: `SECTIONS` from `src/utils/sections.js` (Task 2).
- Produces: `Navbar({ activeTab, onTabChange })` — `activeTab: string`, `onTabChange: (tab: string) => void`. Consumed by `App.jsx` (Task 10).

- [ ] **Step 1: Replace `src/components/Navbar.jsx`**

```jsx
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
```

- [ ] **Step 2: Verify the build still succeeds**

`App.jsx` isn't rewired to the new tab props until Task 10, so `Navbar` still renders with no `activeTab`/`onTabChange` passed in yet (it'll just show `undefined` as never-active — harmless, no crash since the click handler and comparison both still evaluate fine).

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "Rewrite Navbar as static header with tab buttons"
```

---

### Task 5: Footer — live clock

**Files:**
- Modify: `src/components/Footer.jsx`

**Interfaces:**
- Produces: `Footer()` — no props, self-contained. Consumed by `App.jsx` (Task 10).

- [ ] **Step 1: Replace `src/components/Footer.jsx`**

```jsx
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
```

- [ ] **Step 2: Verify build doesn't newly break on this file**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "Rewrite Footer as a live local-time clock"
```

---

### Task 6: Work component (work tab — experience)

**Files:**
- Modify: `src/components/Work.jsx`

**Interfaces:**
- Consumes: `experience` from `src/data/experience.js` (Task 3).
- Produces: `Work()` — no props. Consumed by `App.jsx` (Task 10) as the `work` tab.

- [ ] **Step 1: Replace `src/components/Work.jsx`**

```jsx
import { experience } from '../data/experience'

export default function Work() {
  return (
    <section className="section pb-24">
      <div className="space-y-10">
        {experience.map((job) => (
          <div key={job.company} className="grid md:grid-cols-[220px_1fr] gap-2 md:gap-8">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-text-primary text-sm font-body font-medium">
                  {job.company}
                </span>
                {job.current && (
                  <span className="text-accent text-[10px] font-body uppercase tracking-wide">
                    now
                  </span>
                )}
              </div>
              <span className="text-text-muted text-sm font-body">{job.role}</span>
              <span className="text-text-muted text-xs font-body">
                {job.period} · {job.location}
              </span>
            </div>
            <ul className="space-y-1.5">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="text-text-muted text-sm font-body leading-relaxed">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build doesn't newly break on this file**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Work.jsx
git commit -m "Rewrite Work component as plain experience rows for the work tab"
```

---

### Task 7: Projects component (projects tab)

**Files:**
- Create: `src/components/Projects.jsx`
- Delete: `src/components/ProjectCard.jsx`

**Interfaces:**
- Consumes: `projects` from `src/data/projects.js` (Task 3).
- Produces: `Projects()` — no props. Consumed by `App.jsx` (Task 10) as the `projects` tab.

- [ ] **Step 1: Create `src/components/Projects.jsx`**

```jsx
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <section className="section pb-24">
      <div className="space-y-8">
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col gap-1">
            <div className="flex items-baseline gap-3 flex-wrap">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary text-sm font-body underline hover:text-accent transition-colors"
              >
                {project.title}
              </a>
              <span className="text-text-muted text-xs font-body">{project.type}</span>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted text-xs font-body underline hover:text-accent transition-colors"
              >
                GitHub
              </a>
            </div>
            <p className="text-text-muted text-sm font-body leading-relaxed max-w-2xl">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {project.tags.map((tag) => (
                <span key={tag} className="text-text-muted text-xs font-body">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Delete `src/components/ProjectCard.jsx`**

Run: `rm src/components/ProjectCard.jsx`

- [ ] **Step 3: Verify the build still succeeds**

Run: `npm run build`
Expected: build succeeds with no errors — `Work.jsx` (rewritten in Task 6) no longer imports `ProjectCard`, so nothing references the deleted file.

- [ ] **Step 4: Commit**

```bash
git add src/components/Projects.jsx
git rm src/components/ProjectCard.jsx
git commit -m "Replace project cards with plain project rows"
```

---

### Task 8: About component (about tab)

**Files:**
- Modify: `src/components/About.jsx`

**Interfaces:**
- Consumes: `tools` from `src/data/tools.js` (Task 3).
- Produces: `About()` — no props. Consumed by `App.jsx` (Task 10) as the `about` tab.

- [ ] **Step 1: Replace `src/components/About.jsx`**

```jsx
import { tools } from '../data/tools'

export default function About() {
  return (
    <section className="section pb-24">
      <p className="text-text-primary text-sm font-body leading-relaxed max-w-2xl mb-10">
        MS Computer Science student at USC. I&apos;ve shipped production software across game analytics, fintech, and AI — and published IEEE research in ML and EV energy modeling. Based in Los Angeles, CA.
      </p>
      <div className="flex flex-wrap gap-x-3 gap-y-2">
        {tools.map((tool) => (
          <span key={tool} className="text-text-muted text-sm font-body">
            {tool}
          </span>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build doesn't newly break on this file**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.jsx
git commit -m "Rewrite About component as plain bio + tools list"
```

---

### Task 9: Contact component (contact tab)

**Files:**
- Modify: `src/components/Contact.jsx`

**Interfaces:**
- Produces: `Contact()` — no props. Consumed by `App.jsx` (Task 10) as the `contact` tab.

- [ ] **Step 1: Replace `src/components/Contact.jsx`**

```jsx
export default function Contact() {
  return (
    <section className="section pb-24">
      <p className="text-text-primary text-sm font-body leading-relaxed mb-4">
        Email me at{' '}
        <a
          href="mailto:surbhitpratik15@gmail.com"
          className="underline hover:text-accent transition-colors"
        >
          surbhitpratik15@gmail.com
        </a>
        , or find me on{' '}
        <a
          href="https://linkedin.com/in/surbhit-pratik"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-accent transition-colors"
        >
          LinkedIn
        </a>{' '}
        or{' '}
        <a
          href="https://github.com/surbhit20"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-accent transition-colors"
        >
          GitHub
        </a>
        .
      </p>
      <p className="text-text-muted text-sm font-body">Based in Los Angeles, CA.</p>
    </section>
  )
}
```

- [ ] **Step 2: Verify build doesn't newly break on this file**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.jsx
git commit -m "Rewrite Contact component as plain text/links"
```

---

### Task 10: App shell — wire tabs together, remove Hero and cursor

**Files:**
- Modify: `src/App.jsx`
- Delete: `src/components/Hero.jsx`

**Interfaces:**
- Consumes: `getSectionFromURL` from `src/utils/sections.js` (Task 2); `Navbar` from Task 4; `Footer` from Task 5; `Work`, `Projects`, `About`, `Contact` from Tasks 6–9.
- Produces: the rendered app — no further consumers within this codebase.

- [ ] **Step 1: Replace `src/App.jsx`**

```jsx
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <ActiveSection />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Delete `src/components/Hero.jsx`**

Run: `rm src/components/Hero.jsx`

- [ ] **Step 3: Run the build**

Run: `npm run build`
Expected: build succeeds with no errors (this is the first point where the whole app should compile cleanly end-to-end).

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git rm src/components/Hero.jsx
git commit -m "Wire App.jsx into tab-switching shell, remove Hero and custom cursor"
```

---

### Task 11: Full browser verification

**Files:** none (verification only).

- [ ] **Step 1: Reload the dev server in the Browser pane**

Navigate to `http://localhost:5173` (restart the `portfolio` preview server first if it isn't already running from Task 1). Confirm via `read_console_messages` there are no errors.

- [ ] **Step 2: Verify default tab and content**

Use `get_page_text` on `http://localhost:5173`. Expected to see: "Surbhit Pratik", "Software Engineer @ Easley Dunn Productions, Inc.", the four tab labels (`work`, `projects`, `about`, `contact`), and the `work` tab's content (Easley Dunn Productions, Amphenol Advanced Sensors, HighRadius Corporation, Coal India Ltd) by default.

- [ ] **Step 3: Click through each tab, verify content + URL**

For each of `projects`, `about`, `contact`, use `computer` to click the tab button, then `get_page_text` to confirm the right content shows, and `read_page` or a `javascript_tool` check of `window.location.search` to confirm it updated to `?section=<tab>`. Confirm clicking `work` returns to the experience list.

- [ ] **Step 4: Verify direct URL load**

Navigate directly to `http://localhost:5173/?section=projects`. Confirm the `projects` tab is active on load (not `work`) via `get_page_text`.

- [ ] **Step 5: Verify links**

Confirm project rows' "Live demo" and "GitHub" links, and the contact tab's email/LinkedIn/GitHub links, have correct `href` values via `read_page`.

- [ ] **Step 6: Verify the footer clock**

Confirm footer text matches `HH:MM · los angeles` pattern via `get_page_text`.

- [ ] **Step 7: Responsive check**

Use `resize_window` with the `mobile` preset, reload, and screenshot to confirm the header/nav/content don't overflow or clip at 375px width.

- [ ] **Step 8: Take a final screenshot for the record**

Use `computer` `screenshot` on desktop width, on the `work` tab.

No commit for this task (verification only, no file changes).

---

### Task 12: Deploy to `surbhit20/personal-website` and `surbhitpratik.com`

**Files:**
- Create: `public/CNAME`

**Interfaces:** none (deployment only).

- [ ] **Step 1: Add the GitHub Pages custom-domain file**

Create `public/CNAME` with exactly this content (no trailing newline concerns — a single line is fine):

```
surbhitpratik.com
```

- [ ] **Step 2: Commit**

```bash
git add public/CNAME
git commit -m "Add CNAME for surbhitpratik.com custom domain"
```

- [ ] **Step 3: Connect the local repo to the existing GitHub repo and push**

Confirm with the user before pushing (this publishes the repo's contents to a repo they own on GitHub — get an explicit go-ahead).

```bash
git remote add origin https://github.com/surbhit20/personal-website.git
git branch -M main
git push -u origin main
```

- [ ] **Step 4: Deploy the built site to the `gh-pages` branch**

```bash
npm run deploy
```

This runs `predeploy` (`npm run build`) then publishes `dist/` to the `gh-pages` branch via the `gh-pages` npm package.

- [ ] **Step 5: Enable GitHub Pages with the custom domain**

Run: `gh api repos/surbhit20/personal-website/pages -X PUT -f source.branch=gh-pages -f source.path=/ -f cname=surbhitpratik.com` — if this errors because Pages isn't enabled yet, instead enable it once via the repo's Settings → Pages UI (Source: Deploy from branch → `gh-pages` → `/ (root)`; Custom domain: `surbhitpratik.com`), since first-time Pages enablement sometimes requires the UI. Walk the user through whichever path is needed.

- [ ] **Step 6: Point the domain's DNS at GitHub Pages (Namecheap)**

Walk the user through this step-by-step in the Namecheap dashboard (Domain List → `surbhitpratik.com` → Manage → Advanced DNS), since this is their first time:

Add these records (remove any existing conflicting `A`/`CNAME`/`URL Redirect` records on the same hosts first):

| Type | Host | Value | TTL |
|---|---|---|---|
| A | @ | 185.199.108.153 | Automatic |
| A | @ | 185.199.109.153 | Automatic |
| A | @ | 185.199.110.153 | Automatic |
| A | @ | 185.199.111.153 | Automatic |
| CNAME | www | surbhit20.github.io. | Automatic |

- [ ] **Step 7: Wait for DNS propagation, then enable HTTPS**

DNS changes can take anywhere from a few minutes to 24 hours. Once `https://surbhitpratik.com` resolves to the GitHub Pages content, go to the repo's Settings → Pages and check "Enforce HTTPS".

- [ ] **Step 8: Final verification**

Navigate to `https://surbhitpratik.com` in the Browser pane (once DNS has propagated) and confirm the live site matches what was verified locally in Task 11.

No further commit — this task is deploy/infra only.
