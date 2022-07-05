<template>
  <div
    class="fixed inset-0 z-40 md:inset-y-0 md:flex md:w-64 md:flex-col border shadow-xl"
    :class="[showSidebarMenu ? 'block' : 'hidden']"
  >
    <div
      class="fixed inset-0 md:inset-y-0 md:inset-x-full bg-gray-600 md:bg-none bg-opacity-75 md:bg-opacity-0"
      @click="closeSidebarMenu"
    ></div>
    <nav id="home-nav" aria-label="Sidebar" class="max-w-xs bg-white relative">
      <!-- close button -->
      <div class="md:hidden absolute top-0 right-0 -mr-12 pt-2">
        <button
          class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          @click="closeSidebarMenu"
        >
          <span class="sr-only">Close sidebar</span>
          <svg
            class="h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div>
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
                  class="focus:outline-none w-full cursor-pointer sm:text-sm border rounded-md h-8 pl-3 bg-gray-50 shadow-sm"
                  placeholder="Search"
                  @click.stop="$modal.show('luna-search-modal')"
                />
              </div>
              <div id="new-action" class="relative">
                <div>
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
                </div>
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
                        @click="$modal.show('invite-client')"
                      >
                        <span class="w-full flex mt-1">
                          <i class="fi-rr-following mr-3 text-gray-500"></i>
                          Client
                        </span>
                      </button>
                      <button
                        class="hover:bg-blue-50 py-2 pl-3"
                        @click="goToPaymentRequest"
                      >
                        <span class="w-full flex mt-1">
                          <i class="fi-rr-receipt mr-3 text-gray-500"></i>
                          Payment Request
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
                    </div>
                  </div>
                </ClickOutside>
              </div>
            </div>
            <button
              v-for="(menu, menuIndex) in menus"
              :id="getId(menu.title)"
              :key="menuIndex"
              :class="[menu.path.includes(currentLink) ? 'active' : '']"
              class="flex hover:bg-blue-50 mb-1 items-center px-3 pl-4 text-gray-600 py-1 rounded-lg w-full"
              @click="gotoNav(menu.path)"
            >
              <i :class="menu.icon" class="mr-4 mt-0.5"></i>
              <h3 class="mr-auto">
                {{ menu.title }}
              </h3>
              <div v-if="menu.path === 'messages' && unreadMessages" class="">
                <div
                  class="primary-color px-1.5 text-white text-sm inline-flex justify-center items-center rounded-full min-w-[20px]"
                >
                  {{ unreadMessages }}
                </div>
              </div>
              <div
                v-else-if="
                  menu.path === 'notifications' &&
                    getNotificationsSummary.unread > 0
                "
                class="ml-auto"
              >
                <div
                  class="primary-color px-1.5 text-white text-sm inline-flex justify-center items-center rounded-full min-w-[20px]"
                >
                  {{ getNotificationsSummary.unread }}
                </div>
              </div>
            </button>
            <button
              class="md:hidden flex hover:bg-blue-50 items-center px-3 pl-4 text-gray-600 py-1 rounded-lg w-full"
              :class="['settings'.includes(currentLink) ? 'active' : '']"
              @click="gotoNav('settings')"
            >
              <i class="fi-rr-settings mr-4 mt-0.5"></i>
              <h3 class="mr-auto">
                Settings
              </h3>
            </button>
            <button
              id="settings-hint-nav"
              class="hidden md:flex hover:bg-blue-50 items-center px-3 pl-4 text-gray-600 py-1 rounded-lg w-full"
              :class="['settings-profile'.includes(currentLink) ? 'active' : '']"
              @click="gotoNav('settings-profile')"
            >
              <i class="fi-rr-settings mr-4 mt-0.5"></i>
              <h3 class="mr-auto">
                Settings
              </h3>
            </button>
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
                  Send us feedback or email us at support@goluna.app
                </span>
              </div>
              <!-- <div class="flex-shrink">
                  <Toggle2 />
                </div> -->
            </div>
            <a
              href="https://goluna.notion.site/Roadmap-Timeline-98e920761a32435c97aeac63baf3628b"
              class="flex hover:bg-blue-50 mb-1 items-center pl-4 text-gray-600 py-1 rounded-lg"
            >
              <i class="fi-rr-time-half-past mr-4 mt-2"></i>
              <h3 class="">What's coming next...</h3>
            </a>
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

    <div class="w-14 flex-shrink-0" aria-hidden="true">
      <!-- force sidebar to shrink to fit close icon -->
    </div>
    <LunaSearch @close="$modal.hide('luna-search-modal')" />
    <PaymentMethodStatusModal />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PaymentMethodStatusModal from './modals/PaymentMethodStatusModal.vue'
import LunaSearch from '~/components/LunaSearch'
import sendbirdHandlers from '~/mixins/sendbirdHandlers'
export default {
  name: 'Navigation',
  components: { LunaSearch, PaymentMethodStatusModal },
  mixins: [sendbirdHandlers],
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
          title: 'Payments',
          path: 'payments-requests'
        }
      ],
      showNotification: false,
      openModal: false,
      showSidebarMenu: false
    }
  },
  computed: {
    ...mapGetters({
      acceptedClients: 'client/acceptedClients',
      hasActivePaymentMethods: 'payment-methods/hasActivePaymentMethods',
      getNotificationsSummary: 'notifications/getNotificationsSummary',
      getUnreadMessagesCount: 'sendbird-v2/getUnreadMessagesCount'
    }),
    unreadMessages () {
      let count = 0
      for (const key in this.getUnreadMessagesCount) {
        count += this.getUnreadMessagesCount[key] || 0
      }
      return count
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
  watch: {
    $route: {
      handler (newRouteValue) {
        this.getNav(newRouteValue)
      },
      deep: true
    }
  },
  created () {
    this.$nuxt.$on('displayPageSidebar', () => {
      this.toggleSidebarMenu()
    })
    this.$nuxt.$on('hideSidebarMenu', () => {
      this.hideMobileMenu()
    })
  },
  async beforeMount () {
    this.getNav(this.$route)
    try {
      await this.connectSendbird(this.$auth.user.sendbirdId)
      await this.connectSocket()
      await this.getChannelsMetadata()
      await this.$store.dispatch('notifications/fetchNotificationsSummary')
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    ...mapActions({
      getPaymentMethods: 'payment-methods/getPaymentMethods'
    }),
    goToPaymentRequest () {
      if (!this.hasActivePaymentMethods) {
        this.$modal.show('payment-method-status')
      } else {
        this.$router.push({ name: 'payments-request' })
      }
    },
    getId (e) {
      switch (e) {
        case 'Report':
          return 'reporting-hint'
        case 'Messages':
          return 'message-hint-nav'
        case 'Schedule':
          return 'session-st-nav'
        case 'Payments':
          return 'payments-hint-nav'
        case 'Settings':
          return 'settings-hint-nav'
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
      logOut: 'authorize/logOut',
      connectSendbird: 'sendbird-v2/connect',
      connectSocket: 'socketio/connect',
      getChannelsMetadata: 'sendbird-v2/getChannelsMetadata'
    }),
    inviteClient () {
      this.$modal.show('invite-client')
    },
    signOut () {
      this.logOut()
    },
    toggleSidebarMenu () {
      this.showSidebarMenu = !this.showSidebarMenu
    },
    closeSidebarMenu () {
      this.showSidebarMenu = false
    },
    gotoNav (path) {
      this.$router.push({ name: path })
      this.showSidebarMenu = false
    }
  },
  async mounted () {
    try {
      await this.getPaymentMethods()
    } catch (error) {}
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
