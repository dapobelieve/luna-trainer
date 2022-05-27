<template>
  <div>
    <async-view>
      <div class="flex mt-1 mb-5">
        <div class="actions flex justify-between items-center w-full">
          <div>
            <!-- <span v-if="checkedItems.length > 0" class="cursor-pointer mr-4 inline-flex items-center font-medium text-primary-color text-base" to="/" @click="archive">
              <i class="fi-rr-archive mr-1"></i>
              <span>Archive</span>
            </span> -->
            <span v-if="!exporting && checkedItems.length > 0" class="cursor-pointer inline-flex items-center font-medium text-primary-color text-base" to="/" @click="exportInvoice()">
              <i class="fi-rr-download mr-1"></i>
              <span>Export</span>
            </span>
            <span v-else-if="exporting" class="cursor-pointer inline-flex items-center text-sm font-medium text-gray-400" to="/">
              <i class="fi-rr-download mr-1"></i>
              <span>Exporting...</span>
            </span>
          </div>
          <div class="flex">
            <SearchDropdown
              v-model="searchField"
              :fields="searchFields"
              :options="options"
              :selected="selected"
              @reset="resetTable"
              @selected="searchInvoice"
              v-if="filteredRecords && filteredRecords.length > 0 || this.filter.status || this.filter.customerUserId"
            >
              <template v-slot:selected-option="{selected}">
                <span v-if="searchField === 'Name'" class="flex">
                  <ClientAvatar :height="1" :width="1" :client-info="{firstName: selected.firstName}" />
                  <span class="text-xs text-gray-700 ml-2">
                    {{ selected.firstName }}
                  </span>
                </span>
                <span v-else>
                  <InvoiceStatusComponent v-if="searchField === 'Status'" class="my-0.5" :status="selected" />
                </span>
              </template>
              <template v-slot:option="{option}">
                <div class="flex client items-center client py-2 px-5 border border-b-0 border-r-0 border-l-0 border-gray-200 border-t hover:bg-gray-50 cursor-pointer">
                  <div v-if="searchField === 'Name'" class="flex">
                    <ClientAvatar :height="1" :width="1" :client-info="{firstName: option.firstName}" />
                    <span class="text-xs text-gray-700 ml-2">
                      {{ option.firstName }}
                    </span>
                  </div>
                  <InvoiceStatusComponent v-if="searchField === 'Status'" class="my-0.5" :status="option" />
                </div>
              </template>
            </SearchDropdown>
          </div>
        </div>
      </div>
      <GwPagination :total-items="filteredRecords.length" v-if="filteredRecords && filteredRecords.length > 0 || this.filter.status || this.filter.customerUserId">
        <template v-slot:content>
          {{ quickSearchQuery }}
          <div class="overflow-scroll lg:overflow-hidden bg-white rounded-md">
            <Async :state="$fetchState">
              <template>
                <table class="table-auto table w-full text-xs" v-if="filteredRecords && filteredRecords.length">
                  <thead class="">
                    <tr class="uppercase tracking-wider text-gray-500">
                      <th class="w-12 py-4 font-medium pl-1">
                        <div class="pl-3">
                          <input v-model="selectAll" class="cursor-pointer h-4 w-4 border-grey-500" type="checkbox">
                        </div>
                      </th>
                      <th class="py-4 font-medium text-left px-6 w-5/12">
                        Name
                      </th>
                      <th class="py-4 font-medium text-left px-6">
                        INVOICE#
                      </th>
                      <th class="py-4 font-medium text-left px-6">
                        CREATED
                      </th>
                      <th class="py-4 font-medium text-left px-6">
                        AMOUNT
                      </th>
                      <th class="py-4 font-medium text-left px-6">
                        STATUS
                      </th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr
                      v-for="(data) in filteredRecords"
                      :key="data._id"
                      class="text-center relative text-gray-500 hover-row hover:cursor-pointer"
                      :class="[checkedItems.includes(data._id) ? 'active' : '']"
                      @click="selectedInvoice=data, $modal.show('invoice-details')"
                    >
                      <td class="w-12 py-4 font-medium pl-3">
                        <AppCheckboxComponent :id="data._id" v-model="checkedItems" :value="data._id" />
                      </td>
                      <td class="py-4 text-left px-6">
                        <div class="flex items-center">
                          <ClientAvatar :client-info="{firstName:data.customerId.name.split(' ')[0], lastName: data.customerId.name.split(' ')[1] }" />
                          <div class="ml-4">
                            <h6 class="text-base text-gray-700 text-capitalize">
                              {{ data.customerId.name.split(' ')[0] }}  {{ data.customerId.name.split(' ')[1] }}
                            </h6>
                            <span class="text-sm text-gray-500">{{ data.customerId.email }}</span>
                          </div>
                        </div>
                      </td>
                      <td class="py-4 px-6 text-left">
                        <div class="text-base text-gray-700">
                          {{ data.invoiceNo }}
                        </div>
                      </td>
                      <td class="py-4 px-6 text-left">
                        <div class="text-xs md:text-base text-gray-700">
                          {{ data.createdAt | date }}
                        </div>
                      </td>
                      <td class="py-4 px-6 text-left">
                        <div class="text-sm md:text-base text-gray-700">
                          {{ data.total | amount }}
                        </div>
                      </td>
                      <td class="py-4 px-6 text-left">
                        <InvoiceStatusComponent :status="data.status" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="table-auto table w-full text-xs" v-else>
                  <thead class="">
                    <tr class="uppercase tracking-wider text-gray-500">
                      <th class="w-12 py-4 font-medium pl-1">
                        <div class="pl-3">
                          <input v-model="selectAll" class="cursor-pointer h-4 w-4 border-grey-500" type="checkbox">
                        </div>
                      </th>
                      <th class="py-4 font-medium text-left px-6 w-5/12">
                        Name
                      </th>
                      <th class="py-4 font-medium text-left px-6">
                        INVOICE#
                      </th>
                      <th class="py-4 font-medium text-left px-6">
                        CREATED
                      </th>
                      <th class="py-4 font-medium text-left px-6">
                        AMOUNT
                      </th>
                      <th class="py-4 font-medium text-left px-6">
                        STATUS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="text-center text-gray-500">
                      <td class="w-12 py-4 font-medium pl-3" colspan="6">
                        No records found
                       </td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </Async>
          </div>
        </template>
      </GwPagination>
      <div v-else class="flex justify-around">
        <div class="mt-5 text-center">
          <h4 class="font-bold text-gray-700 mb-1">
            No Sent Payment Request yet
          </h4>
          <p class="text-sm text-gray-500 mb-4">
            We want to make your world easier by connecting and <br> managing your payment requests and payments systems.
          </p>
          <button class="primary-color rounded-lg px-4 py-2" type="button" @click="$router.push({ name: 'payments-request', })">
            <i class="fi-rr-plus text-white"></i>
            <span class="text-font-medium text-white text-base ml-2">New Payment Request</span>
          </button>
        </div>
      </div>
      <InvoiceDetailModal id="invoice-details" :invoice="selectedInvoice" @close="$modal.hide('invoice-details')" />
    </async-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SearchDropdown from '~/components/invoices/SearchDropdown'
import InvoiceDetailModal from '~/components/invoices/InvoiceDetailModal'
export default {
  name: 'SentInvoice',
  components: { InvoiceDetailModal, SearchDropdown },
  data () {
    return {
      selectedInvoice: null,
      searchField: 'Name',
      searchFields: ['Name', 'Status'],
      selectAll: false,
      quickSearchQuery: '',
      selected: '',
      exporting: false,
      options: [],
      allClients: [],
      checkedItems: [],
      filter: {
        workflowStatus: 'sent',
        customerUserId: '',
        status: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      hasActivePaymentMethods: 'payment-methods/hasActivePaymentMethods',
      invoices: 'invoice/getAllInvoices'
    }),
    filteredRecords () {
      let records = this.invoices
      if (records && records.length > 0) {
        records = records.filter((row) => {
          return Object.keys(row).some((key) => {
            return String(row[key]).toLowerCase().includes(this.quickSearchQuery.toLowerCase())
          })
        })
        return records
      }
      return records
    }
  },
  async fetch () {
    await this.getInvoices(this.filter)
  },
  watch: {
    $route: {
      immediate: true,
      async handler (val) {
        console.log('val', val)
        if (Object.keys(val.query).length > 0) {
          if (val.query.name) {
            await this.getClients()
            this.selected = this.allClients.filter(client => client.userId === val.query.name)[0]
            this.filter.customerUserId = val.query.name
            await this.$fetch()
            this.searchField = 'Name'
            this.options = this.allClients
          } else if (val.query.status) {
            this.filter.status = val.query.status
            await this.$fetch()
            this.searchField = 'Status'
            this.selected = val.query.status === 'paid_awaiting_confirmation' ? 'Awaiting' : this.filter.status
            this.options = ['Pending', 'Paid', 'Overdue', 'Outstanding', 'Awaiting']
          }
        } else {
          await this.getClients()
          this.searchField = 'Name'
          this.options = this.allClients
          this.$fetch()
        }
      },
      deep: true
    },
    searchField: {
      immediate: true,
      async handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.clearFilter(oldVal)
        }
        if (newVal === 'Name') {
          await this.getClients()
          this.options = this.allClients
        } else if (newVal === 'Status') {
          this.options = ['Pending', 'Paid', 'Overdue', 'Outstanding', 'Awaiting']
        }
      }
    },
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
  async beforeMount () {
    try {
      const id = this.$route.params.id
      if (id) {
        const { data } = await this.getSingleInvoice(id)
        this.selectedInvoice = data
        this.$modal.show('invoice-details')
      }
      await this.checkPaymentMethods()
    } catch (e) {
      console.log({ e })
    }
  },
  methods: {
    ...mapActions({
      getPaymentMethods: 'payment-methods/getPaymentMethods',
      getSingleInvoice: 'invoice/getSingleInvoice',
      getInvoices: 'invoice/getInvoices'
    }),
    async checkPaymentMethods () {
      await this.getPaymentMethods()
      if (!this.hasActivePaymentMethods) { this.$modal.show('payment-method-status') }
    },
    async getClients () {
      if (!this.allClients || this.allClients.length < 1) {
        const res = await this.$store.dispatch('client/allConciseClients')
        this.allClients = res.data
      }
    },
    async resetTable () {
      this.clearFilter()
      this.searchField = 'Name'
      await this.getClients()
      this.options = this.allClients
    },
    clearFilter (event) {
      this.filter.status = ''
      this.filter.customerUserId = ''
      this.selected = ''
      this.$router.push({ name: 'payments-requests-sent' })
    },
    searchInvoice (option) {
      if (this.searchField === 'Name') {
        this.$router.push({ name: 'payments-requests-sent', query: { name: option.userId } })
      } else {
        const _option = option === 'Awaiting' ? 'paid_awaiting_confirmation' : option
        this.$router.push({ name: 'payments-requests-sent', query: { status: _option.toLowerCase() } })
      }
    },
    async archive () {
      try {
        if (this.checkedItems.length) {
          await this.$store.dispatch('invoice/archive', [...this.checkedItems])
          this.$lunaToast.success('Invoices archived')
        } else {
          this.$lunaToast.error('No record selected')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async exportInvoice () {
      try {
        this.exporting = true
        const res = await this.$axios.$get(`${process.env.PAYMENT_HOST_URL}/invoice/export`, {
          responseType: 'blob'
        })
        this.downloadDocument(res)
      } catch (e) {

      } finally {
        this.exporting = false
      }
    },
    downloadDocument (response) {
      const url = window.URL.createObjectURL(new Blob([response], { type: 'application/vnd.ms-excel' }))
      const link = document.createElement('a')

      link.href = url
      link.setAttribute('download', 'Sent_Invoices.csv')
      document.body.appendChild(link)
      link.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.client >>> span {
  ::v-deep span {
    font-size: 9px !important;
  }
}
input[type='checkbox'] {
  background: red !important;
  padding: 10rem;
}
</style>
