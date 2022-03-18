import Vue from 'vue'

export const state = () => ({
  services: []
})

export const mutations = {
  setServices(state, services){
    Vue.set(state,'services', services)
  },
  updateServices(state, updatedService){
    let services = state.services.map(service=>service._id == updatedService._id ? updatedService : service)
    Vue.set(state,'services', services)
  }
}

export const actions = {
  async getServices ({ commit }, payload) {
    const response = await this.$axios.$get(
      `${process.env.BASEURL_HOST}/services`
    )
    if(response.data) commit('setServices', response.data)
  },
  async updateService ({ state, commit }, service) {
    const response = await this.$axios.$put(
      `${process.env.BASEURL_HOST}/services/${service._id}`,service)
    if(response.data) commit("updateServices",response.data)
  },
  async addService ({ state, commit }, serviceId) {
    const response = await this.$axios.$post(
      `${process.env.BASEURL_HOST}/services`)
  },
  async deleteService ({ state, commit }, serviceId) {
    const response = await this.$axios.$delete(
      `${process.env.BASEURL_HOST}/services/${serviceId}`)
      
    if(response.data) {
      let services = state.services.filter(e=>e._id != serviceId)
      commit('setServices', services)
    }
  },
}
export const getters = {
  allServices: state => state.services,
  getServiceById: (state) => (id) => state.services.find(service => service._id  == id),
  isMaxServicesAmountReached: state => state.services.length > 5
}
