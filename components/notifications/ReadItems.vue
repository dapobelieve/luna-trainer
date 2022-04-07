<template>
  <div>
    <template v-if="readNotifications.length">
      <NewNotification
        v-for="notification in readNotifications"
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
  name: 'ReadItems',
  components: {
    NoNotifications,
    NewNotification
  },
  computed: {
    ...mapGetters({
      notifications: 'notifications/getAllNotifications'
    }),
    readNotifications () {
      return this.notifications.filter(n => n.status === 'READ' && n.type !== 'LOGIN_WITH_QR')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
