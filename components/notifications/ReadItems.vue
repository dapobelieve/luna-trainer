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

export default {
  name: 'ReadItems',
  components: {
    NoNotifications
  },
  computed: {
    ...mapGetters({
      notifications: 'notifications/getAllNotifications'
    }),
    readNotifications () {
      return this.notifications.filter(n => n.status === 'READ')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
