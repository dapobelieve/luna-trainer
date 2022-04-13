import hotJar from "../utils/hotjar-track";
export default function ({ redirect, route, $auth }) {
  // If the user is not authenticated and path is root dir
  // console.log($auth.state.user)
  const track = hotJar;
  if (route.path === "/") {
    return redirect("/dashboard");
  }
}
