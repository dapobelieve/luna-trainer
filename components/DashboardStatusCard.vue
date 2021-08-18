<template>
  <div
    style="background: #4F638C;"
    class="tail-rounded-md tail-w-full tail-p-5 md:tail-p-8 tail-grid tail-text-white tail-order-3 md:tail-order-2"
  >
    <p class="tail-mb-4">
      Get the best out of GetWelp by connecting your calendars and Zoom,
      Stripe, and onboard your clients!
    </p>
    <ul class="tail-inline-block sm:tail-flex tail-list-none tail-m-0 tail-p-0">
      <li>
        <div class="tail-flex tail-items-center" v-if="isStripeConnected && isStripeReady">
          <p :class="[ 'tail-bg-green-500' , 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']">
            <i class="ns-check"></i>
          </p>
          <p>Stripe ready ! </p>
        </div>
        <div class="tail-flex tail-items-center" v-else-if="isStripeConnected">
            <p :class="['tail-bg-indigo-500', 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']">
              <i class="ns-refresh"></i>
            </p>
            <p>Stripe account in review</p>
        </div>
        <div class="tail-flex tail-items-center" v-else>
          <p :class="['tail-bg-red-600' , 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']" >
            <i class="ns-cross" />
          </p>
          <p>Stripe not connected</p>
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
          <p>
            {{ allClients.length ? 'Added your first client' : 'Add your first client' }}
          </p>
        </div>
      </li>
      <li class="sm:tail-ml-2">
        <div class="tail-flex tail-items-center">
          <p
            :class="['tail-bg-red-600', 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']"
          >
            <i class="ns-cross" />
          </p>
          <p>Calendar(s) <span class="tail-underline">Sync</span></p>
        </div>
      </li>
      <li class="sm:tail-ml-2">
        <div class="tail-flex tail-items-center">
          <p
            :class="[fullyConnected ? 'tail-bg-green-500' : 'tail-bg-red-600', 'tail-mr-1', 'tail-rounded-full', 'tail-text-xs', 'tail-p-2', 'tail-flex']">
            <i class="ns-cross" />
          </p>
          <p>Fully connected <span class="tail-underline">Sync</span></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DashboardStatusCard',
  computed: {
    ...mapGetters({
      allClients: 'client/getAllClients',
      isStripeConnected: 'authorize/isStripeConnected',
      isStripeReady: 'authorize/isStripeReady'
    }),
    fullyConnected () {
      return this.allClients && this.isStripeReady && this.isStripeConnected
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
