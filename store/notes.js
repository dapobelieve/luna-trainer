export const state = () => ({
  notes: [],
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
    state.addingMode = payload.addingMode
    state.noteInView = payload.note
  },
  addNotes (state, details) {
    const newNoteId = state.notes.length
      ? state.notes[state.notes.length - 1].id + 1
      : 1
    state.notes.push({
      id: newNoteId,
      title: details.title,
      body: details.body,
      date: details.date
    })
  },
  updateNotes (state, noteDetails) {
    const noteIndex = state.notes.findIndex(n => n.id === noteDetails.id)
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
      const newNote = await this.$axios.$post(
        `${process.env.BASEURL_HOST}/note`,
        details
      )
      console.log('result to note ', newNote)
      // commit('addNotes', details)
      // return state.notes[state.notes.length - 1].id
    } catch (error) {
      console.log('error creating notes ', error)
    }
  }
}

export const getters = {
  notes: state => state.notes
}
