<template>
  <div>
    <async-view>
      <div class="flex mt-1 mb-5">
        <div class="actions flex justify-between items-center w-full">
          <div>
            <span v-if="checkedItems.length > 0" class="cursor-pointer mr-4 inline-flex items-center text-sm font-medium text-primary-color text-base" to="/" @click="archive">
              <i class="fi-rr-archive mr-1"></i>
              <span>Archive</span>
            </span>
            <span v-if="!exporting && checkedItems.length > 0" class="cursor-pointer inline-flex items-center text-sm font-medium text-primary-color text-base" to="/" @click="exportInvoice()">
              <i class="fi-rr-download mr-1"></i>
              <span>Export</span>
            </span>
            <span v-else-if="exporting" class="cursor-pointer inline-flex items-center text-sm font-medium text-gray-400 text-base" to="/">
              <i class="fi-rr-download mr-1"></i>
              <span>Exporting...</span>
            </span>
          </div>
          <div class="flex">
            <SearchDropdown :fields="searchFields" :options="options" @field-selected="searchField=$event" @selected="searchInvoice">
              <template v-slot:selected-option="{selected}">
                <span v-if="searchField === 'Name'" class="flex">
                  <ClientAvatar :height="1" :width="1" :client-info="{firstName: selected.name.split(' ')[0], lastName: selected.name.split(' ')[1]}" />
                  <span class="text-xs text-gray-700 ml-2">
                    {{ selected.name.split(' ')[0] }}  {{ selected.name.split(' ')[1] }}
                  </span>
                </span>
                <span v-else>
                  <InvoiceStatusComponent v-if="searchField === 'Status'" class="my-0.5" :status="selected" />
                </span>
              </template>
              <template v-slot:option="{option}">
                <div class="flex client items-center client py-2 px-5 border border-b-0 border-r-0 border-l-0 border-gray-200 border-t hover:bg-gray-50 cursor-pointer">
                  <div v-if="searchField === 'Name'" class="flex">
                    <ClientAvatar :height="1" :width="1" :client-info="{firstName: option.name.split(' ')[0], lastName: option.name.split(' ')[1]}" />
                    <span class="text-xs text-gray-700 ml-2">
                      {{ option.name.split(' ')[0] }}  {{ option.name.split(' ')[1] }}
                    </span>
                  </div>
                  <InvoiceStatusComponent v-if="searchField === 'Status'" class="my-0.5" :status="option" />
                </div>
              </template>
            </SearchDropdown>
          </div>
        </div>
      </div>
      <GwPagination v-if="filteredRecords && filteredRecords.length" :total-items="filteredRecords.length">
        <template v-slot:content>
          {{ quickSearchQuery }}
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
                <tr v-for="(data) in filteredRecords" :key="data._id" class="text-center relative text-gray-500 hover-row hover:cursor-pointer" :class="[checkedItems.includes(data._id) ? 'active' : '']" @click="$router.push({name: 'invoice-id-view', params: {id: data._id}})">
                  <td class="w-12 py-4 font-medium pl-3">
                    <AppCheckboxComponent :id="data._id" v-model="checkedItems" :value="data._id" />
                  </td>
                  <td class="py-4 text-left px-6 w-3/6">
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
                    <InvoiceStatusComponent :status="data.status" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </GwPagination>
      <div v-else class="flex justify-around">
        <div class="mt-5 text-center">
          <h4 class="font-bold text-gray-700 mb-1">
            No Sent Invoices yet
          </h4>
          <p class="text-sm text-gray-500 mb-4">
            We want to make your world easier by connecting and <br> managing your invoicing and payments systems.
          </p>
          <button class="primary-color rounded-lg px-4 py-2" type="button" @click="$router.push({ name: 'invoice' })">
            <i class="fi-rr-plus text-white"></i>
            <span class="text-font-medium text-white text-base ml-2">New Invoice</span>
          </button>
        </div>
      </div>
    </async-view>
  </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'
import SearchDropdown from '~/components/invoices/SearchDropdown'
export default {
  name: 'SentInvoice',
  components: { SearchDropdown },
  data () {
    return {
      searchField: 'Name',
      searchFields: ['Name', 'Status'],
      selectAll: false,
      quickSearchQuery: '',
      exporting: false,
      options: [],
      checkedItems: [],
      invoices: []
    }
  },
  computed: {
    ...mapGetters({
      "hasActivePaymentMethods":"payment-methods/hasActivePaymentMethods",
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
  watch: {
    searchField: {
      handler (newVal) {
        if (newVal === 'Name') {
          this.options = this.filteredRecords.map(invoice => invoice.customerId)
        } else if (newVal === 'Status') {
          this.options = ['Pending', 'Paid', 'Overdue', 'Outstanding']
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
  async mounted (ctx) {
    try {
      this.checkPaymentMethods()
      const res = await this.$store.dispatch('invoice/getInvoices', { workflowStatus: 'sent' })
      this.invoices = res

      this.options = this.filteredRecords.map(invoice => invoice.customerId)
    } catch (e) {
      console.log({ e })
    }
  },
  methods: {
    ...mapActions({"getPaymentMethods":"payment-methods/getPaymentMethods"}),
    async checkPaymentMethods(){
      // if the user does not have any payment method we show a welcome and then
      // take this to a middleware 
      await this.getPaymentMethods();
      if(!this.hasActivePaymentMethods) this.$modal.show("payment-method-status")
    },
    async searchInvoice (option) {
      try {
        let res
        if (this.searchField === 'Name') {
          res = await this.$store.dispatch('invoice/getFetchCustomerInvoice', { workflowStatus: 'sent', customerId: option._id })
          this.invoices = [...res.data]
        } else {
          res = await this.$store.dispatch('invoice/getInvoices', { workflowStatus: 'sent', status: option.toLowerCase() })
          this.invoices = res
        }
      } catch (e) {
        console.log({ e })
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
        const res = await this.$axios.$get(`${process.env.BASEURL_HOST}/invoice/export`, {
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
    },
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
