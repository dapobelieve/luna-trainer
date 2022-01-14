export const state = () => ({
  notes: [],
  addNoteModal: false,
  viewNote: false
})

export const mutations = {
  toggleModal (state, status) {
    state.addNoteModal = status
  },
  addNotes (state, details) {
    state.notes.push({
      title: details.title,
      body: details.body,
      date: details.date
    })
  }
}

export const actions = {

}

export const getters = {
  notes: state => state.notes
}
