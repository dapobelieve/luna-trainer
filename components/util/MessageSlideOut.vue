<template>
  <div>
    <div v-show="visible" class="fixed inset-0 overflow-hidden z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div class="absolute inset-0 overflow-hidden">
        <transition
          enter-active-class="ease-in-out duration-500"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in duration-500"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-show="visible" class="absolute inset-0 bg-gray-500 bg-opacity-50 transition-opacity" aria-hidden="true" @click="close"></div>
        </transition>
        <div class="fixed inset-0 max-w-full flex">
          <transition
            enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            enter-from-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            leave-from-class="translate-x-0"
            leave-to-class="translate-x-full"
          >
            <div v-show="visible" class="w-screen overflow-hidden rounded max-w-xs pl-28" :class="[visible ? '': '', ]">
              <div class="h-full flex flex-col py-6 bg-white shadow-xl">
                <div class="px-4 sm:px-4">
                  <div class="flex items-start justify-between">
                    <h2 class="text--lg font-medium text-gray-900">
                      Messages
                    </h2>
                    <div class="ml-3 h-7 flex items-center">
                      <button class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="close">
                        <span class="sr-only">Close panel</span>
                        <svg
                          class="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-2 relative flex-1 px-0 sm:px-0">
                  <!-- Replace with your content -->
                  <div class="absolute inset-0 px-4 sm:px-0">
                    <div class="h-full" aria-hidden="true">
                      <div class="mt-1 relative rounded border border-gray-200">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
                          <i class="ns-search mr-3 text-gray-400 flex-shrink-0 text-lg" />
                        </div>
                        <input type="text" name="search" class="bg-gray-100 py-1 focus:border-gray-700 focus:outline-none block w-full pl-9 sm:text-sm border-gray-300" placeholder="Search">
                      </div>
                      <div>
                        <ul v-if="0">
                          <li
                            class="w-full"
                          >
                            <div class="relative px-4 py-2 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                              <div class="flex-shrink-0">
                                <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                              </div>
                              <div class="flex-1 min-w-0 mr-auto">
                                <a href="#" class="focus:outline-none">
                                  <!-- Extend touch target to entire panel -->
                                  <span class="absolute inset-0" aria-hidden="true"></span>
                                  <p class="text-xs font-medium text-gray-900">
                                    Derek Palmer
                                    <span class="ml-2 text-gray-400">
                                      today
                                    </span>
                                  </p>
                                  <p class="text-sm text-gray-500">
                                    hi there
                                  </p>
                                </a>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <div v-else class="flex flex-col items-center">
                          <div class="w-full mt-5 text-center">
                            <img
                              width="60"
                              class="mb-3 mx-auto"
                              src="~/assets/img/messages.svg"
                              alt="no messages"
                            />
                            <h6 style="color: #12263f" class="">
                              <span class="font-medium text-sm"> No unread messages </span>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                <!-- /End replace -->
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDistance } from 'date-fns'
export default {
  name: 'SlideOver',

  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formatDistance,
      visible: false
    }
  },
  watch: {
    show (newValue, oldValue) {
      if (newValue) {
        this.visible = newValue
      }
    }
  },
  methods: {
    close () {
      this.visible = !this.visible
      this.$emit('close', false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
