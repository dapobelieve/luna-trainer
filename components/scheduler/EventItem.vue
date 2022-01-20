<template>
  <div>
    <div class="flex items-start">
      <div :class="colors[color]" class="indicator rounded-full mr-2.5 mt-1"></div>
      <div v-if="event && event.when" class="">
        <div class="flex items-center mb-1">
          <div class="inline-flex items-center justify-around text-gray-500 w-32 mr-1">
            <span>{{ formatTime(event.when.startTime, 'K:mm b') }}</span>
            <span>-</span>
            <span>{{ formatTime(event.when.endTime, 'K:mm b') }}</span>
          </div>
          <div class="event-icon inline-flex justify-center items-center rounded-full bg-gray-200">
            <img style="width: 8px" src="~/assets/img/video-camera.svg">
          </div>
        </div>
        <div><span class="text-black text-sm font-medium">{{ event.title }}</span></div>
        <a target="_blank" class="text-blue-500 text-sm" href="https://zoom.us/j/9028594585">https://us02web.zoom.us/j/9028594585</a>
      </div>
    </div>
  </div>
</template>

<script>
import { format, fromUnixTime } from 'date-fns'
export default {
  props: {
    event: {},
    showTitle: {
      type: Boolean,
      default: false
    },
    day: {
      type: String,
      default: 'today'
    }
  },
  data () {
    return {
      colors: {
        blue: 'bg-blue-500',
        teal: 'bg-teal-500',
        amber: 'bg-yellow-500',
        rose: 'bg-red-500',
        sky: 'bg-cyan-500'
      }
    }
  },
  computed: {
    color () {
      return this.event.color || this.event.colorName
    }
  },
  mounted () {
    console.log()
  },
  methods: {
    formatTime (time, formatString = 'KK:mm b') {
      return format(fromUnixTime(time), formatString)
    }
  }
}
</script>

<style lang="scss" scoped>
.event-icon {
  height: 18px;
  width: 18px;
}
.indicator {
  height: 12px;
  width: 12px;
}
</style>
