<template>
  <async-view>
    <div class="px-4 py-5">
      <div class="flex justify-between items-center mb-6">
        <p class="text-xl font-bold text-gray-700">
          Payment Gateway
        </p>
        <i
          role="button"
          class="fi-rr-cross text-blue-500 text-sm"
          @click.prevent="closeModal"
        ></i>
      </div>
      <div>
        <ul class="space-y-5">
          <li class="flex justify-between items-center">
            <div>
              <p class="text-lg font-medium text-gray-700 mb-1 flex items-center space-x-1">
                <span
                  :class="[isStripeConnected ? 'bg-green-50' : 'bg-red-50', 'rounded-full p-2 h-8 w-8 flex shadow-sm flex-shrink']"
                >
                  <i :class="[isStripeConnected ? 'fi-rr-check text-green-500' : 'fi-rr-time-oclock text-red-500', 'text-sm']"></i>
                </span>
                <span>
                  <img
                    class="h-6 inline-block"
                    src="~/assets/img/stripe.png"
                    alt="stripe logo"
                  />
                </span>
              </p>
            </div>
            <div>
              <button :disabled="isStripeConnected" class="button-outline text-sm" :class="{'cursor-not-allowed btn-gray text-gray-400' : isStripeConnected}" @click.prevent="connectStripe">
                <SingleLoader v-if="isLoading" class="mr-2" />
                {{ isStripeConnected ? 'Connected' : 'Connect' }}
              </button>
            </div>
          </li>
          <li class="flex justify-between items-center">
            <div>
              <p class="text-lg font-medium text-gray-700 mb-1 flex items-center space-x-1">
                <span
                  class="bg-red-50 rounded-full p-2 h-8 w-8 flex shadow-sm flex-shrink"
                >
                  <i class="fi-rr-time-oclock text-base text-red-500"></i>
                </span>
                <span>
                  <img
                    class="h-6 inline-block"
                    src="~/assets/img/paypal.png"
                    alt="stripe logo"
                  />
                </span>
              </p>
            </div>
            <div>
              <button disabled class="button-outline text-sm">
                Connect
              </button>
            </div>
          </li>
          <li class="flex justify-between items-center">
            <div>
              <p class="text-lg font-medium text-gray-700 mb-1 flex items-center space-x-1">
                <span
                  :class="[isBankConnected ? 'bg-green-50' : 'bg-red-50']"
                  class="bg-red-50 rounded-full p-2 h-8 w-8 flex shadow-sm flex-shrink"
                >
                  <i :class="[isBankConnected ? 'fi-rr-check text-green-500' : 'fi-rr-time-oclock text-red-500', 'text-base']"></i>
                </span>
                <span class="flex items-center">
                  <i
                    role="button"
                    class="fi-rr-bank mr-2 text-gray-700 h-5 w-5"
                  ></i>
                  <span class="text-base font-medium">Bank</span>
                </span>
              </p>
            </div>
            <div>
              <button :disabled="isBankConnected" class="button-outline text-sm" @click="$modal.show('payment-options')">
                {{ isBankConnected ? 'Connected' : 'Setup' }}
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- connection modal -->
      <modal
        name="payment-options"
        height="auto"
        :adaptive="true"
        width="500px"
      >
        <invoices-payment-connection :select-display="3" @closeModal="closePaymentModal" />
      </modal>
  </async-view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PaymentConnectionStatus',
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
      stripeConnect: 'invoice/stripeConnect'
    }),
    async connectStripe () {
      this.isLoading = true
      try {
        const connect = await this.stripeConnect()
        window.location.href = connect
      } catch (error) {
        this.$gwtoast.error('Stripe Connect Failed!')
      }
      this.isLoading = false
    },
    closeModal () {
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="scss" scoped></style>
