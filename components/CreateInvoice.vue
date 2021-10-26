<template>
  <div class="bg-white">
    <div class="flex justify-between items-center p-5">
      <h2 class="font-medium">
        Create Invoice
      </h2>
      <i
        role="button"
        class="ns-cross"
        @click.prevent="backToMessage"
      />
    </div>
    <div class="flex">
      <div class="ml-56">
        <LeftInvoiceForm />
      </div>
      <div class="fixed right-0 pb-0">
        <RightInvoicePDF />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // TODO:: delete this page
  name: 'CreateInvoice',
  layout: 'emptyLayout',
  methods: {
    backToMessage () {
      this.$router.push({
        // name: 'Messages',
        // params: {
        //   client: this.$route.params.client
        // }
        name: 'Dashboard'
      })
    }
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
