<template>
  <div>
    <template v-if="notification.type === 'INVITE_REQUEST_ACCEPTED'">
      <NotificationsClientInvite :notification="notification" />
    </template>

    <template v-if="0">
      <NotificationsSessionReminder />
    </template>

    <template v-if="notification.type === 'NEW_PAYMENT_RECEIPT'">
      <NotificationsReceivedPayment :notification="notification" />
    </template>

    <template v-if="notification.type === 'STRIPE_CONNECTION_SUCCESSFUL'">
      <StripeConnection :notification="notification" />
    </template>
  </div>
</template>

<script>
import StripeConnection from '~/components/notifications/StripeConnection.vue'
export default {
  name: 'NewNotification',
  components: {
    StripeConnection
  },
  props: {
    notification: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
