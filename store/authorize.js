
export const mutations = {
  CLEAR_LOCAL_STORAGE () {
    window.localStorage.clear()
  }
}

export const actions = {
  startFullPageLoading ({ commit, dispatch }) {
    dispatch('loader/startProcess', 'logout', { root: true })
  },
  endFullPageLoading ({ commit, dispatch }) {
    dispatch('loader/endProcess', 'logout', { root: true })
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
  signUpUser ({ commit }, payload) {
    return this.$axios.$post(
      `${process.env.ACCOUNT_HOST_URL}/auth/signup`, payload).then(({ status }) => status
    )
  },
  setToken ({ commit }, payload) {
    this.$auth.setUserToken(payload.token, payload.refreshToken)
  },
  async logOut ({ commit, dispatch }) {
    await this.$auth.logout()
    // clear token oursaelves
    dispatch('loader/startProcess', 'logout', { root: true })
    dispatch('sendBird/disconnectFromSendbirdServer', null, { root: true })
    dispatch('client/clearAllClientStates', null, { root: true })
    // dispatch('profile/clearGetWelpUser', null, { root: true })
    dispatch('sendBird/setCurrentViewingClient', {}, { root: true })
    commit('CLEAR_LOCAL_STORAGE')
    dispatch('loader/endProcess', 'logout', { root: true })
    // return true
  }
}
