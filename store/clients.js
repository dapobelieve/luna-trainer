export const state = () => ({
  clients: {}
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
