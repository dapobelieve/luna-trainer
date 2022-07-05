<template>
  <div class="relative">
    <div class="flex text-md font-bold mb-2 pt-4 pb-3 px-4 uppercase rounded-2xl text-blue-500 bg-blue-200">
      <div class="pb-1.5">
        <span>
          Uploading...
        </span>
      </div>
      <div class="text-right">
        <span class="font-semibold inline-block">
          {{ ` ${uploadPercentage}%` }}
        </span>
      </div>
    </div>
    <div class="overflow-hidden h-2 mb-4 flex">
      <div :style="progressBarWidth" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-200"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ProgressBar',
  computed: {
    ...mapGetters({ uploadPercentage: 'sendbird-v2/getUploadedPercentage' }),
    progressBarWidth () {
      return {
        width: this.uploadPercentage + '%'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
