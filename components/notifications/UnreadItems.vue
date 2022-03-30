<template>
  <div>
    <template v-if="unreadNotifications.length">
      <NewNotification
        v-for="notification in unreadNotifications"
        :key="notification._id"
        :notification="notification"
      />
    </template>
    <NoNotifications v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NewNotification from '~/components/notifications/NewNotification.vue'

export default {
  name: 'UnreadItems',
  components: {
    NewNotification
  },
  computed: {
    ...mapGetters({
      notifications: 'notifications/getAllNotifications'
    }),
    unreadNotifications () {
      return this.notifications.filter(n => n.status === 'UNREAD')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
