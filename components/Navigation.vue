<template>
  <div
    class="block lg:h-screen z-40 lg:w-56 xl:w-64 lg:border-r lg:shadow-sm bg-white lg:sticky lg:top-0 left-0 lg:rounded-none text-gray-500 flex-shrink-0 top-14 border rounded-xl shadow-xl h-full w-full md:w-1/2"
  >
    <nav aria-label="Sidebar" id="home-nav" class="w-full">
      <div class="">
        <div
          class="px-1 pt-3 lg:pt-3 flex flex-col border overflow-y-auto h-screen max-h-screen"
        >
          <div class="mb-auto">
            <div class="ml-1">
              <div class="mb-8 mt-1">
                <NuxtLink to="/">
                  <img class="h-8" src="~/assets/img/logo-v2.svg" />
                </NuxtLink>
              </div>
              <div class="flex items-center">
                <div
                  class="flex-shrink h-9 w-9 mr-3 border overflow-hidden border-green-500 rounded-full avatar"
                >
                  <img
                    class="object-cover w-full h-full rounded-full"
                    :src="$auth.user.imgURL"
                  />
                </div>
                <div class="flex flex-col">
                  <span class="text-gray-800 text-sm font-light">{{
                    $auth.user.businessName
                  }}</span>
                  <span
                    class="text-gray-800 text-md font-medium"
                  >Hi! {{ $auth.user.firstName }}
                    {{ $auth.user.lastName }}</span>
                </div>
              </div>
            </div>
            <div class="py-4">
              <label for="search" class="sr-only">Search</label>
              <div class="relative mb-2 flex items-center h-8">
                <i
                  class="fi-rr-search top-1 absolute right-2 text-gray-400"
                  aria-hidden="true"
                ></i>
                <input
                  type="text"
                  name="search"
                  class="focus:outline-none w-full sm:text-sm border rounded-md h-8 pl-3 bg-gray-50 shadow-sm focus:border-blue-500"
                  placeholder="Search"
                />
              </div>
              <div class="relative" id="new-action">
                <button
                  style="height: 35px; padding-bottom: 0"
                  class="rounded-lg px-0 pl-2 w-full button-fill h-4"
                  @click="showQuickMenu = true"
                >
                  <div
                    class="w-full new-button flex justify-start items-center font-bold"
                  >
                    <i class="fi-rr-plus mr-4"></i> New
                  </div>
                </button>
                <ClickOutside
                  :do="
                    (e) => {
                      handleClick(e);
                    }
                  "
                >
                  <div
                    v-show="showQuickMenu"
                    class="absolute top-0 w-full z-40 right-0 rounded-lg bg-white ring-opacity-5 ring-1 ring-black shadow-lg"
                  >
                    <div class="flex flex-col text-black" role="none">
                      <button
                        class="hover:bg-blue-50 py-2 pl-3"
                        @click="$modal.show('inviteClientModal')"
                      >
                        <span class="w-full flex mt-1">
                          <i class="fi-rr-following mr-3 text-gray-500"></i>
                          Client
                        </span>
                      </button>
                      <button
                        class="hover:bg-blue-50 py-2 pl-3"
                        @click="$router.push({ name: 'invoice' })"
                      >
                        <span class="w-full flex mt-1">
                          <i class="fi-rr-receipt mr-3 text-gray-500"></i>
                          Invoice
                        </span>
                      </button>
                      <button
                        class="hover:bg-blue-50 py-2 pl-3"
                        @click="openSession"
                      >
                        <span class="w-full flex mt-1">
                          <i class="fi-rr-calendar mr-3 text-gray-500"></i>
                          Session
                        </span>
                      </button>
                      <button class="hover:bg-blue-50 py-2 pl-3">
                        <span class="w-full flex mt-1">
                          <i class="fi-rr-link mr-3 text-gray-500"></i>
                          Payment Link
                        </span>
                      </button>
                    </div>
                  </div>
                </ClickOutside>
              </div>
            </div>
            <NuxtLink
              v-for="(menu, menuIndex) in menus"
              :key="menuIndex"
              :class="[menu.path.includes(currentLink) ? 'active' : '']"
              :to="{ name: menu.path }"
              :id="getId(menu.title)"
              class="flex hover:bg-blue-50 mb-1 items-center px-3 pl-4 text-gray-600 py-1 rounded-lg"
            >
              <i :class="menu.icon" class="mr-4 mt-0.5"></i>
              <h3 class="">
                {{ menu.title }}
              </h3>
            </NuxtLink>
          </div>
          <div class="bottom-nav">
            <div class="pl-2 mb-4">
              Help
            </div>
            <div
              class="bg-gray-700 flex items-center justify-between px-3 py-3 rounded-lg"
            >
              <div class="text-white">
                <h3 class="font-bold text-white mb-2">
                  Need Help?
                </h3>
                <span class="text-sm">
                  Activate the switch button to send a message to us
                </span>
              </div>
              <div class="flex-shrink">
                <Toggle2 />
              </div>
            </div>
            <NuxtLink
              to="/"
              class="flex hover:bg-blue-50 mb-1 items-center pl-4 text-gray-600 py-1 rounded-lg"
            >
              <i class="fi-rr-time-half-past mr-4 mt-4"></i>
              <h3 class="">
                What's coming next...
              </h3>
            </NuxtLink>
            <button
              class="flex hover:bg-blue-50 mb-1 w-full justify-start px-3 pl-4 text-gray-600 py-1 rounded-lg"
              @click="signOut"
            >
              <i class="fi-rr-power mr-4 mt-0.5"></i>
              <h3 class="">
                Sign out
              </h3>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <NotificationsModal
      :visible="showNotification"
      @close="showNotification = $event"
    >
      <template v-slot:title>
        {{
          !acceptedClients.length
            ? "No Invited Clients"
            : "Services Unavailable"
        }}
      </template>
      <template v-slot:subtitle>
        {{
          !acceptedClients.length
            ? "You need to invite a client before you can create an invoice."
            : "You need to add at least one service before you can create an invoice."
        }}
      </template>
      <template v-slot:actionButtons>
        <button
          v-if="!acceptedClients.length"
          class="base-button normal-case"
          style="width: fit-content"
          @click="inviteClient"
        >
          Invite a client
        </button>
        <NuxtLink
          v-else
          to="/Settings#services"
          class="base-button normal-case"
          style="width: fit-content"
        >
          Add a service
        </NuxtLink>
      </template>
    </NotificationsModal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Navigation',
  data () {
    return {
      showQuickMenu: false,
      currentLink: 'dashboard',
      menus: [
        {
          icon: 'fi-rr-home',
          title: 'Home',
          path: 'dashboard'
        },
        {
          icon: 'fi-rr-following',
          title: 'Clients',
          path: 'clients'
        },
        {
          icon: 'fi-rr-calendar',
          title: 'Schedule',
          path: 'schedule'
        },
        {
          icon: 'fi-rr-receipt',
          title: 'Payment',
          path: 'payment-requests-sent'
        },
        {
          icon: 'fi-rr-comment-alt',
          id: 'introjs-step-5',
          title: 'Messages',
          path: 'messages'
        },
        {
          icon: 'fi-rr-bell-ring',
          title: 'Notifications',
          path: 'notifications'
        },
        {
          icon: 'fi-rr-chart-histogram',
          title: 'Report',
          path: 'reports-financials'
        },
        {
          icon: 'fi-rr-settings',
          title: 'Settings',
          path: 'settings-profile'
        }
      ],
      showNotification: false,
      openModal: false
    }
  },
  computed: {
    ...mapGetters({
      acceptedClients: 'client/acceptedClients',
      unreadMessages: 'sendBird/getUnreadMessages',
      notifications: 'notifications/getAllNotifications'
    }),
    unreadnotifications () {
      return this.notifications.filter(n => n.status === 'UNREAD')
    },
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
  async beforeMount () {
    this.getNav(this.$route)

    try {
      await this.$store.dispatch('notifications/fetchNotifications')
    } catch (e) {
      console.log(e)
    }

    const url = new URL(process.env.BASEURL_HOST)
    // eslint-disable-next-line
    const socket = io(`${url.origin}`, {
      path: `${url.pathname}/socket.io`,
      query: {
        accessToken: localStorage
          .getItem('auth._token.local')
          .split('Bearer ')[1]
      }
    })

    socket.on('connect', () => {
      console.log('CONNECTED 🚀')
    })
    socket.on('new-notification', (data) => {
      const { type } = data
      console.log(data)
      if (type === 'LOGIN_WITH_QR') {
        this.$nuxt.$emit('device-paired')
      }
      const isNotificationOn = sessionStorage.getItem('notificationOn')
      if (isNotificationOn) {
        switch (type) {
          case 'INVITE_REQUEST_ACCEPTED':
            this.$lunaToast.show(`${data.firstName} just accepted your invite`)
            break
          case 'PAYMENT_ACCEPTED':
            this.$lunaToast.show('payment made')
            break
          case 'STRIPE_CONNECTION_SUCCESSFUL':
            this.$lunaToast.show('Stripe has just connected successful')
            break
          default:
            this.$lunaToast.show('You have a new notification')
            break
        }
      }
      if (type === 'INVITE_REQUEST_ACCEPTED') {
        this.localUpdateClient(data.data)
      }
      this.$store.commit('notifications/setNotification', data)
    })

    socket.on('CALENDAR_SYNC', () => {})
  },
  methods: {
    getId (e) {
      switch (e) {
        case 'Report':
          return 'reporting-hint'
        case 'Settings':
          return 'settings-hint'
        default:
          return ''
      }
    },
    openSession () {
      this.$store.commit('scheduler/setStates', {
        drawer: { open: true, activePage: 'new-session' }
      })
    },
    handleClick (e) {
      if (!e.target.closest('.new-button')) {
        this.showQuickMenu = false
      }
    },
    getNav (e) {
      const paths = e.path?.split('/')

      if (paths.length >= 1) {
        this.currentLink = paths[1]
      }
    },
    ...mapActions({
      logOut: 'authorize/logOut'
    }),
    inviteClient () {
      this.$modal.show('inviteClientModal')
    },
    signOut () {
      this.logOut()
    },
    hideSidebarMenu () {
      this.$nuxt.$emit('hideSidebarMenu')
    }
  },
  watch: {
    $route: {
      handler (newRouteValue) {
        // put your code here
        this.getNav(newRouteValue)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  @apply bg-blue-50;
  @apply font-bold;
}
button {
  @apply font-normal text-base;
}
i {
  @apply text-lg;
}
</style>
