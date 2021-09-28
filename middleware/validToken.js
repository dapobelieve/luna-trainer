export default function ({ $auth, redirect, route }) {
  // check if the trainner is logged in and the token is valied and the trainer is on any of the auth pages
  const isTokenValid = $auth.strategy.token.status().valid()
  if ($auth.loggedIn && isTokenValid && route.name.substring(0, 4) === 'Auth') {
    return redirect('/dashboard')
  }
}
