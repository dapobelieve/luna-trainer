export default function ({ route, $auth, redirect }) {
  if (route.path === '/' && $auth.user.onboard) {
    return redirect('/dashboard')
  } else if ($auth.user && !$auth.user.onboard && route.path !== '/auth/onboarding') {
    return redirect('/auth/onboarding')
  }
}
