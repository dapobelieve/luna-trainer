<template>
  <button
    type="button"
    class="w-full hover:bg-blue-50 p-4 rounded-md flex items-center"
    @click="gotoPayment"
  >
    <div
      :class="[
        notification.status === 'UNREAD' ? 'font-bold' : 'font-normal',
        'mr-auto flex',
      ]"
    >
      <div class="mr-4 flex">
        <i
          v-if="notification.data.paymentReceipts[0].paymentType === 'TRANSFER'"
          class="circled-icon bg-blue-50 fi-rr-bank text-xl text-blue-500"
        ></i>
        <div v-else class="circled-icon bg-blue-50">
          <img
            class="inline-block"
            src="~/assets/img/stripe.png"
            alt="stripe logo"
          />
        </div>
      </div>
      <div>
        <h2 class="text-lg font-bold text-left">
          {{ notification.data.customerId.name }}
        </h2>
        <p v-if="notification.data.status == 'paid_awaiting_confirmation'" class="text-gray-500  text-sm">
          Requesting confirmation of <b>{{ notification.data.total | amount }}</b> on
          <b>{{ notification.updatedAt | date }}</b>
        </p>
      </div>
    </div>
    <i class="fi-rr-angle-right text-blue-500"></i>
  </button>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'ReceivedPayment',
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapMutations({
      setIncomingPaymentNotification: 'payment-methods/setIncomingPaymentNotification'
    }),
    ...mapActions({
      readNotification: 'notifications/readNotification'
    }),
    async gotoPayment () {
      this.setIncomingPaymentNotification(this.notification.data._id)
      await this.readNotification({ id: this.notification._id })
      this.$router.push({ name: 'payments-requests-sent' })
    }
  }
}
</script>

<style lang="scss" scoped>
.circled-icon {
  @apply h-12 p-3 w-12 rounded-full inline-flex justify-center items-center;
}
</style>
