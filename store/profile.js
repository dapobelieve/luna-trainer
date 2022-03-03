import Vue from 'vue'

export const state = () => ({
  isStripeConnected: false,
  editingServiceCard: false,
  user: {},
  loading: false,
  currency: 'GBP',
  trainerRegData: {
    personalProfile: {
      firstName: '',
      lastName: '',
      businessName: '',
      websiteUrl: '',
      location: '',
      currency: '',
      phone: '',
      timezone: '',
      dateFormat: 'DD/MM/YY'
    },
    trainerProfile: {
      accreditations: [],
      specialization: [],
      usePositiveReinforce: false
    },
    services: [],
    client: {
      firstName: '',
      lastName: '',
      email: '',
      petName: '',
      petBreed: '',
      petAge: '',
      petGender: ''
    },
    stripe: false
  }
})

export const mutations = {
  SET_PROFILE (state, user) {
    console.log('incoming user ', user)
    state.user = {
      firstName: '',
      lastName: '',
      businessName: '',
      websiteUrl: '',
      dateFormat: 'DD/MM/YY',
      usePositiveReinforce: false,
      gender: 'male',
      ...user,
      location: 'Nigeria'
    }
  },
  SET_STATE (state, data) {
    Object.keys(data).forEach(key => (state[key] = data[key]))
  },
  SET_EMPTY_TRAINER_REG_DATA (state) {
    state.trainerRegData = {
      personalProfile: {
        firstName: '',
        lastName: '',
        businessName: '',
        websiteUrl: '',
        location: '',
        currency: '',
        phone: '',
        timezone: '',
        dateFormat: 'DD/MM/YY'
      },
      trainerProfile: {
        accreditations: [],
        specialization: [],
        usePositiveReinforce: false
      },
      services: [],
      stripe: false
    }
  },
  UPDATE_TRAINER_REG_DATA (state, payload) {
    if ('type' in payload && payload.type === 'services') {
      state.user[payload.parent].push(payload.value)
    } else if ('type' in payload && payload.type === 'deleteService') {
      state.user[payload.parent] = payload.value
    } else if ('type' in payload && payload.type === 'updateService') {
      state.user.services.splice(payload.index, 1, payload.value)
    } else {
      state.user[payload.key] = payload.value
    }
  },
  SET_USER (state, user) {
    this.$auth.setUser(user)
    Vue.set(state, 'user', user)
  }
}

export const actions = {
  clearGetWelpUser ({ commit, dispatch, getters }) {
    commit('SET_USER', {})
  },
  async updateOnboardingProfile ({ state, commit }, payload = { ...state.user }) {
    await this.$axios
      .$put(`${process.env.BASEURL_HOST}/profile`, payload)
      .then((response) => {
        const { data } = response
        commit('SET_USER', data)
        return true
      })
  },
  createTrainerProfile ({ commit, dispatch }, payload) {
    const data = { ...payload }
    delete data.profilePic
    return this.$axios
      .$post(`${process.env.BASEURL_HOST}/profile`, data)
      .then((response) => {
        const { data } = response
        if (data !== null) {
          commit('SET_USER', data)
        }
        return response
      })
  },
  updateProfile ({ commit }, payload) {
    return this.$axios
      .$put(`${process.env.BASEURL_HOST}/profile`, payload)
      .then((response) => {
        commit('SET_USER', response.data)
        return response
      })
  },
  async getUserProfile ({ commit }) {
    const res = await this.$axios.$get(`${process.env.BASEURL_HOST}/profile`)
    if (res.status === 'success') {
      commit('SET_USER', res.data)
      return res.data
    }
    return res
  },
  uploadProfileImage ({ commit }, payload) {
    return this.$axios
      .$patch(`${process.env.BASEURL_HOST}/profile/upload-image`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((response) => {
        commit('SET_USER', response.data)
        return response
      })
  },
  async getServices ({ commit }, payload) {
    return await this.$axios.$get(
      `${process.env.BASEURL_HOST}/profile/services`
    )
  },
  async deleteService ({ commit }, serviceId) {
    return await this.$axios.$delete(
      `${process.env.BASEURL_HOST}/profile/services/${serviceId}`
    )
  },
  async clientReportSummary () {
    // day, month, week quarter
    const res = await this.$axios.$get(`${process.env.REPORTING_HOST}/reporting/client/summary?q=month`)
    return res.data[0]
  },
  async clientReport () {},
  async userFinancials () {
    const res = await this.$axios.$get(`${process.env.REPORTING_HOST}/invoice`)
    return res.data
  },
  async reportPreference () {}
}
export const getters = {
  getLoading: state => state.loading,
  getUser: state => state.user,
  stripeConnection: state => state.user.stripe,
  isStripeConnected: state =>
    state.user.stripe && state.user.stripe.connected,
  isStripeReady: state =>
    state.user.stripe &&
    state.user.stripe.capabilities &&
    state.user.stripe.capabilities.card_payments === 'active' &&
    state.user.stripe.capabilities.transfers === 'active' &&
    state.user.stripe.capabilities.bacs_debit_payments === 'active'
}
