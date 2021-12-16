import Vue from 'vue'

export const state = () => ({
  isStripeConnected: false,
  editingServiceCard: false,
  user: {},
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
      client: {
        firstName: '',
        email: '',
        petName: '',
        petBreed: '',
        petAge: '',
        petGender: ''
      },
      stripe: false
    }
  },
  UPDATE_TRAINER_REG_DATA (state, payload) {
    if ('type' in payload && payload.type === 'services') {
      state.trainerRegData[payload.parent].push(payload.value)
    } else if ('type' in payload && payload.type === 'deleteService') {
      state.trainerRegData[payload.parent] = payload.value
    } else if ('type' in payload && payload.type === 'updateService') {
      state.trainerRegData.services.splice(payload.index, 1, payload.value)
    } else {
      state.trainerRegData[payload.parent][payload.key] = payload.value
    }
  },
  SET_USER (state, user) {
    const checkEmptiness = user &&
      Object.keys(user).length === 0 && user.constructor === Object
    const gwuser = checkEmptiness ? {} : user
    this.$auth.setUser(gwuser)
    Vue.set(state, 'user', user)
  }
}

export const actions = {
  clearGetWelpUser ({ commit }) {
    commit('SET_USER', {})
  },
  createProfile (
    { state, commit, dispatch },
    payload = {
      ...state.trainerRegData.personalProfile,
      ...state.trainerRegData.trainerProfile,
      services: state.trainerRegData.services
    }
  ) {
    return this.$axios
      .$post(`${process.env.BASEURL_HOST}/profile`, payload)
      .then((response) => {
        const { data } = response
        if (data !== null) {
          commit('SET_USER', data)
        }
        return response
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
      .$patch(
        `${process.env.BASEURL_HOST}/profile/upload-image`,
        payload,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
      .then((response) => {
        commit('SET_USER', response.data)
        return response
      })
  },
  async getServices ({ commit }, payload) {
    return await this.$axios.$get(`${process.env.BASEURL_HOST}/profile/services`)
  },
  async deleteService ({ commit }, serviceId) {
    return await this.$axios.$delete(`${process.env.BASEURL_HOST}/profile/services/${serviceId}`)
  }
}
export const getters = {
  getUser: state => state.user,
  stripeConnection: state => state.user.stripe,
  isStripeConnected: state =>
    state.user.stripe && state.user.stripe.connected,
  isStripeReady: state =>
    state.user.stripe &&
    state.user.stripe.capabilities &&
    state.user.stripe.capabilities.card_payments === 'active' &&
    state.user.stripe.capabilities.transfers === 'active' &&
    state.user.stripe.capabilities.bacs_debit_payments ===
    'active'
}
