export const state = () => ({
  getWelpUser: {},
  isStripeConnected: false,
  loadingForStripeCheck: true
})

export const mutations = {
  SET_GETWELP_USER (state, user) {
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
  updateProfile ({ commit }, payload) {
    return this.$axios
      .$put(`${process.env.BASEURL_HOST}/profile`, payload)
      .then((response) => {
        this.$auth.setUser(response.data)
        localStorage.setItem('getWelpUser', JSON.stringify(response.data))
        commit('SET_GETWELP_USER', response.data)
        return response
      })
  },
  forgotPassword ({ commit }, payload) {
    return this.$axios.$post(
      `${process.env.ACCOUNT_HOST_URL}/auth/forgot-password`, payload).then((response) => {
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
        return response
      })
  },
  getUserProfile ({ commit }) {
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/profile`)
      .then(({ data }) => {
        if (data !== null) {
          data.stripeConnected && commit('SET_STRIPE_STATUS', data.stripeConnected)
          this.$auth.setUser(data)
          commit('SET_GETWELP_USER', data)
          localStorage.setItem(
            'getWelpUser',
            JSON.stringify(data)
          )
        }
        return data
      })
  },
  logOut ({ commit, dispatch }) {
    commit('CLEAR_LOCAL_STORAGE')
    commit('SET_GETWELP_USER', {})
    dispatch('qb/clearQbUserAndDialogs', null, { root: true })
    dispatch('client/clearAllClientStates', null, { root: true })
    this.$auth.logout()
  }
}

export const getters = {
  getUser: state => state.getWelpUser
}
