<template>
  <modal
    name="scheduler-connect-calendar"
    class="p-0"
    :width="532"
    :click-to-close="false"
    height="auto"
    :adaptive="true"
  >
    <div class="grid m-6">
      <div class="py-0">
        <div class="flex justify-between mb-2 font-medium text-2xl mb-16">
          <h3>Sync with calendar</h3>
          <div>
            <i class="fi-rr-cross cursor-pointer text-primary-color text-xl" @click="$emit('close')"></i>
          </div>
        </div>
        <div>
          <div class="flex mb-6">
            <div>
              <h6 class="text-lg font-medium">
                GetWelp
              </h6>
              <span class="text-gray-500 text-sm">{{ $auth.user.email }}</span>
            </div>
            <div class="ml-auto">
              <span class="bg-blue-50 px-2 py-1 rounded-full text-sm text-cyan-400">Default</span>
            </div>
          </div>
          <SchedulerSyncCalendarItem provider="google" @connect="connectToCalendar">
            <template v-slot:content>
              <div>
                <h6 class="text-lg font-medium flex">
                  Sync with <img alt="google logo" class="ml-2 mt-0.5" src="~/assets/img/google.svg">
                </h6>
                <span class="text-gray-500 text-sm">
                  Connect with your google account and all your events will be visible in your GetWelp calendar.
                </span>
              </div>
            </template>
          </SchedulerSyncCalendarItem>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import SchedulerSyncCalendarItem from '~/components/scheduler/SchedulerSyncCalendarItem'
export default {
  components: { SchedulerSyncCalendarItem },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    connectToCalendar (provider) {
      window.location = new URL(`${process.env.SCHEDULER_HOST}/calendar/connect/${provider}/?userId=${this.$auth.user.userId}&timezone=Africa/Lagos`)
    }
  }
}
</script>

<style scoped>

</style>
