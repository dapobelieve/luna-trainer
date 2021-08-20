export default function ({ $auth, redirect, route }) {
  // If the user is not authenticated and path is root dir
  if ($auth.loggedIn && route.path === '/') {
    return redirect('/dashboard')
  } else if (
    $auth.loggedIn &&
    Object.keys($auth.user).length === 0 &&
    $auth.user.constructor === Object && route.path === '/dashboard'
  ) {
    return redirect('/Auth/ProfileSetup')
  }
}
