<template>
  <async-view>
    <div
      class="rounded-lg p-4 bg-white parent-container"
      style="min-height: calc(100vh - 96px)"
    >
      <h3 class="text-xl font-normal text-gray-700 mb-8">
        Calendar
      </h3>
      <div>
        <div class="flex mb-6">
          <div>
            <h6 class="text-lg font-medium">
              GoLuna
            </h6>
            <span class="text-gray-500 text-sm">{{ $auth.user.email }}</span>
          </div>
          <div class="ml-auto flex items-center">
            <span class="bg-blue-50 px-2 py-1 rounded-full text-sm text-cyan-400 mr-4">Default</span>
            <!-- <CalendarActions /> -->
          </div>
        </div>
        <!-- <SchedulerSyncCalendarItem provider="google" @connect="connectToCalendar">
          <template v-slot:content>
            <div>
              <h6 class="text-lg font-medium flex">
                Sync with <img alt="google logo" class="ml-2 mt-0.5" src="~/assets/img/google.svg">
              </h6>
              <span class="text-gray-500 text-sm">Brief description about this feature</span>
            </div>
          </template>
        </SchedulerSyncCalendarItem> -->
      </div>
    </div>
  </async-view>
</template>

<script>
import SchedulerSyncCalendarItem from '~/components/scheduler/SchedulerSyncCalendarItem'
import CalendarActions from '~/components/scheduler/CalendarActions'

export default {
  name: 'Calendar',
  components: { CalendarActions, SchedulerSyncCalendarItem },
  data () {
    return {
    }
  },
  computed: {},
  methods: {
    connectToCalendar (provider) {
      window.location = new URL(`${process.env.SCHEDULER_HOST}/calendar/connect/${provider}/?userId=${this.$auth.user.userId}&timezone=Africa/Lagos`)
    }
  }
}
</script>

<style lang="scss" scoped></style>
