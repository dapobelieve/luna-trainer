<template>
  <div class="tail-rounded-xl tail-py-3 tail-border tail-border-gray-50 tail-bg-white tail-shadow tail-flex tail-flex-col tail-h-full">
    <div class="tail-w-full tail-h-full tail-mb-auto">
      <!-- header -->
      <div class="tail-w-full tail-flex tail-items-center tail-px-3">
        <div class="tail-mr-auto tail-flex tail-items-center tail-space-x-3">
          <slot name="icon" />
          <h2 class="tail-capitalize tail-text-gray-700 tail-text-sm lg:tail-text-lg">
            <slot name="title" />
          </h2>
        </div>
        <small class="tail-text-gray-500 tail-text-xs lg:tail-text-sm">
          <slot name="notifications" />
        </small>
      </div>
      <!-- end of header -->

      <!-- list area -->
      <div class="tail-my-3">
        <slot name="content" />
      </div>
      <!-- end of list area -->
    </div>

    <!-- bottom button -->
    <div class="tail-mx-0.5">
      <button class="tail-text-sm lg:tail-text-base tail-text-blue-500 tail-w-full hover:tail-bg-blue-50 tail-py-1 tail-rounded-xl">
        <slot name="button">
          View all
        </slot>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SummaryCardWithNotifications'
}
</script>

<style lang="scss" scoped>

</style>
