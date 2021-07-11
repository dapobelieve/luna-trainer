<template>
  <div>
    <!-- <div
      class="tail-sticky tail-flex tail-items-center md:tail-rounded-md tail-bg-white tail-px-4 tail-py-3"
    >
      <div
        class="tail-mr-auto tail-text-sm md:tail-text-2xl tail-flex tail-gap-3"
      >
        <NuxtLink class="active" :to="{ name: 'Clients' }">
          Clients
          <template v-if="$route.name === 'Clients-InvitedInvites'">
            <span
              v-if="invitedClients.length"
            >({{ invitedClients.length }})</span>
          </template>
          <template v-else>
            <span
              v-if="acceptedClients.length"
            >({{ acceptedClients.length }})</span>
          </template>
        </NuxtLink>
      </div>
      <div class="relative inline-block text-left">
        <div class="tail-mr-2 md:tail-mr-5 tail-relative">
          <div
            class="tail-inline-flex tail-justify-items-start tail-w-full tail-rounded-md tail-border tail-border-gray-300 tail-shadow-sm tail-px-3 md:tail-pl-4 md:tail-pr-2 tail-py-1 md:tail-py-2 tail-bg-white tail-text-sm tail-font-medium hover:tail-bg-gray-50 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-offset-gray-100 focus:tail-ring-indigo-500"
            role="button"
            @click.prevent="openDropDown = !openDropDown"
          >
            <span class="tail-hidden md:tail-block">{{ optionsText }}</span>
            <i class="ns-caret-down tail-text-xl" aria-hidden="true"></i>
          </div>
          <transition
            enter-active-class="tail-transition tail-ease-out tail-duration-100"
            enter-from-class="tail-transform tail-opacity-0 tail-scale-95"
            enter-to-class="tail-transform tail-opacity-100 tail-scale-100"
            leave-active-class="tail-transition tail-ease-in tail-duration-75"
            leave-from-class="tail-transform tail-opacity-100 tail-scale-100"
            leave-to-class="tail-transform tail-opacity-0 tail-scale-95"
          >
            <div
              v-if="openDropDown"
              class="tail-origin-top-right tail-absolute tail-right-0 tail-mt-2 tail-w-auto md:tail-w-full tail-rounded-md tail-shadow-lg tail-bg-white tail-tail-ring-1 tail-ring-black tail-ring-opacity-5 focus:tail-outline-none"
            >
              <div class="tail-py-1">
                <div class="tail-divide-y tail-divide-gray-100">
                  <button
                    type="button"
                    :class="[
                      active
                        ? 'tail-bg-gray-100 tail-text-gray-900'
                        : 'tail-text-gray-700',
                      'tail-block tail-px-4 tail-py-2 tail-text-sm', 'tail-w-full'
                    ]"
                    @click="goToAccepted"
                  >
                    Received
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    :class="[
                      active
                        ? 'tail-bg-gray-100 tail-text-gray-900'
                        : 'tail-text-gray-700',
                      'tail-block tail-px-4 tail-py-2 tail-text-sm', 'tail-w-full'
                    ]"
                    @click="goToInvites"
                  >
                    Sent
                  </button>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div>
        <button
          type="button"
          class="base-button tail-gap-2"
          @click="openModal = true"
        >
          <i class="ns-add"></i>
          <span class="tail-hidden sm:tail-block">new client</span>
        </button>
      </div>
    </div> -->
    <PageHeader v-if="$route.name !== 'Clients-id-Messages'">
      <template v-slot:title>
        Clients
      </template>
    </PageHeader>
    <div class="tail-m-5 sm:tail-m-3 tail-pb-14 lg:tail-pb-10 tail-h-full">
      <nuxt-child />
    </div>
    <Modal :is-open="openModal" @close="openModal = $event">
      <InviteNewClient @close="openModal = $event" />
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Clients',
  data () {
    return {
      openDropDown: false,
      optionsText: 'Received',
      clients: false,
      active: true,
      openModal: false
    }
  },
  head () {
    return {
      title: 'All Clients'
    }
  },
  computed: {
    ...mapGetters({
      acceptedClients: 'client/getAllAcceptedClients',
      invitedClients: 'client/getAllInvitedClients'
    })
  },
  methods: {
    goToInvites () {
      this.optionsText = 'Sent'
      this.$router.push({
        name: 'Clients-InvitedInvites'
      })
      this.openDropDown = false
    },
    goToAccepted () {
      this.optionsText = 'Received'
      this.$router.push({
        name: 'Clients'
      })
      this.openDropDown = false
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: rgba(143, 151, 166, 1);
}

.active {
  color: black;
}

.active:focus {
  outline: none !important;
}
</style>
