<template>
  <div>
    <InvoiceComponent mode="edit" :invoice-data="invoiceData">
    </InvoiceComponent>
  </div>
</template>

<script>
import InvoiceComponent from '~/components/invoices/InvoiceComponent'
export default {
  components: { InvoiceComponent },
  inject: ['sharedPage'],
  layout: 'invoice',
  async asyncData (ctx) {
    const res = await ctx.store.dispatch('invoice/getSingleInvoice', ctx.route.params.id)
    return { invoiceData: res.data }
  },
  data () {
    return {
      invoiceData: null
    }
  },
  async mounted () {
    this.sharedPage.page = 'Edit Invoice'
  }
}
</script>

<style scoped>

</style>
