<template>
  <div class="tail-w-full tail-grid tail-bg-gray-50">
    <p class="tail-px-4 tail-pt-4">
      Get the best out of GetWelp by connecting your calendars and Zoom, Stripe,
      and onboard your clients!
    </p>
    <ul
      class="tail-flex tail-list-none tail-m-0 tail-space-x-3 tail-overflow-x-auto tail-p-4 snap-scroll-x"
    >
      <!-- <li class="hover:tail-bg-gray-100 tail-p-1 tail-pr-3 tail-rounded-md">
        <div class="tail-flex tail-items-center tail-space-x-2">
          <p
            :class="[
              'tail-bg-red-50 tail-rounded-full tail-text-xs tail-p-2 tail-flex'
            ]"
          >
            <i class="ns-exclamation tail-text-red-500 tail-text-lg" />
          </p>
          <p class="tail-text-gray-700 tail-text-base tail-font-medium tail-whitespace-nowrap">
            Calendar(s) <span class="tail-underline">Sync</span>
          </p>
        </div>
      </li>-->
      <li class="hover:tail-bg-gray-100 tail-p-1 tail-pr-3 tail-rounded-md">
        <div
          v-if="isStripeConnected && isStripeReady"
          class="tail-flex tail-items-center tail-space-x-2"
        >
          <p
            :class="[
              'tail-bg-green-50 tail-rounded-full tail-p-2 tail-h-8 tail-w-8 tail-flex tail-shadow-sm tail-flex-shrink'
            ]"
          >
            <i class="ns-check tail-text-lg tail-text-green-500"></i>
          </p>
          <p class="tail-font-medium tail-whitespace-nowrap">Stripe ready !</p>
        </div>
        <div v-else-if="isStripeConnected" class="tail-flex tail-items-center tail-space-x-2">
          <button
            :class="[
              'tail-bg-indigo-500 tail-rounded-full tail-p-2 tail-h-8 tail-w-8 tail-flex tail-shadow-sm tail-flex-shrink'
            ]"
          >
            <i class="ns-refresh"></i>
          </button>
          <p class="tail-font-medium tail-whitespace-nowrap">Stripe account in review</p>
          <button
            v-tooltip="{
              content: `${stripeErrors
                .map(error => {
                  return `<div class='tail-pb-3'>
                    <div class='tail-bg-gray-200'>
                      <h3 class='tail-font-medium tail-p-2 tail-text-left tail-capitalize tail-whitespace-nowrap'>${error.code
                    .split('_')
                  .join(' ')}</h3>
                    </div>
                <p class='tail-p-3'>${error.reason}</p>
                  </div>`;
                })
                .join('')}`,
              placement: 'right',
              classes: ['info']
            }"
            class="tail-p-1.5 tail-flex"
          >
            <i class="ns-info tail-text-lg"></i>
          </button>
        </div>
        <div
          v-else
          class="tail-flex tail-items-center tail-space-x-2 tail-cursor-pointer"
          :disabled="isLoading"
          @click.prevent="stripeConnect"
        >
          <SingleLoader v-if="isLoading" />
          <p
            v-else
            :class="[
              'tail-bg-yellow-50 tail-rounded-full tail-p-2 tail-h-8 tail-w-8 tail-flex tail-shadow-sm'
            ]"
          >
            <i class="ns-time-forward tail-text-yellow-500 tail-text-lg" />
          </p>
          <p class="tail-font-medium tail-whitespace-nowrap">
            {{
            isLoading ? "Establishing Stripe Connection" : "Stripe pending"
            }}
          </p>
        </div>
      </li>
      <li class="hover:tail-bg-gray-100 tail-p-1 tail-pr-3 tail-rounded-md">
        <div class="tail-flex tail-items-center tail-space-x-2">
          <SingleLoader v-if="$store.state.client.isLoading" />
          <template v-else>
            <p
              class="tail-bg-green-50 tail-rounded-full tail-p-2 tail-h-8 tail-w-8 tail-flex tail-shadow-sm"
            >
              <i
                :class="[
                  allClients.length ? 'ns-check' : 'ns-users',
                  'tail-text-green-500 tail-text-lg'
                ]"
              />
            </p>
          </template>
          <p
            v-if="allClients.length"
            class="tail-font-medium tail-whitespace-nowrap"
          >Added your first client</p>
          <button
            v-else
            class="tail-font-medium tail-whitespace-nowrap"
            @click="addClient = true"
          >Add your first client</button>
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
      return this.$auth.user.stripe?.requirements.errors
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
  // ...
  z-index: 10000;
  &.info {
    $color: #fff;
    .tooltip-inner {
      background: $color;
      color: #000;
      padding: 2px;
      border-radius: 5px;
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
