export const state = () => ({})

export const mutations = {}

export const actions = {
  setToken ({ commit }, payload) {
    this.$auth.setUserToken(payload.token, payload.refreshToken)
  },

  getUserProfile ({ commit }) {
    return this.$axios
      .$get('https://api.getwelp.co.uk/core/v0/profile')
      .then(({ data }) => {
        // set user data in nuxt auth
        this.$auth.setUser(data)
        return data
      })
      .catch((err) => {
        console.log('error setting', err)
      })
  }
}
