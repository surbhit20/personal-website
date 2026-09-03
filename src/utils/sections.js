export const SECTIONS = ['projects', 'writing', 'about', 'contact']

export function getSectionFromURL() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '')
  return SECTIONS.includes(path) ? path : 'projects'
}
