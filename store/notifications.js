const notificationTypes = [
  'INVITE_REQUEST_ACCEPTED',
  'PAYMENT_ACCEPTED',
  'NEW_PAYMENT_RECEIPT',
  'STRIPE_CONNECTION_SUCCESSFUL'
]
export const state = () => ({
  notifications: {
    READ: [],
    UNREAD: []
  },
  summary: {}
})

export const mutations = {
  addNotification (state, { data, status }) {
    if (notificationTypes.includes(data.type)) {
      state.notifications[status] = state.notifications[status] || []
      state.notifications[status].push(data)
    }
  },
  setNotifications (state, { notifications, status }) {
    state.notifications[status] = notifications
  },
  setNotificationsSummary (state, data) {
    state.summary = data
  }
}

export const actions = {
  async fetchNotifications ({ commit }, payload) {
    const res = await this.$axios.$get(
      `${process.env.BASEURL_HOST}/notifications`,
      {
        params: {
          limit: payload.limit,
          status: payload.status,
          page: payload.page
        }
      }
    )
    const status = payload.status
    if (payload.page > 1) {
      res.data.forEach((data) => {
        commit('addNotification', { status, data })
      })
    } else {
      const notifications = res.data.filter(notification => notificationTypes.includes(notification.type))
      commit('setNotifications', { status, notifications })
    }
  },
  async fetchNotificationsSummary ({ commit }) {
    const res = await this.$axios.$get(
      `${process.env.BASEURL_HOST}/notifications/summary`
    )
    commit('setNotificationsSummary', res.data)
  },

  async readNotification ({ dispatch }, payload) {
    await this.$axios.patch(
      `${process.env.BASEURL_HOST}/notifications/${payload.id}/read`
    )
    dispatch('fetchNotifications')
    dispatch('fetchNotificationsSummary')
  }
}

export const getters = {
  getUnreadNotifications: state =>
    [...state.notifications.UNREAD].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ),
  getReadNotifications: state =>
    [...state.notifications.READ].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ),
  getNotificationsSummary: state => state.summary
}
