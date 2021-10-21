<template>
  <div class="tail-flex tail-px-8 tail-mt-8">
    <div class="tail-max-w-full tail-flex tail-border tail-mt-8 tail-rounded-lgs tail-border-gray-200">
      <div class="tail-bg-white tail-w-full">
<!--          <ClientAvatar :clientInfo="data.customerId" />-->
        <div>
          <img class="tail-h-5 tail-w-5 tail-bg-gray-400">
        </div>
        <div class="tail-ml-4">
          <h6 class="tail-text-base tail-text-gray-700 tail-text-capitalize">Dapo Believe</h6>
          <span class="tail-text-sm tail-text-gray-500">believe@gmail.com</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      invoices: null
    }
  },
  async asyncData(ctx) {
    let res = await ctx.store.dispatch('invoice/getInvoices', {status: 'draft'})
    return {invoices: res}
  }
}
</script>

<style scoped>

</style>