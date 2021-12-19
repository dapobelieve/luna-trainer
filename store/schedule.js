import Vue from "vue"
export const state = () => ({
  calendar:  null
})
export const mutations = {
  setCalendar(state, data) {
    Vue.set(state, 'calendar', data)
  },
}
export const actions = {
  async getCalendars({commit}) {
    let res = await this.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar`)
    commit('setCalendar', res[0])
    return res
  },
  async createAppointment({commit}, payload, calendar) {
    return await this.$axios.$post(`${process.env.SCHEDULER_HOST}/calendar/${payload.calendar}/appointment`, {...payload.data});
  },
  async getAllAppointments({commit}, payload) {
    return await this.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar/${payload.calendar}/appointment?startDatetime=${payload.startDatetime}&endDatetime=${payload.endDatetime}`)
  },
  async connectToLocalCalendar({commit}) {
    let res = await this.$axios.$post(`${process.env.SCHEDULER_HOST}/calendar/connect/local`, {
      timezone: 'Europe/London'
    });
    commit('setCalendar', res[0])
  }
}
export const getters = {
  getCalendar: state => state.calendar,
}
