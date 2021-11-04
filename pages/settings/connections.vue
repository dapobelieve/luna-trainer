<template>
  <div class="rounded-lg bg-white parent-container">
    <h2
      class="text-gray-700"
      style="font-size: 20px; font-weight: 400; line-height: 28px;"
    >
      Connections
    </h2>
    <p class="text-gray-500 section-info">
      CONNECTED ACCOUNT
    </p>
    <div class="flex items-center">
      <div class="mr-auto">
        <p class="label">
          Connect to Google
        </p>
        <p class="description">
          Brief description about this feature
        </p>
      </div>
      <div>
        <button class="btn-gray">
          Connect to Google
        </button>
      </div>
    </div>

    <div class="flex items-center">
      <div class="mr-auto">
        <p class="label">
          Connected to Google
        </p>
        <p class="description">
          trainers@gmail.com
        </p>
      </div>
      <div>
        <button class="btn-flat">
          <p>
            Disconnect
          </p>
        </button>
      </div>
    </div>

    <p class="section-info">
      INTEGRATIONS
    </p>
    <div v-if="isStripeConnected && stripeUnderReview" class="flex">
      <div class="mr-auto">
        <p class="label">
          Connected to Stripe
        </p>
        <p class="description">
          Your stripe account is currently being reviewed.
        </p>
      </div>
    </div>
    <div v-else-if="!isStripeConnected" class="flex">
      <div class="mr-auto">
        <p class="label">
          Connect to Stripe
        </p>
        <p class="description">
          Brief description about this feature
        </p>
      </div>
      <div>
        <button
          type="button"
          :disabled="isLoading || disabled"
          class="btn-gray"
          :class="[disabled ? ['bg-gray-500', 'cursor-not-allowed'] : []]"
          @click="connect"
        >
          <SingleLoader v-if="isLoading" class="mr-2" />
          {{ isLoading ? 'Connecting...' : 'Connect with stripe' }}
        </button>
      </div>
    </div>
    <div v-else class="flex items-center">
      <div class="mr-auto">
        <p class="label">
          Connected to Stripe
        </p>
        <p class="description">
          Your Stripe account is connected
        </p>
      </div>
      <div>
        <button type="button" class="btn-flat" @click="disconnect">
          <SingleLoader v-if="isLoading" class="mr-2" />
          <p>
            {{ isLoading ? 'Disconnecting...' : 'Disconnect' }}
          </p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Connections',
  data () {
    return {
      isLoading: false,
      disabled: false
    }
  },
  computed: {
    ...mapGetters('profile', {
      isStripeConnected: 'isStripeConnected',
      stripeConnectionPending: 'stripeConnectionPending'
    }),
    stripeUnderReview () {
      const stripeOptions = this.$auth.user.stripe
      return stripeOptions && Boolean(stripeOptions.capabilities)
    }
  },
  methods: {
    ...mapActions('invoice', {
      stripeConnect: 'stripeConnect',
      disconnectStripe: 'disconnectStripe'
    }),
    connect () {
      this.isLoading = true
      return this.stripeConnect()
        .then((response) => {
          window.location.href = response
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    async disconnect () {
      this.isLoading = true
      try {
        const disconnectStripe = await this.disconnectStripe()
        if (disconnectStripe === 'OK') {
          this.isLoading = false
          this.$toast.success('Stripe Diconnect Successful')
        }
      } catch (error) {
        this.$toast.error('Stripe Diconnect Failed!')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.parent-container {
  display: grid;
  row-gap: 32px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.label {
  @apply text-gray-700;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
}

.description {
  @apply text-gray-500;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
}

.section-info {
  @apply text-gray-500;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
}

.btn-gray {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  text-transform: none;

  p {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    @apply text-gray-700;
  }
}

.btn-flat {
  // padding: ;
  display: flex;
  justify-content: center;
  p {
    @apply text-blue-500;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
}
</style>
