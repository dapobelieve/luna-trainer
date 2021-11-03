import Vue from 'vue'

export const state = () => ({
  isStripeConnected: false,
  editingServiceCard: false,
  getWelpUser: {},
  currency: 'GBP',
  trainnerRegData: {
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
    trainnerProfile: {
      accreditations: [],
      specialization: [],
      reinforcement: 'no'
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
  SET_EMPTY_TRAINNER_REG_DATA (state) {
    state.trainnerRegData = {
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
      trainnerProfile: {
        accreditations: [],
        specialization: [],
        reinforcement: 'no'
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
  UPDATE_TRAINNER_REG_DATA (state, payload) {
    if ('type' in payload && payload.type === 'services') {
      state.trainnerRegData[payload.parent].push(payload.value)
    } else if ('type' in payload && payload.type === 'deleteService') {
      state.trainnerRegData[payload.parent] = payload.value
    } else if ('type' in payload && payload.type === 'updateService') {
      state.trainnerRegData.services.splice(payload.index, 1, payload.value)
    } else {
      state.trainnerRegData[payload.parent][payload.key] = payload.value
    }
  },
  SET_GETWELP_USER (state, user) {
    const checkEmptiness =
      Object.keys(user).length === 0 && user.constructor === Object
    const gwuser = checkEmptiness ? {} : user
    this.$auth.setUser(gwuser)
    localStorage.setItem('getWelpUser', JSON.stringify(gwuser))
    Vue.set(state, 'getWelpUser', user)
  }
}

export const actions = {
  clearGetWelpUser ({ commit }) {
    commit('SET_GETWELP_USER', {})
  },
  createProfile (
    { state, commit, dispatch },
    payload = {
      ...state.trainnerRegData.personalProfile,
      ...state.trainnerRegData.trainnerProfile,
      services: state.trainnerRegData.services
    }
  ) {
    return this.$axios
      .$post(`${process.env.BASEURL_HOST}/profile`, payload)
      .then((response) => {
        const { data } = response
        if (data !== null) {
          commit('SET_GETWELP_USER', data)
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
          commit('SET_GETWELP_USER', data)
        }
        return response
      })
  },
  updateProfile ({ commit }, payload) {
    return this.$axios
      .$put(`${process.env.BASEURL_HOST}/profile`, payload)
      .then((response) => {
        commit('SET_GETWELP_USER', response.data)
        return response
      })
  },
  getUserProfile ({ commit }) {
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/profile`)
      .then(({ data }) => {
        if (data !== null) {
          commit('SET_GETWELP_USER', data)
        }
        return data
      })
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
        commit('SET_GETWELP_USER', response.data)
        return response
      })
  },
  async getServices ({ commit }, payload) {
    return await this.$axios.$get(`${process.env.BASEURL_HOST}/profile/services`)
  }
}
export const getters = {
  getUser: state => state.getWelpUser,
  isStripeConnected: state =>
    state.getWelpUser.stripe && state.getWelpUser.stripe.connected,
  isStripeReady: state =>
    state.getWelpUser.stripe &&
    state.getWelpUser.stripe.capabilities &&
    state.getWelpUser.stripe.capabilities.card_payments === 'active' &&
    state.getWelpUser.stripe.capabilities.transfers === 'active' &&
    state.getWelpUser.stripe.capabilities.bacs_debit_payments === 'active'
}
