<template>
  <div>
    <h6 class="text-xs uppercase font-bold tracking-normal mb-4">
      Meeting type
    </h6>
    <div>
      <div class="flex justify-between mb-3">
        <Checkbox v-model="conference.type" class="mr-3" value="remote" label="Remote"></Checkbox>
        <Checkbox v-model="conference.type" label="On-site" value="onsite"></Checkbox>
      </div>
      <div class="flex items-center relative">
        <i class="fi-rr-video-camera text-gray-700 text-lg mr-2"></i>
        <div class="relative w-full">
          <input type="text" :readonly="readonly" class="h-9 focus:outline-none w-full focus:bg-white" placeholder="Conferencing" @focus="selectOptions = true">
        </div>
        <div v-if="selectOptions" class="absolute  border z-50 bg-white w-full rounded-lg" style="top: 3rem">
          <div class="py-2">
            <div class="flex items-center py-3 px-4 cursor-pointer">
              <img alt="" src="~/assets/img/google-meet.svg" class="mr-5">
              <h4>Google Meet</h4>
              <button class="ml-auto px-3 py-2 text-primary-color border rounded-lg text-sm">
                Connect
              </button>
            </div>
            <div class="flex items-center py-3 px-4 cursor-pointer">
              <img alt="" style="width: 21px" src="~/assets/img/zoom.svg" class="mr-5">
              <h4>Zoom</h4>
              <button class="ml-auto px-3 py-2 text-primary-color border rounded-lg text-sm">
                Connect
              </button>
            </div>
            <div class="flex items-center py-3 px-4 cursor-pointer" @click="readonly=false; selectOptions = false">
              <i class="fi-rr-video-camera text-gray-700 text-lg mr-5"></i>
              <h4>Custom Conferencing</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from '~/components/conference/checkbox'
export default {
  components: { Checkbox },
  data () {
    return {
      readonly: true,
      conference: {
        type: 'remote'
      },
      selectOptions: false
    }
  },
  watch: {
    "conference.type": {
      deep: true,
      handler(newVal) {
        console.log(newVal)
      }
    }
  },
}
</script>

<style scoped>

</style>
