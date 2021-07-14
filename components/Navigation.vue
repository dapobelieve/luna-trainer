<template>
  <div class="tail-hidden lg:tail-block lg:tail-col-span-3 xl:tail-col-span-2 tail-border-r tail-shadow-md tail-bg-white">
    <!-- Sidebar Search -->
    <div class="tail-px-3 tail-py-1 tail-mt-3">
      <label for="search" class="tail-sr-only">Search</label>
      <div class="tail-mt-1 tail-relative tail-rounded-md tail-border tail-border-gray-200">
        <div class="tail-absolute tail-inset-y-0 tail-left-0 tail-pl-3 tail-flex tail-items-center tail-pointer-events-none" aria-hidden="true">
          <i class="ns-search tail-mr-3 tail-text-gray-400 tail-flex-shrink-0 tail-text-lg" />
        </div>
        <input type="text" name="search" class="tail-bg-gray-100 tail-py-1 focus:tail-border-gray-700 focus:tail-outline-none tail-block tail-w-full tail-pl-9 sm:tail-text-sm tail-border-gray-300 tail-rounded-md" placeholder="Search">
      </div>
    </div>
    <!-- main navigation -->
    <nav aria-label="Sidebar" class="tail-sticky tail-top-4 tail-mt-4 tail-divide-y tail-divide-gray-300">
      <div class="tail-space-y-1">
        <div v-for="menu in menus.menu" :key="menu">
          <NuxtLink
            v-if="menu.path && menu.path !== 'signout' && menu.path !== 'createinvoice' && menu.path !== 'inviteClient'"
            :to="{ name: menu.path }"
            exact-active-class="active"
            class="tail-capitalize tail-text-gray-500 tail-group tail-flex tail-items-center tail-pr-3 tail-py-1 tail-font-medium hover:tail-bg-gray-50"
          >
            <i :class="[menu.icon ? menu.icon : '']" class="tail-text-gray-500 tail-mx-2 tail-flex-shrink-0 tail-text-lg" />
            <span class="tail-truncate tail-text-sm tail-font-normal">
              {{ menu.title }}
            </span>
          </NuxtLink>
          <button
            v-else-if="menu.path === 'inviteClient'"
            class="tail-capitalize tail-text-gray-500 tail-group tail-flex tail-items-center tail-pr-3 tail-py-2 tail-text-sm tail-font-medium hover:tail-bg-gray-50 tail-w-full"
            @click="inviteClient = true"
          >
            <i class="ns-user-add tail-mx-2 tail-flex-shrink-0 tail-text-lg tail-text-gray-500" />
            <span class="tail-truncate tail-text-sm tail-font-normal">Invite Client</span>
          </button>
          <button
            v-else-if="menu.path === 'createinvoice'"
            class="tail-capitalize tail-text-gray-500 tail-group tail-flex tail-items-center tail-pr-3 tail-py-2 tail-text-sm tail-font-medium hover:tail-bg-gray-50 tail-w-full"
            @click="createInvoice"
          >
            <i class="ns-plus tail-mx-2 tail-flex-shrink-0 tail-text-lg tail-text-gray-500" />
            <span class="tail-truncate tail-text-sm tail-font-normal">New Invoice</span>
          </button>
          <button
            v-else-if="menu.path === 'signout'"
            class="tail-capitalize tail-text-gray-500 tail-group tail-flex tail-items-center tail-pr-3 tail-py-2 tail-text-sm tail-font-medium hover:tail-bg-gray-50 tail-w-full"
            @click="signOut"
          >
            <i class="ns-power tail-mx-2 tail-flex-shrink-0 tail-text-lg tail-text-red-600" />
            <span class="tail-truncate tail-text-sm tail-font-normal">Signout</span>
          </button>
          <p v-if="menu.section" class="tail-px-3 tail-text-sm tail-my-4 tail-text-gray-500 uppercase tracking-wider">
            {{ menu.section }}
          </p>
        </div>
      </div>
    </nav>
    <Modal :input-width="40" :is-open="inviteClient" @close="inviteClient = $event">
      <InviteNewClient @close="inviteClient = $event" />
    </Modal>
    <Modal status="Create New Invoice" :input-width="30" :is-open="openModal" @close="openModal = $event">
      <CreateNewInvoice @close="openModal = $event" />
    </Modal>
    <NotificationsModal :visible="showNotification" @close="showNotification = $event">
      <template v-slot:title>
        No Invited Clients
      </template>
      <template v-slot:subtitle>
        You need to invite a client before you can create an invoice.
      </template>
    </NotificationsModal>
    <SlideOver />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import menus from '~/navigation.json'
export default {
  name: 'Navigation',
  data () {
    return {
      menus,
      showMessageDrawer: false,
      inviteClient: false,
      openModal: false,
      showNotification: false
    }
  },
  computed: {
    ...mapGetters({
      acceptedClients: 'client/getAllAcceptedClients'
    })
  },
  methods: {
    ...mapActions({
      logOut: 'authorize/logOut'
    }),
    createInvoice () {
      if (!this.acceptedClients.length) {
        this.showNotification = true
      } else {
        this.openModal = true
      }
    },
    signOut () {
      this.logOut()
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  color: black;
}
.active::before {
  content: "";
  display: block;
  width: 3%;
  background-color: #56CCF2;
  height: 30px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
