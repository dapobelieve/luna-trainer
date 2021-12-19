<template>
  <div class="px-3">
    <MiniCalendar />
    <div class="mt-2">
      <h3 class="mr-3 font-bold mb-4">Upcoming sessions</h3>
      <div v-if="todaysEvents.length" class="mb-8">
        <div class="flex justify-between mb-4">
          <div class="font-bold">Today</div>
          <div class="date text-gray-400">17/12/2021</div>
        </div>
        <EventItem v-for="event in todaysEvents" :event="event" class="mb-8" />
<!--        <EventItem />-->
      </div>
      <div else class="text-gray-500">
        Your schedule is free
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import MiniCalendar from "~/components/schedule/MiniCalendar";
import EventItem from "~/components/schedule/EventItem";
export default {
  props: ['events', 'activeCalendar'],
  data() {
    return {
      todaysEvents: []
    }
  },
  components: {
    EventItem,
    MiniCalendar
  },
  async mounted() {
    this.todaysEvents = await this.$store.dispatch('schedule/getAllAppointments', {
      calendar: this.activeCalendar.id,
      startDatetime: parseInt(new Date().setHours(0) / 1000),
      endDatetime: parseInt(new Date().setHours(23) / 1000),
    })
  }
}
</script>

<style lang="scss" scoped>

</style>