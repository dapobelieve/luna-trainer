<template>
  <div
    v-if="value"
    :style="{ height: resizeHeight, top: resizeTop }"
    :class="[
      'tail-fixed tail-w-full lg:tail-left-64 tail-left-0 tail-z-10 tail-bg-gray-50 tail-bg-opacity-95']"
  >
    <div
      class="tail-relative tail-p-0 sm:tail-p-3 tail-h-full tail-flex tail-justify-center lg:tail-justify-start"
    >
      <transition
        enter="tail-ease-out tail-duration-300"
        enter-from="tail-opacity-0 tail-translate-y-4 sm:tail-translate-y-0 sm:tail-scale-95"
        enter-to="tail-opacity-100 tail-translate-y-0 sm:tail-scale-100"
        leave="tail-ease-in tail-duration-200"
        leave-from="tail-opacity-100 tail-translate-y-0 sm:tail-scale-100"
        leave-to="tail-opacity-0 tail-translate-y-4 sm:tail-translate-y-0 sm:tail-scale-95"
      >
        <div
          class="sm:tail-border tail-border-none tail-bg-white tail-rounded-none sm:tail-rounded-xl tail-overflow-y-auto tail-shadow-xl sm:tail-max-w-md lg:tail-max-w-sm tail-w-full tail-h-full"
        >
          <div
            class="tail-opacity-50 tail-w-full tail-h-full tail-absolute tail-left-0 tail-top-0 tail--z-10"
            @click="$emit('input', false)"
          ></div>

          <div class="tail-sticky tail-top-0">
            <div class="tail-flex tail-justify-between tail-items-center tail-bg-white tail-p-4">
              <slot name="title" />
              <div
                class="hover:tail-bg-blue-50 tail-h-8 tail-w-8 tail-flex tail-items-center tail-justify-center tail-rounded-full"
              >
                <i class="ns-cross tail-text-blue-500" role="button" @click="$emit('input', false)"></i>
              </div>
            </div>
            <slot name="search" />
          </div>
          <slot name="body" />
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
    resizeHeight () {
      if (this.$route.name !== 'Dashboard') {
        return 'calc(100vh - 52px)'
      }
      return '100vh'
    },
    resizeTop () {
      if (this.$route.name !== 'Dashboard') {
        return '3rem'
      }
      return '0'
    }
  }

}
</script>
