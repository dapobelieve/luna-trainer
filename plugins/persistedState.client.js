import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'vuex',
    paths: [
      'qb.qbUser',
      'authorize.getWelpUser',
      'auth',
      'client.allClients',
      'client.acceptedClients',
      'client.invitedClients',
      'qb.messageDialogs',
      'qb.latestChatEntry'
    ],
    storage: localStorage
  })(store)
}
