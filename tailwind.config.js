/** @type {import('tailwindcss').Config} */


// sm	640px	@media (min-width: 640px) { ... }
// md	768px	@media (min-width: 768px) { ... }
// lg	1024px	@media (min-width: 1024px) { ... }
// xl	1280px	@media (min-width: 1280px) { ... }
// 2xl	1536px


module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {      
      fontSize: {
        xs: '0.1rem',
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      fontFamily: {
        'opensans': ['Open Sans', 'sans-serif']
      },
    },
  },
  plugins: [],
}

