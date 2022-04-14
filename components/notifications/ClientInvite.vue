<template>
  <button
    type="button"
    class="w-full hover:bg-blue-50 py-4 px-4 rounded-md flex items-center"
    @click="viewProfile"
  >
    <div
      :class="[
        notification.status === 'UNREAD' ? 'font-bold' : 'font-normal',
        'mr-auto flex',
      ]"
    >
      <div class="mr-4">
        <span class="inline-block">
          <ClientAvatar
            :client-info="{ firstName: notification.data.firstName }"
          />
        </span>
      </div>
      <div class="text-gray-700">
        <p class="text-base">
          <span class="capitalize">{{ notification.data.firstName }}</span> has
          accepted your invite.
        </p>
        <small
          class="block text-sm text-left"
          :class="[
            notification.status === 'UNREAD'
              ? 'text-blue-500 font-bold'
              : 'text-gray-500',
          ]"
        >{{ notification.createdAt | howLongAgo }}</small>
      </div>
    </div>
    <i class="fi-rr-angle-right text-blue-500"></i>
  </button>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      readNotification: 'notifications/readNotification'
    }),
    async viewProfile () {
      await this.readNotification({ id: this.notification._id })
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

<style lang="scss" scoped></style>
