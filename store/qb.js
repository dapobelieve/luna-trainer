export const state = () => ({
  qbUser: null,
  messages: new Map(),
  qbBloxError: {}
})

export const mutations = {
  SET_QB_USER (state, details) {
    state.qbUser = details
  },
  SET_QB_ERROR (state, error) {
    state.qbBloxError = error
  }
}

export const actions = {
  getQbInfo ({ commit }) {
    return this.$axios.$get(`${process.env.BASEURL_HOST}/qb`).then((response) => {
      console.log('qb', response)
      if (response.success === true) {
        commit('SET_QB_USER', response.result)
      }
      return response
    })
  }
}

export const getters = {
  getQbError: state => state.qbBloxError
}
