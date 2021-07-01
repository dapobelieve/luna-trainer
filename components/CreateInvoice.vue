<template>
  <div class="tail-bg-white">
    <div class="tail-flex tail-justify-between tail-items-center tail-p-5">
      <h2 class="tail-font-medium">
        Create Invoice
      </h2>
      <i role="button" class="ns-cross" @click.prevent="$router.push({ name: 'Invoices' })" />
    </div>
    <div class="tail-flex">
      <div class="tail-ml-56">
        <LeftInvoiceForm :clients="acceptedClients" />
      </div>
      <div class="tail-fixed tail-right-0 tail-pb-0">
        <RightInvoicePDF />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CreateInvoice',
  computed: {
    ...mapGetters({
      acceptedClients: 'client/getAllAcceptedClients'
    })
  },
  mounted () {
    this.fetchAllAcceptedClients()
  },
  methods: {
    ...mapActions({
      fetchAllAcceptedClients: 'client/fetchAllAcceptedClients'
    })
  }
}
</script>

<style scoped>
.card {
  background-color: #fff;
  padding: 10px;
  max-width: 70rem !important;
}

</style>
