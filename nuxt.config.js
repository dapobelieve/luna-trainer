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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/theme.scss', '@/assets/css/fonts.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/v-calendar.js', ssr: false },
    { src: '~/plugins/vuelidate.js', ssr: true },
    { src: '~plugins/persistedState.client.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ['~/components', '~/components/util']
  },
  env: {
    BASEURL_HOST: process.env.BASEURL_HOST,
    ACCOUNT_HOST_URL: process.env.ACCOUNT_HOST_URL,
    quickbloxBaseUrl: process.env.QUICKBLOX_BASE_URL,
    quickbloxAppId: process.env.QUICKBLOX_APPLICATION_ID,
    quickbloxAuthKey: process.env.QUICKBLOX_AUTH_KEY,
    quickbloxAuthSecret: process.env.QUICKBLOX_AUTH_SECRET,
    quickbloxAccountKey: process.env.QUICKBLOX_ACCOUNT_KEY,
    stripeReturn: process.env.RETURNURL,
    paymentHostUrl: process.env.PAYMENT_HOST_URL
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
    '@nuxtjs/auth-next',
    '@nuxtjs/toast'
  ],

  toast: {
    posotion: 'top-right',
    duration: 4000,
    closeOnSwipe: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: 'https://api.getwelp.co.uk/accounts/v0'
  },

  router: {
    middleware: ['auth']
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
          global: true,
          required: true
          // type: 'Bearer'
        },
        user: {
          property: 'data',
          autoFetch: false
        },
        endpoints: {
          login: {
            url: 'https://api.getwelp.co.uk/accounts/v0/auth/login',
            method: 'post'
          },
          logout: { url: '/', method: 'post' },
          user: false
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
