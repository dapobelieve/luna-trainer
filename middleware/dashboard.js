export default function ({ $auth, redirect, route, store }) {
  // If the user is not authenticated and path is root dir
  if (process.client) {
    const isEmpty = Object.entries($auth.user).length === 0
    const isTokenValid = $auth.strategy.token.status().valid()
    if (route.path === '/') {
      return redirect('/dashboard')
    } else if ($auth.loggedIn && isEmpty && isTokenValid) {
      return redirect('/Auth/ProfileSetup')
    }
  }
}
