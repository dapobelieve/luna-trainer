import Vue from 'vue'
const queryString = require('query-string')

export const state = () => ({
  clients: [],
  newClients: {},
  clientsCount: 0,
  isLoading: false
})

export const mutations = {
  setStates (state, data) {
    Object.keys(data).forEach((key) => {
      Vue.set(state, key, data[key])
    })
  },
  SET_ALL_CLIENTS (state, clients) {
    state.clients = clients.data
    state.clientsCount = clients.size
  },
  IS_LOADING (state, loadingStatus) {
    state.isLoading = loadingStatus
  },
  LOCAL_UPDATE_CLIENT (state, client) {
    const userId = client._id
    const clientIndex = state.clients.findIndex(c => c._id === userId)
    state.clients.splice(clientIndex, 1, client)
  }
}

export const actions = {
  async archive ({ dispatch }, payload) {
    const res = await this.$axios.$patch(`${process.env.BASEURL_HOST}/profile/${payload._id}/archive`)
    if (res.status === 'success') {
      dispatch('fetchClients', { status: 'accepted' })
    }
    return res
  },
  async revoke ({ dispatch }, payload) {
    const res = await this.$axios.$patch(`${process.env.BASEURL_HOST}/client/revoke-link/${payload._id}`)
    if (res.status === 'success') {
      dispatch('fetchClients', { status: 'invited' })
    }
    return res
  },
  updateClientProfile ({ commit }, details) {
    return this.$axios
      .$patch(`${process.env.BASEURL_HOST}/client/${details.id}`, details.info)
      .then(response => response)
      .catch(e => e)
  },
  fetchClientsWithStatusAndLimit ({ commit }, payload) {
    const stat =
      payload !== undefined && 'status' in payload ? payload.status : ''
    const currPage =
      payload !== undefined && 'page' in payload ? payload.page : 1
    const limit =
      payload !== undefined && 'limit' in payload ? payload.limit : 10
    return this.$axios
      .$get(
        `${process.env.BASEURL_HOST}/client/invites${stat ? `?status=${stat}&` : '?'
        }limit=${limit}&page=${currPage}`
      )
      .then((response) => {
        return response.data
      })
  },
  clearAllClientStates ({ commit }) {
    // for local storage force logout
    commit('SET_ALL_CLIENTS', { data: [], size: 0 })
  },
  inviteClient ({ commit }, clientInfo) {
    return this.$axios
      .$post(`${process.env.BASEURL_HOST}/client/invite`, clientInfo)
      .then(response => response)
      .catch(e => e)
  },
  resendClientInvite ({ commit, dispatch }, id) {
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/client/${id}/resend-invite`)
      .then((response) => {
        return response
      })
  },
  async allConciseClients () {
    const response = await this.$axios.$get(`${process.env.BASEURL_HOST}/client/concise`)
    if (response && response.data) {
      return response.data
    }
    return []
  },
  fetchAllClients ({ commit, dispatch }, payload) {
    const stat =
      payload !== undefined && 'status' in payload ? payload.status : ''
    const currPage =
      payload !== undefined && 'page' in payload ? payload.page : 1
    commit('IS_LOADING', true)
    dispatch('loader/startProcess', null, { root: true })
    return this.$axios
      .$get(
        `${process.env.BASEURL_HOST}/client/invites${stat ? `?status=${stat}&` : '?'
        }limit=10&page=${currPage}`
      )
      .then((response) => {
        commit('SET_ALL_CLIENTS', response)
        commit('IS_LOADING', false)
        dispatch('loader/endProcess', null, { root: true })
        return response.data
      })
      .catch(() => {
        dispatch('loader/endProcess', null, { root: true })
        commit('IS_LOADING', false)
      })
  },
  async fetchClients ({ commit, dispatch }, payload) {
    const q = {
      status: undefined,
      limit: 10,
      page: 1
    }

    const queryObj = queryString.stringify({ ...q, ...payload })
    try {
      const response = await this.$axios.$get(`${process.env.BASEURL_HOST}/client?${queryObj}`)
      commit('setStates', { newClients: response })
      return response
    } catch (e) {
      return e
    }
  },
  getSingleClientById ({ commit, dispatch }, id) {
    dispatch('loader/startProcess', null, { root: true })
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/profile?id=${id}`)
      .then(({ data }) => {
        dispatch('loader/endProcess', null, { root: true })
        return data
      })
  }
}

export const getters = {
  getAllClients: state => state.newClients.data,
  getAllClients2: state => state.newClients,
  acceptedClients: (state, getters) => {
    return getters.getAllClients.filter(c => c.status === 'accepted')
  },
  clientsCount: state => state.clientsCount
}
