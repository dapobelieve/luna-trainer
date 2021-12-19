<template>
  <div>
    <div class="flex items-start">
      <div :class="indicators[day]" class="indicator rounded-full mr-2.5 mt-1"></div>
      <div class="">
        <div class="flex items-center mb-1">
          <div class="inline-flex items-center justify-around text-gray-500 w-32 mr-1">
            <span>8:30</span>
            <span>-</span>
            <span>8:30 AM</span>
          </div>
          <div class="event-icon inline-flex justify-center items-center rounded-full bg-gray-200">
            <img style="width: 8px" src="~/assets/img/video-camera.svg">
          </div>
        </div>
        <div><span class="text-black text-sm font-medium">{{ event.title }}</span></div>
<!--        <a target="_blank" class="text-blue-500 text-sm" href="https://zoom.us/i/1983475281">https://zoom.us/i/1983475281</a>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {},
    day: {
      type: String,
      default: 'today'
    }
  },
  data() {
    return {
      indicators: {
        'today': 'bg-blue-500',
        'tomorrow': 'bg-yellow-400'
      }
    }
  },
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