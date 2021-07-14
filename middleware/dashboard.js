export default function ({ $auth, redirect }) {
  const isAuthenticated = !!$auth.user.loggedIn
  if (isAuthenticated) {
    redirect({ name: 'Dashboard' })
  } else {
    redirect({ name: 'Auth-SignIn' })
  }
}
