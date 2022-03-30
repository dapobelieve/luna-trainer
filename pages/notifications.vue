<template>
  <div class="min-h-screen pt-14">
    <div
      class="notifications"
    >
      <div>
        <TabbedItems
          :links="[{link: 'Read', count: readNotifications.length}, {link: 'Unread', count: unreadNotifications.length}]"
        >
          <template v-slot:title>
            <h2
              class="px-4 pt-4 text-xl font-normal text-gray-700 sticky top-0 bg-white"
            >
              Notifications
            </h2>
          </template>
          <template v-slot:tabviews="{ tab }">
            <AsyncView>
              <ReadItems v-if="tab === 1" />
              <UnreadItems v-if="tab === 2" />
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
      return this.notifications.filter(n => n.status === 'UNREAD')
    },
    readNotifications () {
      return this.notifications.filter(n => n.status === 'READ')
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
  @apply bg-white shadow-sm rounded-xl pb-4 lg:w-3/4 xl:w-[578.5px] mx-auto overflow-y-auto;
  height: 80vh;
  // width: 576px;
}
</style>
