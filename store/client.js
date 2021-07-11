export const state = () => ({
  allClients: [],
  acceptedClients: [],
  invitedClients: [],
  loadingForAllClients: true
})

export const mutations = {
  ALL_CLIENTS (state, allClients) {
    state.allClients = allClients
    state.loadingForAllClients = false
  },
  ACCEPTED_CLIENTS (state, acceptedClients) {
    state.acceptedClients = acceptedClients
  },
  INVITED_CLIENTS (state, invitedClients) {
    state.invitedClients = invitedClients
  }
}

export const actions = {
  clearAllClientStates ({ commit }) {
    // for local storage force logout
    commit('ALL_CLIENTS', [])
    commit('ACCEPTED_CLIENTS', [])
    commit('INVITED_CLIENTS', [])
  },
  inviteClient ({ commit }, clientInfo) {
    return this.$axios
      .$post(`${process.env.BASEURL_HOST}/client/invite`, clientInfo)
      .then((response) => {
        console.log('invited client', response)
        return response
      })
  },
  resendClientInvite ({ commit, dispatch }, id) {
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/client/${id}/resend-invite`)
      .then((response) => {
        console.log('client list', response)
        return response
      })
  },
  fetchAllClientsConcise ({ commit }) {
    // regardless of the status
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/client/concise`)
      .then(({ data }) => {
        console.log('client list concise', data)
        commit('ALL_CLIENTS', data)
        return data
      })
  },
  fetchAllAcceptedClients ({ commit, dispatch }) {
    dispatch('loader/startProcess', null, { root: true })
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/client/invites?status=accepted`)
      .then(({ data }) => {
        commit('ACCEPTED_CLIENTS', data)
        dispatch('loader/endProcess', null, { root: true })
        return data
      }).catch(() => {
        dispatch('loader/endProcess', null, { root: true })
      })
  },
  async fetchAllInvitedClients ({ commit, dispatch }) {
    dispatch('loader/startProcess', null, { root: true })
    return await this.$axios
      .get(`${process.env.BASEURL_HOST}/client/invites?status=invited`)
      .then(({ data }) => {
        commit('INVITED_CLIENTS', data.data)
        dispatch('loader/endProcess', null, { root: true })
        return data.data
      }).catch(() => {
        dispatch('loader/endProcess', null, { root: true })
      })
  }
}

export const getters = {
  getAllAcceptedClients: state => state.acceptedClients,
  getAllInvitedClients: state => state.invitedClients,
  getAllClients: state => state.allClients
}
