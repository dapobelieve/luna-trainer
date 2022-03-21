<template>
  <modal name="payment-method-status" height="auto" width="500" :adpative="true" :click-to-close="false">
    <div class="p-6">
      <template v-if="currentDisplay === 1">
        <p class="text-3xl text-gray-700 font-normal pb-4">
          Connect your Stripe or bank details
        </p>
        <p class="text-base font-normal text-gray-700">
          We're making it easy to create, send and manage your finances. In order to create your first invoice, we just need to connect you up with the different providers!
        </p>
        <div class="mt-8 flex">
          <button class="button-fill" @click.prevent="nextStep">
            Proceed
          </button>
        </div>
      </template>
      <template v-if="currentDisplay === 2">
        <div class="flex justify-between items-center mb-5">
          <p class="text-2xl font-normal text-gray-700">
            Choose payment option
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
              <div>
                <ButtonSpinner :loading="isStripeLoading" class="button-outline" @click="connectToStripeAndRedirect">
                  Connect
                </ButtonSpinner>
              </div>
            </li>
            <li class="flex justify-between items-center mb-8">
              <div>
                <p class="text-lg font-medium text-gray-700 mb-1">
                  Add deposit bank account
                </p>
                <p class="text-sm font-normal text-gray-500">
                  Brief description about this feature
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
      </template>
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
    async connectToStripeAndRedirect () {
      this.isStripeLoading = true
      try {
        const connectionUrl = await this.connectToStripe(location.href)
        window.open(connectionUrl)
      } catch (error) {
        this.$lunaToast.error('Stripe connection failed')
      }
      this.isStripeLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
