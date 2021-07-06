export const state = () => ({
  getWelpUser: {},
  isStripeConnected: false,
  loadingForStripeCheck: true
})

export const mutations = {
  SET_GETWELP_USER (state, user) {
    // this is being done to persist the state
    state.getWelpUser = user
  },
  CLEAR_LOCAL_STORAGE () {
    window.localStorage.clear()
  },
  SET_STRIPE_STATUS (state, status) {
    state.isStripeConnected = status
    state.loadingForStripeCheck = false
  }
}

export const actions = {
  signUpUser ({ commit }, payload) {
    return this.$axios.$post(
      `${process.env.ACCOUNT_HOST_URL}/auth/signup`, payload).then(({ status }) => status
    )
  },
  forgotPassword ({ commit }, payload) {
    console.log('email', payload)
    return this.$axios.$post(
      `${process.env.ACCOUNT_HOST_URL}/auth/forgot-password`, payload).then((response) => {
      console.log('response from password', response)
      return response
    })
  },
  setToken ({ commit }, payload) {
    this.$auth.setUserToken(payload.token, payload.refreshToken)
  },
  uploadProfileImage ({ commit }, payload) { // continue after maison works on it
    return this.$axios.$patch(
      `${process.env.BASEURL_HOST}/profile/upload-image`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => response)
  },
  createTrainerProfile ({ commit, dispatch }, payload) {
    return this.$axios
      .$post(`${process.env.BASEURL_HOST}/profile`, payload)
      .then((response) => {
        // set user data in nuxt auth
        // this.$auth.setUser(response.data)
        return response
      })
  },
  getUserProfile ({ commit }) {
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/profile`)
      .then(({ data }) => {
        console.log('profile', data)
        console.log('ran')
        // check if result contains stripe key
        if (data !== null) {
          console.log('entered')
          const checkForStripe = 'stripeConnected' in data
          if (checkForStripe) {
            console.log('checked')
            commit('SET_STRIPE_STATUS', checkForStripe)
          }
        }
        console.log('outside')
        // set user data in nuxt auth
        this.$auth.setUser(data)
        // set user in local storage
        const getWelpUser = localStorage.getItem(
          'getWelpUser'
        )
        // eslint-disable-next-line curly
        if (getWelpUser !== null)
          localStorage.removeItem('getWelpUser')
        localStorage.setItem(
          'getWelpUser',
          JSON.stringify(data)
        )
        return data
      })
  },
  logOut ({ commit, dispatch }) {
    commit('CLEAR_LOCAL_STORAGE')
    dispatch('qb/clearQbUserAndDialogs', null, { root: true })
    commit('SET_GETWELP_USER', {})
    dispatch('client/clearAllClientStates', null, { root: true })
    this.$auth.logout()
  }
}

export const getters = {}
