export const state = () => ({
  notes: [],
  addNoteModal: false,
  addingMode: true,
  noteInView: {}
})

export const mutations = {
  toggleModal (state, payload) {
    state.addNoteModal = payload.status
    state.addingMode = payload.addingMode
    state.noteInView = payload.note
  },
  addNotes (state, details) {
    const newNoteId = state.notes.length ? state.notes[state.notes.length - 1].id + 1 : 1
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
  async addNotes ({ state, commit }, details) {
    await commit('addNotes', details)
    return state.notes[state.notes.length - 1].id
  }
}

export const getters = {
  notes: state => state.notes
}
