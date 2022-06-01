export const state = () => ({
  personal: {
    firstName: '',
    lastName: '',
    pronouns: 'he/him',
    phoneNumber: '',
    timezone: '',
    dateFormat: 'dd/mm/yy',
    businessCountry: 'UK'
  },
  business: {
    businessName: '',
    websiteUrl: '',
    currency: 'GBP',
    accreditations: [],
    specialization: [],
    usePositiveReinforce: false
  },
  services: [],
  currentPageIndex: 0
})

export const mutations = {
  updateBusinessInfo (state, payload) {
    state.business = { ...state.business, ...payload }
  },
  updatePersonalInfo (state, payload) {
    state.personal = { ...state.personal, ...payload }
  },
  setServices (state, payload) {
    state.services = payload
  },
  updateService (state, payload) {
    const serviceIndex = state.services.findIndex(service => service.idx === payload.idx)
    if (serviceIndex !== -1) {
      state.services[serviceIndex] = { ...state.services[serviceIndex], ...payload }
    } else {
      state.services.push(payload)
    }
    state.services = [...state.services]
  },
  removeService (state, service) {
    const serviceIndex = state.services.findIndex(s => s.idx === service.idx || s._id === service._id)
    state.services.splice(serviceIndex, 1)
  },
  setCurrentPage (state, payload) {
    state.currentPageIndex = payload
  }
}
export const actions = {
  start ({ state, commit }, profile) {
    commit('updatePersonalInfo', {
      firstName: profile.firstName,
      lastName: profile.lastName,
      businessCountry: profile.businessCountry,
      pronouns: profile.pronouns,
      phone: profile.phone,
      timezone: profile.timezone,
      dateFormat: profile.dateFormat
    })
    commit('updateBusinessInfo', {
      businessName: profile.businessName,
      websiteUrl: profile.websiteUrl,
      currency: profile.currency,
      accreditations: profile.accreditations,
      specialization: profile.specialization,
      usePositiveReinforce: profile.usePositiveReinforce
    })
    commit('setServices', profile.services)
  },
  async complete ({ state, commit }) {
    await this.$axios
      .$put(`${process.env.BASEURL_HOST}/profile`, {
        services: state.services,
        ...state.business,
        ...state.personal
      })
      .then((response) => {
        const { data } = response
        commit('profile/SET_USER', data, { root: true })
        return true
      })
  },
  cleanup ({ commit }) {
    commit('setServices', [])
    commit('setCurrentPage', 0)
    commit('updateBusinessInfo', {})
    commit('updatePersonalInfo', {})
  }
}
export const getters = {}
