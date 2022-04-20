<template>
  <div class="min-h-screen pt-14">
    <div
      class="notifications"
    >
      <div>
        <TabbedItems
          :links="[{link: 'Unread', count: notificationsSummary.unread}, {link: 'Read', count: notificationsSummary.read}]"
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
      notificationsSummary: 'notifications/getNotificationsSummary'
    }),
  },
  async create () {
    try {
      await this.fetchNotificationsSummary()
    } catch (e) {
      console.log({ e })
    }
  },
  methods: {
    ...mapActions({
      fetchNotificationsSummary: 'notifications/fetchNotificationsSummary'
    })
  }
}
</script>

<style lang="scss" scoped>
.notifications {
  @apply bg-white shadow-sm rounded-xl pb-4 md:w-[500px]  xl:w-[600px] mx-auto overflow-y-auto;
  height: 80vh;
}
</style>
