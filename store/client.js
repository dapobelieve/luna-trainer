export const state = () => ({
  acceptedClients: [],
  invitedClients: []
})

export const mutations = {
  // ADD_CLIENT (state, clientInfo) {
  //   const clients = localStorage.getItem(clientInfo) || []
  //   clients.push(clientInfo)
  //   localStorage.setItem('clientsInfo', JSON.stringify(clients))
  //   if (!clients.length) {
  //     state.clients.set(clientInfo.email, clientInfo)
  //     return
  //   }
  //   clients.forEach(client => state.clients.set(client.email, client))
  // },
  // FETCH_CLIENTS (state) {
  //   const clients = JSON.parse(localStorage.getItem('clientsInfo')) || []
  //   if (clients.length) {
  //     clients.forEach(client => state.clients.set(client.email, client))
  //   }
  // },
  ACCEPTED_CLIENTS (state, acceptedClients) {
    state.acceptedClients = acceptedClients
  },
  INVITED_CLIENTS (state, invitedClients) {
    state.invitedClients = invitedClients
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
  resendClientInvite () {},
  fetchAllClients ({ commit }) {
    // regardless of the status
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/client/concise`)
      .then((response) => {
        console.log('client list', response)
        commit('INVITE_CLIENT', response)
        return response
      })
  },
  fetchAllAcceptedClients ({ commit }) {
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/client/invites?limit=2&page=1&status=accepted`)
      .then((response) => {
        console.log('client list', response)
        commit('INVITE_CLIENT', response)
        return response
      })
  },
  fetchAllInvitedClients ({ commit }) {
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/client/invites?limit=2&page=1&status=invited`)
      .then(({ data }) => {
        console.log('client list', data)
        commit('INVITED_CLIENTS', data)
        return data
      })
  }
}

export const getters = {
  getAllAcceptedClients: state => state.acceptedClients,
  getAllInvitedClients: state => state.invitedClients
}
