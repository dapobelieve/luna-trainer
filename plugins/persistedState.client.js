import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'vuex',
    paths: [
      'authorize.getWelpUser',
      'auth',
      'sendBird.connectedChannels',
      'sendBird.tempClient',
      'client.clients'
    ],
    storage: localStorage
  })(store)
}
