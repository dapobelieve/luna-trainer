export const state = () => ({
  personal: {
    firstName: '',
    lastName: '',
    businessName: '',
    websiteUrl: '',
    businessCountry: 'United Kingdom',
    currency: 'GBP',
    pronouns: 'he/him',
    phone: '',
    timezone: '',
    dateFormat: 'DD/MM/YY'
  },
  business: {
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
    state.business = payload
  },
  updatePersonalInfo (state, payload) {
    state.personal = payload
  },
  updateServices (state, payload) {
    state.services = payload
  },
  setCurrentPage (state, payload) {
    console.log('setCurrentPage', payload)
    state.currentPageIndex = payload
  }
}
export const actions = {
  start ({ state, commit }, profile) {
    commit('updatePersonalInfo', {
      firstName: profile.firstName,
      lastName: profile.lastName,
      businessName: profile.businessName,
      websiteUrl: profile.websiteUrl,
      businessCountry: profile.businessCountry,
      currency: profile.currency,
      pronouns: profile.pronouns,
      phone: profile.phone,
      timezone: profile.timezone,
      dateFormat: profile.dateFormat
    })
    commit('updateBusinessInfo', {
      currency: profile.currency,
      accreditations: profile.accreditations,
      specialization: profile.specialization,
      usePositiveReinforce: profile.usePositiveReinforce
    })
    commit('updateServices', profile.services)
  },
  async complete ({ state, commit }) {
    await this.$axios
      .$put(`${process.env.BASEURL_HOST}/profile`, state)
      .then((response) => {
        const { data } = response
        commit('setUser', data)
        return true
      })
  }
}
export const getters = {}
