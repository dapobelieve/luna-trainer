export default ({ app }) => {
  app.router.afterEach((to, from) => {
    const { name } = to
    if (name === 'Client-id-Messages') {
      window &&
         window.Intercom('update', {
           hide_default_launcher: true
         })
      window && window.Intercom('hide')
    } else {
      window &&
         window.Intercom('update', {
           hide_default_launcher: false
         })
    }
  })
}
