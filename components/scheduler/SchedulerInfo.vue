<template>
  <div class="px-3 overflow-scroll flex flex-col">
    <div class="mb-4">
      <MiniCalendar @date-clicked="fetchDateEvents" />
    </div>
    <div v-if="loading" class="flex-grow flex justify-center items-center">
      <SingleLoader height="40px" width="40px" />
    </div>
    <div v-else class="mt-2">
      <h3 class="mr-3 font-bold mb-4">
        Upcoming sessions
      </h3>
      <div v-if="todayAndTomorrowsEvents && todayAndTomorrowsEvents.length" class="mb-8">
        <div class="flex justify-between mb-4">
          <div class="font-bold">
            Today
          </div>
          <div class="date text-gray-400">
            17/12/2021
          </div>
        </div>
        <EventItem v-for="event in todayAndTomorrowsEvents" :key="event.id" :event="event" class="mb-8" />
      </div>
      <div v-else class="text-gray-500">
        Your schedule is free
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import MiniCalendar from '~/components/scheduler/MiniCalendar'
import EventItem from '~/components/scheduler/EventItem'
import SingleLoader from '~/components/util/SingleLoader'
export default {
  components: {
    SingleLoader,
    EventItem,
    MiniCalendar
  },
  props: ['events', 'activeCalendar'],
  data () {
    return {
      loading: false,
      todayAndTomorrowsEvents: []
    }
  },
  async mounted () {
    try {
      this.loading = true
      this.todayAndTomorrowsEvents = await this.$store.dispatch('scheduler/getAllAppointments', {
        startDateTime: parseInt(new Date().setUTCHours(0, 0, 0) / 1000),
        endDateTime: parseInt(new Date(new Date().setDate(new Date().getDate() + 1)).setUTCHours(23, 59, 59, 999) / 1000)
      })
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  },
  methods: {
    async fetchDateEvents (dateObj) {
      const { start, end } = dateObj
      try {
        this.loading = true
        this.todayAndTomorrowsEvents = await this.$store.dispatch('scheduler/getAllAppointments', {
          startDateTime: parseInt(Date.parse(start) / 1000),
          endDateTime: parseInt(Date.parse(end) / 1000)
        })
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
