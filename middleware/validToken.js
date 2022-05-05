export default function ({ $auth, redirect }) {
  // check if the trainer is logged in and the token is valid and the trainer is on any of the auth pages
  const isTokenValid = $auth.strategy.token.status().valid()
  console.log($auth)
  if ($auth.loggedIn && isTokenValid) {
    return redirect('/dashboard')
  }
}
