<template>
  <div
    class="rounded-xl border bg-white flex flex-col min-h-0 md:min-h-[20rem] h-full"
  >
    <div class="w-full h-full mb-auto">
      <!-- header -->
      <div class="w-full flex items-center p-4">
        <div class="mr-auto flex items-center space-x-4">
          <slot name="icon" />
          <h4 class="capitalize text-md lg:text-lg font-medium">
            <slot name="title" />
          </h4>
        </div>
        <div class="text-gray-500 text-xs lg:text-sm text-right">
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
    <div v-if="displayViewAllButton" class="px-4 pb-2">
      <button
        v-if="url === '#'"
        class="text-blue-500 h-10 w-full hover:bg-blue-50 p-1 rounded-md"
      >
        <slot name="button">
          View all
        </slot>
      </button>
      <button
        v-else
        class="text-blue-500 h-10 w-full hover:bg-blue-50 p-1 rounded-md"
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
