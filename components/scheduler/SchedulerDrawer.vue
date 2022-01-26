<template>
  <div class="drawer bg-white h-full md:w-96 w-full shadow px-3 pt-2 fixed right-0 top-0 z-[11] overflow-y-auto">
    <NewSchedule
      v-if="activePage === pages.NEW_SCHEDULE"
      :event="event"
      @back="event={};$emit('active-page', pages.SCHEDULE_DETAILS)"
      @close="event={};$emit('close')"
      @updated="$emit('process-event',$event)"
      @created="$emit('process-event',$event)"
      @recurring="$emit('recurring')"
    />

    <ScheduleDetails
      v-if="activePage === pages.SCHEDULE_DETAILS"
      @reschedule="reschedule"
      @remove-event="$emit('remove-event', $event)"
      @close="$emit('close')"
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
    reschedule (event) {
      this.$emit('active-page', this.pages.NEW_SCHEDULE)
      this.event = event
    }
  }
}
</script>
<style lang="scss">

</style>
