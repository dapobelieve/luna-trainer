export const state = () => ({
  clients: new Map(),
  acceptedClients: new Map(),
  pendingAcceptance: new Map()
})

export const mutations = {
  INVITE_CLIENT (state, clientInfo) {}
}

export const action = {
  inviteClient ({ commit }, clientInfo) {
    return this.$axios
      .$post(`${process.env.BASEURL_HOST}/client/invite`, clientInfo)
      .then((response) => {
        console.log('invited client', response)
        return response
        // commit('INVITE_CLIENT', response)
      })
      .catch((err) => {
        console.log('error inviting', err)
      })
  }
}

export const getters = {
  // for clients module
  fetchAllClients: state => state.acceptedClients
}
