<template>
  <div
    class="px-4 flex cursor-pointer contents-center justify-between mb-4 mt-6"
  >
    <div class="flex items-center justify-between">
      <div class="mr-3">
        <i
          v-if="invoiceStatus == 'paid_awaiting_confirmation'"
          class="circled-icon bg-amber-100 fi-rr-bell-ring text-xl text-amber-500"
        ></i>
        <i
          v-if="invoiceStatus == 'overdue'"
          class="circled-icon bg-red-50 fi-rr-time-past text-xl text-red-500"
        ></i>
        <i
          v-if="invoiceStatus == 'paid' && nonWirePaymentTypes.includes(paymentType)"
          class="circled-icon bg-blue-50 fi-rr-bank text-xl text-blue-500"
        ></i>
        <div
          v-if="
            invoiceStatus == 'paid' && !nonWirePaymentTypes.includes(paymentType)
          "
          class="circled-icon bg-blue-50 p-1"
        >
          <img
            class="h-2 inline-block"
            src="~/assets/img/stripe.png"
            alt="stripe logo"
          />
        </div>
      </div>
      <div>
        <h2 class="text-lg font-bold">
          {{ invoice.customerId.name }}
        </h2>
        <p v-if="invoiceStatus == 'paid'" class="text-gray-500  text-sm">
          <b>{{ invoiceAmount | amount }}</b> paid on
          <b>{{ paymentRecievedDate | date }}</b>
        </p>
        <p
          v-else-if="invoiceStatus == 'paid_awaiting_confirmation'"
          class="text-gray-500 text-sm"
        >
          Requesting confirmation of <b>{{ invoiceAmount | amount }}</b> on
          <b>{{ paymentRecievedDate | date }}</b>
        </p>
        <p v-else-if="invoiceStatus == 'overdue'" class="text-gray-500 text-sm">
          Overdue {{ invoice.dueDate | howLongAgo }}
        </p>
      </div>
    </div>
    <div>
      <button
        v-if="invoiceStatus === 'overdue'"
        class="button-outline text-sm"
        @click="sendReminder"
      >
        <SingleLoader v-if="loading" />
        <i v-else class="fi-rr-alarm-clock" />
      </button>
      <button
        v-if="invoiceStatus === 'paid_awaiting_confirmation'"
        class="button-outline text-sm"
        alt="Mark as paid"
        @click="markInvoiceAsPaid"
      >
        <SingleLoader v-if="loading" />
        <i v-else class="fi-rr-check" />
      </button>
    </div>
  </div>
</template>

<script>
import PaymentReciept from '../invoices/PaymentReciept'
export default {
  props: ['invoice'],
  data () {
    return {
      nonWirePaymentTypes: ['bank', 'cash', 'transfer', 'check', 'credit', 'TRANSFER', 'CASH'],
      loading: false
    }
  },
  computed: {
    invoiceCustomerAvatar () {
      return this.invoice.customerId?.imageURL || this.invoice.customerId
    },
    invoiceAmount () {
      return this.invoice.total
    },
    invoiceStatus () {
      return this.invoice && this.invoice.status
    },
    paymentReciept () {
      return this.invoice.paymentReceipts.find(reciept => reciept.status != 'cancelled')
    },
    paymentRecievedDate () {
      return this.paymentReciept.paymentDate
    },
    paymentType () {
      return this.paymentReciept.paymentType
    }
  },
  methods: {
    async sendReminder () {
      try {
        this.loading = true
        await this.$store.dispatch('invoice/notify', { id: this.invoice._id })
        this.$lunaToast.show('Reminder sent')
        this.loading = false
      } catch (e) {}
    },
    async markInvoiceAsPaid () {
      try {
        this.loading = true
        this.$modal.show(
          PaymentReciept,
          {
            invoice: this.invoice
          },
          {
            height: 'auto',
            width: 512,
            adaptive: true
          }
        )
      } catch (e) {}

      this.loading = false
    }
  }
}
</script>

<style scoped>
.circled-icon {
  @apply h-12 p-3 w-12 rounded-full inline-flex justify-center items-center;
}
</style>
