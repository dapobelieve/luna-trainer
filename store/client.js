export const state = () => ({
  clients: [],
  isLoading: false
})

export const mutations = {
  SET_ALL_CLIENTS (state, clients) {
    state.clients = clients
  },
  IS_LOADING (state, loadingStatus) {
    state.isLoading = loadingStatus
  }
}

export const actions = {
  clearAllClientStates ({ commit }) {
    // for local storage force logout
    commit('SET_ALL_CLIENTS', [])
  },
  inviteClient ({ commit }, clientInfo) {
    return this.$axios
      .$post(`${process.env.BASEURL_HOST}/client/invite`, clientInfo)
      .then((response) => {
        return response
      })
  },
  resendClientInvite ({ commit, dispatch }, id) {
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/client/${id}/resend-invite`)
      .then((response) => {
        return response
      })
  },
  fetchAllClients ({ commit, dispatch }) {
    commit('IS_LOADING', true)
    dispatch('loader/startProcess', null, { root: true })
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/client/invites`)
      .then(({ data }) => {
        commit('SET_ALL_CLIENTS', data)
        commit('IS_LOADING', false)
        dispatch('loader/endProcess', null, { root: true })
        return data
      }).catch(() => {
        dispatch('loader/endProcess', null, { root: true })
        commit('IS_LOADING', false)
      })
  },
  getSingleClient ({ commit }, userId) {
    return this.$axios.$get(`${process.env.BASEURL_HOST}/profile/${userId}`).then(({ data }) => {
      return data
    })
  }
}

export const getters = {
  getAllClients: state => state.clients,
  acceptedClients: (state, getters) => {
    return getters.getAllClients.filter(c => c.status === 'accepted')
  }
}
