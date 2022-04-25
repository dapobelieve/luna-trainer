export const state = () => ({
  notes: []
})

export const mutations = {
  setNotes (state, notes) {
    state.notes = notes
  },
  updateNotes (state, notes) {
    notes.forEach((note) => {
      state.notes.push(note)
    })
  },
  addNote (state, details) {
    console.log(state.notes)
    state.notes.unshift(details)
  },
  pushNote (state, details) {
    console.log(state.notes)
    state.notes.unshift(details)
  },
  updateNote (state, noteDetails) {
    const noteIndex = state.notes.findIndex(n => n._id === noteDetails._id)
    state.notes.splice(noteIndex, 1, noteDetails)
  },
  removeNote (state, noteId) {
    const noteIndex = state.notes.findIndex(n => n._id === noteId)
    state.notes.splice(noteIndex, 1)
  }
}

export const actions = {
  async fetchNotes ({ commit, dispatch }, params) {
    const res = await this.$axios.$get(
      `${process.env.BASEURL_HOST}/note`, { params })
    if (params.page > 1) { commit('updateNotes', res.data) } else { commit('setNotes', res.data) }
  },
  async createNote ({ state, commit }, details) {
    const { data } = await this.$axios.$post(
        `${process.env.BASEURL_HOST}/note`,
        details
    )
    commit('addNote', data)
    return data
  },
  async updateNote ({ commit }, payload) {
    try {
      const noteId = payload._id
      const { data } = await this.$axios.$patch(
        `${process.env.BASEURL_HOST}/note/${noteId}`, payload)
      commit('updateNote', data)
      return data
    } catch (error) {
      console.log('error updating notes ', error)
    }
  },
  async deleteNote ({ commit }, noteId) {
    await this.$axios.$delete(
        `${process.env.BASEURL_HOST}/note/${noteId}`)
    commit('removeNote', noteId)
    return true
  }
}

export const getters = {
  notes: state => state.notes,
  healthNotes: state => state.notes.filter(note => note.tags && !note.tags.find(tag => tag === 'health'))
}
