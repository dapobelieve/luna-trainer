<template>
  <div
    style="background: #4F638C;"
    class="tail-rounded-md tail-w-full tail-p-5 md:tail-p-8 tail-grid  tail-order-3 md:tail-order-2"
  >
    <p class="tail-mb-4 tail-text-white">
      Get the best out of GetWelp by connecting your calendars and Zoom,
      Stripe, and onboard your clients!
    </p>
    <ul class="tail-inline-block sm:tail-flex tail-list-none tail-m-0 tail-p-0">
      <li>
        <div v-if="isStripeConnected && isStripeReady" class="tail-flex tail-items-center">
          <p :class="[ 'tail-bg-green-500' , 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']">
            <i class="ns-check"></i>
          </p>
          <p class="tail-text-white">
            Stripe ready !
          </p>
        </div>
        <div v-else-if="isStripeConnected" class="tail-flex tail-items-center">
          <button :class="['tail-bg-indigo-500', 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']">
            <i class="ns-refresh"></i>
          </button>
          <p class="tail-text-white">
            Stripe account in review
          </p>
        </div>
        <div v-else class="tail-flex tail-items-center tail-cursor-pointer" :disabled="isLoading" @click.prevent="stripeConnect">
          <SingleLoader v-if="isLoading" class="tail-mr-2" />
          <p v-else :class="['tail-bg-red-600' , 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']">
            <i class="ns-cross" />
          </p>
          <p class="tail-text-white">
            {{ isLoading ? 'Establishing Stripe Connection' : 'Stripe not connected' }}
          </p>
        </div>
      </li>
      <li class="sm:tail-ml-2">
        <div class="tail-flex tail-items-center">
          <SingleLoader v-if="$store.state.client.isLoading" class="tail-mr-2" />
          <template v-else>
            <p
              :class="[allClients.length ? 'tail-bg-green-500' : 'tail-bg-red-600', 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']"
            >
              <i :class="[allClients.length ? 'ns-check' : 'ns-cross']" />
            </p>
          </template>
          <p v-if="allClients.length" class="tail-text-white">
            Added your first client
          </p>
          <button v-else class="tail-text-white" @click="addClient = true">
            Add your first client
          </button>
        </div>
      </li>
      <li class="sm:tail-ml-2">
        <div class="tail-flex tail-items-center">
          <p
            :class="['tail-bg-red-600', 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']"
          >
            <i class="ns-cross" />
          </p>
          <p class="tail-text-white">
            Calendar(s) <span class="tail-underline">Sync</span>
          </p>
        </div>
      </li>
      <li class="sm:tail-ml-2">
        <div class="tail-flex tail-items-center">
          <p
            :class="[fullyConnected ? 'tail-bg-green-500' : 'tail-bg-red-600', 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']"
          >
            <i class="ns-cross" />
          </p>
          <p class="tail-text-white">
            Fully connected <span class="tail-underline">Sync</span>
          </p>
        </div>
      </li>
    </ul>
    <Modal :is-open="addClient" @close="addClient = $event">
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
