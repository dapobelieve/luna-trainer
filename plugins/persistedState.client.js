import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'vuex',
    paths: [
      'authorize.getWelpUser',
      'auth',
      'client.clients'
    ],
    storage: localStorage
  })(store)
}
