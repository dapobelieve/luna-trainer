<template>
  <div class="flex justify-between items-center mb-8">
    <div :class="{ 'opacity-50': disabled }">
      <p class="text-lg font-medium text-gray-700 mb-1">
        {{ connected ? "Disconnect " : "Connect to"
        }}<span>
          <img
            class="h-6 inline-block"
            src="~/assets/img/stripe.png"
            alt="stripe logo"
          />
        </span>
      </p>
      <p class="text-sm font-normal text-gray-500">
        Connect your stripe account if you have one, or provide we'll help you
        create one.
      </p>
      <div
        v-if="connected && !disabled"
        class="text-sm font-normal text-green-500 items-center space-x-1 mt-2"
      >
        <i class="fi-rr-check"></i>
        <span>Connected </span>
      </div>
      <div
        v-if="connectedAwaiting && !disabled"
        class="text-sm font-normal text-blue-500 items-center space-x-1 mt-2"
      >
        <i class="fi-rr-refresh"></i>
        <span>Pending Verification</span>
        <button class="ml-4 text-red-500 hover:underline" title="Remove any connect and connnect again" @click="toggleStripeConnection(true)">
          {{ loading ? 'Reseting' : 'Connect with a new stripe account' }}
        </button>
      </div>
      <div
        v-if="connected && disabled"
        class="text-sm font-normal text-grey-500 items-center space-x-1 mt-2"
      >
        <span>Temporary disabled</span>
      </div>
    </div>
    <div>
      <button
        v-if="!connected || connectedAwaiting"
        class="button-outline"
        @click.prevent="toggleStripeConnection"
      >
        <SingleLoader v-if="loading" class="mr-2" />
        <span v-if="connectedAwaiting">{{ loading ? "Reconnecting..." : "Continue" }}</span>
        <span v-else>{{ loading ? "Connecting..." : "Connect" }}</span>
      </button>
      <div v-else class="flex space-x-4 items-start">
        <span v-if="isDefault" class="tag"> Default </span>
        <span v-if="disabled" class="tag disabled"> Disabled </span>
        <SingleLoader v-if="loading" />
        <Dropdown
          v-if="!loading"
          :primary-action-text="connectedAwaiting ? 'Reconnect' : connected ? 'Disconnect' : 'Connnect' "
          :disabled="disabled"
          @action="toggleStripeConnection"
          @enable="enable"
          @disable="disable"
          @default="setAsDefault"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Dropdown from './Dropdown.vue'

export default {
  name: 'StripePaymentMethod',
  components: { Dropdown },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters('payment-methods', {
      paymentMethod: 'getStripePaymentMethod'
    }),
    connectedAwaiting () {
      return !!this.paymentMethod.stripe && this.paymentMethod.stripe.connected && this.paymentMethod.stripe.status === 'pending'
    },
    connected () {
      return !!this.paymentMethod.stripe && this.paymentMethod.stripe.connected && this.paymentMethod.stripe.status === 'active'
    },
    disabled () {
      return this.paymentMethod && this.paymentMethod.disabled
    },
    isDefault () {
      return this.paymentMethod && this.paymentMethod.isDefault
    }
  },
  methods: {
    ...mapActions('payment-methods', {
      connectToStripe: 'connectToStripe',
      disconnectFromStripe: 'disconnectFromStripe',
      enablePaymentMethod: 'enablePaymentMethod',
      disablePaymentMethod: 'disablePaymentMethod',
      setDefaultPaymentMethod: 'setDefaultPaymentMethod'
    }),
    async disconnectStripeAccount () {
      try {
        await this.disconnectFromStripe()
      } catch (error) {
        this.$lunaToast.error(error.message)
      }
    },
    async toggleStripeConnection (reset) {
      this.loading = true
      if (reset === true) {
        await this.disconnectStripeAccount()
      } else if (!this.connected || this.connectedAwaiting) {
        await this.connectToStripeAndRedirect()
      } else {
        await this.disconnectStripeAccount()
      }
      this.loading = false
    },
    async connectToStripeAndRedirect () {
      try {
        const connectionUrl = await this.connectToStripe(location.href)
        window.open(connectionUrl)
      } catch (error) {
        this.$lunaToast.error('Stripe connection failed ' + error.message)
      }
    },
    async enable (e) {
      try {
        this.loading = true
        await this.enablePaymentMethod(this.paymentMethod._id)
      } catch (error) {
        this.$lunaToast.error('Unable to enale payment method')
      }
      this.loading = false
    },
    async setAsDefault () {
      try {
        this.loading = true
        await this.setDefaultPaymentMethod(this.paymentMethod._id)
      } catch (error) {
        console.log(error)
        this.$lunaToast.error('Unable to set as default payment method')
      }
      this.loading = false
    },
    async disable () {
      try {
        this.loading = true
        await this.disablePaymentMethod(this.paymentMethod._id)
      } catch (error) {
        this.$lunaToast.error('Unable to disable payment method')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
