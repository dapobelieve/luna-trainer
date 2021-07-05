<template>
  <div class="right-card tail-px-10 tail-py-8 tail-rounded-lg">
    <h1 class="tail-font-medium tail-text-xl tail-pt-2">
      Preview
    </h1>
    <div class="tail-pb-4">
      <span
        class="tail-text-gray-400 tail-text-sm"
      >A short description about this section</span>
    </div>
    <div class="tail-flex tail-pb-4">
      <div class="">
        <span class="tail-text-gray-500">Email</span>
      </div>
      <div class="tail-px-5">
        <span>Invoice PDF</span>
      </div>
    </div>
    <div class="tail-bg-white tail-rounded-md tail-p-8">
      <div class="tail-pb-4 tail-grid tail-grid-cols-2 tail-gap-8">
        <div>
          <h1 class="tail-text-xl tail-font-semibold">
            {{ $auth.user.businessName }}
          </h1>
          <span class="tail-text-gray-500 tail-text-xs">+44 000 000 0000</span>
        </div>
        <div class="tail-text-right">
          <h1 class="tail-text-xl tail-font-medium tail-text-gray-500">
            Invoice
          </h1>
          <p class="tail-text-gray-500 tail-text-xs">
            Invoice No.: <span class="tail-ml-3">#########-##</span>
          </p>
          <p class="tail-text-gray-500 tail-text-xs">
            Date of Issue:  <span class="tail-ml-3">{{ new Date().toDateString() }}</span>
          </p>
          <p class="tail-text-gray-500 tail-text-xs">
            Date Due:  <span class="tail-ml-3">{{ invoiceDueDate }}</span>
          </p>
        </div>
      </div>
      <div>
        <div class="">
          <div>
            <p class="tail-text-gray-500 tail-text-sm">
              Bill to: <span class="tail-capitalize tail-text-black">{{ `${$route.params.client.firstName} ${$route.params.client.lastName}` }}</span>
            </p>
            <!-- <p class="tail-text-gray-500 tail-text-sm">
              {{ `${$route.params.client.firstName} ${$route.params.client.lastName}` }}
            </p> -->
            <p class="tail-text-gray-500 tail-text-sm">
              Email: <span class="tail-text-black">{{ `${$route.params.client.email}` }}</span>
            </p>
          </div>
          <div class="tail-py-4">
            <span v-if="invoiceServices.length" class="tail-text-xl tail-font-semibold">£0.00 due {{ invoiceDueDate }}.</span>
            <span v-else class="tail-text-xl tail-font-semibold">Please select a service.</span>
          </div>
          <div>
            <table class="tail-table-auto tail-w-full">
              <thead>
                <tr class="tail-text-left tail-text-xs tail-text-gray-400">
                  <th>DESCRIPTION</th>
                  <th class="tail-text-right">
                    QTY
                  </th>
                  <th class="tail-text-right">
                    UNIT PRICE
                  </th>
                  <th class="tail-text-right">
                    AMOUNT
                  </th>
                </tr>
              </thead>
              <tbody class="tail-text-left tail-text-xs tail-text-gray-400">
                <template v-if="invoiceServices.length">
                  <tr
                    v-for="item in $store.state.invoice.tempInvoice.services"
                    :key="item.index"
                    class="tail-text-left tail-text-xs tail-text-gray-400"
                  >
                    <td class="tail-font-medium tail-py-2 tail-text-black tail-capitalize">
                      {{ item.description }}
                    </td>
                    <td class="tail-text-right tail-py-2">1</td>
                    <td class="tail-text-right tail-py-2">
                      £ {{ item.pricing.amount }}
                    </td>
                    <td class="tail-text-right tail-font-medium tail-py-2 tail-text-black">
                      £
                      {{ item.pricing.amount }}
                    </td>
                  </tr>
                </template>
                <tr v-else class="bg-emerald-200">
                  <td colspan="4" class="tail-font-medium tail-py-2 tail-text-center tail-text-red-400">
                    <em>No service selected</em>
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <hr class="tail-py-2">
                  </td>
                </tr>
                <tr class="tail-text-sm tail-mb-2">
                  <td></td>
                  <td></td>
                  <td class="tail-text-right">
                    Sub Total
                  </td>
                  <td class="tail-text-right tail-text-black">
                    £ {{ invoiceServices.length ? subTotalInvoice : 0 | amount }}
                  </td>
                </tr>
                <tr class="tail-text-sm">
                  <td></td>
                  <td></td>
                  <td class="tail-text-right">
                    Total
                  </td>
                  <td class="tail-text-right tail-text-black">
                    £ {{ invoiceServices.length ? subTotalInvoice : 0 | amount }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RightInvoicePdf',
  filters: {
    amount (amount) {
      const amt = Number(amount)
      return (
        (amt && amt.toLocaleString(undefined, { maximumFractionDigits: 2 })) ||
        '0'
      )
    }
  },
  computed: {
    invoiceDueDate () {
      const d = new Date(this.$store.state.invoice.tempInvoice.date).toDateString()
      return d
    },
    invoiceServices () {
      return this.$store.state.invoice.tempInvoice.services
    },
    subTotalInvoice () {
      if (this.invoiceServices.length > 1) {
        return this.invoiceServices.reduce(
          (accumulator, current) => accumulator + current.pricing.amount, 0
        )
      }
      return this.invoiceServices[0].pricing.amount
    }
  }
}
</script>
<style scoped>
.right-card {
  width: 36.25rem;
  height: 51.25rem;
  background-color: #f0f5fa;
}
</style>
