export const state = () => ({
  clients: new Map()
})

export const mutations = {
  ADD_CLIENT (state, clientInfo) {
    const clients = localStorage.getItem(clientInfo) || []
    clients.push(clientInfo)
    localStorage.setItem('clientsInfo', JSON.stringify(clients))
    if (!clients.length) {
      state.clients.set(clientInfo.email, clientInfo)
      return
    }
    clients.forEach(client => state.clients.set(client.email, client))
  },
  FETCH_CLIENTS (state) {
    const clients = JSON.parse(localStorage.getItem('clientsInfo')) || []
    if (clients.length) {
      clients.forEach(client => state.clients.set(client.email, client))
    }
  }
}

export const actions = {
  addClient ({ commit }, clientInfo) {
    commit('ADD_CLIENT', clientInfo)
  }
}

export const getters = {
  FETCH_CLIENTS: state => state.clients
}
