module.exports = {
  root: false,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'vue/v-slot-style': ['error', {
      atComponent: 'longform',
      default: 'v-slot',
      named: 'longform'
    }],

    'vue/html-self-closing': ['error', {
      html: {
        void: 'any',
        normal: 'any',
        component: 'any'
      },
      svg: 'any',
      math: 'any'
    }]
  }
}
