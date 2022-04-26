import Vue from 'vue'
import lunaDB from '~/utils/DB'

export const state = () => ({
  calendar: null,
  activeEvent: {},
  drawer: {
    open: false,
    activePage: null
  },
  events: {}
})
export const mutations = {
  setStates (state, data) {
    Object.keys(data).forEach((key) => {
      Vue.set(state, key, data[key])
    })
  },
  setCalendar (state, data) {
    Vue.set(state, 'calendar', data)
    lunaDB.setItem('calendar', data)
  },
  setEvent (state, data) {
    const { title, startStr, id, endStr, extendedProps } = data
    state.activeEvent = { title, startStr, id, endStr, ...extendedProps }
  },
  removeEvent(state, eventId) {
    Vue.delete(state.events, eventId)
  },
  setEvents (state, data) {
    data.forEach((event) => {
      Vue.set(state.events, event.id, event)
    })
  }
}
export const actions = {
  async getCalendars ({ dispatch, commit }) {
    await this.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar`)
  },
  async createAppointment ({ rootState, commit, dispatch }, payload, calendar) {
    let eventRes
    if (payload.data.conferencing) {
      delete payload.data.conferencing.type
      eventRes = await this.$axios.$post(`${process.env.SCHEDULER_HOST}/calendar/${payload.calendar}/appointment?conferencing=automatic`, { ...payload.data })
    }
    eventRes = await this.$axios.$post(`${process.env.SCHEDULER_HOST}/calendar/${payload.calendar}/appointment`, { ...payload.data })
    const eventStartDate = new Date(eventRes.when.startTime * 1000)
    const startOfMonth = parseInt(new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), 1) / 1000)
    const endOfMonth = parseInt(new Date(eventStartDate.getFullYear(), eventStartDate.getMonth() + 1, 0) / 1000)
    dispatch('getAppointmentsForMonth', { startDate: startOfMonth, endDate: endOfMonth })
    return eventRes
  },
  async getSingleAppointment ({ state }, payload) {
    console.time('getSingleAppointment')
    const id = (payload.id.includes('_')) ? payload.id.split('_')[0] : payload.id
    let res = await this.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar/${state.calendar.id}/appointment/${id}`)
    console.timeEnd('getSingleAppointment')
    return res
  },
  async updateAppointment ({ rootState, commit, dispatch }, payload) {
    payload.data.id = payload.data.id.includes('_') ? payload.data.id.split('_')[0] : payload.data.id
    const eventRes = await this.$axios.$put(`${process.env.SCHEDULER_HOST}/calendar/${payload.calendar}/appointment/${payload.data.id}`, { ...payload.data })

    const eventStartDate = new Date(eventRes.when.startTime * 1000)
    const startOfMonth = parseInt(new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), 1) / 1000)
    const endOfMonth = parseInt(new Date(eventStartDate.getFullYear(), eventStartDate.getMonth() + 1, 0) / 1000)
    dispatch('getAppointmentsForMonth', { startDate: startOfMonth, endDate: endOfMonth })
    return eventRes
  },
  async getAllAppointments ({ rootState, state, commit, dispatch }, payload) {
    if (!state.calendar) { return [] }
    const sessions = await lunaDB.getItem(`user:${rootState.auth.user.userId}:${payload.startDate}:sessions`)
    if (sessions?.length) {
      commit('setEvents', sessions)
    } else {
      dispatch('getAppointmentsForMonth', payload)
    }
  },
  async getAppointmentsForMonth ({ rootState, commit, state }, dates) {
    const sessions = await this.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar/${state.calendar.id}/appointment`, {
      params: {
        startDatetime: dates.startDate,
        endDatetime: dates.endDate
      }
    })
    if (sessions.length) {
      await lunaDB.setItem(`user:${rootState.auth.user.userId}:${dates.startDate}:sessions`, sessions)
      commit('setEvents', sessions)
    }
  },
  async getAllAppointmentsForTimeRange ({ state, commit }, payload) {
    if (!state.calendar) { return [] }
    const res = await this.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar/${state.calendar.id}/appointment`, {
      params: {
        startDatetime: payload.startDateTime,
        endDatetime: payload.endDateTime
      }
    })
    return res
  },
  async deleteAppointment ({ rootState, state, commit, dispatch }, payload) {
    commit('removeEvent', payload.id)
    const eventStartDate = new Date(payload.when.startTime * 1000)
    const startOfMonth = parseInt(new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), 1) / 1000)
    const endOfMonth = parseInt(new Date(eventStartDate.getFullYear(), eventStartDate.getMonth() + 1, 0) / 1000)
    const id = (payload.id.includes('_')) ? payload.id.split('_')[0] : payload.id
    await this.$axios.$delete(`${process.env.SCHEDULER_HOST}/calendar/${state.calendar.id}/appointment/${id}`)
    await dispatch('getAppointmentsForMonth', { startDate: startOfMonth, endDate: endOfMonth })
    
    return true
  },
  async connectToLocalCalendar ({ commit }) {
    const res = await this.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar/connect/local?timezone=Africa/Lagos`)
    commit('setCalendar', res[0])
    return res
  }
}

export const getters = {
  drawer: state => state.drawer,
  getCalendar: state => state.calendar,
  getActiveEvent: state => state.activeEvent,
  getAllEvents: state => Object.values(state.events)
}
