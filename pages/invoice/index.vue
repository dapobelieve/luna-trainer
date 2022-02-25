<template>
  <div>
    <InvoiceComponent />
    <modal
      name="force-connection"
      height="auto"
      width="500px"
      :adaptive="true"
      :click-to-close="false"
    >
      <invoices-payment-connection @closeModal="closeConnection" @paymentConnected="connectedPayments = true" />
    </modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import InvoiceComponent from '~/components/invoices/InvoiceComponent'

export default {
  name: 'CreateInvoice',
  components: { InvoiceComponent },
  inject: ['sharedPage'],
  layout: 'invoice',
  data () {
    return {
      connectedPayments: false
    }
  },
  async mounted () {
    this.sharedPage.page = 'Create Invoice'
    const connectionLength = await this.checkConnectedPaymentMethods()
    if (connectionLength < 1) {
      this.$modal.show('force-connection')
    } else {
      this.connectedPayments = true
    }
  },
  methods: {
    ...mapActions({
      checkConnectedPaymentMethods: 'payment/checkConnectedPaymentMethods'
    }),
    closeConnection () {
      if (!this.connectedPayments) {
        this.$gwtoast.show('Please setup a payment')
      } else {
        this.$modal.hide('connection')
      }
    }
  }
}
</script>

<style scoped>

</style>
