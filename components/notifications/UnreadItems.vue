<template>
  <div>
    <template v-if="notifications.length">
      <notifications-new-notification
        v-for="notification in notifications"
        :key="notification._id"
        :notification="notification"
      />
    </template>
    <div v-else class="mt-16">
      <p class="text-center">
        No notifications at this time.
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UnreadItems',
  ...mapGetters({
    notifications: 'notifications/getAllNotifications'
  })
}
</script>

<style lang="scss" scoped>

</style>
