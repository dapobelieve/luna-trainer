<template>
  <div
    v-if="value"
    :class="[
      'tail-absolute',
      'tail-top-0',
      'tail-z-30',
      'tail-w-screen'
    ]"
    style="left:100%"
  >
    <div
      class="tail-flex tail-position-relative tail-min-h-screen tail-pt-4 tail-px-4 tail-pb-20 sm:tail-block sm:p-0"
    >
      <transition
        enter="tail-ease-out tail-duration-300"
        enter-from="tail-opacity-0 tail-translate-y-4 sm:tail-translate-y-0 sm:tail-scale-95"
        enter-to="tail-opacity-100 tail-translate-y-0 sm:tail-scale-100"
        leave="tail-ease-in tail-duration-200"
        leave-from="tail-opacity-100 tail-translate-y-0 sm:tail-scale-100"
        leave-to="tail-opacity-0 tail-translate-y-4 sm:tail-translate-y-0 sm:tail-scale-95"
      >
        <div>
          <div
            class="tail-opacity-50 tail-w-full tail-h-full tail-absolute tail-left-0 tail-top-0 tail-z-0"
            @click="$emit('input', false)"
          ></div>
          <div
            :class="[$route.name !== 'Dashboard' ? 'tail-pt-16' : '',]"
            class="tail-inline-block tail-relative tail-align-bottom tail-bg-white tail-rounded-lg tail-text-left tail-z-10 tail-overflow-y-auto tail-shadow-xl tail-transform tail-transition-all tail-w-96"
            :style="{height: getHeight}"
          >
            <div class="tail-sticky tail-top-0">
              <div class="tail-flex tail-justify-between tail-items-center tail-p-5 tail-bg-white">
                <slot name="title" />
                <i
                  class="ns-cross"
                  role="button"
                  @click="$emit('input', false)"
                ></i>
              </div>
              <slot name="search" />
            </div>
            <slot name="body" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationSubMenu',
  props: {
    value: Boolean
  },
  computed: {
    getHeight () {
      return this.$route.name !== 'Dashboard' ? '80vh' : '90vh'
    }
  }
}
</script>
