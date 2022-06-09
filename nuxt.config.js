import webpack from 'webpack'
require('./config')

const hotjar = process.env.NODE_ENV !== 'production' ? {} : {
  defer: true,
  src: 'https://getwelp-files.s3.us-west-2.amazonaws.com/scripts/hotjar.js',
  async: true
}
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
      {
        hid: 'description',
        name: 'description',
        content: 'Getwelp Trainer UI'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap'
      }
    ],
    script: [
      {
        defer: true,
        src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.2.0/socket.io.min.js',
        async: true
      },
      hotjar
    ]
  },
  css: [
    '@/assets/css/theme.scss',
    '@/assets/css/new-fonts.css',
    'vue-popperjs/dist/vue-popper.css',
    'vue-multiselect/dist/vue-multiselect.min.css',
    '@/assets/css/datepicker.scss'
  ],
  plugins: [
    { src: '~plugins/services' },
    { src: '~plugins/v-calendar', ssr: false },
    { src: '~/plugins/vue-tel-input', ssr: false },
    { src: '~/plugins/vue-select', ssr: false },
    { src: '~/plugins/vuelidate', ssr: true },
    { src: '~plugins/persisted-state.client' },
    { src: '~plugins/intercom.js', ssr: false },
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/intro.js', ssr: false },
    { src: '~/plugins/error-handler' },
    { src: '~/plugins/sendbird' },
    { src: '~/plugins/v-click-outside', ssr: false },
    { src: '~plugins/filters', ssr: false },
    { src: '~plugins/v-tooltip', ssr: false },
    { src: '~plugins/v-modal' },
    { src: '~plugins/utils', ssr: false }
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
    REPORTING_HOST: process.env.REPORTING_HOST,
    SEARCH_HOST: process.env.SEARCH_HOST
  },
  loading: '~/components/loading.vue',
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    'nuxt-compress',
    '@nuxtjs/date-fns'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
    [
      'nuxt-compress',
      {
        gzip: {
          threshold: 10240,
          minRatio: 0.8
        },
        brotli: {
          threshold: 10240,
          test: /\.(js|vue|css|html|svg)$/,
          minRatio: 0.8
        }
      }
    ]
  ],
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
