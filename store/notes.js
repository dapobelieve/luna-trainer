export const state = () => ({
  notes: [],
  expandModal: false,
  largeScreen: false,
  addNoteModal: false,
  addingMode: true,
  noteInView: {}
})

export const mutations = {
  SET_STATES (state, data) {
    // eslint-disable-next-line array-callback-return
    Object.keys(data).map((key) => {
      state[key] = data[key]
    })
  },
  TOGGLE_MODAL (state, payload) {
    state.addNoteModal = payload.status
    if ('addingMode' in payload) {
      state.addingMode = payload.addingMode
    }
    if (payload.note) {
      state.noteInView = payload.note
    }
  },
  TOGGLE_EXPAND_MODAL (state, payload) {
    state.largeScreen = !state.largeScreen
    state.expandModal = payload.status
  },
  ADD_NOTES (state, details) {
    state.notes.unshift(details)
  },
  UPDATE_NOTE (state, noteDetails) {
    const noteIndex = state.notes.findIndex(n => n._id === noteDetails._id)
    state.notes.splice(noteIndex, 1, noteDetails)
  },
  DELETE_NOTE (state, noteId) {
    const noteIndex = state.notes.findIndex(n => n._id === noteId)
    state.notes.splice(noteIndex, 1)
  }
}

export const actions = {
  async fetchNotes ({ commit, dispatch }, payload) {
    const queries = {
      page: 1,
      limit: 5,
      ...payload
    }
    dispatch('loader/startProcess', 'health-notes', { root: true })
    const res = await this.$axios.$get(
      `${process.env.BASEURL_HOST}/note`, { params: queries })
    commit('SET_STATES', { notes: res.data })
    dispatch('loader/endProcess', 'health-notes', { root: true })
  },

  async addNotes ({ state, commit }, details) {
    const { data } = await this.$axios.$post(
        `${process.env.BASEURL_HOST}/note`,
        details
    )
    commit('ADD_NOTES', data)
    return data._id
  },
  async updateNote ({ commit }, payload) {
    const noteId = payload.noteId
    const description = payload.description
    const title = payload.title
    try {
      const { data } = await this.$axios.$patch(
        `${process.env.BASEURL_HOST}/note/${noteId}`, { title, description })
      commit('UPDATE_NOTE', data)
      return data._id
    } catch (error) {
      console.log('error updating notes ', error)
    }
  },
  async deleteNote ({ commit }, noteId) {
    await this.$axios.$delete(
        `${process.env.BASEURL_HOST}/note/${noteId}`)
    commit('DELETE_NOTE', noteId)
    return true
  }
}

export const getters = {
  notes: state => state.notes
}
