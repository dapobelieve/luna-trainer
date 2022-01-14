export const state = () => ({
  notes: [],
  addNoteModal: false
})

export const mutations = {
  toggleModal (state, status) {
    state.addNoteModal = status
  }
}

export const actions = {

}

export const getters = {
  notes: state => state.notes
}
