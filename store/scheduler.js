import Vue from 'vue'
export const state = () => ({
  calendar: null,
  activeEvent: {},
  events: []
})
export const mutations = {
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
    return await this.$axios.$post(`${process.env.SCHEDULER_HOST}/calendar/${payload.calendar}/appointment`, { ...payload.data })
  },
  async updateAppointment ({ commit, dispatch }, payload, calendar) {
    console.log(payload.data.when)
    return await this.$axios.$put(`${process.env.SCHEDULER_HOST}/calendar/${payload.calendar}/appointment/${payload.data.id}`, { ...payload.data })
  },
  async getAllAppointments ({ state, commit }, payload) {
    const res = await this.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar/${state.calendar.id}/appointment?startDatetime=${payload.startDateTime}&endDatetime=${payload.endDateTime}`)
    if (res.length > 0) {
      commit('setEvents', res)
    }
    return res
  },
  async deleteAppointment ({ state }, payload) {
    const id = (payload.id.includes('_')) ? payload.id.split('_')[0] : payload.id
    const res = await this.$axios.$delete(`${process.env.SCHEDULER_HOST}/calendar/${state.calendar.id}/appointment/${id}`)
    return true
  },
  async connectToLocalCalendar ({ rootState, commit }) {
    const res = await this.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar/connect/local?timezone=Africa/Lagos`)
    commit('setCalendar', res[0])
  }
}
export const getters = {
  getCalendar: state => state.calendar,
  getActiveEvent: state => state.activeEvent,
  getAllEvents: state => state.events
}
