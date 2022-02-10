<template>
  <async-view>
    <div
      class="rounded-lg p-4 bg-white parent-container"
      style="min-height: calc(100vh - 96px)"
    >
      <h3 class="text-xl font-normal text-gray-700 mb-8">
        Payment
      </h3>
      <ul>
        <li class="flex justify-between items-center mb-8">
          <div :class="{ 'opacity-50' : stripeDetails.disabled }">
            <p class="text-lg font-medium text-gray-700 mb-1">
              {{ isStripeConnected ? "Disconnect " : "Connect to"
              }}<span>
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
            <div
              v-if="isStripeConnected"
              class="text-sm font-normal text-green-500 items-center space-x-1 mt-2"
            >
              <i class="fi-rr-check"></i>
              <span>Connected</span>
            </div>
          </div>
          <div>
            <button
              v-if="!isStripeConnected"
              class="button-outline"
              @click.prevent="stripeConnection"
            >
              <SingleLoader v-if="isLoading" class="mr-2" />
              {{ isStripeConnected ? "Reconnect" : "Connect" }}
            </button>
            <div v-else class="flex space-x-4 items-center">
              <span
                v-if="defaultPayment === 'stripe'"
                class="bg-blue-50 p-1 px-2 rounded-full text-sm text-blue-400"
              >
                Default
              </span>
              <span
                v-else-if="stripeDetails.disabled"
                class="bg-gray-100 p-1 px-2 rounded-full text-sm text-gray-400"
              >
                Disabled
              </span>
              <drop-down-menu>
                <button
                  :class="{
                    'cursor-not-allowed text-gray-400':
                      defaultPayment === 'stripe',
                  }"
                  :disabled="defaultPayment === 'stripe' || stripeDetails.disabled"
                  type="button"
                  class="dropdown-button"
                  @click="makeDefault('stripe')"
                >
                  Make default
                </button>
                <button
                  type="button"
                  class="dropdown-button"
                  @click="togglePaymentMethod('stripe')"
                >
                  {{ stripeDetails.disabled ? "Enable" : "Disable" }}
                </button>
                <button
                  type="button"
                  :disabled="isLoading"
                  class="dropdown-button flex items-center"
                  @click="disconnect"
                >
                  {{ isLoading ? "Disconnecting..." : "Disconnect" }}
                </button>
              </drop-down-menu>
            </div>
          </div>
        </li>
        <li class="flex justify-between items-center mb-8">
          <div>
            <p class="text-lg font-medium text-gray-700 mb-1">
              Connect to
              <span>
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
          <div :class="{ 'opacity-50' : bankConnectionDetails.disabled }">
            <p class="text-lg font-medium text-gray-700 mb-1">
              {{ isBankConnected ? "Update" : "Setup" }} Bank Information
            </p>
            <p class="text-sm font-normal text-gray-500">
              Brief description about this feature
            </p>
            <p
              v-if="isBankConnected"
              class="mt-4 text-sm font-medium text-gray-700"
            >
              **** **** {{ bankDetails.accountNo.substr(-0, 4) }}
            </p>
          </div>
          <div>
            <button
              v-if="!isBankConnected"
              class="button-outline flex items-center"
              @click.prevent="$modal.show('payment-options')"
            >
              <i
                role="button"
                class="fi-rr-bank mr-2 text-blue-500 h-5 w-5"
              ></i>
              <span class="text-base font-medium">{{
                isBankConnected ? "Edit Details" : "Setup"
              }}</span>
            </button>
            <div v-else class="flex space-x-4 items-center">
              <span
                v-if="defaultPayment === 'bank'"
                class="bg-blue-50 p-1 px-2 rounded-full text-sm text-blue-400"
              >
                Default
              </span>
              <span
                v-else-if="bankConnectionDetails.disabled"
                class="bg-gray-100 p-1 px-2 rounded-full text-sm text-gray-400"
              >
                Disabled
              </span>
              <drop-down-menu>
                <button
                  type="button"
                  class="dropdown-button"
                >
                  Edit
                </button>
                <button
                  :disabled="defaultPayment === 'bank' || bankConnectionDetails.disabled"
                  type="button"
                  class="dropdown-button"
                  :class="{
                    'cursor-not-allowed text-gray-400':
                      defaultPayment === 'bank',
                  }"
                  @click="makeDefault('bank')"
                >
                  Make default
                </button>
                <button
                  type="button"
                  class="dropdown-button"
                  @click="togglePaymentMethod('bank')"
                >
                  {{ bankConnectionDetails.disabled ? "Enable" : "Disable" }}
                </button>
              </drop-down-menu>
            </div>
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
        <invoices-payment-connection
          :select-display="3"
          @closeModal="closePaymentModal"
        />
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
      isLoading: false,
      showDropdown: false,
      defaultPayment: ''
    }
  },
  computed: {
    ...mapGetters('payment', {
      isBankConnected: 'isBankConnected',
      isStripeConnected: 'isStripeConnected',
      bankDetails: 'bankDetails',
      bankConnectionDetails: 'bankConnectionDetails',
      stripeDetails: 'stripeDetails'
    })
  },
  async mounted () {
    this.defaultPayment = localStorage.getItem('dp') || ''
    try {
      await this.checkConnectedPaymentMethods()
    } catch (error) {
      console.log('check error ', error)
      this.$gwtoast.error('No connected payment method')
    }
  },
  methods: {
    ...mapActions({
      checkConnectedPaymentMethods: 'payment/checkConnectedPaymentMethods',
      stripeConnect: 'invoice/stripeConnect',
      disconnectStripe: 'invoice/disconnectStripe',
      enablePayment: 'payment/enablePayment',
      disablePayment: 'payment/disablePayment'
    }),
    async stripeConnection () {
      this.isLoading = true
      try {
        const connect = await this.stripeConnect()
        window.location.href = connect
      } catch (error) {
        this.$gwtoast.error(`Stripe ${this.isStripeConnected ? 'Disconnect' : 'Connect'} Failed!`)
      }
      this.isLoading = false
    },
    async disconnect () {
      this.isLoading = true
      try {
        await this.disconnectStripe()
        this.$store.commit('payment/DISCONNECT_STRIPE')
        this.$gwtoast.success('Stripe disconnected!')
        if (this.defaultPayment === 'stripe') {
          localStorage.removeItem('dp')
          this.defaultPayment = ''
          this.$gwtoast.info('Strip is no longer default!')
        }
      } catch (error) {
        this.$gwtoast.error('Stripe Disconnect failed!')
      }
      this.isLoading = false
    },
    closePaymentModal () {
      this.$modal.hide('payment-options')
    },
    makeDefault (paymentMethod) {
      localStorage.setItem('dp', paymentMethod)
      this.defaultPayment = paymentMethod
      this.showDropdown = false
      this.$gwtoast.success(`${paymentMethod} is set as your default payment`)
    },
    async togglePaymentMethod (e) {
      try {
        if (e === 'stripe' && this.isStripeConnected && this.stripeDetails.disabled) {
          await this.enablePayment(e)
          this.$gwtoast.success('Stripe enabled')
        } else if (e === 'stripe' && this.isStripeConnected && !this.stripeDetails.disabled) {
          await this.disablePayment(e)
          this.$gwtoast.success('Stripe disabled')
          if (this.defaultPayment === 'stripe') {
            localStorage.removeItem('dp')
            this.defaultPayment = ''
            this.$gwtoast.info('Strip is no longer default!')
          }
        } else if (e === 'bank' && this.isBankConnected && this.bankConnectionDetails.disabled) {
          await this.enablePayment(e)
          this.$gwtoast.success('Bank enabled')
        } else if (e === 'bank' && this.isStripeConnected && !this.bankConnectionDetails.disabled) {
          await this.disablePayment(e)
          this.$gwtoast.success('Bank disabled')
          if (this.defaultPayment === 'bank') {
            localStorage.removeItem('dp')
            this.defaultPayment = ''
            this.$gwtoast.info('Bank is no longer default!')
          }
        }
      } catch (error) {
        this.$gwtoast.error('Something went wrong: ', error)
      }
    },
    async enablePaymentMethod (e) {
      try {
        await this.disablePayment(e)
      } catch (error) {
        this.$gwtoast.error('Unable to disable payment')
      }
    },
    async disablePaymentMethod (e) {
      try {
        await this.disablePayment(e)
      } catch (error) {
        this.$gwtoast.error('Unable to disable payment')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
