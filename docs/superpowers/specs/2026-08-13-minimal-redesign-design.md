# Portfolio Redesign: Minimal Tab-Based Layout

Date: 2026-08-13

## Goal

Rebuild the portfolio (currently a dark, cinematic, single-scroll React site)
into a minimal, light, tab-switched personal site modeled on
[vitorialima.com](https://www.vitorialima.com), then deploy it to
`surbhitpratik.com`.

## Reference site observations (vitorialima.com)

- Light gray background (`#fafafa`), dark gray body text (`#333`), muted gray
  for nav/secondary text (`#666`), one accent color for links + active nav
  item.
- System font stack (`-apple-system, "system-ui", "Segoe UI", Roboto, ...`),
  16px base, no display/heading font.
- Static header: bold name, top-left. Horizontal tab nav directly under it:
  `writing · yay! · investing · projects · contact`.
- Clicking a tab swaps the content below via `?section=<name>` in the URL —
  no page reload, no scrolling between sections.
- Content is plain text: underlined links, rows with a title on the left and
  a year on the right, grouped under small lowercase category labels (e.g.
  "favorite ones", "old/random ones"). No cards, no images, no shadows.
- Tiny footer, bottom-center, all tabs: live-updating local time + city
  (e.g. `22:47 · nyc`).

## Scope for this project

Full aesthetic pivot (confirmed): light theme replaces the dark/lime
cinematic theme entirely, not a hybrid.

### Sections (tabs)

`work` · `projects` · `about` · `contact` — no `writing`/blog section for now.

- **work** — experience timeline (Easley Dunn Productions, Amphenol Advanced
  Sensors, HighRadius Corporation, Coal India Ltd), most recent first, as
  plain rows: company + role + dates + location, bullets underneath. Same
  data currently in `About.jsx`'s `experience` array, moved to
  `src/data/experience.js`.
- **projects** — CodeSense and Probabilistic ML RAG System as plain linked
  rows (title links to live demo; GitHub link alongside), tags and year
  shown inline, short description underneath. Same data as
  `src/data/projects.js`, restyled without cards/icons/color blocks.
- **about** — bio paragraph (MS CS @ USC, IEEE research, Los Angeles) +
  tools/stack list (new `src/data/tools.js`, split out from the array
  currently inline in `About.jsx`) as a plain wrapped inline list, not
  bordered pill buttons.
- **contact** — email (`surbhitpratik15@gmail.com`), LinkedIn, GitHub as
  plain text/links, plus a location line ("Based in Los Angeles, CA.").

### Structure change

Static header above the tabs, always visible: name + one-line current role
("Software Engineer @ Easley Dunn Productions, Inc."). This replaces
`Hero.jsx` — no big title, no "VIEW WORK" CTA, no scroll cue.

`App.jsx` changes from a single scrolling page (`Hero → Work → About →
Contact` all mounted) to a tab-switcher: only the active section's component
renders. Active tab read from `?section=` on load (default `work`), updated
via `history.pushState` on click — no full page reload, no React Router
(avoids the GitHub Pages SPA-refresh problem since everything stays on
`index.html`).

`Footer.jsx` becomes a live-updating local clock + "los angeles", rendered
on every tab.

`CustomCursor` (custom dot/ring cursor in `App.jsx`) is removed — it's a
cinematic-site flourish that doesn't fit the minimal aesthetic and reference
site doesn't have one.

### Visual system

- Background `#fafafa`, primary text `#262626`, muted text `#666`.
- Accent: muted blue (~`#2f7cb0`), replacing lime `#c8ff00` everywhere
  (active tab, links, hover states).
- Font: system font stack (matches reference exactly), replacing
  Space Grotesk display font. Tailwind `font-heading`/`font-body` tokens in
  `tailwind.config.js` updated to point at the system stack; no new font
  imports.
- Framer Motion is reduced to a subtle ~150ms fade on tab switch. The
  scroll-triggered `whileInView` fade-up animations throughout `Work.jsx`,
  `About.jsx`, `Contact.jsx` are removed (there's no scrolling between
  sections anymore, so `whileInView` has nothing to trigger on).
- `ProjectCard.jsx` is removed; project rows render directly in the new
  `Projects` component (no per-card color/icon treatment).

### Data flow

- `src/data/projects.js` — kept, trimmed of card-only fields (`color`,
  `accent`, `Icon`) since rows no longer show a colored icon block.
- `src/data/experience.js` — new, holds the `experience` array currently
  inline in `About.jsx`.
- Structuring content as data files (already true for projects, now also
  true for experience) makes it straightforward to add more entries later
  without touching layout code — relevant since more content is coming.

### Testing / verification

- Manual verification in the Browser pane: tab clicks swap content and
  update the URL query param without reload; direct load of
  `?section=projects` etc. shows the right tab; clock updates live; all
  external links (live demos, GitHub, LinkedIn, mailto) resolve; responsive
  check at mobile width.
- `npm run build` succeeds with no errors before deploy.

## Deployment: surbhitpratik.com

Current state: local git repo now initialized in `/Users/surbhit/portfolio`
(first commit is this spec doc). Target GitHub repo already exists and is
empty: `surbhit20/personal-website`. `gh` CLI is already authenticated as
`surbhit20` with `repo` scope. Domain is registered at Namecheap.

Plan:
1. Add `origin` remote pointing at
   `https://github.com/surbhit20/personal-website.git`, push `main`.
2. Add `public/CNAME` containing `surbhitpratik.com`.
3. In Namecheap DNS for `surbhitpratik.com`: four `A` records at the apex
   pointing to GitHub Pages' IPs (`185.199.108.153`, `.109`, `.110`, `.111`),
   plus a `CNAME` record for `www` → `surbhit20.github.io`.
4. `npm run deploy` (via `gh-pages` package) to publish `dist/` to the
   `gh-pages` branch.
5. In the GitHub repo's Settings → Pages: set custom domain to
   `surbhitpratik.com`, enable "Enforce HTTPS" once DNS has propagated.
6. `vite.config.js` `base: '/'` already correct for a custom domain served
   from root — no change needed.

This is a first-time setup for the user, so each step will be walked
through explicitly rather than assumed.

## Out of scope

- No `writing`/blog section (explicitly deferred).
- No React Router / path-based URLs.
- No mobile-specific nav treatment beyond normal responsive wrapping
  (reference site doesn't have one either).
