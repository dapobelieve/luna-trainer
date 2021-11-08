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
        <button disabled class="btn-gray cursor-not-allowed">
          Connect to Google
        </button>
      </div>
    </div>

    <!-- <div class="flex items-center">
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
    </div> -->

    <p class="section-info">
      INTEGRATIONS
    </p>
    <div v-if="!isStripeConnected" class="flex">
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
    <div class="bg-red-100 rounded-md p-4 border-left border-gray-100">
      <!-- <h1 class='text-left text-md whitespace-nowrap pb-2'>Stripe Connection errors</h1> -->
      <div v-for="(error,index) in stripeErrors.slice(0,2)" :key="index">
        <p class='text-left font-semibold capitalize whitespace-nowrap'>{{ error.code.split('_').join(' ') }}</p>
        <small class='mb-3 block'>{{ error.reason}}</small>
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
      stripeConnection: 'stripeConnection'
    }),
    stripeErrors () {
      return (this.stripeConnection && this.stripeConnection.requirements && this.stripeConnection.requirements.errors) || []
    }
  },
  methods: {
    ...mapActions('invoice', {
      stripeConnect: 'stripeConnect',
      disconnectStripe: 'disconnectStripe'
    }),
    ...mapActions({
      fetchUserProfile: 'profile/getUserProfile'
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
          await this.fetchUserProfile()
          this.isLoading = false
          this.$toast.success('Stripe Disconnect Successful')
        }
      } catch (error) {
        this.$toast.error('Stripe Disconnect Failed!')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.parent-container {
  @apply p-4 rounded-xl grid gap-y-8;
  border: 1px solid #e2e8f0;
}

.label {
  @apply text-gray-700 font-medium text-lg;
}

.description {
  @apply text-gray-500 font-normal text-sm;
}

.section-info {
  @apply text-gray-500 font-medium text-xs;
}

.btn-gray {
  @apply flex justify-center items-center py-2 px-4 rounded-md normal-case;
  border: 1px solid #e2e8f0;
  p {
    @apply font-medium text-base text-gray-700;
  }
}

.btn-flat {
  @apply flex justify-center;
  p {
    @apply text-blue-500 font-medium text-sm;
  }
}
</style>
