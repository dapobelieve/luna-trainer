<template>
  <div class="flex justify-between">
    <label :key="wkIndex" v-for="(wkObj, wkIndex) in computeWeek" class="inline-flex cursor-pointer w-8 flex-col items-center">
      <h3 class="font-bold mb-4">{{ wkObj.day }}</h3>
      <div :class="[today.getDate() === wkObj.date ? 'isToday' : '']" class="w-8 h-8 inline-flex justify-center items-center">
        <span class="text-gray-500">{{wkObj.date}}</span>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      weekDays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      today: new Date(),
    }
  },
  computed: {
    computeWeek() {
      let that = this
      Date.prototype.getWeek = function() {
        let weekBegins = new Date(this.setDate(this.getDate() - (this.getDay() - 1)))
        return [
          {
            day: that.weekDays[weekBegins.getDay()],
            date: weekBegins.getDate()
          }
        ]
          .concat(
            String(Array(6)).split(',')
              .map (() => {
                let x =new Date(this.setDate(this.getDate()+1))
                return {
                  day: that.weekDays[x.getDay()],
                  date: x.getDate()
                }
              }, this)
          )
      }

      return new Date(Date.now()).getWeek()
    },
  }
}
</script>

<style lang="scss" scoped>
.isToday {
  background-color: #3B82F6;
  @apply text-white  rounded-full;
span {
  color: white !important;
}
}
</style>