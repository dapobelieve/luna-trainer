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
        class="text-sm font-norml text-green-500 items-center space-x-1 mt-2"
      >
        <i class="fi-rr-check"></i>
        <span>Connected </span>
      </div>
      <div
        v-if="connected && disabled"
        class="text-sm font-norml text-grey-500 items-center space-x-1 mt-2"
      >
        <span>Temporary disabled</span>
      </div>
    </div>
    <div>
      <button
        v-if="!connected"
        class="button-outline"
        @click.prevent="connectToStripeAndRedirect"
      >
        <SingleLoader v-if="loading" class="mr-2" />
        {{ loading ? "Connecting..." : "Connect" }}
      </button>
      <div v-else class="flex space-x-4 items-start">
        <span v-if="isDefault" class="tag"> Default </span>
        <span v-if="disabled" class="tag disabled"> Disabled </span>
        <SingleLoader v-if="loading" />
        <Dropdown
          v-if="!loading"   
          :primaryActionText="connected ? 'Disconnect' : 'Connnect'"
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
import { mapActions, mapGetters } from "vuex";
import Dropdown from "./Dropdown.vue";

export default {
  components: { Dropdown },
  name: "StripePaymentMethod",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters('payment-methods', {
      paymentMethod: 'getStripePaymentMethod',
    }),
    connected() {
      return !!this.paymentMethod.stripe && this.paymentMethod.stripe.connected;
    },
    disabled() {
      return this.paymentMethod && this.paymentMethod.disabled;
    },
    isDefault() {
      return this.paymentMethod && this.paymentMethod.isDefault;
    },
  },
  methods: {
    ...mapActions("payment-methods", {
      connectToStripe: "connectToStripe",
      disconnectFromStripe: "disconnectFromStripe",
      enablePaymentMethod: "enablePaymentMethod",
      disablePaymentMethod: "disablePaymentMethod",
      setDefaultPaymentMethod: "setDefaultPaymentMethod",
    }),
    async toggleStripeConnection() {
      if (!this.connected) this.connectToStripeAndRedirect();
      else this.disconnectFromStripe();
    },
    async connectToStripeAndRedirect() {
      try {
        this.loading = true;
        const connectionUrl = await this.connectToStripe(location.href);
        window.open(connectionUrl);
      } catch (error) {
        this.$lunaToast.error("Stripe connection failed");
      }
      this.loading = false;
    },

    async enable(e) {
      try {
        this.loading = true;
        await this.enablePaymentMethod(this.paymentMethod._id);
      } catch (error) {
        this.$lunaToast.error("Unable to disable payment");
      }
      this.loading = false;
    },
    async setAsDefault() {
      try {
        this.loading = true;
        await this.setDefaultPaymentMethod(this.paymentMethod._id);
      } catch (error) {
        console.log(error);
        this.$lunaToast.error("Unable to disable payment");
      }
      this.loading = false;
    },
    async disable() {
      try {
        this.loading = true;
        await this.disablePaymentMethod(this.paymentMethod._id);
      } catch (error) {
        this.$lunaToast.error("Unable to disable payment");
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
