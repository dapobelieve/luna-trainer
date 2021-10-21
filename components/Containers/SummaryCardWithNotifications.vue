<template>
  <div
    class="tail-rounded-xl tail-border tail-bg-white tail-flex tail-flex-col tail-min-h-0 md:tail-min-h-[20rem] tail-h-full"
  >
    <div class="tail-w-full tail-h-full tail-mb-auto">
      <!-- header -->
      <div class="tail-w-full tail-flex tail-items-center tail-p-4">
        <div class="tail-mr-auto tail-flex tail-items-center tail-space-x-4">
          <slot name="icon" />
          <h4 class="tail-capitalize tail-text-md lg:tail-text-lg tail-font-medium">
            <slot name="title" />
          </h4>
        </div>
        <div class="tail-text-gray-500 tail-text-xs lg:tail-text-sm tail-text-right">
          <slot name="notifications" />
        </div>
      </div>
      <!-- end of header -->
      <!-- list area -->
      <div>
        <slot name="content" />
      </div>
      <!-- end of list area -->
    </div>

    <!-- bottom button -->
    <div v-if="displayViewAllButton" class="tail-px-4 tail-pb-2">
      <button
        v-if="url === '#'"
        class="tail-text-blue-500 tail-h-10 tail-w-full hover:tail-bg-blue-50 tail-p-1 tail-rounded-md"
      >
        <slot name="button">
          View all
        </slot>
      </button>
      <button
        v-else
        class="tail-text-blue-500 tail-h-10 tail-w-full hover:tail-bg-blue-50 tail-p-1 tail-rounded-md"
        @click.prevent="showList"
      >
        <slot name="button">
          View all
        </slot>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SummaryCardWithNotifications',
  props: {
    displayViewAllButton: {
      type: Boolean,
      default: true
    },
    url: {
      type: String,
      default: '#'
    }
  },
  methods: {
    showList () {
      this.$router.push({ name: this.url })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
