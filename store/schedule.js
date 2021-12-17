export const state = () => ({
  
})
export const mutations = {}
export const actions = {
  async getCalendars({commit}) {
    return await this.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar`)
  },
  async createAppointment({commit}, payload, calendar) {
    console.log({calendar})
    let res = await this.$axios.$post(`${process.env.SCHEDULER_HOST}/calendar/${payload.calendar}/appointment`, {...payload.data});
    
  }
}
export const getters = {}
