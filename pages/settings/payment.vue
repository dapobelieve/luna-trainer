<template>
  <async-view>
    <div class="rounded-lg p-4 bg-white parent-container" style="min-height: calc(100vh - 96px)">
      <h3 class="text-xl font-normal text-gray-700 mb-8">
        Payment
      </h3>
      <ul>
        <li class="flex justify-between items-center mb-8">
          <div>
            <p class="text-lg font-medium text-gray-700 mb-1">
              {{ isStripeConnected ? 'Disconnect ' : 'Connect to' }}<span>
                <img
                  class="h-6 inline-block"
                  src="~/assets/img/stripe.png"
                  alt="stripe logo"
                />
              </span>
            </p>
            <p class="text-sm font-normal text-gray-500">
              Brief description about this feature
            </p>
          </div>
          <div>
            <button class="button-outline" @click.prevent="stripeConnection">
              <SingleLoader v-if="isLoading" class="mr-2" />
              {{ isStripeConnected ? 'Disconnect' : 'Connect' }}
            </button>
          </div>
        </li>
        <li class="flex justify-between items-center mb-8">
          <div>
            <p class="text-lg font-medium text-gray-700 mb-1">
              Connect to <span>
                <img
                  class="h-5 inline-block"
                  src="~/assets/img/paypal.png"
                  alt="stripe logo"
                />
              </span>
            </p>
            <p class="text-sm font-normal text-gray-500">
              Brief description about this feature
            </p>
          </div>
          <div>
            <button disabled class="button-outline">
              Connect
            </button>
          </div>
        </li>
        <li class="flex justify-between items-center mb-8">
          <div>
            <p class="text-lg font-medium text-gray-700 mb-1">
              {{ isBankConnected ? 'Update' : 'Setup' }} Bank Information
            </p>
            <p class="text-sm font-normal text-gray-500">
              Brief description about this feature
            </p>
          </div>
          <div>
            <button class="button-outline flex items-center" @click.prevent="$modal.show('payment-options')">
              <i
                role="button"
                class="fi-rr-bank mr-2 text-blue-500 h-5 w-5"
              ></i>
              <span class="text-base font-medium">{{ isBankConnected ? 'Edit Details' : 'Setup' }}</span>
            </button>
          </div>
        </li>
      </ul>

      <!-- connection modal -->
      <modal
        name="payment-options"
        height="auto"
        :adaptive="true"
        width="500px"
      >
        <invoices-payment-connection :select-display="3" @closeModal="closePaymentModal" />
      </modal>
    </div>
  </async-view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Payment',
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('payment', {
      isBankConnected: 'isBankConnected',
      isStripeConnected: 'isStripeConnected'
    })
  },
  async mounted () {
    try {
      await this.checkConnectedPaymentMethods()
    } catch (error) {
      console.log('check error ', error)
    }
  },
  methods: {
    ...mapActions({
      checkConnectedPaymentMethods: 'payment/checkConnectedPaymentMethods',
      stripeConnect: 'invoice/stripeConnect',
      disconnectStripe: 'invoice/disconnectStripe'
    }),
    async stripeConnection () {
      this.isLoading = true
      try {
        if (this.isStripeConnected) {
        // disconnect stripe
          await this.disconnectStripe()
        } else {
          // connect stripe
          const connect = await this.stripeConnect()
          window.location.href = connect
        }
      } catch (error) {
        this.$gwtoast.error(`Stripe ${this.isStripeConnected ? 'Disconnect' : 'Connect'} Failed!`)
      }
      this.isLoading = false
    },
    closePaymentModal () {
      this.$modal.hide('payment-options')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
