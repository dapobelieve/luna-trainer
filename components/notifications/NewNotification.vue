<template>
  <div>
    <template v-if="notification.type === 'INVITE_REQUEST_ACCEPTED'">
      <notifications-client-invite-request :notification="notification" />
    </template>

    <template v-if="0">
      <notifications-session-reminder />
    </template>

    <template v-if="notification.type === 'PAYMENT_ACCEPTED'">
      <notifications-received-payment :notification="notification" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'NewNotification',
  props: {
    notification: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
