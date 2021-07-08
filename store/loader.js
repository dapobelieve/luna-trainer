export const state = () => ({
  isLoading: false,
  id: ''
})

export const mutations = {
  LOADER_START (state, id) {
    state.isLoading = true
    state.id = id || ''
  },
  LOADER_FINISH (state) {
    state.isLoading = false
    state.id = ''
  }
}

export const actions = {
  startLoader ({ commit }, id) {
    commit('LOADER_START', id)
  },
  stopLoader ({ commit }) {
    commit('LOADER_FINISH')
  }
}
