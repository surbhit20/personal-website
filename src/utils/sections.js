export const SECTIONS = ['work', 'projects', 'about', 'contact']

export function getSectionFromURL() {
  const params = new URLSearchParams(window.location.search)
  const section = params.get('section')
  return SECTIONS.includes(section) ? section : 'work'
}
