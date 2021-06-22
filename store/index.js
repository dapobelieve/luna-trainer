export const state = () => ({
  clients: {},
  acceptedClients: {}
})

export const mutations = {}

export const actions = {
  signUpUser ({ commit }, payload) {
    return this.$axios.$post(
      `${process.env.ACCOUNT_HOST_URL}/signup`, payload).then(({ status }) =>
      status
    )
  },
  setToken ({ commit }, payload) {
    this.$auth.setUserToken(payload.token, payload.refreshToken)
  },
  uploadProfileImage ({ commit }, payload) {
    return this.$axios.$patch(
      `${process.env.BASEURL_HOST}/profile/upload-image`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => response)
  },
  createTrainerProfile ({ commit, dispatch }, payload) {
    return this.$axios
      .$post(`${process.env.BASEURL_HOST}/profile`, payload)
      .then((response) => {
        // set user data in nuxt auth
        // this.$auth.setUser(response.data)
        return response
      })
      .catch((err) => {
        console.log('error setting', err)
      })
  },
  getUserProfile ({ commit }) {
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/profile`)
      .then(({ data }) => {
        // set user data in nuxt auth
        this.$auth.setUser(data)
        return data
      })
      .catch((err) => {
        console.log('error setting', err)
      })
  },
  logOut ({ commit }) {
    this.$auth.logout()
  },

  // everything concerning clients stuff to be moved when i figure out the mutation bug i noticed from using the client.js module
  inviteClient ({ commit }, clientInfo) {
    return this.$axios
      .$post(`${process.env.BASEURL_HOST}/client/invite`, clientInfo)
      .then((response) => {
        console.log('invited client', response)
        return response
      })
  },
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
  }
}

export const getters = {
  // for clients module
  fetchAllClients: state => state.acceptedClients
}
