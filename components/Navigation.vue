<template>
  <div class="tail-hidden lg:tail-block lg:tail-col-span-3 xl:tail-col-span-2 tail-border-r tail-shadow-md tail-bg-white">
    <!-- Sidebar Search -->

    <!-- main navigation -->
    <nav aria-label="Sidebar" class="tail-sticky tail-top-0 tail-divide-y tail-divide-gray-300">
      <div class="tail-relative tail-pt-8">
        <div>
          <img src="@/assets/img/getwelp.png" class="tail-ml-4" />
        </div>
        <div class="tail-px-3 tail-py-1 tail-mt-3 tail-mb-4">
          <label for="search" class="tail-sr-only">Search</label>
          <div class="tail-mt-1 tail-relative tail-rounded-md tail-border tail-border-gray-200">
            <div class="tail-absolute tail-inset-y-0 tail-left-0 tail-pl-3 tail-flex tail-items-center tail-pointer-events-none" aria-hidden="true">
              <i class="ns-search tail-mr-3 tail-text-gray-400 tail-flex-shrink-0 tail-text-lg" />
            </div>
            <input type="text" name="search" class="tail-bg-gray-100 tail-py-1 focus:tail-border-gray-700 focus:tail-outline-none tail-block tail-w-full tail-pl-9 sm:tail-text-sm tail-border-gray-300 tail-rounded-md" placeholder="Search">
          </div>
        </div>
        <div class="tail-space-y-2">
          <div v-for="menu in menus.menu" :key="menu">
            <NuxtLink
              v-if="menu.path && !['signout', 'Messages', 'Notifications', 'createinvoice', 'inviteClient'].includes(menu.path)"
              :to="{ name: menu.path }"
              exact-active-class="active"
              class="tail-capitalize tail-text-gray-500 tail-group tail-flex tail-items-center tail-pr-0 tail-py-1 tail-font-medium hover:tail-bg-gray-50"
            >
              <i :class="[menu.icon ? menu.icon : '']" class="tail-text-gray-500 tail-ml-3 tail-mr-4 tail-flex-shrink-0 tail-text-lg" />
              <span class="tail-truncate tail-text-sm tail-font-normal">
                {{ menu.title }}
              </span>
            </NuxtLink>
            <button
              v-else-if="menu.path === 'inviteClient'"
              class="tail-capitalize tail-text-gray-500 tail-group tail-flex tail-items-center tail-pr-0 tail-py-2 tail-text-sm tail-font-medium hover:tail-bg-gray-50 tail-w-full"
              @click="inviteClient = true"
            >
              <i class="ns-user-add tail-ml-3 tail-mr-4 tail-flex-shrink-0 tail-text-lg tail-text-gray-500" />
              <span class="tail-truncate tail-text-sm tail-font-normal">Invite Client</span>
            </button>
            <button
              v-else-if="menu.path === 'createinvoice'"
              class="tail-capitalize tail-text-gray-500 tail-group tail-flex tail-items-center tail-pr-0 tail-py-2 tail-text-sm tail-font-medium hover:tail-bg-gray-50 tail-w-full"
              @click="createInvoice"
            >
              <i class="ns-plus tail-ml-3 tail-mr-4 tail-flex-shrink-0 tail-text-lg tail-text-gray-500" />
              <span class="tail-truncate tail-text-sm tail-font-normal">New Invoice</span>
            </button>
            <button
              v-else-if=" menu.path === 'Messages'"
              class="tail-capitalize tail-text-gray-500 tail-group tail-flex tail-items-center tail-pr-0 tail-py-2 tail-text-sm tail-font-medium hover:tail-bg-gray-50 tail-w-full"
              @click="toggleMenu(menu.path)"
            >
              <i :class="[menu.icon ? menu.icon : '']" class="tail-text-gray-500 tail-ml-3 tail-mr-4 tail-flex-shrink-0 tail-text-lg" />
              <span class="tail-truncate tail-text-sm tail-font-normal">Messages</span>
            </button>
            <button
              v-else-if="menu.path === 'Notifications'"
              class="tail-capitalize tail-text-gray-500 tail-group tail-flex tail-items-center tail-pr-0 tail-py-2 tail-text-sm tail-font-medium hover:tail-bg-gray-50 tail-w-full"
              @click="toggleMenu(menu.path)"
            >
              <i :class="[menu.icon ? menu.icon : '']" class="tail-text-gray-500 tail-ml-3 tail-mr-4 tail-flex-shrink-0 tail-text-lg" />
              <span class="tail-truncate tail-text-sm tail-font-normal">Notifications</span>
            </button>
            <button
              v-else-if="menu.path === 'signout'"
              class="tail-capitalize tail-text-gray-500 tail-group tail-flex tail-items-center tail-pr-0 tail-py-2 tail-text-sm tail-font-medium hover:tail-bg-gray-50 tail-w-full"
              @click="signOut"
            >
              <i class="ns-power tail-ml-3 tail-mr-4 tail-flex-shrink-0 tail-text-lg tail-text-red-600" />
              <span class="tail-truncate tail-text-sm tail-font-normal">Signout</span>
            </button>
            <p v-if="menu.section" class="tail-px-3 tail-text-sm tail-my-4 tail-text-gray-500 uppercase tracking-wider">
              {{ menu.section }}
            </p>
          </div>
        </div>
        <navigation-sub-menu v-model="showNotificationsMenu">
          <template v-slot:title>
            <h2>
              Notifications
            </h2>
          </template>
          <template v-slot:body>
            <div class="tail-p-6" v-if="true">
              <div class="tail-flex">
                <div>
                  <img src="https://picsum.photos/seed/picsum/200/300" class="tail-rounded-full tail-w-12 tail-h-12" />
                </div>
                <div>
                  <div class="tail-flex tail-flex-col tail-px-2">
                    <span>
                      APBC Committee Meeting with Ali R
                    </span>
                    <span>7pm - 9pm . Remote</span>
                  </div>
                  <div class="tail-flex tail-justify-between tail-pt-2">
                    <button class="base-button tail-px-4 tail-mr-3">
                      Accept
                    </button>
                    <button class="outline-button tail-px-4">
                      Re-schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="tail-flex tail-justify-center tail-items-center tail-pt-2">
              <div class="tail-text-center tail-py-5">
                <h2 class="tail-font-bold">
                  No Notifications.
                </h2>
                <div class="tail-pt-3">
                  <p>We will notify you when something arrives</p>
                </div>
              </div>
            </div>
          </template>
        </navigation-sub-menu>
        <navigation-sub-menu v-model="showMessagesMenu">
          <template v-slot:title>
              <h2>
              Messages
            </h2>
          </template>
          <template v-slot:body>
            <div class="tail-mt-1 tail-relative tail-rounded-md tail-border tail-border-gray-200 tail-pb-4 tail-h-4">
              <div class="tail-absolute tail-inset-y-0 tail-left-0 tail-pl-3 tail-pt-3 tail-flex tail-items-center tail-pointer-events-none" aria-hidden="true">
                <i class="ns-search tail-mr-3 tail-text-gray-400 tail-flex-shrink-0 tail-text-lg" />
              </div>
              <input type="text" name="search" class="tail-bg-gray-100 tail-py-1 focus:tail-border-gray-700 focus:tail-outline-none tail-block tail-w-full tail-pl-9 sm:tail-text-sm tail-border-gray-300" placeholder="Search or start a new chat">
            </div>
            <div class="tail-px-3 tail-pt-6" v-if="true">
              <div class="tail-flex">
                <div>
                  <img src="https://picsum.photos/seed/picsum/200/300" class="tail-rounded-full tail-w-12 tail-h-12" />
                </div>
                <div>
                  <div class="tail-flex tail-flex-row tail-px-2">
                    <h4 class="tail-font-bold">
                      James R
                    </h4>
                    <span class="tail-px-2">.</span>
                    <small class="tail-text-gray-400">Time</small>
                  </div>
                  <span class="tail-px-2">
                    Lorem ipsum sit amet...
                  </span>
                </div>
              </div>
            </div>
            <div v-else class="tail-flex tail-justify-center tail-items-center tail-pt-2">
              <div class="tail-text-center tail-py-5">
                <h2 class="tail-font-bold">
                  No messages, yet.
                </h2>
                <div class="tail-pt-3">
                  <p>Looks like you haven’t started a conversation with your client</p>
                </div>
              </div>
            </div>
          </template>
        </navigation-sub-menu>
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
      showNotification: false,
      inviteClient: false,
      openModal: false,
      showMessagesMenu: false,
      showNotificationsMenu: false
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
    toggleMenu (path) {
      if (path === 'Messages') {
        this.showNotificationsMenu = false
        this.showMessagesMenu = true
      } else if (path === 'Notifications') {
        this.showNotificationsMenu = true
        this.showMessagesMenu = false
      }
    },
    signOut () {
      this.logOut()
    },
    close () {
      this.$emit('closemessagedrawer')
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
