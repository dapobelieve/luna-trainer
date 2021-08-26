export default async function ({ $auth, $axios, redirect, store, $toast, route }) {
  const isTokenExpired = $auth.strategy.token.status().expired()
  const tokenUnknown = $auth.strategy.token.status().unknown()
  const isTokenValid = $auth.strategy.token.status().valid()
  const isEmpty = Object.entries($auth.user).length === 0
  if (isTokenValid && !isEmpty && route.name.substring(0, 4) === 'Auth') {
    return redirect('/dashboard')
  } else if (isTokenExpired) {
    try {
      const token = $auth.strategy.token.get()
      const refreshToken = $auth.strategy.refreshToken.get()
      const response = await $axios.patch(
        `${process.env.ACCOUNT_HOST_URL}/auth/renew-token`,
        {
          access_token: token,
          refresh_token: refreshToken
        }
      )
      $auth.setUserToken(
        response.data.message.access_token,
        response.data.message.refresh_token
      )
    } catch (error) {
      $toast.error('Kindly Re-login', {
        position: 'bottom-right'
      })
      store.dispatch('authorize/logOut')
    }
  } else if (tokenUnknown || !isTokenValid) {
    $auth.strategy.token.reset()
    $toast.error('Kindly Re-login', {
      position: 'bottom-right'
    })
    return redirect('/Auth/SignIn')
  }
}
