export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'getwelp-trainer-ui',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/theme.scss', '@/assets/css/fonts.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~plugins/v-calendar.js', ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ['~/components', '~/components/util']
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://api.getwelp.co.uk/accounts/v0'
  },

  router: {
    // middleware: ['auth']
  },

  auth: {
    redirect: {
      login: '/auth/signin',
      logout: '/auth/signin',
      callback: '/auth/signin',
      home: '/dashboard'
    },
    strategies: {
      local: {
        token: {
          property: 'accessToken',
          global: true
          // required: true,
          // type: 'Bearer'
        },
        // user: {
        //   property: 'user'
        //   // autoFetch: true
        // },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' }
          // user: { url: '/api/auth/user', method: 'get' }
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
  // server: {
  //   port: 8080,
  //   host: '192.168.0.103'
  // }
}
