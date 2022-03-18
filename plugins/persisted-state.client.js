import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'vuex',
    paths: [
      'profile.user',
      'profile.currency',
      'profile.trainerRegData',
      'auth',
      'sendBird.connectedChannels',
      'sendBird.tempClient',
      'client.clients',
      'payment-methods',
      'services.services'
    ],
    storage: localStorage
  })(store)
}
