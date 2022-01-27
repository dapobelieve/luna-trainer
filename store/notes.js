export const state = () => ({
  notes: [],
  expandModal: false,
  largeScreen: false,
  addNoteModal: false,
  addingMode: true,
  noteInView: {},
  isLoading: false
})

export const mutations = {
  isLoading (state, loadingStatus) {
    state.isLoading = loadingStatus
  },
  setNotes (state, notes) {
    state.notes = notes
  },
  toggleModal (state, payload) {
    state.addNoteModal = payload.status
    if ('addingMode' in payload) {
      state.addingMode = payload.addingMode
    }
    if (payload.note) {
      state.noteInView = payload.note
    }
  },
  toggleExpandModal (state, payload) {
    state.largeScreen = !state.largeScreen
    state.expandModal = payload.status
  },
  addNotes (state, details) {
    state.notes.unshift(details)
  },
  updateNotes (state, noteDetails) {
    const noteIndex = state.notes.findIndex(n => n._id === noteDetails._id)
    state.notes.splice(noteIndex, 1, noteDetails)
  },
  deleteSingleNote (state, noteId) {
    const noteIndex = state.notes.findIndex(n => n.id === noteId)
    state.notes.splice(noteIndex, 1)
  }
}

export const actions = {
  async fetchNotesWithStatusAndLimit ({ commit }, payload) {
    const currPage =
      payload !== undefined && 'page' in payload ? payload.page : 1
    const limit =
      payload !== undefined && 'limit' in payload ? payload.limit : 5
    const clientId = payload.clientId
    commit('isLoading', true)
    try {
      const { data } = await this.$axios.$get(
        `${process.env.BASEURL_HOST}/note?page=${currPage}&limit=${limit}&clientId=${clientId}`
      )
      commit('setNotes', data)
      commit('isLoading', false)
    } catch (error) {
      commit('isLoading', false)
    }
  },
  async addNotes ({ state, commit }, details) {
    try {
      const { data } = await this.$axios.$post(
        `${process.env.BASEURL_HOST}/note`,
        details
      )
      commit('addNotes', data)
      return data._id
    } catch (error) {
      console.log('error creating notes ', error)
    }
  },
  async updateNotes ({ commit }, payload) {
    const noteId = payload.noteId
    const description = payload.description
    try {
      const { data } = await this.$axios.$patch(
        `${process.env.BASEURL_HOST}/note/${noteId}`, { description })
      commit('updateNotes', data)
      return data._id
    } catch (error) {
      console.log('error updating notes ', error)
    }
  },
  async deleteSingleNote ({ commit }, noteId) {
    console.log('deleting note id ', noteId)
    try {
      await this.$axios.$delete(
        `${process.env.BASEURL_HOST}/note/${noteId}`)
      commit('deleteSingleNote', noteId)
      return true
    } catch (error) {
      console.log('error deleting notes ', error)
    }
  }
}

export const getters = {
  notes: state => state.notes
}
