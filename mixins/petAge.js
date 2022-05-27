export default {
  computed: {
    petAge: {
      set (value) {
        this.clientInfo.pet[0].age = value
      },
      get () {
        return new Date(this.clientInfo.pet[0].age)
      }
    },
    showDate () {
      const userDate = new Date(this.clientInfo.pet[0].age)
      const currentDate = new Date()
      const days = Math.floor(
        (Date.UTC(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        ) -
          Date.UTC(
            userDate.getFullYear(),
            userDate.getMonth(),
            userDate.getDate()
          )) /
          (1000 * 60 * 60 * 24)
      )
      const weeks = Math.floor(days / 7)
      const months = Math.floor(weeks / 4)
      const calcWeeks = weeks % 4
      const calcYears = months > 12 ? Math.floor(months / 12) : 0
      const calcMonths = calcYears >= 1 ? months % 12 : months
      let dogAge = ''
      if (calcYears < 1 && calcMonths >= 1) {
        dogAge = `${calcWeeks} week(s) and ${calcMonths} month(s)`
      } else if (calcYears < 1 && calcMonths < 1) {
        dogAge = `${calcWeeks} week(s)`
      } else {
        dogAge = `${calcWeeks} week(s), ${calcMonths} month(s) and ${calcYears} year(s)`
      }
      return dogAge
    }
  }
}
