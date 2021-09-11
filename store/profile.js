export const state = () => ({
  isStripeConnected: false,
  getWelpUser: {},
  trainnerRegData: {
    personalProfile: {
      firstName: '',
      lastName: '',
      businessName: '',
      website: '',
      country: '',
      currency: '',
      timezone: ''
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
      dogName: '',
      breed: ''
    },
    stripe: false
  }
})

export const mutations = {
  UPDATE_TRAINNER_REG_DATA (state, payload) {
    console.log('pay ', payload)
    if ('type' in payload && payload.type === 'services') {
      console.log('this')
      state.trainnerRegData[payload.parent].push(payload.value)
    } else if ('type' in payload && payload.type === 'deleteService') {
      state.trainnerRegData[payload.parent] = payload.value
    } else {
      console.log('that')
      state.trainnerRegData[payload.parent][payload.key] = payload.value
    }
  },
  SET_GETWELP_USER (state, user) {
    const checkEmptiness =
      Object.keys(user).length === 0 && user.constructor === Object
    const gwuser = checkEmptiness ? {} : user
    this.$auth.setUser(gwuser)
    localStorage.setItem('getWelpUser', JSON.stringify(gwuser))
    state.getWelpUser = gwuser
  }
}

export const actions = {
  clearGetWelpUser ({ commit }) {
    commit('SET_GETWELP_USER', {})
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
               { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      .then((response) => {
        commit('SET_GETWELP_USER', response.data)
        return response
      })
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
