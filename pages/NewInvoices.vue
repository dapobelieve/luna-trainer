<template>
  <div class="tail-bg-white">
    <div class="tail-flex tail-justify-between tail-items-center tail-p-5">
      <h2 class="tail-font-medium">
        Create Invoice
      </h2>
      <i role="button" class="ns-cross" @click.prevent="backToMessage" />
    </div>
    <div class="tail-flex">
      <div class="tail-ml-56">
        <LeftInvoiceForm />
      </div>
      <div class="tail-fixed tail-right-0 tail-pb-0">
        <RightInvoicePDF />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewInvoices',
  layout: 'emptyLayout',
  methods: {
    backToMessage () {
      this.$router.push({
        name: 'Messages',
        params: {
          client: this.$route.params.client
        }
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
