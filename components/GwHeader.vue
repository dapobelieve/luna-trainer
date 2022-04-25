<template>
  <header
    class="lg:hidden bg-white sticky top-0 z-10 h-14 w-full flex items-center px-4 py-1 gw-header"
  >
    <button class="button-outline w-10" @click="openPageSidebar">
      <i class="fi-rr-menu-burger mt-1 text-base" />
    </button>

    <div class="flex items-center lg:hidden space-x-2 ml-auto">
      <button class="button-outline" style="padding: .5rem" @click="$router.push({ name: 'messages' })">
        <i class="fi-rr-comment-alt text-base mt-1 mr-1" />
        <span class="text-sm">{{ unreadMessages }}</span>
      </button>

      <button class="button-outline" style="padding: .5rem" @click="$router.push({ name: 'notifications' })">
        <i class="fi-rr-bell-ring text-base mt-1 mr-1" />
        <span class="text-sm">{{ getNotificationsSummary.unread }}</span>
      </button>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'GwHeader',
  computed: {
    ...mapGetters({
      getNotificationsSummary: 'notifications/getNotificationsSummary',
      getUnreadMessagesCount: 'sendbird-v2/getUnreadMessagesCount'
    })
  },
  unreadMessages () {
    let count = 0
    for (const key in this.getUnreadMessagesCount) {
      count += this.getUnreadMessagesCount[key] || 0
    }
    return count
  },
  methods: {
    openPageSidebar () {
      this.$nuxt.$emit('displayPageSidebar')
    }
  }
}
</script>
