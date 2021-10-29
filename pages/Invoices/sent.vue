<template>
  <div>
    <template v-if="invoices && invoices.length">
      <div class="flex mt-1 px-3 mb-5">
        <div class="actions flex justify-between items-center w-full">
          <div>
            <span class="cursor-pointer mr-4 inline-flex items-center text-sm font-medium text-primary-color text-base" to="/" @click="archive">
            <i class="ns-archive mr-1"></i>
            <span>Archive</span>
          </span>
            <span v-if="!exporting" class="cursor-pointer inline-flex items-center text-sm font-medium text-primary-color text-base" to="/" @click="exportInvoice()">
            <i class="ns-download mr-1"></i>
            <span>Export</span>
          </span>
            <span v-else class="cursor-pointer inline-flex items-center text-sm font-medium text-gray-400 text-base" to="/">
            <i class="ns-download mr-1"></i>
            <span>Exporting...</span>
          </span>
          </div>
          <div>
            <SearchDropdown />
          </div>
        </div>
      </div>
      <GwPagination v-if="invoices" :total-items="invoices.length">
        <template v-slot:content>
          <div class="overflow-scroll lg:overflow-hidden">
            <table class="table-auto table bg-white w-full text-xs rounded-md">
              <thead class="">
                <tr class="uppercase tracking-wider text-gray-500">
                  <th class="w-12 py-4 font-medium pl-1">
                    <div class="pl-3">
                      <input v-model="selectAll" class="cursor-pointer h-5 w-5 border-grey-500" type="checkbox">
                    </div>
                  </th>
                  <th class="py-4 font-medium text-left px-6 w-3/6">
                    Name
                  </th>
                  <th class="py-4 font-medium px-6">
                    INVOICE#
                  </th>
                  <th class="py-4 font-medium px-6">
                    CREATED
                  </th>
                  <th class="py-4 font-medium px-6">
                    AMOUNT
                  </th>
                  <th class="py-4 font-medium px-6">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data) in invoices" :key="data._id" class="text-center relative text-gray-500 hover-row hover:cursor-pointer" :class="[checkedItems.includes(data.customerId._id) ? 'active' : '']">
                  <td class="w-12 py-4 font-medium pl-3">
                    <AppCheckboxComponent :id="data._id" v-model="checkedItems" :value="data._id" />
                  </td>
                  <td class="py-4 text-left px-6 w-3/6">
                    <div class="flex items-center">
                      <ClientAvatar :client-info="data.customerId" />
                      <div class="ml-4">
                        <h6 class="text-base text-gray-700 text-capitalize">
                          {{ data.customerId.firstName }}  {{ data.customerId.lastName }}
                        </h6>
                        <span class="text-sm text-gray-500">{{ data.customerId.email }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-4  px-6">
                    <div class="text-base text-gray-700">
                      {{ data.invoiceNo }}
                    </div>
                  </td>
                  <td class="py-4  px-6">
                    <div class="text-xs md:text-base text-gray-700">
                      {{ data.createdAt | date }}
                    </div>
                  </td>
                  <td class="py-4 px-6">
                    <div class="text-sm md:text-base text-gray-700">
                      {{ "\uFFE1" }}{{ data.total }}
                    </div>
                  </td>
                  <td class="py-4 px-6">
                    <InvoiceStatusComponent status="paid" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </GwPagination>
    </template>
    <template v-else>
      <div class="flex justify-around">
        <div class="mt-5 text-center" style="margin-top: 12rem">
          <h4 class="font-bold text-gray-700 mb-1">
            No clients yet
          </h4>
          <p class="text-sm text-gray-500 mb-4">
            We want to make your world easier by connecting and <br> managing your invoicing and payments systems.
          </p>
          <button class="primary-color rounded-lg px-4 py-2" type="button" @click="$router.push({ name: 'NewInvoice' })">
            <i class="ns-plus text-white"></i>
            <span class="text-font-medium text-white text-base ml-2">Create your first invoice</span>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import InvoiceStatusComponent from '~/components/InvoiceStatusComponent'
import SearchDropdown from "~/components/invoices/SearchDropdown";
export default {
  name: 'SentInvoice',
  components: {SearchDropdown, InvoiceStatusComponent },
  async mounted (ctx) {
    const res = await this.$store.dispatch('invoice/getInvoices', { status: 'pending', workflowStatus: 'sent' })
    this.invoices = res
    // return { invoices: res }
  },
  data () {
    return {
      selectAll: false,
      exporting: false,
      checkedItems: [],
      invoices: null
    }
  },
  watch: {
    checkedItems (newVal) {
      if (newVal.length !== this.invoices.length) { this.selectAll = false } else if (newVal.length === this.invoices.length) { this.selectAll = true }
    },
    selectAll (newVal) {
      if (newVal) {
        this.checkedItems = [...this.invoices.map(invoice => invoice._id)]
      } else if (!newVal && this.checkedItems.length === this.invoices.length) {
        this.checkedItems = []
        this.selectAll = false
      }
    }
  },
  methods: {
    downloadDocument (response) {
      const url = window.URL.createObjectURL(new Blob([response], { type: 'application/vnd.ms-excel' }))
      const link = document.createElement('a')

      link.href = url
      link.setAttribute('download', 'Sent_Invoices.csv')
      document.body.appendChild(link)
      link.click()
    },
    async archive () {
      try {
        if (this.checkedItems.length) {
          await this.$store.dispatch('invoice/archive', [...this.checkedItems])
          this.$toasted.success('Records archived')
        } else {
          this.$toasted.error('No record selected')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async exportInvoice () {
      try {
        this.exporting = true
        const res = await this.$axios.$get(`${process.env.BASEURL_HOST}/invoice/export`, {
          responseType: 'blob'
        })
        this.downloadDocument(res)
      } catch (e) {

      } finally {
        this.exporting = false
      }
    },
    displaySentInvoicePage (id) {
      this.$router.push(`/Invoices/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
input[type='checkbox'] {
  background: red !important;
  padding: 10rem;
}

.table{
  tbody {
    .active {
      @apply relative z-[2];
      &:after {
        content: "";
        @apply w-[99%] h-[95%] bg-blue-50 rounded-lg absolute top-0 left-0 ml-[6px];
      }
    }
    tr {
      td {
        @apply relative z-[2];
      }
      &:hover {
        &:after {
          content: "";
          @apply w-[99%] h-[95%] bg-blue-50 rounded-lg absolute top-0 left-0 ml-[6px];
        }
      }
    }
  }
}
</style>
