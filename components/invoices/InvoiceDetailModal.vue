<template>
  <modal
    name="invoice-details"
    class="p-0"
    :width="512"
    height="auto"
    :adaptive="true"
  >
    <div v-if="invoice" class="grid m-5">
      <div class="py-0">
        <div class="flex items-center mb-6">
          <h3 class="text-2xl">Invoice</h3>
          <span class="ml-auto">
            <i class="fi-rr-cross cursor-pointer mt-1 text-green-500" @click="$emit('close')"></i>
          </span>
        </div>
        <div class="mb-5">
          <p>To</p>
          <h3 class="font-medium text-xl">{{ invoiceCustomer }}</h3>
        </div>
        <div class="mb-10">
          <div v-if="invoiceStatus !== 'paid'" class="bg-gray-100 ring-1 ring-gray-200 rounded-md px-3 py-2">
            <table class="table-auto mb-6 table w-full bottom-border">
              <thead>
                <tr class="uppercase tracking-wide text- text-gray-500">
                  <th class="font-medium text-xs w-2/4 text-left">description</th>
                  <th class="font-medium text-xs w-1/4">quantity</th>
                  <th class="font-medium text-xs text-right w-1/4">amount</th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="item in invoiceServices">
                <td class="py-2 text-left font-bold">{{item.description}}</td>
                <td class="py-2 text-center">{{item.qty}}</td>
                <td class="py-2 text-right">£{{new Intl.NumberFormat().format(item.price)}}</td>
              </tr>
              </tbody>
            </table>
            <div class="flex h-20 mb-5 items-center text-2xl font-medium">
              <h3 class="">Total</h3>
              <h3 class="ml-auto font-bold">£{{invoiceTotal}}</h3>
            </div>
            <div class="text-sm flex items-center">
              <div class="h-1 w-1 bg-red-500 rounded-full mr-2"></div>
              Due on {{ dueDate }}
            </div>
          </div>
          <div v-else>
            <div class="mb-5 items-center bg-gray-100 ring-1 ring-gray-200 rounded-md px-3 py-2">
              <h3 class="font-light">Amount</h3>
              <h3 class="ml-auto font-bold text-3xl">£{{invoiceTotal}}</h3>
            </div>
          </div>
        </div>
        <div class="flex mb-8 bottom-border">
          <h3>Status</h3>
          <InvoiceStatusComponent class="ml-auto" status="paid" /> 
        </div>
        <div class="flex mb-8 bottom-border">
          <h3>Date Issued</h3>
          <h3 class="ml-auto">{{ issuedDate }}</h3>
        </div>
        <div class="flex mb-8 bottom-border">
          <h3>Paid Date</h3>
          <h3 class="ml-auto">{{ issuedDate }}</h3>
        </div>
        <template v-if="invoiceStatus === 'paid'">
          <div class="flex mb-8 bottom-border">
            <h3>Payment for</h3>
            <h3 class="ml-auto">???</h3>
          </div>
          <div class="flex mb-8 bottom-border">
            <h3>Payment Method</h3>
            <h3 class="ml-auto">{{ paymentMethod.type.toUpperCase() }}</h3>
          </div>
        </template>
        <div class="flex mb-8 bottom-border">
          <h3>Invoice No</h3>
          <h3 class="ml-auto">{{invoiceNo}}</h3>
        </div>
        <div  class="flex justify-end">
          <template v-if="invoiceStatus !== 'paid'">
            <button class="text-green-900 px-4 py-2 border mr-2">Cancel</button>
            <button class="text-green-900 px-4 py-2 border mr-2">Send Nudge</button>
            <button class="text-green-900 px-4 py-2 border">Mark as Paid</button>
          </template>
          <template v-else>
            <button class="text-green-900 px-4 py-2 border">Mark as unpaid</button>
          </template>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    invoice: {
      type: Object
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {},
  computed: {
    invoiceServices() {
      return this.invoice.items
    },
    invoiceTotal() {
      const total = this.invoiceServices.reduce((acc, item) => {
        acc += item.qty * item.price
        return acc
      }, 0)
      return new Intl.NumberFormat().format(total)
    },
    desc() {
      // return this.invoice.d
    },
    paymentMethod() {
      return this.invoice.supportedPaymentMethods[0]
    },
    status() {
      return this.invoice.status
    },
    issuedDate() {
      return this.$dateFns.format(new Date(this.invoice.createdAt), 'd/M/yy')
    },
    invoiceStatus () {
      return this.invoice && this.invoice.status
    },
    invoiceNo() {
      return `#${this.invoice.invoiceNo}`
    },
    dueDate() {
      return this.$dateFns.format(new Date(this.invoice.dueDate), 'MMM d, y')
    },
    invoiceCustomer () {
      return `${this.invoice.customerId.firstName} ${this.invoice.customerId.lastName || ''}`
    },
  }
}
</script>

<style scoped lang="scss">
.table-auto {
  thead tr {
    border-bottom: 15px solid transparent;
  }
}
.bottom-border {
  position: relative;
  &:before {
    content: "";
    width: 100%;
    background-color: #E2E8F0;
    height: 1px;
    bottom: -15px;
    left: 0;
    position: absolute;
  }
}
</style>
