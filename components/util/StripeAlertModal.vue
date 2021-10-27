<template>
  <div aria-live="assertive" class="fixed inset-0 z-50 flex items-end px-4 pb-6 pt-20 pointer-events-none sm:px-2 sm:items-start border border-gray-400">
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="show" class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div class="p-4">
            <div class="flex items-center">
              <div class="w-0 flex-1 flex justify-between">
                <p class="w-0 flex-1 text-sm font-medium text-gray-900">
                  Please add a service to continue
                </p>
                <button class="underline ml-3 flex-shrink-0 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="$router.push({ path: '/Settings#services' })">
                  Services
                </button>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="close">
                  <span class="sr-only">Close</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
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
  name: 'StripeAlertModal',
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
