export const state = () => ({
  isLoading: false,
  id: ''
})

export const mutations = {
  PROCESS_START (state, id) {
    state.isLoading = true
    state.id = id || ''
  },
  PROCESS_END (state) {
    state.isLoading = false
    state.id = ''
  }
}

export const actions = {
  startProcess ({ commit }, id) {
    commit('PROCESS_START', id)
  },
  endProcess ({ commit }) {
    commit('PROCESS_END')
  }
}
