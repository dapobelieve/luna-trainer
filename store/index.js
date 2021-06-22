export const state = () => ({})

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
  }
}
