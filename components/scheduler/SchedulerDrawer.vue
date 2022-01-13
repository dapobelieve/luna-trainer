<template>
  <div class="bg-white h-full md:w-96 w-full shadow px-3 pt-2 fixed right-0 top-0 z-[11] overflow-y-auto">
    <NewSchedule 
      @back="event={};$emit('active-page', pages.SCHEDULE_DETAILS)" 
      :event="event" v-if="activePage === pages.NEW_SCHEDULE" 
      @close="event={};$emit('close')" 
      @created="$emit('process-event',$event)" />
    
    <ScheduleDetails 
      @reschedule="reschedule"
      @remove-event="$emit('remove-event', $event)" 
      v-if="activePage === pages.SCHEDULE_DETAILS" 
      @close="$emit('close')" />
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
        NEW_SCHEDULE: 'new-schedule',
        SCHEDULE_DETAILS: 'schedule-details'
      }
    }
  },
  methods: {
    reschedule(event) {
      this.$emit('active-page', this.pages.NEW_SCHEDULE)
      this.event = event
    }
  }
}
</script>
