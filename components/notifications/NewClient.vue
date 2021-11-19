<template>
  <div @click.stop="userProfile" class="cursor-pointer flex gap-4 py-4 px-3 rounded-lg hover:bg-gray-100" :class="[notification.status ==='UNREAD' ? 'bg-gray-100' : '']">
    <div class="flex-shrink-0">
      <UserAvatar :clientInfo="notification.data" />
    </div>
    <div>
      <div class="flex flex-col gap-1">
        <span class="font-medium text-gray-700">You have a new client registration!</span>
        <span class="text-sm">{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from "~/components/util/ClientAvatar";
export default {
  components: {UserAvatar},
  props: ['notification'],
  computed: {
    date() {
      return this.$dateFns.formatDistanceToNow(new Date(this.notification.createdAt), {addSuffix: true})
    }
  },
  methods: {
    async userProfile() {
      await this.$store.dispatch('notifications/readNotification', {id: this.notification._id})
      this.$router.push({
        name: 'Client-id-Information',
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