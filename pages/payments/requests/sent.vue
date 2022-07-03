<template>
  <div class="pt-2">
    <async-view>
      <div class="mb-4 overflow-x-auto">
        <div class="tasbs w-72 flex">
          <div v-for="(status, statusIndex) in statuses" :key="statusIndex" role="presentation" class="flex items-center justify-center">
            <a class="px-4 cursor-pointer relative" style="min-width: 56px" @click="filterByStatus(status)">
              <div class="pt-4 pb-4 relative flex justify-center items-center">
                <span class="select-none">{{ status | capitalize }}</span>
                <div v-show="statusHasRoute === status || (status === 'all' && !statusHasRoute )" class="indicator absolute bottom-0 h-[4px] bg-blue-500"></div>
              </div>
            </a>
          </div>
        </div>
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
          <td class="w-3/12" align="left">
            <div class="flex justify-start ml-5 items-center">
              <ClientAvatar class="mr-3" :width="2.5" :height="2.5" :client-info="{firstName: rowData.customerId.firstName, imgUrl: rowData.customerId.imgURL}" />
              <div class="text-sm text-slate-700 font-medium w-40">
                {{ rowData.customerId.firstName }}
                {{ rowData.customerId.lastName }}
              </div>
            </div>
          </td>
          <td class="w-1/12 flex justify-start ml-5">
            <div>
              {{ rowData.total }}
            </div>
          </td>
          <td>
            <div>
              <InvoiceStatusComponent class="py-1.5" :status="rowData.status" />
            </div>
          </td>
          <td class="w-2/12">
            <div class="justify-start ml-5 flex">
              {{ rowData.invoiceNo || '---' }}
            </div>
          </td>
          <td>
            <div class="justify-start ml-5 flex">
              {{ formatDate(rowData.dueDate, 'MMM d') }}
            </div>
          </td>
          <td>
            <div class="justify-start ml-5 flex">
              {{ formatDate(rowData.createdAt, 'MMM d, h:m b') }}
            </div>
          </td>
          <td class="w-1/12"> 
            <div >
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
  provide() {
    return {
      filterTypes: this.filterTypes,
      number: this.number
    }
  },
  components: { LunaTable, InvoiceDetailModal },
  data () {
    return {
      statuses: ['all', 'sent', 'draft', 'paid', 'pending', 'overdue'],
      selectedInvoice: null,
      filterTypes: [
        // 'amount',
        // 'client',
        // 'date',
        'status',
        'date-range'
        // 'date',
        // 'amount'
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
      currentPage: this.$route.query.page || 1,
      options: [],
      filterObj: {},
      demo: '',
      allClients: [],
      checkedItems: [],
      filter: {
        customerUserId: '',
        page: 1
      }
    }
  },
  watch: {
    sort: {
      deep: true,
      handler (val) {
        const order = val.order === 'asc' ? '' : '-'
        this.$router.push({
          query: {
            ...this.$route.query,
            sort: `${order}${val.value}`
          }
        })
      }
    },
    filterObj: {
      // immediate: true,
      deep: true,
      handler (val) {
        const query = {}
        if (Object.keys(val).length > 0) {
          for (const key in val) {
            query[key] = key === 'status' ? val[key].toLowerCase() : val[key]
          }
          this.$router.push({
            query: {
              ...this.$route.query,
              ...query
            }
          })
        } else {
          this.$router.push({
            name: this.$route.name,
            ...this.$route.query,
            status: 'all'
          })
        }
      }
    },
    '$route.query': {
      deep: true,
      immediate: true,
      async handler (query) {
        const { page, status } = query
        this.filter.page = this.currentPage
        this.filter.status = status === 'all' ? '' : status
        await this.$fetch()
      }
    }
  },
  computed: {
    statusHasRoute() {
      return this.$route.query.status
    },
    ...mapGetters({
      hasActivePaymentMethods: 'payment-methods/hasActivePaymentMethods',
      invoices: 'invoice/getAllInvoices'
    }),
    activeStatus () {
      return this.filterObj.status || 'All'
    },
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
    this.filter.status === 'all' ? this.filter.status = '' : this.filter.status
    await this.getInvoices(this.filter)
  },
  methods: {
    filterByStatus (status) {
      // this.filterObj = Object.assign({}, this.filterObj, {
      //   status
      // })
    },
    fetchPage (data) {
      this.$router.push({
        name: this.$route.name,
        query: {
          ...this.$route.query,
          page: data
        }
      })
    },
    ...mapActions({
      getPaymentMethods: 'payment-methods/getPaymentMethods',
      getSingleInvoice: 'invoice/getSingleInvoice',
      getInvoices: 'invoice/getInvoices'
    }),
    formatDate (date, formatStr) {
      return format(new Date(date), formatStr)
    },
    async checkPaymentMethods () {
      await this.getPaymentMethods()
      if (!this.hasActivePaymentMethods) { this.$modal.show('payment-method-status') }
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
  }
}
</script>
<style lang="scss" scoped>
.indicator {
  height: 4px;
  align-self: center;
  display: inline-flex;
  position: absolute;
  bottom: 0;
  min-width: 35px;
  width: 100%;
  border-radius: 9999px;
}
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
