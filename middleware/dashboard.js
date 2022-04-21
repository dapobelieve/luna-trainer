import lunaDB from '~/utils/DB'
export default async function (ctx) {
  try {
    const userSessions = await lunaDB.getItem(`user:${ctx.$auth.$state.user.userId}:sessions`)
    if (userSessions) {
      const calendar = await lunaDB.getItem(`user:${ctx.$auth.$state.user.userId}:calendar`)
      ctx.app.store.commit('scheduler/setEvents', userSessions)
      ctx.app.store.commit('scheduler/setStates', { calendar })
    } else {
      const [calendarRes = null] = await ctx.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar`)

      if (calendarRes) {
        ctx.app.store.commit('scheduler/setStates', { calendar: calendarRes })
        await lunaDB.setItem(`user:${ctx.$auth.$state.user.userId}:calendar`, calendarRes)
        const startDate = parseInt(new Date(new Date().setFullYear(new Date().getFullYear() - 1)).setHours(0) / 1000)
        const endDate = parseInt(new Date(new Date().setFullYear(new Date().getFullYear() + 2)).setHours(0) / 1000)

        const sessions = await ctx.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar/${calendarRes.id}/appointment?startDatetime=${startDate}&endDatetime=${endDate}`)
        await lunaDB.setItem(`user:${ctx.$auth.$state.user.userId}:sessions`, sessions)
        ctx.app.store.commit('scheduler/setEvents', sessions)
      }
    }
  } catch (e) {
    console.log(e)
  }

  if (ctx.route.path === '/') {
    return ctx.redirect('/dashboard')
  }
}
