export const state = () => ({
  searches: []
})

export const mutations = {
  setSearch (state, search) {
    state.searches = search
  }
}

export const actions = {
  async search (_, payload) {
    return this.$axios.$get(`${process.env.SEARCH_HOST}/search`, {
      params: {
        q: payload.query
      }
    })
  }
}

export const getters = {
  getSearches: state => state.searches
}
