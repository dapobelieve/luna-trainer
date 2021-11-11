<template>
  <client-only>
    <div class="h-screen bg-gray-50 flex overflow-hidden">
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Main content -->
        <div class="lg:flex-1 lg:flex items-stretch overflow-hidden">
          <main class="lg:flex-1 lg:flex flex-row-reverse overflow-y-auto">
            <div class="pt-8 lg:pt-0 xl:w-8/12 w-full px-4 sm:px-6 lg:px-8">
              <form autocomplete="off" class="grid gap-6 md:m-8">
                <LeftInvoiceForm v-model="invoice" />
                <button-spinner :disabled="isLoading || isEmpty" :loading="isLoading" class="mt-4" @click.prevent="createInvoice">
                  Save Invoice
                </button-spinner>
              </form>
            </div>
          </main>
          <aside style="background-color: #f0f5fa;" class="hidden lg:w-6/12 sm:w p-8 pr-0 lg:pt-0 overflow-y-auto lg:block">
            <div class="px-10 py-8 grid lg:w-9/12 gap-4 rounded-lg">
              <PreviewInvoice :invoice="invoice" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  </client-only>
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
  methods: {
    ...mapActions({
      createNewInvoice: 'invoice/createInvoice',
      getClient: 'client/getSingleClientById'
    }),
    createInvoice () {
      this.isLoading = true
      this.invoice.dueDateEpoch = new Date(this.invoice.dueDate).getTime() / 1000
      this.createNewInvoice(this.invoice).then((result) => {
        if (result.status === 'success') {
          this.$gwtoast.success('Invoice created successfully', { position: 'bottom-right' })
          this.$router.push({ name: 'Invoices' })
        }
      }).catch((err) => {
        if (err.response) {
          this.$gwtoast.error(`Something went wrong: ${err.response.data.message}`, { position: 'bottom-right' })
        } else if (err.request) {
          this.$gwtoast.error('Something went wrong. Try again', { position: 'bottom-right' })
        } else {
          this.$gwtoast.error(`Something went wrong: ${err.message}`, { position: 'bottom-right' })
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
