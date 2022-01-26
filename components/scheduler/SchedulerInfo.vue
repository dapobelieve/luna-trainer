<template>
  <div class=" overflow-scroll flex flex-col relative">
    <div class="px-3 mb-4">
      <MiniCalendar @date-clicked="fetchDateEvents" />
    </div>
    <div v-if="loading" class="px-3 flex-grow flex justify-center items-center">
      <SingleLoader height="40px" width="40px" />
    </div>
    <div v-else class="px-3 mt-2">
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
        <EventItem v-for="event in todayAndTomorrowsEvents.slice(0, 3)" :key="event.id" :event="event" class="mb-8" />
      </div>
      <div v-else class="text-gray-500">
        Your schedule is free
      </div>
      <div>
      </div>
    </div>
    <div class="absolute w-full px-1" style="bottom: 10px">
      <div @click="$modal.show('scheduler-connect-calendar')" class="bg-blue-50 px-3 py-3 cursor-pointer items-center flex" style="border-radius: 12px">
        <div class="h-16 w-16 rounded-full bg-white flex items-center justify-center mr-5">
          <i class="fi-rr-calendar text-2xl text-primary-color mt-2"></i>
        </div>
        <h5 class="font-medium text-blue-500">Sync with Calendar</h5>
        <div class="ml-auto ">
          <i class="fi-rr-angle-right text-sm text-primary-color mt-3" style="font-size: 8px"></i>
        </div>
      </div>
    </div>
    <ConnectCalendarModal @close="$modal.hide('scheduler-connect-calendar')" id="" />
  </div>
</template>

<script>
import MiniCalendar from '~/components/scheduler/MiniCalendar'
import EventItem from '~/components/scheduler/EventItem'
import SingleLoader from '~/components/util/SingleLoader'
import ConnectCalendarModal from "~/components/scheduler/ConnectCalendarModal";
export default {
  components: {
    ConnectCalendarModal,
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
