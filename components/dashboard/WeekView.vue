<template>
  <div class="flex justify-between">
    <label v-for="(wkObj, wkIndex) in computeWeek" :key="wkIndex" class="inline-flex cursor-pointer w-8 flex-col items-center" @click="selectDate(wkObj)">
      <h3 class="font-bold mb-4">{{ wkObj.day }}</h3>
      <div
        :class="[today.getDate() === wkObj.date ? 'isToday' : '', selectedDate === wkObj._date ? 'selectedDay' : '']"
        class="w-8 h-8 inline-flex justify-center items-center"
      >
        <span class="text-gray-500">{{ wkObj.date }}</span>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    fetchEvents: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedDate: null,
      weekDays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      today: new Date()
    }
  },
  computed: {
    computeWeek () {
      const that = this
      // eslint-disable-next-line no-extend-native
      Date.prototype.getWeek = function () {
        const weekBegins = new Date(this.setDate(this.getDate() - this.getDay()))
        return [{ day: that.weekDays[weekBegins.getDay()], _date: weekBegins, date: weekBegins.getDate() }]
          .concat(
            String(Array(6)).split(',')
              .map(() => {
                const x = new Date(this.setDate(this.getDate() + 1))
                return { day: that.weekDays[x.getDay()], _date: x, date: x.getDate() }
              }, this)
          )
      }
      return new Date(Date.now()).getWeek()
    }
  },
  watch: {
    fetchEvents: {
      immediate: true,
      async handler () {
        const startDateTime = new Date(this.today.setHours(0, 0)) / 1000
        const endDateTime = new Date(this.today.setHours(23, 59)) / 1000
        await this.fetchSessions({ startDateTime, endDateTime })
      }
    },
    selectedDate: {
      async handler (val) {
        const date = val
        const startDateTime = new Date(date.setHours(0, 0)) / 1000
        const endDateTime = new Date(date.setHours(23, 59)) / 1000
        await this.fetchSessions({ startDateTime, endDateTime })
      }
    }
  },
  methods: {
    selectDate (wkObj) {
      if (new Date().getDate() <= wkObj._date.getDate()) {
        this.selectedDate = wkObj._date
      }
    },
    async fetchSessions (data) {
      this.$emit('fetching-events')
      const res = await this.$store.dispatch('scheduler/getAllAppointments', { ...data })
      this.$emit('stop-fetching-events')
      this.$emit('events', res.slice(0, 2))
    }
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

.selectedDay {
  background-color: rgba(59, 130, 246, 0.55);
  @apply text-white  rounded-full;
  span {
    color: white !important;
  }
}
</style>
