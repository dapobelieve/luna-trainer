export const state = () => ({
  getWelpUser: {},
  isStripeConnected: false,
  loadingForStripeCheck: true
})

export const mutations = {
  SET_GETWELP_USER (state, user) {
    const checkEmptiness = Object.keys(user).length === 0 && user.constructor === Object
    const gwuser = checkEmptiness ? {} : { ...state.getWelpUser, ...user }
    this.$auth.setUser(gwuser)
    localStorage.setItem('getWelpUser', JSON.stringify(gwuser))
    state.getWelpUser = gwuser
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
  createTrainerProfile ({ commit, dispatch }, payload) {
    delete payload.profilePic
    return this.$axios.$post(
      `${process.env.BASEURL_HOST}/profile`, payload)
      .then((response) => {
        const { data } = response
        if (data !== null) {
          data.stripeConnected && commit('SET_STRIPE_STATUS', data.stripeConnected)
          commit('SET_GETWELP_USER', data)
        }
        return response
      })
  },
  forgotPassword ({ commit }, payload) {
    return this.$axios.$post(
      `${process.env.ACCOUNT_HOST_URL}/auth/forgot-password`, payload).then((response) => {
      return response
    })
  },
  resetPassword ({ commit }, payload) {
    return this.$axios.$patch(
      `${process.env.ACCOUNT_HOST_URL}/auth/reset-password`, payload).then((response) => {
      return response
    })
  },
  getUserProfile ({ commit }) {
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/profile`)
      .then(({ data }) => {
        if (data !== null) {
          data.stripeConnected && commit('SET_STRIPE_STATUS', data.stripeConnected)
          commit('SET_GETWELP_USER', data)
        }
        return data
      })
  },
  signUpUser ({ commit }, payload) {
    return this.$axios.$post(
      `${process.env.ACCOUNT_HOST_URL}/auth/signup`, payload).then(({ status }) => status
    )
  },
  updateProfile ({ commit }, payload) {
    return this.$axios
      .$put(`${process.env.BASEURL_HOST}/profile`, payload)
      .then((response) => {
        commit('SET_GETWELP_USER', response.data)
        return response
      })
  },
  setToken ({ commit }, payload) {
    this.$auth.setUserToken(payload.token, payload.refreshToken)
  },
  uploadProfileImage ({ commit }, payload) {
    return this.$axios.$patch(
      `${process.env.BASEURL_HOST}/profile/upload-image`, payload, { headers: { 'Content-Type': 'multipart/form-data' } }).then((response) => {
      return response
    })
  },
  async logOut ({ commit, dispatch }) {
    await this.$auth.logout()
    commit('SET_GETWELP_USER', {})
    dispatch('qb/clearQbUserAndDialogs', null, { root: true })
    dispatch('client/clearAllClientStates', null, { root: true })
    commit('CLEAR_LOCAL_STORAGE')
    this.$quickblox.chat.disconnect()
    this.$quickblox.chat.onDisconnectedListener = onDisconnectedListener
    function onDisconnectedListener () {
      console.log('onDisconnected')
    }
    this.$quickblox.destroySession((error) => {
      console.log('error destroyong session', error)
    })
    return true
  }
}
export const getters = {
  getUser: state => state.getWelpUser,
  isStripeConnected: state => state.isStripeConnected
}
