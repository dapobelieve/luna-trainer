<template>
  <div>
    <template v-if="invoices && invoices.length">
      <div class="tail-flex tail-mt-6 tail-px-3 tail-mb-5">
        <div class="actions">
        <span class="tail-cursor-pointer tail-mr-4 tail-inline-flex tail-items-center tail-text-sm tail-font-medium text-primary-color tail-text-base" to="/">
          <i class="ns-archive tail-mr-1"></i>
          <span>Archive</span>
        </span>
          <span @click="exportInvoice()" class="tail-cursor-pointer tail-inline-flex tail-items-center tail-text-sm tail-font-medium text-primary-color tail-text-base" to="/">
          <i class="ns-download tail-mr-1"></i>
          <span>Export</span>
        </span>
        </div>
      </div>
      <div class="tail-px-3">
        <table class="tail-table-auto tail-bg-white tail-w-full tail-text-xs tail-rounded-md">
          <thead class="">
            <tr class="tail-uppercase tail-tracking-wider tail-text-gray-500">
            <th class="tail-w-12  tail-py-4 tail-font-medium tail-pl-1">
              <div>
                <input v-model="selectAll" class="tail-cursor-pointer tail-h-5 tail-w-5 tail-border-grey-500" type="checkbox"  >
              </div>
            </th>
            <th class="tail-py-4 tail-font-medium tail-text-left tail-px-6 tail-w-3/6">Name</th>
            <th class="tail-py-4 tail-font-medium tail-px-6">INVOICE#</th>
            <th class="tail-py-4 tail-font-medium tail-px-6">CREATED</th>
            <th class="tail-py-4 tail-font-medium tail-px-6">AMOUNT</th>
            <th class="tail-py-4 tail-font-medium tail-px-6">STATUS</th>
          </tr>
          </thead>
          <tbody class="tail-px-8">
          <tr v-for="(data, index) in invoices" class="tail-text-center tail-text-gray-500 hover:tail-bg-blue-50 hover:tail-cursor-pointer" :class="[checkedItems.includes(data.customerId._id) ? 'tail-bg-blue-50' : '']">
            <td class="tail-w-12  tail-py-4 tail-font-medium tail-pl-1">
              <div>
                <AppCheckboxComponent :id="data._id" v-model="checkedItems" :value="data.customerId._id"  />
              </div>
            </td>
            <td class="tail-py-4 tail-text-left tail-px-6 tail-w-3/6">
              <div class="tail-flex tail-items-center">
                <ClientAvatar :clientInfo="data.customerId" />
                <div class="tail-ml-4">
                  <h6 class="tail-text-base tail-text-gray-700 tail-text-capitalize">{{ data.customerId.firstName }}  {{ data.customerId.lastName }}</h6>
                  <span class="tail-text-sm tail-text-gray-500">{{ data.customerId.email }}</span>
                </div>
              </div>
            </td>
            <td class="tail-py-4  tail-px-6">
              <div class="tail-text-base tail-text-gray-700">{{ data.invoiceNo }}</div>
            </td>
            <td class="tail-py-4  tail-px-6">
              <div class="tail-text-base tail-text-gray-700">
                {{ data.createdAt | date }}
              </div>
            </td>
            <td class="tail-py-4  tail-px-6">
              <div class="tail-text-base tail-text-gray-700">
                {{"\uFFE1"}}{{data.total}}
              </div>
            </td>
            <td class="tail-py-4 tail-px-6">
              <InvoiceStatusComponent status="paid" />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template v-else>
      <div class="tail-flex tail-justify-around">
        <div class="tail-mt-5 tail-text-center" style="margin-top: 12rem">
          <h4 class="tail-font-bold tail-text-gray-700 tail-mb-1">No clients yet</h4>
          <p class="tail-text-sm tail-text-gray-500 tail-mb-4">We want to make your world easier by connecting and <br> managing your invoicing and payments systems.</p>
          <button class="primary-color tail-rounded-lg tail-px-4 tail-py-2">
            <i class="ns-plus tail-text-white tail-text-2xl tail-text-lg"></i>
            <span class="tail-text-font-medium tail-text-white tail-text-base tail-ml-2">Create your first invoice</span>
          </button>
        </div>
      </div>
      
    </template>
    
  </div>
</template>

<script>
import InvoiceStatusComponent from "~/components/InvoiceStatusComponent";
export default {
  components: {InvoiceStatusComponent},
  data () {
    return {
      selectAll: false,
      checkedItems: [],
      invoices: null
    }
  },
  methods: {
    downloadDocument(response) {
      const url = window.URL.createObjectURL(new Blob([response], {type:'application/vnd.ms-excel'}));
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', 'Sent_Invoices.csv');
      document.body.appendChild(link);
      link.click();
    },
    async exportInvoice() {
      try {
        const res = await this.$axios.$get(`${process.env.BASEURL_HOST}/invoice/export`, {
          'responseType': 'blob'
        });
        this.downloadDocument(res)
      }catch (e) {
        
      }finally {
        
      }
    }
  },
  watch: {
    checkedItems(newVal) {
      if(newVal.length !== this.invoices.length) 
        this.selectAll = false
    },
    selectAll(newVal) {
      if(newVal) {
        this.checkedItems = [...this.invoices.map(invoice => invoice.customerId._id)]
      }
      else if(!newVal && this.checkedItems.length === this.invoices.length) {
        this.checkedItems = []
        this.selectAll = false
      }
    }
  },
  async asyncData(ctx) {
    let res = await ctx.store.dispatch('invoice/getInvoices', {status: 'sent'})
    return {invoices: res}
  }
}
</script>

<style lang="scss" scoped>
input[type=checkbox] {
  background: red;
}
</style>