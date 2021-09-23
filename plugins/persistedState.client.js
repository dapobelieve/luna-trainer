import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'vuex',
    paths: [
      'profile.getWelpUser',
      'profile.trainnerRegData',
      'auth',
      'sendBird.connectedChannels',
      'sendBird.tempClient',
      'client.clients',
      'userPreferrences'
    ],
    storage: localStorage
  })(store)
}
