export default function ({ $auth, redirect, route, store }) {
  // If the user is not authenticated and path is root dir
  if (route.path === '/') {
    return redirect('/dashboard')
  }
}
