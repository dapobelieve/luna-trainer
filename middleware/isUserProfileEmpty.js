export default function ({ $auth, redirect }) {
  // is this user logged in and without a profile
  if (process.client) {
    const tokenValidity = $auth.strategy.token.status().valid()
    if (
      $auth.loggedIn &&
      Object.entries($auth.user).length === 0 &&
      tokenValidity
    ) {
      return redirect('/auth/onboardingprofilesetup')
    }
  }
}
