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
import NoNotifications from '~/components/notifications/NoNotifications.vue'
import NewNotification from '~/components/notifications/NewNotification.vue'

export default {
  name: 'UnreadItems',
  components: {
    NewNotification,
    NoNotifications
  },
  computed: {
    ...mapGetters({
      notifications: 'notifications/getAllNotifications'
    }),
    unreadNotifications () {
      const a = this.notifications.filter(n => n.status === 'UNREAD' && n.type !== 'LOGIN_WITH_QR')
      console.log('loggin a: ', a)
      return a.sort((a, b) => a.updatedAt - b.updatedAt)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
