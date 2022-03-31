<template>
  <div class="">
    <GwPagination v-if="drafts && drafts.length" class="tail-border bg-white tail-bg-white tail-p-1 tail-rounded-lg p-1" :total-items="drafts.length">
      <template v-slot:content>
        <InvoiceClientCard v-for="draft in drafts" :key="draft._id" :invoice="draft" @invoice-deleted="removeDraft" />
      </template>
    </GwPagination>
    <template v-else>
      <div class="flex justify-around">
        <div class="mt-5 text-center">
          <h4 class="font-bold text-gray-700 mb-1">
            No Invoices here yet
          </h4>
          <p class="text-sm text-gray-500 mb-4">
            We want to make your world easier by connecting and <br> managing your invoicing and payments systems.
          </p>
          <button class="primary-color rounded-lg px-4 py-2" type="button" @click="$router.push({ name: 'payment-request' })">
            <i class="ns-plus text-white"></i>
            <span class="text-font-medium text-white text-base ml-2">New Invoice</span>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DraftInvoice',
  async asyncData (ctx) {
    const res = await ctx.store.dispatch('invoice/getInvoices', { workflowStatus: 'draft', status: 'pending' })
    return { drafts: res }
  },
  data () {
    return {
      drafts: []
    }
  },
  methods: {
    removeDraft (invoice) {
      this.drafts.splice(this.drafts.indexOf(invoice), 1)
    }
  }
}
</script>

<style scoped>

</style>
