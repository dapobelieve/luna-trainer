import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'vuex',
    paths: ['auth', 'client', 'qb.qbUser'],
    storage: localStorage
  })(store)
}
