<template>
  <async-view>
    <div class="min-h-screen pt-14">
      <div
        class="bg-white shadow-sm rounded-xl pb-4 lg:w-3/4 xl:w-4/6 mx-auto overflow-y-auto"
        style="height: 80vh"
      >
        <h2
          class="px-4 py-4 mb-4 text-xl font-normal text-gray-700 sticky top-0 bg-white z-30"
        >
          Notifications
        </h2>
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
    </div>
  </async-view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Notifications',
  computed: {
    ...mapGetters({
      notifications: 'notifications/getAllNotifications'
    })
  },
  async mounted () {
    try {
      await this.$store.dispatch('notifications/fetchNotifications')
    } catch (e) {
      console.log({ e })
    }
  }
}
</script>

<style lang="scss" scoped></style>
