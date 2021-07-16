<template>
  <async-view>
    <div v-if="filteredInvoice.length" class="tail-grid">
      <div class="tail-flex tail-flex-col">
        <div class="-tail-my-2 tail-overflow-x-auto sm:-tail-mx-0 lg:-tail-mx-0">
          <div class="tail-py-2 tail-align-middle tail-inline-block tail-min-w-full sm:tail-px-0 lg:tail-px-0">
            <div class="tail-tail-shadow tail-overflow-hidden">
              <table class="tail-min-w-full">
                <thead class="tail-bg-white tail-rounded-lg tail-overflow-hidden">
                  <tr class="">
                    <th scope="col" class="tail-px-6 tail-py-3 tail-text-left tail-text-xs tail-font-medium tail-text-gray-500 tail-uppercase tail-tracking-wider">
                      Name
                    </th>
                    <th scope="col" class="tail-px-6 tail-py-3 tail-text-left tail-text-xs tail-font-medium tail-text-gray-500 tail-uppercase tail-tracking-wider">
                      Invoice No.
                    </th>
                    <th scope="col" class="tail-px-6 tail-py-3 tail-text-left tail-text-xs tail-font-medium tail-text-gray-500 tail-uppercase tail-tracking-wider">
                      Created
                    </th>
                    <th scope="col" class="tail-px-6 tail-py-3 tail-text-left tail-text-xs tail-font-medium tail-text-gray-500 tail-uppercase tail-tracking-wider">
                      Amount
                    </th>
                    <th scope="col" class="tail-px-6 tail-py-3 tail-text-left tail-text-xs tail-font-medium text-gray-500 tail-uppercase tail-tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="invoice in filteredInvoice"
                    :key="invoice.index"
                    class="tail-cursor-pointer tail-bg-white tail-rounded-lg tail-overflow-hidden tail-border-8 tail-border-transparent"
                    @click="openDetails(invoice)"
                  >
                    <td class="tail-px-6 tail-py-4 tail-whitespace-nowrap tail-text-sm tail-font-medium tail-text-gray-900">
                      <ClientAvatar :firstname="invoice.customerId.firstName" :lastname="invoice.customerId.lastName" />

                      {{ invoice.customerId.firstName }}
                      {{ invoice.customerId.lastName }}
                    </td>
                    <td class="tail-px-6 tail-py-4 tail-whitespace-nowrap tail-text-sm tail-text-gray-500">
                      {{ invoice.invoiceNo }}
                    </td>
                    <td class="tail-px-6 tail-py-4 tail-whitespace-nowrap tail-text-sm tail-text-gray-500">
                      {{ new Date(invoice.dueDate).toDateString() }}
                    </td>
                    <td class="tail-px-6 tail-py-4 tail-whitespace-nowrap tail-text-sm tail-text-gray-500">
                      £ {{ invoice.total | amount }}
                    </td>
                    <td class="tail-px-6 tail-py-4 tail-whitespace-nowrap tail-text-sm tail-text-gray-500">
                      <span
                        :class="[invoice.status === 'sent' ? 'tail-bg-green-100' : 'tail-bg-red-300']"
                        class="tail-px-2 tail-inline-flex tail-text-xs tail-leading-5 tail-font-semibold tail-rounded-full tail-text-gray-800 tail-capitalize">
                        {{ invoice.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="tail-mt-16 tail-px-5 tail-grid tail-gap-5 tail-justify-center tail-text-center">
      <div class="tail-w-full">
        <img class="tail-text-center tail-inline-block" src="~/assets/img/low-dog.png" alt="" srcset="" />
      </div>
      <h5 class="tail-font-bold">
        No {{ status === 'All' ? '' : status.toLowerCase() }} invoices yet
      </h5>
      <p class="tail-px-5 tail-text-sm tail-mb-0 tail-max-w-xs">
        All your {{ status === 'All' ? '' : status.toLowerCase() }} invoice will appear here.
      </p>
      <div v-if="status === 'All'" class="tail-w-max tail-mx-auto">
        <button
          class="base-button"
          type="button"
          @click="createInvoice = true"
        >
          Create an invoice
        </button>
      </div>
    </div>
    <Modal :input-width="30" :status="currentInvoice.status" :is-open="openModalDetails" @close="resetModal($event)">
      <InvoiceDetails :details="currentInvoice" @close="resetModal($event)" />
    </Modal>
    <Modal status="Create New Invoice" :input-width="30" :is-open="createInvoice" @close="createInvoice = $event">
      <CreateNewInvoice @close="createInvoice = $event" />
    </Modal>
  </async-view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'GwInvoice',
  filters: {
    amount (amount) {
      const amt = Number(amount)
      return (
        (amt && amt.toLocaleString(undefined, { maximumFractionDigits: 2 })) ||
        '0'
      )
    }
  },
  props: {
    status: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      openModalDetails: false,
      currentInvoice: {},
      createInvoice: false
    }
  },
  computed: {
    ...mapGetters({
      allInvoices: 'invoice/getAllinvoices'
    }),
    filteredInvoice () {
      // eslint-disable-next-line curly
      if (this.status === 'All') return this.allInvoices
      return this.allInvoices.filter(i => i.status === this.status.toLowerCase())
    }
  },
  mounted () {
    this.getInvoices()
  },
  methods: {
    ...mapActions({
      getInvoices: 'invoice/getInvoices'
    }),
    openDetails (invoice) {
      this.currentInvoice = invoice
      this.openModalDetails = true
    },
    resetModal (event) {
      this.openModalDetails = event
      this.currentInvoice = {}
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
