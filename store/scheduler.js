import Vue from 'vue'
export const state = () => ({
  calendar: null,
  activeEvent: {},
  drawer: {
    open: false,
    activePage: null
  },
  events: []
})
export const mutations = {
  setStates (state, data) {
    Object.keys(data).map((key) => {
      Vue.set(state, key, data[key])
    })
  },
  setCalendar (state, data) {
    Vue.set(state, 'calendar', data)
  },
  setEvent (state, data) {
    const { title, startStr, id, endStr, extendedProps } = data
    state.activeEvent = { title, startStr, id, endStr, ...extendedProps }
  },
  setEvents (state, data) {
    Vue.set(state, 'events', data)
  }
}
export const actions = {
  async getCalendars ({ commit }) {
    const res = await this.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar`)
    commit('setCalendar', res[0])
    return res
  },
  async createAppointment ({ commit, dispatch }, payload, calendar) {
    if (payload.data.conferencing) {
      delete payload.data.conferencing.type
      return await this.$axios.$post(`${process.env.SCHEDULER_HOST}/calendar/${payload.calendar}/appointment?conferencing=automatic`, { ...payload.data })
    }
    return await this.$axios.$post(`${process.env.SCHEDULER_HOST}/calendar/${payload.calendar}/appointment`, { ...payload.data })
  },
  async getSingleAppointment ({ state }, payload) {
    const id = (payload.id.includes('_')) ? payload.id.split('_')[0] : payload.id
    return await this.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar/${state.calendar.id}/appointment/${id}`)
  },
  async updateAppointment ({ commit, dispatch }, payload, calendar) {
    payload.data.id = payload.data.id.includes('_') ? payload.data.id.split('_')[0] : payload.data.id
    return await this.$axios.$put(`${process.env.SCHEDULER_HOST}/calendar/${payload.calendar}/appointment/${payload.data.id}`, { ...payload.data })
  },
  async getAllAppointments ({ state, commit }, payload) {
    if(!state.calendar) return [] // we are supposed to have a calendar before we can get appointments
    const res = await this.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar/${state.calendar.id}/appointment?startDatetime=${payload.startDateTime}&endDatetime=${payload.endDateTime}`)
    if (res.length > 0) {
      commit('setEvents', res)
    }
    return res
  },
  async deleteAppointment ({ state }, payload) {
    const id = (payload.id.includes('_')) ? payload.id.split('_')[0] : payload.id
    await this.$axios.$delete(`${process.env.SCHEDULER_HOST}/calendar/${state.calendar.id}/appointment/${id}`)
    return true
  },
  async connectToLocalCalendar ({ rootState, commit }) {
    const res = await this.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar/connect/local?timezone=Africa/Lagos`)
    commit('setCalendar', res[0])
  }
}
export const getters = {
  drawer: state => state.drawer,
  getCalendar: state => state.calendar,
  getActiveEvent: state => state.activeEvent,
  getAllEvents: state => state.events
}
