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
              <p class="tail-capitalize">{{ `${client && client.firstName} ${client && client.lastName}` }}</p>
            </div>
          </div>
          <div class=" tail-py-2 tail-px-3">
            <div class="tail-rounded" style="background-color: #f0f5fa;">
              <div class="tail-p-3">
                <p class="tail-text-gray-400">
                  Amount
                </p>
                <p class="tail-text-2xl">
                  £ {{ invoiceServices.length ? subTotalInvoice : 0 | amount }}.00
                </p>
                <p class="tail-text-sm">
                  Due on {{ invoiceDueDate }}
                </p>
              </div>
            </div>
          </div>
          <div class="tail-p-1">
            <hr />
          </div>
          <div class="tail-p-3">
            <template v-if="invoiceServices.length">
              <div
                v-for="item in invoiceServices"
                :key="item._id"
                class="tail-flex tail-justify-between tail-py-2">
                <p><strong>{{ item.description }}</strong></p>
                <span>£ {{ item.pricing.amount }}</span>
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
                <span>£ {{ invoiceServices.length ? subTotalInvoice : 0 | amount }}.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'RightInvoiceEmail',
  filters: {
    amount (amount) {
      const amt = Number(amount)
      return (
        (amt && amt.toLocaleString(undefined, { maximumFractionDigits: 2 })) ||
        '0'
      )
    }
  },
  data () {
    return {
      client: null
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
  },
  mounted () {
    this.getThisClient(this.$route.params.id).then((response) => {
      this.client = response
    }).catch()
  },
  methods: {
    ...mapActions({
      getThisClient: 'client/getSingleClient'
    })
  }
}
</script>
<style scoped>
</style>
