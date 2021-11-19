import Vue from "vue"

export const state = () => ({
  notifications: {}
})

export const mutations = {
  setStates(state, data) {
    Object.keys(data).map((key) => {
      Vue.set(state, key, data[key] )
    })
  },
  setNotification(state, data) {
    Vue.set(state.notifications, [data._id], data)
  }
}

export const actions = {
  async fetchNotifications({commit}) {
    let res = await this.$axios.$get(`${process.env.BASEURL_HOST}/notifications`);
    res.data.notifications.map(item => commit('setNotification', item))
  },
  
  async readNotification({dispatch}, payload) {
    await this.$axios.patch(`${process.env.BASEURL_HOST}/notifications/${payload.id}/read`)
    dispatch('fetchNotifications')
  }
}

export const getters = {
  getAllNotifications: state => Object.values(state.notifications)
}