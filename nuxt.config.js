export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Getwelp',
    titleTemplate: 'Getwelp | %s',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Getwelp Trainer UI' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/theme.scss',
    '@/assets/css/fonts.css',
    'vue-popperjs/dist/vue-popper.css',
    'vue-multiselect/dist/vue-multiselect.min.css',
    'vue2-datepicker/index.css'
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/v-calendar.js', ssr: false },
    { src: '~/plugins/vue-tel-input.js', ssr: false },
    { src: '~/plugins/vuelidate.js', ssr: true },
    { src: '~plugins/persistedState.client.js' },
    { src: '~plugins/intercom.js', ssr: false },
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/sendBird' },
    { src: '@/plugins/vClickOutside', ssr: false },
    { src: '~plugins/filters.js', ssr: false },
    { src: '~plugins/v-tooltip.js', ssr: false },
    { src: '~plugins/v-modal.js', ssr: true }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ['~/components', '~/components/util']
  },
  env: {
    BASEURL_HOST: process.env.BASEURL_HOST,
    ACCOUNT_HOST_URL: process.env.ACCOUNT_HOST_URL,
    STRIPE_RETURN: process.env.STRIPE_RETURN,
    PAYMENT_HOST_URL: process.env.PAYMENT_HOST_URL,
    paymentHostUrl: process.env.PAYMENT_HOST_URL,
    sendBirdAppId: process.env.SENDBIRD_APP_ID,
    ONBOARDING_STRIPE_RETURN: process.env.ONBOARDING_STRIPE_RETURN
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/date-fns'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    'cookie-universal-nuxt'
  ],

  toast: {
    position: 'top-right',
    duration: 4000,
    closeOnSwipe: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: 'https://api.getwelp.com/accounts/v0'
  },

  router: {
    middleware: ['auth', 'dashboard']
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
        scheme: 'refresh',
        token: {
          property: 'accessToken',
          global: true,
          required: true,
          maxAge: false
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          maxAge: false
        },
        user: {
          property: 'data',
          autoFetch: false
        },
        endpoints: {
          login: {
            url: `${process.env.ACCOUNT_HOST_URL}/auth/login`,
            method: 'post'
          },
          refresh: {
            url: `${process.env.ACCOUNT_HOST_URL}/auth/renew-token`,
            method: 'patch'
          },
          user: false
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: /@fullcalendar.*/,
    postcss: {
      plugins: {
        cssnano: {
          preset: [
            'default',
            {
              calc: false
            }
          ]
        }
      }
    }
  }
}
