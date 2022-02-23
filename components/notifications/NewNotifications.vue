<template>
  <div class="cursor-pointer flex gap-4 py-4 px-3 rounded-lg hover:bg-gray-100 mb-2" :class="[notification.status ==='UNREAD' ? 'bg-gray-100' : '']" @click.stop="userProfile">
    <div class="flex-shrink-0">
      <UserAvatar v-if="notification.type === 'INVITE_REQUEST_ACCEPTED'" :client-info="notification.data" />
      <UserAvatar v-if="notification.type === 'PAYMENT_ACCEPTED'" :client-info="{ firstName: notification.data.vendorId.name }" />
    </div>
    <div>
      <div class="flex flex-col gap-1">
        <span v-if="notification.type === 'INVITE_REQUEST_ACCEPTED'" class="font-medium text-gray-700">{{ notification.data.firstName }} has just registered!</span>
        <span v-if="notification.type === 'PAYMENT_ACCEPTED'" class="font-medium text-gray-700">{{ notification.data.vendorId.name }} has just paid you!</span>
        <span class="text-sm">{{ notification.createdAt | howLongAgo }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from '~/components/util/ClientAvatar'
export default {
  components: { UserAvatar },
  props: ['notification'],
  computed: {
    date () {
      return this.$dateFns.formatDistanceToNow(new Date(this.notification.createdAt), { addSuffix: true })
    }
  },
  methods: {
    async userProfile () {
      await this.$store.dispatch('notifications/readNotification', { id: this.notification._id })
      this.$router.push({
        name: 'client-id-information',
        params: {
          id: this.notification.data._id
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
