<template>
  <div class="tail-py-5 tail-rounded-lg" style="background-color: #f0f5fa;">
    <div class="tail-bg-white tail-rounded-md tail-p-8">
      <div class="tail-pb-4 tail-grid tail-grid-cols-2 tail-gap-8">
        <div>
          <h1 class="tail-text-xl tail-font-semibold">
            {{ $auth.user.businessName }}
          </h1>
          <span class="tail-text-gray-500 tail-text-xs">{{ client.phoneNumber }}</span>
        </div>
        <div class="tail-text-right">
          <h1 class="tail-text-xl tail-font-medium tail-text-gray-500">
            Invoice
          </h1>
          <p class="tail-text-gray-500 tail-text-xs">
            Invoice No.: <span class="tail-ml-3">&lt; auto generated &gt;</span>
          </p>
          <p class="tail-text-gray-500 tail-text-xs">
            Date of Issue:<span class="tail-ml-3">{{ new Date() | date }}</span>
          </p>
          <p v-if="invoice.dueDate" class="tail-text-gray-500 tail-text-xs">
            Date Due:<span class="tail-ml-3">{{ invoice.dueDate | date }}</span>
          </p>
        </div>
      </div>
      <div>
        <div class="">
          <div>
            <p class="tail-text-gray-500 tail-text-sm">
              Bill to: <span v-if="client && client.firstName" class="tail-capitalize tail-text-black">{{ `${ client.firstName} ${client && client.lastName}` }}</span>
            </p>
            <p class="tail-text-gray-500 tail-text-sm">
              Email: <span v-if="client.email" class="tail-text-black">{{ `${client.email}` }}</span>
            </p>
          </div>
          <div class="tail-py-4">
            <span v-if="invoice.items.length" class="tail-text-xl tail-font-semibold">{{ subTotalInvoice | amount }} due {{ invoice.dueDate || new Date() | date }}.</span>
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
                    AMOUNT
                  </th>
                </tr>
              </thead>
              <tbody class="tail-text-left tail-text-xs tail-text-gray-400">
                <template v-if="invoice.items.length">
                  <tr
                    v-for="item in invoice.items"
                    :key="item._id"
                    class="tail-text-left tail-text-xs tail-text-gray-400"
                  >
                    <td class="tail-font-medium tail-py-2 tail-text-black tail-capitalize">
                      {{ item.description }}
                    </td>
                    <td class="tail-text-right tail-py-2">
                      {{ item.qty }}
                    </td>
                    <td class="tail-text-right tail-font-medium tail-py-2 tail-text-black">
                      {{ item.price | amount }}
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
                    {{ invoice.items.length ? subTotalInvoice : 0 | amount }}
                  </td>
                </tr>
                <tr class="tail-text-sm">
                  <td></td>
                  <td></td>
                  <td class="tail-text-right">
                    Total
                  </td>
                  <td class="tail-text-right tail-text-black">
                    {{ invoice.items.length ? subTotalInvoice : 0 | amount }}
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
  props: {
    invoice: Object
  },
  computed: {
    client () {
      return this.invoice.client || {}
    },
    subTotalInvoice () {
      if (this.invoice.items.length > 1) {
        return this.invoice.items.reduce(
          (accumulator, current) => accumulator + current.price, 0
        )
      }
      return this.invoice.items[0].price
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
