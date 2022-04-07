export const state = () => ({
  connectedDevices: []
})
export const mutations = {
  setStates (state, data) {
    // eslint-disable-next-line array-callback-return
    Object.keys(data).map((key) => {
      state[key] = data[key]
    })
  }
}

export const actions = {
  async generateQrCode ({ commit, rootGetters }) {
    const { qrCode } = await this.$axios.$post(`${process.env.ACCOUNT_HOST_URL}/auth/qr/generate`, {
      userId: rootGetters['profile/getUser'].userId
    })
    return qrCode
  },

  async getConnectedDevices ({ commit, dispatch }) {
    dispatch('loader/startProcess', null, { root: true })
    const { data } = await this.$axios.$get(`${process.env.ACCOUNT_HOST_URL}/auth/device/connected`)
    commit('setStates', { connectedDevices: data })
    dispatch('loader/endProcess', null, { root: true })
  },

  async disconnectDevice ({ commit, dispatch }, deviceId) {
    dispatch('loader/startProcess', null, { root: true })
    await this.$axios.$delete(`${process.env.ACCOUNT_HOST_URL}/auth/device/${deviceId}`)
    await dispatch('getConnectedDevices')
    dispatch('loader/endProcess', null, { root: true })
  }
}

export const getters = {
  connectedDevices: state => state.connectedDevices
}
