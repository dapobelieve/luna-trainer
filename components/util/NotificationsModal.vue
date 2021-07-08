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
            <!-- <div class="tail-flex tail-items-center">
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
            </div> -->
            <div class="tail-flex tail-items-start">
              <div class="tail-flex-shrink-0">
                <slot name="icon">
                  <svg class="tail-h-6 tail-w-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="orange" aria-hidden="true">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </slot>
              </div>
              <div class="tail-ml-3 tail-w-0 tail-flex-1 tail-pt-0.5">
                <p class="tail-text-sm tail-font-medium tail-text-gray-900">
                  <slot name="title">
                    Notification Topic
                  </slot>
                </p>
                <p class="tail-mt-1 tail-text-sm tail-text-gray-500">
                  <slot name="subtitle">
                    Sub information about topic
                  </slot>
                </p>
                <div class="tail-mt-3 tail-flex tail-space-x-7">
                  <slot name="actionButtons">
                    <button class="tail-bg-white tail-rounded-md tail-text-sm tail-font-medium tail-text-indigo-600 hover:tail-text-indigo-500 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-indigo-500">
                      Accept
                    </button>
                    <button class="tail-bg-white tail-rounded-md tail-text-sm tail-font-medium tail-text-gray-700 hover:tail-text-gray-500 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-indigo-500" @click="show = false">
                      Dismiss
                    </button>
                  </slot>
                </div>
              </div>
              <div class="tail-ml-4 tail-flex-shrink-0 tail-flex">
                <button class="tail-bg-white tail-rounded-md tail-inline-flex tail-text-gray-400 hover:tail-text-gray-500 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-indigo-500" @click="show = false">
                  <span class="tail-sr-only">Close</span>
                  <svg class="tail-h-5 tail-w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
  name: 'NotificationsModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: true
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
