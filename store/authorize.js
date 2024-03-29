import lunaDB from '~/utils/DB'
export const state = () => ({
  tokenExpired: false
})
export const mutations = {
  TOKEN_EXPIRED (state, value) {
    state.tokenExpired = value
  },
  CLEAR_LOCAL_STORAGE () {
    window.localStorage.clear()
  }
}

export const actions = {
  async loginUser ({ commit, dispatch }, payload) {
    const res = await this.$axios.$post(`${process.env.ACCOUNT_HOST_URL}/auth/login`, { ...payload })
    if (res.status === 'success') {
      await dispatch('authorize/setToken', { token: res.data.accessToken, refreshToken: res.data.refreshToken }, { root: true })
      await dispatch('profile/getUserProfile', '', { root: true })
    }
    return res
  },
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
  changeEmail ({ commit }, payload) {
    return this.$axios
      .$patch(
        `${process.env.ACCOUNT_HOST_URL}/users/email-change?successUrl=${process.env.SUCCESS_URL}`,
        payload
      )
      .then((response) => {
        return response
      })
  },
  cancelChangeEmail ({ commit }, payload) {
    return this.$axios
      .$patch(
        `${process.env.ACCOUNT_HOST_URL}/users/cancel-email-change`,
        payload
      )
      .then((response) => {
        return response
      })
  },
  async signUpUser ({ commit }, payload) {
    await this.$axios
      .$post(`${process.env.ACCOUNT_HOST_URL}/auth/signup`, payload)
      .then(({ status }) => status)
  },
  setToken ({ commit }, payload) {
    this.$auth.setUserToken(payload.token, payload.refreshToken)
  },
  async logOut ({ commit, dispatch }) {
    await this.$auth.logout()
    await lunaDB.dropInstance({ name: 'lunaDb' })
    // remove sendbord events
    this.$sb.removeUserEventHandler('defaultLayoutHandler')
    this.$sb.removeConnectionHandler('defaultLayoutHandler')
    // clear token oursaelves
    dispatch('loader/startProcess', 'logout', { root: true })
    dispatch('sendbird-v2/disconnect', null, { root: true })
    dispatch('client/clearAllClientStates', null, { root: true })

    commit('CLEAR_LOCAL_STORAGE')
    commit('payment-methods/setPaymentMethods', [], { root: true })
    dispatch('loader/endProcess', 'logout', { root: true })
  }
}
