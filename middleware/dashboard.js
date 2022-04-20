export default function ({ redirect, route, $auth }) {
  // If the user is not authenticated and path is root dir
  // console.log($auth.state.user)
  console.log('middleware here')
  if (route.path === "/") {
    return redirect("/dashboard");
  }
}
