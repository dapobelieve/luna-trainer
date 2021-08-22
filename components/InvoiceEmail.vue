<template>
  <div class="tail-py-5 tail-rounded-lg">
    <div class="tail-bg-white tail-rounded-lg tail-p-4">
      <div class="tail-pb-4">
        <h1 class="tail-font-medium">
          {{ $auth.user.businessName }}
        </h1>
      </div>
      <div class="tail-p-0">
        <div class="tail-border tail-rounded">
          <div class="tail-grid tail-grid-cols-2 tail-gap-4 tail-p-3">
            <div>
              <span class="tail-text-gray-400">From</span>
              <p class="">
                {{ $auth.user.firstName }} {{ $auth.user.lastName }}
              </p>
            </div>
            <div>
              <span class="tail-text-gray-400">To</span>
              <p v-if="client && client.firstName" class="tail-capitalize">
                {{ `${client && client.firstName} ${client && client.lastName}` }}
              </p>
            </div>
          </div>
          <div class=" tail-py-2 tail-px-3">
            <div class="tail-rounded" style="background-color: #f0f5fa;">
              <div class="tail-p-3">
                <p class="tail-text-gray-400">
                  Amount
                </p>
                <p class="tail-text-2xl">
                  {{ invoiceItems.length ? subTotalInvoice : 0 | amount }}
                </p>
                <p class="tail-text-sm">
                  Due on {{ invoice.dueDate }}
                </p>
              </div>
            </div>
          </div>
          <div class="tail-p-1">
            <hr />
          </div>
          <div class="tail-p-3">
            <template v-if="invoiceItems.length">
              <div
                v-for="item in invoiceItems"
                :key="item._id"
                class="tail-flex tail-justify-between tail-py-2"
              >
                <p><strong>{{ item.description }}</strong></p>
                <span>{{ item.price | amount }}</span>
              </div>
            </template>
            <div v-else class="bg-emerald-200">
              <p colspan="4" class="tail-font-medium tail-py-2 tail-text-center tail-text-red-400">
                <em>No service selected</em>
              </p>
            </div>
            <hr class="tail-py-1" />
            <div class="tail-flex tail-justify-between tail-py-4">
              <div>
                <p><strong>Amount Due</strong></p>
              </div>
              <div class="tail-pr-2">
                <span> {{ invoiceItems.length ? subTotalInvoice : 0 | amount }}</span>
              </div>
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
