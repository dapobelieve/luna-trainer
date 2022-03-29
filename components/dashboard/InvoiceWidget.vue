<template>
  <DashboardCard :view-all="getInvoices.length > 0" class="pt-4" @action="$router.push({name: 'invoices-sent'})">
    <div class="flex items-center px-4">
      <div class="inline-flex items-center">
        <div class="h-12 mr-2 w-12 bg-amber-50 rounded-full inline-flex justify-center items-center">
          <i class="fi-rr-receipt text-xl text-amber-500 mt-1"></i>
        </div>
        <h3 class="text-black text-xl">
          Billing
        </h3>
      </div>
      <div class="ml-auto ">
        <button :class="[selectedOption=== null ? 'active' : '']" class="font-normal px-1.5 py-0.5 text-sm mr-2 text-gray-500" @click="selectedOption= null">
          All
        </button>
        <button :class="[selectedOption==='paid' ? 'active' : '']" class="font-normal px-1.5 py-0.5 text-sm mr-2 text-gray-500" @click="selectedOption= 'paid'">
          Paid
        </button>
        <button :class="[selectedOption==='overdue' ? 'active' : '']" class="font-normal px-1.5 py-0.5 text-sm mr-2 text-gray-500" @click="selectedOption= 'overdue'">
          Overdue
        </button>
        <button :class="[selectedOption==='pending' ? 'active' : '']" class="font-normal px-1.5 py-0.5 text-sm text-gray-500" @click="selectedOption= 'pending'">
          Pending
        </button>
      </div>
    </div>
    <div class="h-full flex-col justify-center">
      <div v-if="fetching" class="flex h-full items-center justify-center">
        <SingleLoader height="40px" width="40px" />
      </div>
      <template v-else class="">
        <div v-if="!getInvoices.length" class="flex items-center h-full justify-center">
          <div class="flex flex-col items-center">
            <i class="fi-rr-receipt text-5xl text-amber-500"></i>
            <h3 class="text-gray-700 text-lg">
              You have no billing items
            </h3>
            <small class="text-base text-gray-500">Your invoices would be displayed here</small>
            <button class="button-fill mt-3" @click="$router.push({ name: 'invoice' })">
              Create an invoice
            </button>
          </div>
        </div>
        <template v-else>
          <InvoiceWidgetCard v-for="(invoice, invoiceIndex) in getInvoices" :invoice="invoice" />
        </template>
      </template>
    </div>
  </DashboardCard>
</template>

<script>
import DashboardCard from '~/components/dashboard/DashboardCard'
import InvoiceWidgetCard from '~/components/dashboard/InvoiceWidgetCard'
export default {
  components: { InvoiceWidgetCard, DashboardCard },
  data () {
    return {
      imgUrl: 'https://res.cloudinary.com/rohing/image/upload/v1646190983/gitProfile_qje88s.png',
      fetching: false,
      selectedOption: null,
      invoices: []
    }
  },
  computed: {
    getInvoices () {
      return this.invoices.data || []
    }
  },
  watch: {
    selectedOption: {
      async handler (val) {
        await this.fetchInvoices(val)
      }
    }
  },
  async mounted () {
    await this.fetchInvoices()
  },
  methods: {
    async fetchInvoices (data) {
      this.fetching = true
      try {
        this.invoices = await this.$store.dispatch('invoice/getFetchCustomerInvoice', {
          workflowStatus: data ? 'sent' : null,
          status: data || null,
          limit: 3
        })
      } catch (e) {

      } finally {
        this.fetching = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.active {
  @apply bg-blue-50 text-blue-500
}
</style>
