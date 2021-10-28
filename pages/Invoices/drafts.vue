<template>
  <div class="">
    <GwPagination v-if="drafts" class="tail-border bg-white tail-bg-white tail-p-1 tail-rounded-lg p-1" :total-items="drafts.length">
      <template v-slot:content>
        <InvoiceClientCard v-for="draft in drafts" :key="draft._id" :invoice="draft" @invoice-deleted="removeDraft" />
      </template>
    </GwPagination>
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
