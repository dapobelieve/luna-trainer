<template>
 <div v-if="value" class="tail-absolute tail-top-0 tail-w-screen tail-z-30" style="left:100%;">
    <div class="tail-flex tail-position-relative tail-min-h-screen tail-pt-4 tail-px-4 tail-pb-20 sm:tail-block sm:p-0">
      <transition
        enter="tail-ease-out tail-duration-300"
        enter-from="tail-opacity-0 tail-translate-y-4 sm:tail-translate-y-0 sm:tail-scale-95"
        enter-to="tail-opacity-100 tail-translate-y-0 sm:tail-scale-100"
        leave="tail-ease-in tail-duration-200"
        leave-from="tail-opacity-100 tail-translate-y-0 sm:tail-scale-100"
        leave-to="tail-opacity-0 tail-translate-y-4 sm:tail-translate-y-0 sm:tail-scale-95"
      >
        <div>
          <div class="tail-opacity-50 tail-w-full tail-h-full tail-absolute tail-left-0 tail-top-0 tail-bg-gray-600 tail-z-0" @click="$emit('input',false)"></div>
          <div class="tail-inline-block tail-align-bottom tail-bg-white tail-rounded-lg tail-text-left tail-z-10 tail-overflow-hidden tail-shadow-xl tail-transform tail-transition-all tail-w-64">
            <slot/>
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
  }
}
</script>
