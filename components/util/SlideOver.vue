<template>
  <div v-show="visible" class="tail-fixed tail-inset-0 tail-overflow-hidden tail-z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="tail-absolute tail-inset-0 tail-overflow-hidden">
      <transition
        enter-active-class="tail-ease-in-out tail-duration-500"
        enter-from-class="tail-opacity-0"
        enter-to-class="tail-opacity-100"
        leave-active-class="tail-ease-in tail-duration-500"
        leave-from-class="tail-opacity-100"
        leave-to-class="tail-opacity-0"
      >
        <div v-show="visible" class="tail-absolute tail-inset-0 tail-bg-gray-500 tail-bg-opacity-75 tail-transition-opacity" aria-hidden="true" @click="close"></div>
      </transition>
      <div class="tail-fixed tail-inset-y-0 tail-right-0 tail-pl-10 tail-max-w-full tail-flex">
        <transition
          enter-active-class="tail-transform tail-transition tail-ease-in-out tail-duration-500 sm:tail-duration-700"
          enter-from-class="tail-translate-x-full"
          enter-to-class="tail-translate-x-0"
          leave-active-class="tail-transform tail-transition tail-ease-in-out tail-duration-500 sm:tail-duration-700"
          leave-from-class="tail-translate-x-0"
          leave-to-class="tail-translate-x-full"
        >
          <div v-show="visible" class="tail-w-screen tail-overflow-hidden tail-rounded-l-lg tail-max-w-xs" :class="[visible ? '': '', ]">
            <div class="tail-h-full tail-flex tail-flex-col tail-py-6 tail-bg-white tail-shadow-xl tail-overflow-y-scroll">
              <div class="tail-px-4 sm:tail-px-4">
                <div class="tail-flex tail-items-start tail-justify-between">
                  <h2 class="tail-text--lg tail-font-medium tail-text-gray-900">
                    Messages
                  </h2>
                  <div class="tail-ml-3 tail-h-7 tail-flex tail-items-center">
                    <button class="tail-bg-white rounded-md tail-text-gray-400 hover:tail-text-gray-500 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-indigo-500" @click="close">
                      <span class="tail-sr-only">Close panel</span>
                      <svg
                        class="tail-h-6 tail-w-6"
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
              <div class="tail-mt-2 tail-relative tail-flex-1 tail-px-0 sm:tail-px-0">
                <!-- Replace with your content -->
                <div class="tail-absolute tail-inset-0 tail-px-4 sm:tail-px-0">
                  <div class="tail-h-full" aria-hidden="true">
                    <!-- <div class="gw-body-color tail-flex tail-w-full">
                    <i class="ns-search"></i>
                    <input type="text" class="tail-w-full" placeholder="hi">
                  </div> -->
                    <div>
                      <ul v-if="getTotalUnreadMessages.length">
                        <li
                          v-for="messages in getTotalUnreadMessages"
                          :key="messages._id"
                          class="tail-w-full"
                        >
                          <div class="tail-relative tail-px-4 tail-py-2 tail-flex tail-items-center tail-space-x-3 hover:tail-bg-gray-50 focus-within:tail-ring-2 focus-within:tail-ring-inset focus-within:tail-ring-pink-500">
                            <div class="tail-flex-shrink-0">
                              <img class="tail-h-10 tail-w-10 tail-rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                            </div>
                            <div class="tail-flex-1 tail-min-w-0 tail-mr-auto">
                              <a href="#" class="focus:tail-outline-none">
                                <!-- Extend touch target to entire panel -->
                                <span class="tail-absolute tail-inset-0" aria-hidden="true"></span>
                                <p class="tail-text-xs tail-font-medium tail-text-gray-900">
                                  {{ messages.name }}
                                  <span class="tail-ml-2 tail-text-gray-400">
                                    {{ formatDistance(new Date(messages.created_at), new Date(), { addSuffix: true }) }}
                                  </span>
                                </p>
                                <p class="tail-text-sm tail-text-gray-500">
                                  {{ messages.body ? messages.body : messages.last_message }}
                                </p>
                              </a>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div v-else class="tail-flex tail-flex-col tail-items-center">
                        <div class="tail-w-full tail-mt-5 tail-text-center">
                          <img
                            width="60"
                            class="tail-mb-3 tail-mx-auto"
                            src="~/assets/img/messages.svg"
                            alt="no messages"
                          />
                          <h6 style="color: #12263f" class="">
                            <span class="tail-font-medium tail-text-sm"> No unread messages </span>
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
</template>

<script>
import { formatDistance } from 'date-fns'
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters({
      getTotalUnreadMessages: 'qb/getTotalUnreadMessages'
    })
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
