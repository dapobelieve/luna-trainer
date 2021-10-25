<template>
  <div >
    <GwPagination class="tail-border tail-bg-white tail-p-1 tail-rounded-lg" v-if="drafts" :totalItems="drafts.length">
      <template v-slot:content>
        <InvoiceClientCard v-for="draft in drafts" :key="draft._id" :client="draft">
        </InvoiceClientCard>
      </template>
    </GwPagination>
  </div>
</template>

<script>
export default {
  name: 'DraftInvoice',
  data () {
    return {
      drafts: []
    }
  },
  async asyncData (ctx) {
    const res = await ctx.store.dispatch('invoice/getInvoices', { status: 'draft' })
    return { drafts: res }
  }
}
</script>

<style scoped>

</style>
