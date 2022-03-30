<template>
  <div class="px-4 cursor-pointer flex items-center mb-4 mt-6">
    <div class="flex items-start">
      <div class="relative w-12 mr-4 flex-shrink-0">
        <template>
          <div v-if="invoiceCustomerAvatar.indexOf('http')" class="h-12 w-12 rounded-full bg-green-50 inline-flex items-center justify-center font-medium">
            {{ invoiceCustomerAvatar }}
          </div>
          <img v-else :src="invoiceCustomerAvatar" class="h-12 w-12 rounded-full">
        </template>
        <img class="absolute rounded-full shadow-md bottom-0 right-0" src="~/assets/img/billing/bank.svg">
      </div>
      <div>
        <h3>{{ computeMessage }}</h3>
        <!--        <p class="text-sm mt-">Last sent: 6th June</p>-->
        <p class="text-sm text-gray-400">
          {{ $dateFns.format(invoiceCreatedAt, 'do MMMM') }}
        </p>
      </div>
    </div>
    <div class="ml-auto">
      <button v-if="invoiceStatus === 'overdue'" class="border px-2" @click="sendNotification">
        <i class="fi-rr-bell-ring text-primary-color mt-1"></i>
      </button>
      <button v-else>
        <i class="fi-rr-angle-small-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['invoice'],
  computed: {
    invoiceCreatedAt () {
      return this.invoice.createdAt
    },
    invoiceCustomerAvatar () {
      return this.invoice.customerId.imageURL || `${this.invoice.customerId.firstName.charAt(0)} ${this.invoice.customerId.lastName?.charAt(0) || ''}`
    },
    invoiceAmount () {
      return new Intl.NumberFormat().format(this.invoice.total)
    },
    invoicePaymentMethod () {
      const type = this.invoice.supportedPaymentMethods[0].type.charAt(0).toUpperCase() + this.invoice.supportedPaymentMethods[0].type.slice(1)
      return { ...this.invoice.supportedPaymentMethods[0], type }
    },
    invoiceStatus () {
      return this.invoice && this.invoice.status
    },
    invoiceCustomer () {
      return `${this.invoice.customerId.firstName} ${this.invoice.customerId.lastName || ''}`
    },
    computeMessage () {
      let msg
      if (this.invoiceStatus === 'pending') { msg = `${this.invoicePaymentMethod.type} Payment of ${this.invoiceAmount} from ${this.invoiceCustomer}` } else if (this.invoiceStatus === 'overdue') { msg = `You have an overdue ${this.invoicePaymentMethod.type} payment of ${this.invoiceAmount} from  ${this.invoiceCustomer}` } else if (this.invoiceStatus === 'paid') { msg = `${this.invoicePaymentMethod.type} Payment of ${this.invoiceAmount} from  ${this.invoiceCustomer}` }

      return msg
    }
  },
  methods: {
    async sendNotification () {
      try {
        await this.$store.dispatch('invoice/notify', { id: this.invoice._id })
        this.$lunaToast.success('Reminder sent')
      } catch (e) {

      }
    }
  }
}
</script>

<style scoped>

</style>
