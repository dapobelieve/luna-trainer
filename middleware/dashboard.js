export default async function (ctx) {
  if (ctx.route.path === '/') {
    return ctx.redirect('/dashboard')
  }
}