export const state = () => ({
  sbUser: null,
  connectingStatus: false
})

export const mutations = {
  SET_SB_USER (state, user) {
    state.sbUser = user
  },
  CONNECTION_ERROR (state, status) {
    state.connectingStatus = status
  }
}

export const actions = {
  async connect_to_sb_server_with_userid ({ commit }) {
    commit('CONNECTION_ERROR', false)
    try {
      return await this.$sb.connect('0003', '94fce739fa2f995601a8d860c0615e3c4e259fbc', (user, error) => {
        if (error) {
          // Handle error.
          commit('CONNECTION_ERROR', true)
          return false
        }

        // The user is connected to Sendbird server.
        commit('SET_SB_USER', user)
      })
    } catch (error) {
      return 'error'
    }
  }
}

export const getters = {
  connectingToSendbirdServerWithUserStatus: state => state.connectingStatus
}
