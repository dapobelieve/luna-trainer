<template>
  <div class="cursor-pointer flex items-center gap-4 py-4 px-3 rounded-lg hover:bg-gray-100 mb-2" :class="[notification.status ==='UNREAD' ? 'bg-gray-100' : '']" @click.stop="">
    <div class="flex-shrink-0">
      <span class="fi-rr-time-quarter-past text-primary-color" style="font-size: 2rem"></span>
    </div>
    <div>
      <div class="flex flex-col gap-1">
        <span class="font-medium text-gray-700">{{message}}</span>
        <span class="text-sm">{{ Date.now() | howLongAgo }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['notification'],
  computed: {
    message() {
      return this.notification ? this.notification.message : 'Calendar Sync Successful'
    }
  },
  methods: {
    async read() {
      await this.$store.dispatch('notifications/readNotification', { id: this.notification._id })
    }
  }
}
</script>

<style scoped>

</style>
