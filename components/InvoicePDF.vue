<template>
  <div class="py-5 rounded-lg" style="background-color: #f0f5fa;">
    <div class="bg-white rounded-md p-8">
      <div class="pb-4 grid grid-cols-2 gap-8">
        <div>
          <h1 class="text-xl font-semibold">
            {{ $auth.user.businessName }}
          </h1>
          <span class="text-gray-500 text-xs">{{ client.phoneNumber }}</span>
        </div>
        <div class="text-right">
          <h1 class="text-xl font-medium text-gray-500">
            Invoice
          </h1>
          <p class="text-gray-500 text-xs">
            Invoice No.: <span class="ml-3">&lt; auto generated &gt;</span>
          </p>
          <p class="text-gray-500 text-xs">
            Date of Issue:<span class="ml-3">{{ new Date() | date }}</span>
          </p>
          <p v-if="invoice.dueDate" class="text-gray-500 text-xs">
            Date Due:<span class="ml-3">{{ invoice.dueDate | date }}</span>
          </p>
        </div>
      </div>
      <div>
        <div class="">
          <div>
            <p class="text-gray-500 text-sm">
              Bill to: <span v-if="client && client.firstName" class="capitalize text-black">{{ `${ client.firstName} ${client && client.lastName}` }}</span>
            </p>
            <p class="text-gray-500 text-sm">
              Email: <span v-if="client.email" class="text-black">{{ `${client.email}` }}</span>
            </p>
          </div>
          <div class="py-4">
            <client-only>
              <span v-if="invoice.items.length" class="text-xl font-semibold">{{ subTotalInvoice | amount }} due {{ invoice.dueDate || new Date() | date }}.</span>
              <span v-else class="text-xl font-semibold">Please select a service.</span>
            </client-only>
          </div>
          <div>
            <table class="table-auto w-full">
              <thead>
                <tr class="text-left text-xs text-gray-400">
                  <th>DESCRIPTION</th>
                  <th class="text-right">
                    QTY
                  </th>
                  <th class="text-right">
                    AMOUNT
                  </th>
                </tr>
              </thead>
              <tbody class="text-left text-xs text-gray-400">
                <template v-if="invoice.items.length">
                  <tr
                    v-for="item in invoice.items"
                    :key="item._id"
                    class="text-left text-xs text-gray-400"
                  >
                    <td class="font-medium py-2 text-black capitalize">
                      {{ item.description }}
                    </td>
                    <td class="text-right py-2">
                      {{ item.qty }}
                    </td>
                    <client-only>
                      <td class="text-right font-medium py-2 text-black">
                        {{ item.price | amount }}
                      </td>
                    </client-only>
                  </tr>
                </template>
                <tr v-else class="bg-emerald-200">
                  <td colspan="4" class="font-medium py-2 text-center text-red-400">
                    <em>No service selected</em>
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <hr class="py-2">
                  </td>
                </tr>
                <tr class="text-sm mb-2">
                  <td></td>
                  <td></td>
                  <td class="text-right">
                    Sub Total
                  </td>
                  <client-only>
                    <td class="text-right text-black">
                      {{ invoice.items.length ? subTotalInvoice : 0 | amount }}
                    </td>
                  </client-only>
                </tr>
                <tr class="text-sm">
                  <td></td>
                  <td></td>
                  <td class="text-right">
                    Total
                  </td>
                  <client-only>
                    <td class="text-right text-black">
                      {{ invoice.items.length ? subTotalInvoice : 0 | amount }}
                    </td>
                  </client-only>
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
