export const state = () => ({
  getWelpUser: {},
  stripeConnected: false
})

export const mutations = {
  SET_GETWELP_USER (state, user) {
    // this is being done to persist the state
    state.getWelpUser = user
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
        // set user data in nuxt auth
        this.$auth.setUser(data)
        return data
      })
  },
  logOut ({ commit }) {
    localStorage.removeItem('getWelpUser')
    localStorage.removeItem('vuex')
    localStorage.removeItem('authorize')
    localStorage.removeItem('client')
    this.$auth.logout()
  }
}

export const getters = {}
