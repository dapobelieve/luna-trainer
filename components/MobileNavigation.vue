<template>
  <div class="lg:tail-hidden tail-h-screen tail-w-screen md:tail-w-full tail-block index tail-border-r tail-shadow-md tail-bg-white">
    <!-- Sidebar Search -->

    <!-- main navigation -->
    <nav aria-label="Sidebar" class="tail-sticky tail-top-0 tail-divide-y tail-divide-gray-300">
      <div class="tail-relative tail-pt-8">
        <div class="tail-px-3 tail-py-1 tail-mt-3 tail-mb-4">
          <label for="search" class="tail-sr-only">Search</label>
          <div class="tail-mt-1 tail-relative tail-rounded-md tail-border tail-border-gray-200">
            <div class="tail-absolute tail-inset-y-0 tail-left-0 tail-pl-3 tail-flex tail-items-center tail-pointer-events-none" aria-hidden="true">
              <i class="ns-search tail-mr-3 tail-text-gray-400 tail-flex-shrink-0 tail-text-lg" />
            </div>
            <input type="text" name="search" class="tail-bg-gray-100 tail-py-1 focus:tail-border-gray-700 focus:tail-outline-none tail-block tail-w-full tail-pl-9 sm:tail-text-sm tail-border-gray-300 tail-rounded-md" placeholder="Search">
          </div>
        </div>
        <div class="tail-space-y-1">
          <div v-for="menu in menus.menu" :key="menu.index" class="navItems" @click.prevent="hideSidebar">
            <NuxtLink
              v-if="menu.path && !['signout', 'Notifications', 'Messages'].includes(menu.path)"
              :to="{ name: menu.path, params:menu.params }"
              exact-active-class="active"
              class="tail-capitalize tail-text-gray-500 tail-group tail-flex tail-items-center tail-pr-0 tail-py-1 tail-font-medium hover:tail-bg-gray-50"
            >
              <div class="tail-flex">
                <i :class="[menu.icon ? menu.icon : '']" class="tail-text-gray-500 tail-ml-3 tail-mr-4 tail-flex-shrink-0 tail-text-lg" />
                <span class="tail-truncate tail-text-sm tail-font-normal">
                  {{ menu.title }}
                </span>
              </div>
              <span v-if="menu.dev" class="tail-inline-block tail-rounded-full tail-mx-3 tail-bg-gray-500 tail-text-indigo-50 tail-text-xs tail-px-2 tail-float-right tail-font-mono">Development</span>
            </NuxtLink>
            <button
              v-else-if="menu.path === 'Notifications'"
              class="tail-capitalize tail-text-gray-500 tail-group tail-flex tail-items-center tail-pr-0 tail-py-1 tail-text-sm tail-font-medium hover:tail-bg-gray-50 tail-w-full"
              @click.prevent.stop="toggleMenu(menu.path)"
            >
              <i :class="[menu.icon ? menu.icon : '']" class="tail-text-gray-500 tail-ml-3 tail-mr-4 tail-flex-shrink-0 tail-text-lg" />
              <span class="tail-truncate tail-text-sm tail-font-normal">Notifications</span>
            </button>
            <button
              v-else-if="menu.path === 'Messages'"
              class="tail-capitalize tail-text-gray-500 tail-group tail-flex tail-items-center tail-pr-0 tail-py-1 tail-text-sm tail-font-medium hover:tail-bg-gray-50 tail-w-full"
              @click.prevent.stop="toggleMenu(menu.path)"
            >
              <i :class="[menu.icon ? menu.icon : '']" class="tail-text-gray-500 tail-ml-3 tail-mr-4 tail-flex-shrink-0 tail-text-lg" />
              <div class="tail-flex">
                <span class="tail-truncate tail-text-sm tail-font-normal">Messages</span>
                <b
                  v-if="unreadMessages.length"
                  class="tail-flex tail-py-0.5 tail-px-1.5 tail-bg-red-500 tail-rounded-full tail-text-xs tail-text-white tail-ml-2"
                >{{ unreadMessages.length }}</b>
              </div>
            </button>
            <button
              v-else-if="menu.path === 'signout'"
              class="tail-capitalize tail-text-gray-500 tail-group tail-flex tail-items-center tail-pr-0 tail-py-1 tail-text-sm tail-font-medium hover:tail-bg-gray-50 tail-w-full"
              @click="signOut"
            >
              <i class="ns-power tail-ml-3 tail-mr-4 tail-flex-shrink-0 tail-text-lg tail-text-red-600" />
              <span class="tail-truncate tail-text-sm tail-font-normal">Signout</span>
            </button>
            <p v-if="menu.section" class="tail-px-3 tail-text-sm tail-my-4 tail-text-gray-500 uppercase tracking-wider">
              <span>{{ menu.section }}</span>
              <span v-if="menu.dev" class="tail-inline-block tail-rounded-full tail-mx-3 tail-bg-gray-500 tail-text-indigo-50 tail-text-xs tail-px-2 tail-float-right tail-font-mono">Development</span>
            </p>
          </div>
        </div>
        <!-- flyout notifications -->
        <navigation-sub-menu v-model="showNotificationsMenu">
          <template v-slot:title>
            <h2 class="tail-font-semibold">
              Notifications
            </h2>
          </template>
          <template v-slot:body>
            <div v-if="0" class="tail-px-4 tail-py-2 tail-grid tail-gap-6">
              <div v-for="n in 20" :key="n.index" class="tail-flex tail-space-x-3">
                <div>
                  <img src="https://picsum.photos/seed/picsum/200/300" class="tail-rounded-full tail-w-12 tail-h-12" />
                </div>
                <div>
                  <div class="tail-flex tail-flex-col tail-text-sm">
                    <span>
                      APBC Committee Meeting with Ali R
                    </span>
                    <span>7pm - 9pm . Remote</span>
                  </div>
                  <div class="tail-flex tail-space-x-2 tail-pt-2">
                    <button class="base-button tail-px-0 tail-text-sm">
                      Accept
                    </button>
                    <button class="outline-button tail-px-0 tail-text-sm">
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

        <!-- flyout messages -->
        <navigation-sub-menu v-model="showMessagesMenu">
          <template v-slot:title>
            <h2 class="tail-font-semibold">
              Messages
            </h2>
          </template>
          <template v-slot:search>
            <div class="tail-flex tail-px-5 tail-py-2 tail-bg-gray-100 tail-items-center">
              <i class="ns-search tail-text-gray-400 tail-text-2xl tail-pr-2"></i>
              <input type="text" class="tail-w-full focus:tail-outline-none tail-bg-transparent" placeholder="Search name to start new chat">
            </div>
          </template>
          <template v-slot:body>
            <div v-if="unreadMessages.length" class="tail-py-2 tail-grid">
              <button v-for="n in unreadMessages" :key="n.url" type="button" class="tail-flex tail-space-x-3 hover:tail-bg-gray-100 tail-px-4 tail-py-2 tail-cursor-pointer" @click="gotoMessage(n.members)">
                <div>
                  <ClientAvatar
                    :client-info="{
                      firstName: 'Get',
                      lastName: 'Welp'
                    }"
                  />
                </div>
                <div class="tail-text-sm">
                  <div class="tail-capitalize tail-font-semibold">
                    <span class="tail-capitalize tail-font-semibold tail-mr-2">
                      {{ n.lastMessage._sender.nickname }}
                    </span> <span class="tail-text-gray-400 tail-text-xs tail-normal-case">{{ formatDistance(new Date(n.lastMessage.createdAt), new Date(), { addSuffix: true }) }}.</span>
                  </div>
                  <div class="tail-flex tail-space-x-2 tail-pt-2 tail-text-gray-600">
                    {{ n.lastMessage.message.length > 76 ? `${n.lastMessage.message.substring(0, 76)}...` : n.lastMessage.message }}
                  </div>
                </div>
              </button>
            </div>
            <div v-else class="tail-flex tail-justify-center tail-items-center tail-pt-2">
              <div class="tail-text-center tail-py-5">
                <h2 class="tail-font-bold">
                  No New Messages.
                </h2>
                <div class="tail-pt-3">
                  <p>We will notify you when something arrives</p>
                </div>
              </div>
            </div>
          </template>
        </navigation-sub-menu>
      </div>
    </nav>
    <NotificationsModal :visible="showNotification" @close="showNotification = $event">
      <template v-slot:title>
        {{ !acceptedClients.length ? 'No Invited Clients' : 'Services Unavailable' }}
      </template>
      <template v-slot:subtitle>
        {{
          !acceptedClients.length ? 'You need to invite a client before you can create an invoice.' : 'You need to add at least one service before you can create an invoice.' }}
      </template>
      <template v-slot:actionButtons>
        <button v-if="!acceptedClients.length" class="base-button tail-normal-case" style="width: fit-content" @click="inviteClient = true">
          Invite a client
        </button>
        <NuxtLink v-else to="/Settings#services" class="base-button tail-normal-case" style="width: fit-content">
          Add a service
        </NuxtLink>
      </template>
    </NotificationsModal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { formatDistance } from 'date-fns'
import menus from '~/mobilenavigation.json'
export default {
  name: 'MobileNavigation',
  data () {
    return {
      formatDistance,
      menus,
      showNotification: false,
      showNotificationsMenu: true,
      showMessagesMenu: true
    }
  },
  computed: {
    ...mapGetters({
      acceptedClients: 'client/acceptedClients',
      unreadMessages: 'sendBird/getUnreadMessages'
    }),
    firstName (string) {
      if (string) {
        const firstName = string.split(' ')
        return firstName[0]
      }
      return 'get'
    },
    lastName (string) {
      if (string) {
        const lastName = string.split(' ')
        return lastName[1]
      }
      return 'welp'
    }
  },
  methods: {
    ...mapActions({
      logOut: 'authorize/logOut'
    }),
    gotoMessage (arr) {
      const user = arr.find(m => m.userId !== this.$auth.user.sendbirdId)
      const client = this.acceptedClients.find(c => c.sendbirdId === user.userId)
      this.$router.push({
        name: 'Client-id-Messages',
        params: { id: client._id }
      })
    },
    createInvoice () {
      if (!this.acceptedClients.length || !this.$auth.user.services.length) {
        this.showNotification = true
      } else {
        this.openModal = true
      }
    },
    toggleMenu (path) {
      if (path === 'Notifications') {
        this.showNotificationsMenu = true
      } else if (path === 'Messages') {
        this.showMessagesMenu = true
      }
    },
    signOut () {
      this.logOut()
    },
    hideSidebar (e) {
      if (e.currentTarget.classList.contains('navItems')) {
        this.$emit('closeSidebar')
      }
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
.index{
  z-index: 40;
}
</style>
