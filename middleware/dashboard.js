export default function (ctx) {
  if (ctx.route.path === '/') {
    return ctx.redirect('/dashboard')
  }
}
