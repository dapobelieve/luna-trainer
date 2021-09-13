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
      'client.clients'
    ],
    storage: localStorage
  })(store)
}
