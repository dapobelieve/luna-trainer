<template>
  <div class="min-h-screen pt-14">
    <div
      class="notifications"
    >
      <div>
        <TabbedItems
          :links="[{link: 'Unread', count: unreadNotifications.length}, {link: 'Read', count: readNotifications.length}]"
        >
          <template v-slot:title>
            <h2
              class="px-4 pt-4 text-xl font-normal text-gray-700 bg-white"
            >
              Notifications
            </h2>
          </template>
          <template v-slot:tabviews="{ tab }">
            <AsyncView>
              <UnreadItems v-if="tab === 1" />
              <ReadItems v-if="tab === 2" />
            </AsyncView>
          </template>
        </TabbedItems>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ReadItems from '~/components/notifications/ReadItems.vue'
import UnreadItems from '~/components/notifications/UnreadItems.vue'

export default {
  name: 'Notifications',
  components: {
    UnreadItems,
    ReadItems
  },
  computed: {
    ...mapGetters({
      notifications: 'notifications/getAllNotifications'
    }),
    unreadNotifications () {
      return this.notifications.filter(n => n.status === 'UNREAD' && n.type !== 'LOGIN_WITH_QR')
    },
    readNotifications () {
      return this.notifications.filter(n => n.status === 'READ' && n.type !== 'LOGIN_WITH_QR')
    }
  },
  async mounted () {
    try {
      await this.fetchNotifications()
    } catch (e) {
      console.log({ e })
    }
  },
  methods: {
    ...mapActions({
      fetchNotifications: 'notifications/fetchNotifications'
    })
  }
}
</script>

<style lang="scss" scoped>
.notifications {
  @apply bg-white shadow-sm rounded-xl pb-4 md:w-[500px]  xl:w-[500px] mx-auto overflow-y-auto;
  height: 80vh;
}
</style>
