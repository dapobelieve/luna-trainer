import webpack from 'webpack'
require('./config')

export default {
  ssr: false,
  head: {
    title: 'Luna',
    titleTemplate: 'Luna | %s',
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
    ],
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.2.0/socket.io.min.js',
        async: true
      }
    ]
  },
  css: [
    '@/assets/css/theme.scss',
    '@/assets/css/new-fonts.css',
    'vue-popperjs/dist/vue-popper.css',
    'vue-multiselect/dist/vue-multiselect.min.css',
    'vue2-datepicker/index.css'
  ],
  plugins: [
    { src: '~plugins/services.js' },
    { src: '~plugins/v-calendar.js', ssr: false },
    { src: '~/plugins/vue-tel-input.js', ssr: false },
    { src: '~/plugins/vue-select.js', ssr: false },
    { src: '~/plugins/vuelidate.js', ssr: true },
    { src: '~plugins/persistedState.client.js' },
    { src: '~plugins/intercom.js', ssr: false },
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/intro.js', ssr: false },
    { src: '~/plugins/errorHandler.js' },
    { src: '~/plugins/sendBird' },
    { src: '~/plugins/vClickOutside', ssr: false },
    { src: '~plugins/filters.js', ssr: false },
    { src: '~plugins/v-tooltip.js', ssr: false },
    { src: '~plugins/v-modal.js', ssr: true },
    { src: '~plugins/utils.js', ssr: false }
  ],
  components: {
    dirs: ['~/components', '~/components/util']
  },
  env: {
    BASEURL_HOST: process.env.BASEURL_HOST,
    ACCOUNT_HOST_URL: process.env.ACCOUNT_HOST_URL,
    STRIPE_RETURN: process.env.STRIPE_RETURN,
    SCHEDULER_HOST: process.env.SCHEDULER_HOST,
    SUCCESS_URL: process.env.SUCCESS_URL,
    PAYMENT_HOST_URL: process.env.PAYMENT_HOST_URL,
    SENDBIRD_APP_ID: process.env.SENDBIRD_APP_ID,
    REPORTING_HOST: process.env.REPORTING_HOST
  },
  loading: '~/components/loading.vue',
  buildModules: [
    // '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/date-fns'
  ],
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
    },
    plugins: [
      new webpack.ProvidePlugin({
        introJs: ['intro.js']
      })
    ]
  }
}
