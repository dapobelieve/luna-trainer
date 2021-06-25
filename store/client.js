import Vue from 'vue'

export const state = () => ({
  acceptedClients: [],
  invitedClients: []
})

export const mutations = {
  ACCEPTED_CLIENTS (state, acceptedClients) {
    state.acceptedClients = acceptedClients
  },
  invited_clients (state, invitedClients) {
    // state.invitedClients = invitedClients
    Vue.set(state, 'invitedClients', invitedClients)
  }
}

export const actions = {
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
  fetchAllClients ({ state, commit, dispatch }) {
    // regardless of the status
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/client/concise`)
      .then((response) => {
        console.log('client list', response)
        return response
      })
  },
  fetchAllAcceptedClients ({ commit, dispatch }) {
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/client/invites?status=accepted`)
      .then(({ data }) => {
        console.log('client list accepted', data)
        if (data.length !== 0) {
          commit('ACCEPTED_CLIENTS', data)
        }
        commit('invited_clients', data)
        return data
      })
  },
  async fetchAllInvitedClients ({ commit }) {
    return await this.$axios
      .get(`${process.env.BASEURL_HOST}/client/invites?status=invited`)
      .then(({ data }) => {
        console.log('client listing', data.data)
        if (data.data.length !== 0) {
          console.log('commited')
          commit('invited_clients', data.data)
        }
        console.log('not commuted')
        return data.data
      })
  }
}

export const getters = {
  getAllAcceptedClients: state => state.acceptedClients,
  getAllInvitedClients: state => state.invitedClients
}
