<template>
  <div
    class="tail-w-full tail-p-3 tail-grid tail-bg-gray-50 tail-space-y-4"
  >
    <p class="tail-text-gray-700">
      Get the best out of GetWelp by connecting your calendars and Zoom, Stripe, and onboard your clients!
    </p>
    <ul class="tail-inline-block sm:tail-flex tail-list-none tail-m-0 tail-p-0 tail-space-x-5">
      <li>
        <div class="tail-flex tail-items-center tail-space-x-2">
          <p
            :class="['tail-bg-red-50 tail-rounded-full tail-text-xs tail-p-2 tail-flex']"
          >
            <i class="ns-exclamation tail-text-red-500 tail-text-lg" />
          </p>
          <p class="tail-text-gray-700 tail-text-base tail-font-medium">
            Calendar(s) <span class="tail-underline">Sync</span>
          </p>
        </div>
      </li>
      <li>
        <div v-if="isStripeConnected && isStripeReady" class="tail-flex tail-items-center tail-space-x-2">
          <p :class="['tail-bg-green-500 tail-rounded-full tail-text-xs tail-p-2 tail-flex']">
            <i class="ns-check"></i>
          </p>
          <p class="tail-text-gray-700 tail-text-base tail-font-medium">
            Stripe ready !
          </p>
        </div>
        <div v-else-if="isStripeConnected" class="tail-flex tail-items-center tail-space-x-2">
          <button :class="['tail-bg-indigo-500 tail-rounded-full tail-text-xs tail-p-2 tail-flex']">
            <i class="ns-refresh"></i>
          </button>
          <p class="tail-text-gray-700 tail-text-base tail-font-medium">
            Stripe account in review
          </p>
        </div>
        <div v-else class="tail-flex tail-items-center tail-space-x-2 tail-cursor-pointer" :disabled="isLoading" @click.prevent="stripeConnect">
          <SingleLoader v-if="isLoading" />
          <p v-else :class="['tail-bg-yellow-50 tail-rounded-full tail-text-xs tail-p-2 tail-flex']">
            <i class="ns-time-forward tail-text-yellow-500 tail-text-lg" />
          </p>
          <p class="tail-text-gray-700 tail-text-base tail-font-medium">
            {{ isLoading ? 'Establishing Stripe Connection' : 'Stripe pending' }}
          </p>
        </div>
      </li>
      <li>
        <div class="tail-flex tail-items-center tail-space-x-2">
          <SingleLoader v-if="$store.state.client.isLoading" />
          <template v-else>
            <p
              :class="[allClients.length ? 'tail-bg-green-50' : 'tail-bg-red-600', 'tail-rounded-full tail-text-xs tail-p-2 tail-flex']"
            >
              <i :class="[allClients.length ? 'ns-check' : 'ns-users', 'tail-text-green-700 tail-text-lg']" />
            </p>
          </template>
          <p v-if="allClients.length" class="tail-text-gray-700 tail-text-base tail-font-medium">
            Added your first client
          </p>
          <button v-else class="tail-text-gray-700 tail-text-base tail-font-medium" @click="addClient = true">
            Add your first client
          </button>
        </div>
      </li>
    </ul>
    <Modal :is-open="addClient" @close="addClient = $event" @closeBackDrop="addClient = $event">
      <InviteNewClient @close="addClient = $event" />
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DashboardStatusCard',
  data () {
    return {
      isLoading: false,
      addClient: false,
      openModal: false
    }
  },
  computed: {
    ...mapGetters({
      allClients: 'client/getAllClients',
      isStripeConnected: 'profile/isStripeConnected',
      isStripeReady: 'profile/isStripeReady'
    }),
    fullyConnected () {
      return this.allClients && this.isStripeReady && this.isStripeConnected
    }
  },
  methods: {
    stripeConnect () {
      this.isLoading = true
      return this.$store.dispatch('invoice/stripeConnect').then((response) => {
        window.location.href = response
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
