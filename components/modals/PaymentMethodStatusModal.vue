<template>
  <modal
    name="payment-method-status"
    class="p-0"
    :width="532"
    :click-to-close="false"
    height="auto"
    :adaptive="true"
  >
    <div class="grid m-6">
      <div class="p-1">
        <template v-if="currentDisplay === 1">
          <p class="text-3xl text-gray-700 font-normal pb-4">
            Connect your Stripe or bank details
          </p>
          <p class="text-base font-normal text-gray-700">
            We're making it easy to create, send and manage your finances.
            In order to create your first invoice, we just need to connect you up with the different providers!
          </p>
          <div class="mt-8 flex">
            <button class="button-fill" @click.prevent="nextStep">
              Continue
            </button>
            <button class="bg-white-500 py-2 px-4 text-blue-500" @click="tryLater()">
              Try it later
            </button>
          </div>
        </template>
        <template v-if="currentDisplay === 2">
          <div class="flex justify-between items-center mb-5">
            <p class="text-2xl font-normal text-gray-700">
              Setup payment method
            </p>
          </div>
          <div>
            <ul>
              <li class="flex justify-between items-center mb-8">
                <div>
                  <p class="text-lg font-medium text-gray-700 mb-1">
                    Connect to
                    <span>
                      <img
                        class="h-6 inline-block"
                        src="~/assets/img/stripe.png"
                        alt="stripe logo"
                      />
                    </span>
                  </p>
                  <p class="text-sm font-normal text-gray-500">
                    Connect your stripe account if you have one, or provide we'll help you create one.
                  </p>
                </div>
                <div class="flex">
                  <ButtonSpinner :loading="isStripeLoading" class="button-outline" @click="connectToStripeAndRedirect">
                    Connect
                  </ButtonSpinner>
                </div>
              </li>
              <li class="flex justify-between items-center mb-8">
                <div>
                  <p class="text-lg font-medium text-gray-700 mb-1">
                    Add bank account
                  </p>
                  <p class="text-sm font-normal text-gray-500">
                    We will never share your bank account details with anyone.
                  </p>
                </div>
                <div>
                  <button class="button-outline flex items-center" @click.prevent="$modal.show('payment-method-bank-account')">
                    <i
                      role="button"
                      class="fi-rr-bank mr-2 text-blue-500 h-5 w-5"
                    ></i>
                    <span class="text-base font-medium">Setup</span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div class="mt-8 flex">
            <button class="button-fill" @click.prevent="prevStep">
              Back
            </button>
            <button class="bg-white-500 py-2 px-4 text-blue-500 float-right" @click="tryLater()">
              Try it later
            </button>
          </div>
        </template>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PaymentMethodStatusModal',
  props: {
    selectDisplay: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      isLoading: false,
      isStripeLoading: false,
      currentDisplay: this.selectDisplay
    }
  },
  methods: {
    ...mapActions({
      connectToStripe: 'payment-methods/connectToStripe',
      disconnectFromStripe: 'payment-methods/disconnectFromStripe'
    }),
    nextStep () {
      this.currentDisplay = Math.min(this.currentDisplay + 1, 2)
    },
    prevStep () {
      this.currentDisplay = Math.max(this.currentDisplay - 1, 1)
    },
    tryLater () {
      this.$modal.hide('payment-method-status')
      this.$router.back(-1)
    },
    async connectToStripeAndRedirect () {
      this.isStripeLoading = true
      try {
        const connectionUrl = await this.connectToStripe(location.href)
        window.open(connectionUrl)
      } catch (error) {
        this.$lunaToast.error('Stripe connection failed' + error.message)
      }
      this.isStripeLoading = false
    }
  },
  mounted () {
    this.$nuxt.$on('new-bank-account-added', () => {
      this.$modal.hide('payment-method-status')
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
