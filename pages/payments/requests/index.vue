<template>
  <div>
    <PageHeader>
      <template v-slot:title>
        <span class="font-normal">Payments</span>
      </template>
      <template v-slot:buttons>
        <div class="flex items-center">
          <button v-if="showExport" class="flex items-center mr-2" @click="exportInvoice">
            <template v-if="!exporting">
              <i class="fi-rr-download text-[#3B82F6] mt-1"></i>
              <span class="mx-2 text-[#3B82F6]">Export</span>
            </template>
            <template v-else>
              Exporting...
            </template>
          </button>
          <NuxtLink
            id="plus"
            :to="{ name: 'payments-request'}"
            exact-active-class="active"
            class="grid place-content-center primary-color h-8 w-8 text-sm font-medium rounded-lg shadow-sm hover:bg-blue-500 focus:outline-none "
          >
            <i class="fi-rr-plus mt-1 text-base text-white"></i>
          </NuxtLink>
        </div>
      </template>
    </PageHeader>
    <div class="w-full p-4 pb-24 bg-gray-100 flex justify-center minimum-height ">
      <div class="max-w-xl md:max-w-4xl 2xl:max-w-7xl lg:max-w-full w-full">
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
              class="mb-6"
              :loading="loading"
              check-able
              :filter-types="filterTypes"
              :total-pages="invoices && invoices.size"
              :headings="headings"
              :table-data="filteredData"
              @checked-items="showExport = true; exportItems=$event"
              @table-changed="updateTable"
              @item-clicked="itemClicked"
            >
              <template v-slot:tableRows="{ rowData, setActiveItem, activeRow: optionOpen }">
                <td class="w-3/12">
                  <div class="flex justify-start ml-5 items-center">
                    <ClientAvatar class="mr-3" :width="2.5" :height="2.5" :client-info="{firstName: rowData.customerId.firstName, imgUrl: rowData.customerId.imgURL}" />
                    <div class="text-sm text-slate-700 text-left font-medium w-40">
                      {{ rowData.customerId.firstName }}
                      {{ rowData.customerId.lastName }}
                    </div>
                  </div>
                </td>
                <td class="flex justify-start ml-5 items-center">
                  <div>
                    {{ rowData.total | amount }}
                  </div>
                </td>
                <td>
                  <div v-if="rowData.workflowStatus === 'draft'" class="flex ml-4">
                    <InvoiceStatusComponent class="py-1.5" status="draft" />
                  </div>
                  <div v-else class="flex ml-4">
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
                    {{ rowData.createdAt | howLongAgo }}
                  </div>
                </td>
                <td class="w-1/12">
                  <div>
                    <div v-if="clientActionLoading && activeId == rowData._id" class="flex justify-center">
                      <SingleLoader />
                    </div>
                    <button v-else type="button" @click.stop="setActiveItem(rowData._id), activeId = rowData._id">
                      <img src="~/assets/img/svgs/ellipsis.svg" alt="" />
                    </button>
                    <ClickOutside :do="() => { setActiveItem('') }">
                      <div
                        v-show="optionOpen == rowData._id"
                        class="top-[1] absolute right-[33px] w-40 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[500]"
                      >
                        <div class="py-2 flex flex-col" role="none">
                          <button v-if="rowData.status === 'paid'" type="button" class="dropdown-button" @click.stop="downloadInvoice(rowData), setActiveItem()">
                            Download PDF
                          </button>
                          <button type="button" class="dropdown-button" @click.stop="copyId(rowData._id), setActiveItem('')">
                            Copy payment ID
                          </button>
                        </div>
                      </div>
                    </ClickOutside>
                  </div>
                </td>
              </template>
            </LunaTable>
            <InvoiceDetailModal id="invoice-details" :invoice="selectedInvoice" @close="$modal.hide('invoice-details')" />
          </async-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { mapActions, mapGetters } from 'vuex'
import InvoiceDetailModal from '~/components/invoices/InvoiceDetailModal'
import LunaTable from '~/components/table/LunaTable'
import ClickOutside from '~/components/util/ClickOutside'
export default {
  name: 'SentInvoice',
  components: { ClickOutside, LunaTable, InvoiceDetailModal },
  inject: ['showExport'],
  data () {
    return {
      exportItems: [],
      showExport: false,
      clientActionLoading: false,
      activeId: '',
      statuses: ['all', 'sent', 'draft', 'paid', 'pending', 'overdue'],
      selectedInvoice: null,
      loading: false,
      filterTypes: [
        {
          type: 'select',
          label: 'Status',
          value: 'status',
          options: [
            {
              text: 'All',
              value: 'all'
            },
            {
              text: 'Sent',
              value: 'sent'
            },
            {
              text: 'Draft',
              value: 'draft'
            },
            {
              text: 'Paid',
              value: 'paid'
            },
            {
              text: 'Pending',
              value: 'pending'
            },
            {
              text: 'Overdue',
              value: 'overdue'
            }
          ],
          default: 'all'
        },
        {
          type: 'date-range',
          label: 'Date range',
          value: 'createdAt',
          default: {
            start: new Date(),
            end: new Date()
          }
        }
      ],
      filterList: {},
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
          sortable: false
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
      options: [],
      allClients: [],
      checkedInvoices: []
    }
  },
  watch: {},
  computed: {
    statusHasRoute () {
      return this.$route.query.status
    },
    ...mapGetters({
      hasActivePaymentMethods: 'payment-methods/hasActivePaymentMethods',
      invoices: 'invoice/getAllInvoices'
    }),
    filteredData () {
      const records = this.invoices.data
      return records
    }
  },
  methods: {
    itemChecked (result) {
      this.checkedInvoices = result
      this.$emit('change', result)
    },
    async updateTable (filterList) {
      try {
        this.loading = true
        if (['draft', 'sent'].includes(filterList.status)) {
          filterList.workflowStatus = filterList.status
          filterList.status = 'pending'
        }
        filterList.status === 'all'
          ? (filterList.status = '')
          : filterList.status
        await this.getInvoices({ ...filterList })
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    copyId (text) {
      const el = document.createElement('textarea')
      el.value = text
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.$lunaToast.show('Copied to clipboard', {
        timeout: 1000
      })
    },
    async downloadInvoice (item) {
      try {
        this.clientActionLoading = true
        const res = await this.$axios.$get(`${process.env.PAYMENT_HOST_URL}/invoice/download/pdf/${item._id}`, {
          responseType: 'blob'
        })
        this.download(res, 'application/pdf', `${item.invoiceNo}.pdf`)
        this.$lunaToast.success('Invoice Downloaded ')
      } catch (e) {
        this.$lunaToast.error(e.message)
      } finally {
        this.clientActionLoading = false
      }
    },
    download (file, mimetype, filename) {
      const blob = new Blob([file], {
        type: mimetype
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
    },
    itemClicked (item) {
      if (item.workflowStatus === 'draft') {
        location.href = `/payments/request/${item._id}`
      } else {
        this.selectedInvoice = item
        this.$modal.show('invoice-details')
      }
    },
    filterByStatus (status) {
      this.$router.push({
        name: this.$route.name,
        query: {
          ...this.$route.query,
          status
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
      if (!this.hasActivePaymentMethods) {
        this.$modal.show('payment-method-status')
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
      const ids = [...this.exportItems]
      try {
        this.exporting = true
        const res = await this.$axios.$get(`${process.env.PAYMENT_HOST_URL}/invoice/export?ids=[${ids}]`, {
          responseType: 'blob'
        })
        this.download(res, 'application/vnd.ms-excel', 'invoices.csv')
        this.$lunaToast.success('Invoices exported')
      } catch (e) {
        console.log(e)
        this.$lunaToast.error(e.message)
      } finally {
        this.exporting = false
      }
    }
  },
  async mounted () {
    try {
      await this.checkPaymentMethods()
      await this.getInvoices({})
    } catch (e) {
      this.$lunaToast.error(e.message)
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
<style lang='scss' scoped>
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
    left: 0;
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
