# surbhitpratik.com

Personal site for Surbhit Pratik — Software Engineer. Minimal, tab-based,
no scrolling between sections: `projects` · `writing` · `about`, with
contact details in the persistent footer.

## Stack

- React 18 + Vite 5
- Tailwind CSS v3
- Framer Motion, for the fade transition between tabs only

## Structure

- `src/data/` — all editable content, kept separate from layout:
  - `projects.js` — project cards (title, tagline, thumbnail, links)
  - `education.js` — schools, degrees, logos
  - `tools.js` — skills grouped by category
- `src/components/` — one component per tab (`Projects`, `Writing`,
  `About`), plus `Navbar` (name/role header + tab nav + resume link)
  and `Footer` (contact links + live clock)
- `src/utils/sections.js` — the tiny router: reads the current tab from
  `window.location.pathname` (e.g. `/about`), no React Router
- `public/images/` — thumbnails and logos, referenced by path from
  `src/data/`
- `public/resume.pdf` — linked from the "actively looking for work"
  button in the header

## Routing

URLs are clean paths (`/`, `/projects`, `/about`, `/writing`) instead of
query params. Since GitHub Pages can't rewrite paths server-side,
`public/404.html` catches a direct hit on `/about` etc. and hands it
back to `index.html`, which restores the clean URL via
`history.replaceState` before the app mounts (the standard
[spa-github-pages](https://github.com/rafgraph/spa-github-pages) trick).

## Development

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```

Builds and publishes `dist/` to the `gh-pages` branch. DNS for
[surbhitpratik.com](https://surbhitpratik.com) is proxied through
Cloudflare (SSL, DNS) in front of GitHub Pages (hosting).

**Cache note:** image filenames don't change on their own when you
swap an image's *content* (e.g. `public/images/projects/mia.jpg`).
Browsers and Cloudflare cache images for hours, so replacing a file at
the same path can look "stuck" on the old version. Rename the file
(e.g. `mia-v2.jpg`) and update the reference in `src/data/` when
swapping an existing image, rather than overwriting it in place.
