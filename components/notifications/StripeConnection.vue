<template>
  <button
    type="button"
    :class="[
      notification.status === 'UNREAD' ? '' : 'bg-blue-50',
      'w-full hover:bg-blue-50 py-4 px-4 rounded-md flex items-center',
    ]"
    @click="gotoPayments"
  >
    <div
      :class="[
        notification.status === 'UNREAD' ? 'font-bold' : 'font-normal',
        'mr-auto flex',
      ]"
    >
      <div class="text-gray-700">
        <p class="text-base">
          Stripe is connected successfully.
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
    <div v-if="notification.status === 'UNREAD'">
      <div class="rounded-full h-2.5 w-2.5 bg-blue-500"></div>
    </div>
    <i v-else class="fi-rr-angle-right text-blue-500"></i>
  </button>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'StripeConnection',
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
    async gotoPayments () {
      await this.readNotification({ id: this.notification._id })
      this.$router.push({ name: 'settings-billing-setup' })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
