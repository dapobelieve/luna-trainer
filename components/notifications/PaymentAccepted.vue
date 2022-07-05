<template>
  <button
    type="button"
    class="w-full hover:bg-blue-50 p-4 rounded-md flex"
    @click="gotoPayment"
  >
    <div
      :class="[
        notification.status === 'UNREAD' ? 'font-bold' : 'font-normal',
        'mr-auto flex',
      ]"
    >
      <div class="mr-4 flex">
        <div class="circled-icon bg-blue-50">
          <img
            class="inline-block"
            src="~/assets/img/stripe.png"
            alt="stripe logo"
          />
        </div>
      </div>
      <div class="text-left">
        <h2 class="text-lg font-normal">
          <span :class="[notification.status === 'UNREAD' ? 'font-bold' : 'font-normal']">{{ notification.data.customerId.name }}</span>
          <span> just paid for invoice </span>
          <a href="#" class="text-blue-500">#{{ notification.data.invoiceNo }}</a>
        </h2>
        <p class="text-gray-500 mt-1 text-sm font-normal">
          {{ notification.updatedAt | howLongAgo }}
        </p>
      </div>
    </div>
    <i class="fi-rr-angle-right text-blue-500"></i>
  </button>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'PaymentAccepted',
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
    async gotoPayment () {
      await this.readNotification({ id: this.notification._id })
      this.$router.replace({ name: 'payments-requests', params: { id: this.notification.data._id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.circled-icon {
  @apply h-12 p-0.5 w-12 rounded-full inline-flex justify-center items-center;
}
</style>
