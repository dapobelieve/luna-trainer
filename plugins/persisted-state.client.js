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
      'onboarding',
      'services.services',
      'sendbird-v2.messages',
      'sendbird-v2.latestMessages',
      'sendbird-v2.unreadMessagesCount'
    ]
  })(store)
}
