export default function ({ $auth, redirect, route }) {
  // If the user is not authenticated and path is root dir
  if ($auth.loggedIn && route.path === '/') {
    return redirect('/dashboard')
  }
}
