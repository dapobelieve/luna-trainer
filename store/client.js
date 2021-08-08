export const state = () => ({
  clients: [],
  clientsCount: 0,
  isLoading: false
})

export const mutations = {
  SET_ALL_CLIENTS (state, clients) {
    state.clients = clients.data
    state.clientsCount = clients.size
  },
  IS_LOADING (state, loadingStatus) {
    state.isLoading = loadingStatus
  }
}

export const actions = {
  clearAllClientStates ({ commit }) {
    // for local storage force logout
    commit('SET_ALL_CLIENTS', { data: [], size: 0 })
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
  fetchAllClients ({ commit, dispatch }, payload) {
    const stat = payload !== undefined && 'status' in payload ? payload.status : ''
    const currPage = payload !== undefined && 'page' in payload ? payload.page : 1
    commit('IS_LOADING', true)
    dispatch('loader/startProcess', null, { root: true })
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/client/invites${stat ? `?status=${stat}&` : '?'}limit=10&page=${currPage}`)
      .then((response) => {
        commit('SET_ALL_CLIENTS', response)
        commit('IS_LOADING', false)
        dispatch('loader/endProcess', null, { root: true })
        return response.data
      }).catch(() => {
        dispatch('loader/endProcess', null, { root: true })
        commit('IS_LOADING', false)
      })
  },
  getSingleClient ({ commit, dispatch }, userId) {
    dispatch('loader/startProcess', null, { root: true })
    return this.$axios.$get(`${process.env.BASEURL_HOST}/profile/${userId}`).then(({ data }) => {
      dispatch('loader/endProcess', null, { root: true })
      return data
    })
  }
}

export const getters = {
  getAllClients: state => state.clients,
  acceptedClients: (state, getters) => {
    return getters.getAllClients.filter(c => c.status === 'accepted')
  },
  clientsCount: state => state.clientsCount
}
