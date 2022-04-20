const notificationTypes = [
  'INVITE_REQUEST_ACCEPTED',
  'PAYMENT_ACCEPTED',
  'NEW_PAYMENT_RECEIPT',
  'STRIPE_CONNECTION_SUCCESSFUL',
  'STRIPE_CONNECTION_SUCCESSFUL'
]

export const state = () => ({
  notifications: []
})

export const mutations = {
  setNotifications (state, data) {
    state.notifications = data
  },
  addNotification (state, data) {
    if (notificationTypes.includes(data.type)) {
      state.notifications.push(data)
    }
  }
}

export const actions = {
  async fetchNotifications ({ commit, dispatch }) {
    dispatch('loader/startProcess', null, { root: true })
    const res = await this.$axios.$get(
      `${process.env.BASEURL_HOST}/notifications`
    )
    const notifications = res.data.notifications.filter(item => notificationTypes.includes(item.type))
    commit('setNotifications', notifications)
    dispatch('loader/endProcess', null, { root: true })
  },

  async readNotification ({ dispatch }, payload) {
    await this.$axios.patch(
      `${process.env.BASEURL_HOST}/notifications/${payload.id}/read`
    )
    dispatch('fetchNotifications')
  }
}

export const getters = {
  getAllNotifications: state =>
    [...state.notifications].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    )
}
