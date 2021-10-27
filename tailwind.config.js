module.exports = {
  prefix: 'tail-',
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
      zIndex: {
        '-10': '-10'
      },
      maxWidth: {
        '8xl': '96rem',
        '9xl': '120rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
