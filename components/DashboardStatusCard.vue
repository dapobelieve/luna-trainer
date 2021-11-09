<template>
  <div class="w-full grid bg-gray-50">
    <p class="px-4 pt-4">
      Get the best out of GetWelp by connecting your calendars and Zoom, Stripe,
      and onboard your clients!
    </p>
    <ul
      class="flex list-none m-0 space-x-3 overflow-x-auto p-4 snap-scroll-x"
    >
      <!-- <li class="hover:bg-gray-100 p-1 pr-3 rounded-md">
        <div class="flex items-center space-x-2">
          <p
            :class="[
              'bg-red-50 rounded-full text-xs p-2 flex'
            ]"
          >
            <i class="ns-exclamation text-red-500 text-lg" />
          </p>
          <p class="text-gray-700 text-base font-medium whitespace-nowrap">
            Calendar(s) <span class="underline">Sync</span>
          </p>
        </div>
      </li>-->
      <li class="hover:bg-gray-100 p-1 pr-3 rounded-md">
        <div
          v-if="isStripeConnected && isStripeReady"
          class="flex items-center space-x-2"
        >
          <p
            :class="[
              'bg-green-50 rounded-full p-2 h-8 w-8 flex shadow-sm flex-shrink'
            ]"
          >
            <i class="ns-check text-lg text-green-500"></i>
          </p>
          <p class="font-medium whitespace-nowrap">
            Stripe ready!
          </p>
        </div>
        <div v-else-if="isStripeConnected && stripeErrors" class="flex items-center space-x-2">
          <button
            :class="[
              'bg-indigo-500 rounded-full p-2 h-8 w-8 flex shadow-sm flex-shrink'
            ]"
          >
            <i class="ns-refresh text-white"></i>
          </button>
          <p class="font-medium whitespace-nowrap">
            Stripe account in review
          </p>
          <button
              alt="see reason here"
              @click.prevent="$router.push({name: 'settings-connections'});">
            <i class="ns-info text-lg"></i>
          </button>
        </div>
        <div
          v-else
          class="flex items-center space-x-2 cursor-pointer"
          :disabled="isLoading"
          @click.prevent="stripeConnect"
        >
          <SingleLoader v-if="isLoading" />
          <p
            v-else
            :class="[
              'bg-yellow-50 rounded-full p-2 h-8 w-8 flex shadow-sm'
            ]"
          >
            <i class="ns-time-forward text-yellow-500 text-lg" />
          </p>
          <p class="font-medium whitespace-nowrap">
            {{
              isLoading ? "Establishing Stripe Connection" : "Stripe pending"
            }}
          </p>
        </div>
      </li>
      <li class="hover:bg-gray-100 p-1 pr-3 rounded-md">
        <div class="flex items-center space-x-2">
          <SingleLoader v-if="$store.state.client.isLoading" />
          <template v-else>
            <p
              class="bg-green-50 rounded-full p-2 h-8 w-8 flex shadow-sm"
            >
              <i
                :class="[
                  allClients.length ? 'ns-check' : 'ns-users',
                  'text-green-500 text-lg'
                ]"
              />
            </p>
          </template>
          <p
            v-if="allClients.length"
            class="font-medium whitespace-nowrap"
          >
            Added your first client
          </p>
          <button
            v-else
            class="font-medium whitespace-nowrap"
            @click="addClient = true"
          >
            Add your first client
          </button>
        </div>
      </li>
    </ul>
    <GwModal :is-open="addClient" @close="addClient = $event" @closeBackDrop="addClient = $event">
      <InviteNewClient @close="addClient = $event" />
    </GwModal>
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
    },
    stripeErrors () {
      const stripeOptions = this.$auth.user.stripe
      return stripeOptions && stripeOptions.requirements && stripeOptions.requirements.errors
    }
  },
  methods: {
    stripeConnect () {
      this.isLoading = true
      return this.$store
        .dispatch('invoice/stripeConnect')
        .then((response) => {
          window.location.href = response
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="scss">
.tooltip {
  z-index: 10000;
  &.info {
    $color: #fff;
    top: 100px !important;
    .tooltip-inner {
      background: $color;
      color: #000;
      padding: 2px;
      border-radius: 10px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
      max-width: 350px;
    }
    .tooltip-arrow {
      border-color: $color;
    }
  }
}
.btn-2:hover {
  border: 1px solid transparent;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px #427388;
  padding: 0 3px 0 3px;
  border-radius: 5px;
}
</style>
