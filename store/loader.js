export const state = () => ({
  isLoading: false
})

export const mutations = {
  LOADER_START (state) {
    state.isLoading = true
  },
  LOADER_FINISH (state) {
    state.isLoading = false
  }
}

export const actions = {
  startLoader ({ commit }) {
    commit('LOADER_START', [])
  },
  stopLoader ({ commit }) {
    commit('LOADER_FINISH', [])
  }
}
