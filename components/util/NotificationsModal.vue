<template>
  <div aria-live="assertive" class="fixed inset-0 z-50 flex items-end px-4 pb-6 pt-5 pointer-events-none sm:px-2 sm:items-start border border-gray-400">
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
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <slot name="icon">
                  <svg class="h-6 w-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="orange" aria-hidden="true">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </slot>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  <slot name="title">
                    Notification Topic
                  </slot>
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  <slot name="subtitle">
                    Sub information about topic
                  </slot>
                </p>
                <div class="mt-3 flex space-x-7">
                  <slot name="actionButtons">
                    <button class="bg-white rounded-md text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="close">
                      Dismiss
                    </button>
                  </slot>
                </div>
              </div>
              <slot name="defaultClose" />
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
      show: false
    }
  },
  watch: {
    visible (newValue) {
      this.show = newValue
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
