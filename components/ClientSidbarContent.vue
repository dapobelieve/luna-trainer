<template>
  <nav class="tail-flex tail-overflow-y-auto tail-text-sm">
    <div class="tail-flex-grow tail-flex">
      <div class="tail-flex-1 tail-space-y-4">
        <slot name="petSummary" />
        <client-card-navigation />
        <gw-summary-card :data="nextupData">
          <div class="tail-flex">
            <div class="tail-flex tail-items-center tail-space-x-3">
              <span class="tail-p-1 tail-bg-green-600 tail-rounded-full"></span>
              <div class="">
                <p>
                  <b>
                    1:1</b> with <b>Abi Carpenter</b>
                </p>
                <p>
                  23 May, 1:00 PM
                </p>
              </div>
            </div>
          </div>
          <div class="tail-flex">
            <div class="tail-flex tail-items-center tail-space-x-3">
              <span class="tail-p-1 tail-bg-green-600 tail-rounded-full"></span>
              <div class="">
                <p>
                  <b>
                    1:1</b> with <b>Abi Carpenter</b>
                </p>
                <p>
                  23 May, 1:00 PM
                </p>
              </div>
            </div>
          </div>
        </gw-summary-card>
        <gw-summary-card :data="receiptData">
          <template v-if="allInvoices.length">
            <button v-for="n in allInvoices.slice(0, 3)" :key="n.index" class="tail-flex tail-justify-between tail-items-center tail-w-full hover:tail-bg-gray-50">
              <div class="tail-flex tail-items-center tail-space-x-3">
                <ClientAvatar :firstname="n.customerId.firstName" :lastname="n.customerId.lastName" />
                <div class="tail-text-left">
                  <p>
                    {{ n.customerId.firstName }} {{ n.customerId.lastName }} has paid you
                  </p>
                  <p>
                    {{ n.dueDate | date }}
                  </p>
                </div>
              </div>
              <img src="~/assets/img/svgs/chevron-right.svg" alt="" srcset="">
            </button>
          </template>
          <p v-else class="tail-py-4">
            No payment in this month.
          </p>
        </gw-summary-card>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ClientSidebarContent',
  data () {
    return {
      receiptData: { title: 'payments', icon: 'receipt' },
      nextupData: { title: 'Next up', icon: 'calendar' }
    }
  },
  computed: {
    ...mapGetters({
      allInvoices: 'invoice/getAllPaidInvoices'
    }),
    getMonth () {
      const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
      const thisMonth = new Date().getMonth()
      return monthNames[thisMonth] + ', ' + new Date().getFullYear()
    },
    totalOfOwedInvoice () {
      if (this.allInvoices.length) {
        return this.allInvoices.filter(invoice => invoice.status === 'draft').reduce(
          (accumulator, current) => accumulator + current.total, 0
        )
      }
      return 0
    },
    totalOfPaidInvoice () {
      if (this.allInvoices.length) {
        return this.allInvoices.filter(invoice => invoice.status === 'paid').reduce(
          (accumulator, current) => accumulator + current.total, 0
        )
      }
      return 0
    }
  },
  mounted () {
    this.fetchAllInvoices()
  },
  methods: {
    ...mapActions({
      fetchAllInvoices: 'invoice/getInvoices',
      connectToStripe: 'invoice/stripeConnect'
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
