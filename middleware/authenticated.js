export default ({ store }) => {
  if (
    store.$auth.loggedIn &&
    (!store.$auth.user ||
      (Object.entries(store.$auth.user).length === 0 &&
        store.$auth.user.constructor === Object))
  ) {
    console.log(store.state.getWelpUser)
    store.$auth.setUser(store.state.getWelpUser)
  }
}
