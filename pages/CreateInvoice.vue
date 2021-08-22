<template>
  <div class="tail-h-screen bg-gray-50 tail-flex tail-overflow-hidden">
    <div class="tail-flex-1 tail-flex tail-flex-col tail-overflow-hidden">
      <!-- Main content -->
      <div class="tail-flex-1 tail-flex tail-items-stretch tail-overflow-hidden">
        <main class="tail-flex-1 tail-flex tail-flex-row-reverse">
          <div class="tail-pt-8 lg:tail-pt-0 lg:tail-w-8/12 sm:tail-w-12/12 tail-px-4 sm:tail-px-6 lg:tail-px-8">
            <form autocomplete="off" class="tail-grid tail-gap-6" @submit.prevent="createInvoice">
              <LeftInvoiceForm v-model="invoice" />
              <button-spinner :disabled="isLoading || isEmpty" :loading="isLoading" class="tail-mt-4">
                Save Invoice
              </button-spinner>
            </form>
          </div>
        </main>
        <aside style="background-color: #f0f5fa;" class="tail-hidden lg:tail-w-6/12 sm:tail-w tail-p-8 tail-pr-0 lg:tail-pt-0 tail-overflow-y-auto lg:tail-block">
          <div class="tail-px-10 tail-py-8 tail-grid lg:tail-w-9/12 tail-gap-4 tail-rounded-lg">
            <PreviewInvoice :invoice="invoice" />
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'CreateInvoice',
  layout: 'invoice',
  data () {
    return {
      invoice: { items: [], customerId: null, client: {} },
      isLoading: false
    }
  },
  head () {
    return {
      title: 'Invoice'
    }
  },
  computed: {
    isEmpty () {
      return Object.keys(this.invoice.client).length === 0 && this.invoice.client.constructor === Object
    }
  },
  async mounted () {
    const client = await this.getClient(this.$route.params.id)
    if (client) {
      this.invoice.customerId = client._id
      this.invoice.client = client
    }
  },
  methods: {
    ...mapActions({
      createNewInvoice: 'invoice/createInvoice',
      getClient: 'client/getSingleClient'
    }),
    createInvoice () {
      this.isLoading = true
      this.invoice.dueDateEpoch = new Date(this.invoice.dueDate).getTime() / 1000
      this.createNewInvoice(this.invoice).then((result) => {
        if (result.status === 'success') {
          this.$toast.success('Invoice created successfully', { position: 'bottom-right' })
          this.$router.push({ name: 'Invoices' })
        }
      }).catch((err) => {
        if (err.response) {
          this.$toast.error(`Something went wrong: ${err.response.data.message}`, { position: 'bottom-right' })
        } else if (err.request) {
          this.$toast.error('Something went wrong. Try again', { position: 'bottom-right' })
        } else {
          this.$toast.error(`Something went wrong: ${err.message}`, { position: 'bottom-right' })
        }
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
