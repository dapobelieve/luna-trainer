export default ({ store }) => {
  if (
    store.$auth.loggedIn &&
    (!store.$auth.user ||
      (Object.entries(store.$auth.user).length === 0 &&
        store.$auth.user.constructor === Object))
  ) {
    store.$auth.setUser(store.state.getWelpUser)
  }
}
