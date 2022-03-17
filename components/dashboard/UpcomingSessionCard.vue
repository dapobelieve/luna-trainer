<template>
  <nuxt-link :to="{name: 'schedule-events-id', params: {id: event.id }}" class="session-card flex justify-between cursor-pointer">
    <div class="bar h-auto w-[3px] rounded-xl" :class="[`bg-${color}-500`]"></div>
    <div class="px-4 py-5 flex-grow rounded-2xl flex items-center rounded-xl lg:ml-2" :class="[`bg-${color}-50`]">
      <div class="mr-3">
        <ClientAvatar :client-info="event.participants[0]" />
      </div>
      <div class="flex flex-col">
        <h3 class="font-bold">
          {{ event.title }}
        </h3>
        <small class="text-sm">{{ formatTime(event.when.startTime, 'K:mm') }} - {{ formatTime(event.when.endTime, 'K:mm b') }}</small>
        <span class="text-gray-400 text-sm">Remote</span>
      </div>
      <div class="ml-auto">
        <i class="fi-rr-angle-small-right"></i>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { format, fromUnixTime } from 'date-fns'

export default {
  props: {
    event: {
      type: Object
    },
    color: {
      type: String,
      default: 'pink'
    }
  },
  methods: {
    formatTime (time, formatString = 'KK:mm b') {
      return format(fromUnixTime(time), formatString)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep {
  .mr-3 {
    img {}
  }
}
</style>
