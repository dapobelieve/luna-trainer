<template>
  <div>
    <skip v-if="skip" />
    <modal name="welcome-modal" :height="470" :width="500" @closed="exitTour();skip=false">
      <div>
        <div class="space" />
        <div class="grid m-6">
          <div class="py-0 text-justify">
            <div class="text-left mb-5 font-light text-2xl">
              <h3>Welcome to Luna</h3>
            </div>
            <p class="mb-8 w-50 text-justify">
              Start the tour to discover how easy it is to do everything in Luna with -
              tips and tricks on how to save yourself time on basic
              business admin, so you can focus on doing what you love.
            </p>
            <div class="flex justify-left gap-5">
              <button class="bg-blue-500 py-2 px-4 text-white" style="width:fit-content" @click="takeTour();skip=true">
                Start the tour
              </button>
              <button class="bg-white-500 py-2 px-4 text-blue-500" style="width:fit-content" @click="exitTour();skip=false">
                Explore by myself
              </button>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Skip from './Skip.vue'
export default {
  components: { Skip },
  props: {
    exitTour: Function,
    takeTour: Function
  },
  data () {
    return {
      skip: false
    }
  }
}
</script>
