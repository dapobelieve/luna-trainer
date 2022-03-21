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
        sky: colors.sky,
        fuchsia: colors.fuchsia,
        rose: colors.rose,
        teal: colors.teal,
        lime: colors.lime,
        amber: colors.amber
      },
      zIndex: {
        '-10': '-10',
          '0': 0,
         '10': 10,
         '20': 20,
         '30': 30,
         '40': 40,
         '50': 50,
         '25': 25,
         '50': 50,
         '75': 75,
         '100': 100,
         '1000': 10000,
          'auto': 'auto',
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [],
  corePlugin:{
    flexShrink: true,
    flexGrow: true,
  }
}
