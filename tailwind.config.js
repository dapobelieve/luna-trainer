const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        fuchsia: colors.fuchsia,
        rose: colors.rose,
        teal: colors.teal,
        lime: colors.lime,
        amber: colors.amber
      },
      zIndex: {
        '-10': '-10'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
