import lunaDB from '~/utils/DB'
export default async function (ctx) {
  let userCalendar = await lunaDB.getItem('calendar')
  if (!userCalendar) {
    ctx.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar/connect/local?timezone=Africa/Lagos`)
      .then((res) => {
        const [calendar] = res
        ctx.app.store.commit('scheduler/setCalendar', calendar)
        userCalendar = calendar
      })
      .catch(async (err) => {
        const [calendar = null] = await ctx.$axios.$get(`${process.env.SCHEDULER_HOST}/calendar`)
        await ctx.app.store.commit('scheduler/setCalendar', calendar)
        console.log(err)
      })
  }
  await ctx.app.store.commit('scheduler/setCalendar', userCalendar)
  
  setTimeout(async () => {
    const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0)
    await ctx.app.store.dispatch('scheduler/getAllAppointments', {
      startDate: start,
      endDate: end
    })
  }, 1000)
}
