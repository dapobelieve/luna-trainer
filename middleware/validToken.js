export default function ({ $auth, redirect }) {
  // check if the trainner is logged in and the token is valied and the trainer is on any of the auth pages
  const isTokenValid = $auth.strategy.token.status().valid()
  if ($auth.loggedIn && isTokenValid) {
    return redirect('/dashboard')
  }
}
