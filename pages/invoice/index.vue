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
  async mounted () {
    this.sharedPage.page = 'Create Invoice'
  },
  methods: {
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
