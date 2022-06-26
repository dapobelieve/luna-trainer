<template>
  <div class="pt-2">
    <async-view>
      <div class="tabs mb-6">
        <button v-for="(status, statusIndex) in statuses" :key="statusIndex" class="px-3 py-2" @click="filterByStatus(status)">
          {{ status }}
        </button>
      </div>
      <LunaTable
        v-if="invoices.data"
        v-model="filterObj"
        class="mb-6"
        check-able
        :sort="sort"
        :current-page="currentPage"
        :total-pages="invoices && invoices.size"
        :headings="headings"
        :filter-types="filterTypes"
        :table-data="filteredData"
        @page-clicked="fetchPage"
        @sort-column="sort = $event"
      >
        <template v-slot:tableRows="{rowData}">
          <td class="w-4/12">
            <div class="flex justify-center items-center">
              <ClientAvatar class="mr-3" :width="2.5" :height="2.5" :client-info="{firstName: rowData.customerId.firstName, imgUrl: rowData.customerId.imgURL}" />
              <div class="text-sm text-slate-700 font-medium w-40">
                {{ rowData.customerId.firstName }}
                {{ rowData.customerId.lastName }}
              </div>
            </div>
          </td>
          <td class="w-1/12">
            <div>
              {{ rowData.total }}
            </div>
          </td>
          <td>
            <div>
              <InvoiceStatusComponent class="py-1.5" :status="rowData.status" />
            </div>
          </td>
          <td>
            <div>
              {{ rowData.invoiceNo || '---' }}
            </div>
          </td>
          <td>
            <div>
              {{ formatDate(rowData.dueDate, 'MMM d') }}
            </div>
          </td>
          <td>
            <div>
              {{ formatDate(rowData.createdAt, 'MMM d, h:m b') }}
            </div>
          </td>
          <td class="w-1/12">
            <div>
              <button type="button">
                <img src="~/assets/img/svgs/ellipsis.svg" alt="" />
              </button>
            </div>
          </td>
        </template>
      </LunaTable>
      <InvoiceDetailModal id="invoice-details" :invoice="selectedInvoice" @close="$modal.hide('invoice-details')" />
    </async-view>
  </div>
</template>

<script>
import _orderby from 'lodash.orderby'
import { format } from 'date-fns'
import { mapActions, mapGetters } from 'vuex'
import InvoiceDetailModal from '~/components/invoices/InvoiceDetailModal'
import LunaTable from '~/components/table/LunaTable'
export default {
  name: 'SentInvoice',
  components: { LunaTable, InvoiceDetailModal },
  data () {
    return {
      statuses: ['All', 'Sent', 'Draft', 'Paid', 'Pending', 'Overdue'],
      selectedInvoice: null,
      filterTypes: [
        // 'amount',
        // 'client',
        // 'date',
        'status',
        'date-range',
        'date',
        'amount'
      ],
      headings: [
        {
          text: 'Client',
          value: 'one', // value to be passed to the sort function(should be the key in a data object)
          sortable: false
        },
        {
          text: 'Amount',
          value: 'total',
          sortable: true
        },
        {
          text: 'Status',
          value: 'status',
          sortable: false
        },
        {
          text: 'Invoice Number',
          value: 'invoiceNo',
          sortable: true
        },
        {
          text: 'Due',
          value: 'dueDateEpoch',
          sortable: true
        },
        {
          text: 'Created',
          value: 'createdAt',
          sortable: true
        },
        {
          text: '',
          value: '',
          sortable: false
        }
      ],
      sort: {},
      exporting: false,
      currentPage: 1,
      options: [],
      filterObj: {},
      allClients: [],
      checkedItems: [],
      filter: {
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
    filteredData () {
      let records = this.invoices.data

      if (this.sort?.value) {
        records = _orderby(records, (i) => {
          return i[this.sort.value]
        }, this.sort.order)
      }

      return records
    }
  },
  async fetch () {
    // eslint-disable-next-line no-unused-expressions
    this.filter.status.includes('all') ? this.filter.status = '' : null
    await this.getInvoices(this.filter)
  },
  watch: {
  },
  methods: {
    async filterByStatus (status) {
      this.filterObj.status = status.toLowerCase()
      this.filter.status = status.toLowerCase()
      await this.$fetch()
    },
    async fetchPage (data) {
      this.currentPage = data
      this.filter.page = data
      await this.$fetch(this.filter)
    },
    ...mapActions({
      getPaymentMethods: 'payment-methods/getPaymentMethods',
      getSingleInvoice: 'invoice/getSingleInvoice',
      getInvoices: 'invoice/getInvoices'
    }),
    sortColumn (sortData) {
      this.sort.key = sortData.key
      this.sort.order = sortData.order
    },
    formatDate (date, formatStr) {
      return format(new Date(date), formatStr)
    },
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
          responseType: 'blob',
          params: {
            ids: [...this.checkedItems]
          }
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

      this.$lunaToast.success(
        'Exported Successfully'
      )
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
  async mounted () {
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  &::after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: lightgrey;
    position: absolute;
    top: 124px;
    z-index: 9;
    left: 0
  }
}
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
