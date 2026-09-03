/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#fafafa',
        surface: '#f0f0f0',
        'surface-2': '#e2e2e2',
        accent: '#262626',
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
