import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'vuex',
    paths: ['authorize', 'auth', 'client', 'qb'],
    storage: localStorage
  })(store)
}
