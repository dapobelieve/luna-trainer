<template>
  <div class="py-5 rounded-lg">
    <div class="bg-white rounded-lg p-4">
      <div class="pb-4">
        <h1 class="font-medium">
          {{ $auth.user.businessName }}
        </h1>
      </div>
      <div class="p-0">
        <div class="border rounded">
          <div class="grid grid-cols-2 gap-4 p-3">
            <div>
              <span class="text-gray-400">From</span>
              <p class="">
                {{ $auth.user.firstName }} {{ $auth.user.lastName }}
              </p>
            </div>
            <div>
              <span class="text-gray-400">To</span>
              <p v-if="client && client.firstName" class="capitalize">
                {{ `${client && client.firstName} ${client && client.lastName}` }}
              </p>
            </div>
          </div>
          <div class=" py-2 px-3">
            <div class="rounded" style="background-color: #f0f5fa;">
              <div class="p-3">
                <p class="text-gray-400">
                  Amount
                </p>
                <client-only>
                  <p class="text-2xl">
                    {{ invoiceItems.length ? subTotalInvoice : 0 | amount }}
                  </p>
                </client-only>
                <p class="text-sm">
                  Due on {{ invoice.dueDate }}
                </p>
              </div>
            </div>
          </div>
          <div class="p-1">
            <hr />
          </div>
          <div class="p-3">
            <template v-if="invoiceItems.length">
              <div
                v-for="item in invoiceItems"
                :key="item._id"
                class="flex justify-between py-2"
              >
                <p><strong>{{ item.description }}</strong></p>
                <span>{{ item.price | amount }}</span>
              </div>
            </template>
            <div v-else class="bg-emerald-200">
              <p colspan="4" class="font-medium py-2 text-center text-red-400">
                <em>No service selected</em>
              </p>
            </div>
            <hr class="py-1" />
            <div class="flex justify-between py-4">
              <div>
                <p><strong>Amount Due</strong></p>
              </div>
              <client-only>
                <div class="pr-2">
                  <span> {{ invoiceItems.length ? subTotalInvoice : 0 | amount }}</span>
                </div>
              </client-only>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RightInvoiceEmail',
  props: {
    invoice: Object
  },
  data () {
    return {
      client: this.invoice.client
    }
  },
  computed: {
    invoiceItems () {
      return this.invoice.items
    },
    subTotalInvoice () {
      if (this.invoiceItems.length > 1) {
        return this.invoiceItems.reduce(
          (accumulator, current) => accumulator + current.price, 0
        )
      }
      return this.invoiceItems[0].price
    }
  },
  watch: {
    'invoice.client' (newValue) {
      if (newValue) {
        this.client = newValue
      }
    }
  }
}
</script>
<style scoped>
</style>
