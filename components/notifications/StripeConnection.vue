<template>
  <button
    type="button"
    class="w-full hover:bg-blue-50 p-4 rounded-md flex items-center"
    @click="gotoPayments"
  >
    <div
      :class="[
        notification.status === 'UNREAD' ? 'font-bold' : 'font-normal',
        'mr-auto flex',
      ]"
    >
      <i
        class="circled-icon bg-blue-50 mr-3 fi-rr-settings text-xl text-blue-500"
      ></i>
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
    <i class="fi-rr-angle-right text-blue-500"></i>
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
.circled-icon {
  @apply h-12 p-3 w-12 rounded-full inline-flex justify-center items-center;
}
</style>
