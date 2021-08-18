<template>
  <div class="tail-h-full">
    <h5 class="tail-font-medium tail-mb-2">
      Payment
    </h5>
    <div class="tail-bg-white tail-rounded-md tail-p-4 md:tail-h-full">
      <p class="tail-mb-0 tail-capitalize tail-font-medium">
        For {{ getMonth }}.
      </p>
      <div class="tail-grid tail-gap-4 tail-grid-cols-2 tail-py-5">
        <div
          class="tail-rounded-md tail-border tail-border-gray-300 tail-border-1 tail-px-4 tail-py-2"
          style="background: rgba(240, 245, 250, 1);"
        >
          <small class="tail-block">Due</small>
          <h3 class="tail-mb-0 tail-font-medium">
            {{ totalOfOwedInvoice | amount }}
          </h3>
        </div>
        <div
          class="tail-rounded-md tail-border tail-px-4 tail-py-2 tail-text-gray-400 tail-border-gray-300"
        >
          <small class="tail-block">Received</small>
          <h3 class="tail-mb-0 tail-font-medium">
            {{ totalOfPaidInvoice | amount }}
          </h3>
        </div>
      </div>
      <!-- TODO:: figure a better way for the v-if below -->
      <div
        v-if="!allInvoices.length"
        class="tail-mt-5 tail-max-w-xs tail-text-center tail-mx-auto tail-center"
      >
        <div class="tail-w-full tail-my-5">
          <img
            class="tail-text-center tail-inline-block"
            src="~/assets/img/low-dog.png"
            alt=""
            srcset=""
          >
        </div>
        <h5 class="tail-font-medium">
          No payments
        </h5>
        <small class="tail-block">
          See paid and due transactions from your clients here. For
          GetWelp to help you with your invoicing and payments, connect
          to your Stripe account below!
        </small>
        <button
          v-if="!user.stripe || !user.stripe.connected"
          style="width: fit-content"
          class="base-button tail-mt-5"
          @click.prevent="stripeConnect"
        >
          <SingleLoader v-if="isStripeLoading" class="tail-mr-2" />
          {{ isStripeLoading ? 'connecting to stripe...' : 'connect stripe' }}
        </button>
        <button
          v-else
          disabled
          style="width: fit-content"
          class="base-button tail-mt-5 tail-bg-green-400"
        >
          Stripe is connected
        </button>
      </div>
      <div v-else>
        <div
          v-for="invoice in allInvoices.slice(0, 3)"
          :key="invoice.index"
          class="tail-flex tail-items-center tail-p-4"
        >
          <ClientAvatar :firstname="invoice.customerId.firstName" :lastname="invoice.customerId.lastName" />
          <div class="tail-ml-4 tail-mr-auto">
            <p class="tail-capitalize tail-font-medium tail-mb-0">
              {{ invoice.customerId.firstName }} {{ invoice.customerId.lastName }}
            </p>
            <small class="tail-text-gray-400">{{ invoice.dueDate | date }}</small>
          </div>
          <p class="tail-font-medium">
            {{ invoice.total | amount }}
          </p>
        </div>
        <div class="tail-flex tail-justify-center">
          <button :class="['tail-capitalize', 'tail-border-2', 'tail-border-gray-300', 'tail-bg-white', 'tail-rounded-md', 'tail-px-2', 'tail-font-normal']" @click="$router.push({ name: 'Invoices' })">
            view invoices
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'DbPayments',
  data () {
    return {
      isStripeLoading: false
    }
  },
  computed: {
    ...mapGetters({
      allInvoices: 'invoice/getAllDraftInvoices'
    }),
    user () {
      return this.$auth.user
    },
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
    }),
    stripeConnect () {
      this.isStripeLoading = true
      return this.connectToStripe().then((response) => {
        window.location.href = response
      }).finally(() => {
        this.isStripeLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
