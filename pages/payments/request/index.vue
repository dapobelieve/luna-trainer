<template>
  <div>
    <InvoiceComponent />
  </div>
</template>

<script>
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
  mounted () {
    this.sharedPage.page = 'Create Payment Request'
  },
  methods: {
    closeConnection () {
      if (!this.connectedPayments) {
        this.$lunaToast.show('Please setup a payment')
      } else {
        this.$modal.hide('connection')
      }
    }
  }
}
</script>

<style scoped>

</style>
