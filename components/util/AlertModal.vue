<template>
  <div aria-live="assertive" class="tail-fixed tail-inset-0 tail-z-50 tail-flex tail-items-end tail-px-4 tail-pb-6 tail-pt-20 tail-pointer-events-none sm:tail-px-2 sm:tail-items-start tail-border tail-border-gray-400">
    <div class="tail-w-full tail-flex tail-flex-col tail-items-center tail-space-y-4 sm:tail-items-end">
      <transition
        enter-active-class="tail-transform tail-ease-out tail-duration-300 tail-transition"
        enter-from-class="tail-translate-y-2 tail-opacity-0 sm:tail-translate-y-0 sm:tail-translate-x-2"
        enter-to-class="tail-translate-y-0 tail-opacity-100 sm:tail-translate-x-0"
        leave-active-class="tail-transition tail-ease-in tail-duration-100"
        leave-from-class="tail-opacity-100"
        leave-to-class="tail-opacity-0"
      >
        <div v-if="show" class="tail-max-w-sm tail-w-full tail-bg-white tail-shadow-lg tail-rounded-lg tail-pointer-events-auto tail-ring-1 tail-ring-black tail-ring-opacity-5 tail-overflow-hidden">
          <div class="tail-p-4">
            <div class="tail-flex tail-items-center">
              <div class="tail-w-0 tail-flex-1 tail-flex tail-justify-between">
                <p class="tail-w-0 tail-flex-1 tail-text-sm tail-font-medium tail-text-gray-900">
                  Please add a service to continue
                </p>
                <button @click="$router.push({ path: '/Settings#services' })" class="tail-underline tail-ml-3 tail-flex-shrink-0 tail-bg-white tail-rounded-md tail-text-sm tail-font-medium tail-text-indigo-600 hover:tail-text-indigo-500 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-indigo-500">
                  Services
                </button>
              </div>
              <div class="tail-ml-4 tail-flex-shrink-0 tail-flex">
                <button class="tail-bg-white tail-rounded-md tail-inline-flex tail-text-gray-400 hover:tail-text-gray-500 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-indigo-500" @click="close">
                  <span class="tail-sr-only">Close</span>
                  <svg class="tail-h-5 tail-w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clitail-p-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    visible (newValue) {
      if (newValue) {
        this.show = true
      }
    }
  },
  methods: {
    close () {
      this.$emit('close', false)
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
