<template>
  <div
    v-if="value"
    :style="{ height: resizeHeight, top: resizeTop }"
    :class="[
      'fixed w-full lg:left-64 left-0 z-10 bg-gray-50 bg-opacity-95']"
  >
    <div
      class="relative p-0 sm:p-3 h-full flex justify-center lg:justify-start"
    >
      <transition
        enter="ease-out duration-300"
        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leave-from="opacity-100 translate-y-0 sm:scale-100"
        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          class="sm:border border-none bg-white rounded-none sm:rounded-xl overflow-y-auto shadow-xl sm:max-w-md lg:max-w-sm w-full h-full"
        >
          <div
            class="opacity-50 w-full h-full absolute left-0 top-0 -z-10"
            @click="$emit('input', false)"
          ></div>

          <div class="sticky top-0">
            <div class="flex justify-between items-center bg-white p-4">
              <slot name="title" />
              <div
                class="hover:bg-blue-50 h-8 w-8 flex items-center justify-center rounded-full"
              >
                <i class="ns-cross text-blue-500" role="button" @click="$emit('input', false)"></i>
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
