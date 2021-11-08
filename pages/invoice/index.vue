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
  async mounted () {
    this.sharedPage.page = 'Create Invoice'
  }
}
</script>

<style scoped>

</style>
