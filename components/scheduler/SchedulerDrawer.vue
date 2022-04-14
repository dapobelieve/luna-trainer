<template>
  <div class="drawer bg-white h-full md:w-96 w-full shadow fixed right-0 top-0 z-[11] overflow-y-auto">
    <NewSchedule
      v-if="activePage === pages.NEW_SCHEDULE"
      :event="event"
      @back="event={};$emit('active-page', pages.SCHEDULE_DETAILS)"
      @close="event={};closeDrawer()"
      @recurring="$emit('recurring')"
    />

    <ScheduleDetails
      v-if="activePage === pages.SCHEDULE_DETAILS"
      @reschedule="reschedule"
      @remove-event="$emit('remove-event', $event)"
      @close="closeDrawer"
    />
  </div>
</template>
<script>
import NewSchedule from '~/components/scheduler/NewSchedule'
import ScheduleDetails from '~/components/scheduler/ScheduleDetails'
export default {
  components: {
    ScheduleDetails,
    NewSchedule
  },
  model: {
    prop: 'activePage',
    event: 'active-page'
  },
  props: {
    activePage: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      event: {},
      pages: {
        NEW_SCHEDULE: 'new-session',
        SCHEDULE_DETAILS: 'schedule-details'
      }
    }
  },
  methods: {
    closeDrawer () {
      this.$store.commit('scheduler/setStates', { drawer: { open: false, activePage: '' } })
    },
    async reschedule (event) {
      this.event = event
      await this.$store.commit('scheduler/setStates', { drawer: { open: true, activePage: this.pages.NEW_SCHEDULE } })
    }
  }
}
</script>
<style lang="scss">

</style>
