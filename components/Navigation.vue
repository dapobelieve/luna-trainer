<template>
  <div
    class="
      block
      lg:h-screen
      z-40
      lg:w-56
      xl:w-64
      lg:border-r lg:shadow-sm
      bg-white
      lg:sticky lg:top-0
      left-0
      lg:rounded-none
      text-gray-500
      flex-shrink-0
      top-14
      border
      rounded-xl
      shadow-xl
      h-full
      w-full
      md:w-1/2
    "
  >
    <nav id="home-nav" aria-label="Sidebar" class="w-full">
      <div class="">
        <div
          class="
            px-1
            pt-3
            lg:pt-3
            flex flex-col
            border
            overflow-y-auto
            h-screen
            max-h-screen
          "
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
                  class="
                    flex-shrink
                    h-9
                    w-9
                    mr-3
                    border
                    overflow-hidden
                    border-green-500
                    rounded-full
                    avatar
                  "
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
                  class="
                    focus:outline-none
                    w-full
                    cursor-pointer
                    sm:text-sm
                    border
                    rounded-md
                    h-8
                    pl-3
                    bg-gray-50
                    shadow-sm
                  "
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
                      class="
                        w-full
                        new-button
                        flex
                        justify-start
                        items-center
                        font-bold
                      "
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
                    class="
                      absolute
                      top-0
                      w-full
                      z-40
                      right-0
                      rounded-lg
                      bg-white
                      ring-opacity-5 ring-1 ring-black
                      shadow-lg
                    "
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
                        @click="$router.push({ name: 'payments-request' })"
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
            <NuxtLink
              v-for="(menu, menuIndex) in menus"
              :id="getId(menu.title)"
              :key="menuIndex"
              :class="[menu.path.includes(currentLink) ? 'active' : '']"
              :to="{ name: menu.path }"
              class="
                flex
                hover:bg-blue-50
                mb-1
                items-center
                px-3
                pl-4
                text-gray-600
                py-1
                rounded-lg
              "
            >
              <i :class="menu.icon" class="mr-4 mt-0.5"></i>
              <h3 class="">
                {{ menu.title }}
              </h3>
              <div
                v-if="menu.path === 'messages' && unreadMessages"
                class="ml-auto"
              >
                <div
                  class="
                    primary-color
                    px-1.5
                    text-white text-sm
                    inline-flex
                    justify-center
                    items-center
                    rounded-full
                  "
                >
                  {{ unreadMessages }}
                </div>
              </div>
              <div
                v-else-if="
                  menu.path === 'notifications' && getNotificationsSummary.unread > 0
                "
                class="ml-auto"
              >
                <div
                  class="
                    primary-color
                    px-1.5
                    text-white text-sm
                    inline-flex
                    justify-center
                    items-center
                    rounded-full
                  "
                >
                  {{ getNotificationsSummary.unread }}
                </div>
              </div>
            </NuxtLink>
          </div>
          <div class="bottom-nav">
            <div class="pl-2 mb-4">
              Help
            </div>
            <div
              class="
                bg-gray-700
                flex
                items-center
                justify-between
                px-3
                py-3
                rounded-lg
              "
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
              class="
                flex
                hover:bg-blue-50
                mb-1
                items-center
                pl-4
                text-gray-600
                py-1
                rounded-lg
              "
            >
              <i class="fi-rr-time-half-past mr-4 mt-2"></i>
              <h3 class="">
                What's coming next...
              </h3>
            </a>
            <button
              class="
                flex
                hover:bg-blue-50
                mb-1
                w-full
                justify-start
                px-3
                pl-4
                text-gray-600
                py-1
                rounded-lg
              "
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
    <LunaSearch @close="$modal.hide('luna-search-modal')" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import LunaSearch from '~/components/LunaSearch'
import sendbirdHandlers from '~/mixins/sendbirdHandlers'
export default {
  name: 'Navigation',
  components: { LunaSearch },
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
          title: 'Payment',
          path: 'payments-requests-sent'
        },
        // {
        //   icon: 'fi-rr-chart-histogram',
        //   title: 'Report',
        //   path: 'reports-financials'
        // },
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
  async beforeMount () {
    this.getNav(this.$route)
    try {
      await this.connectSendbird(this.$auth.user.sendbirdId)
      await this.getChannelsMetadata()
      await this.$store.dispatch('notifications/fetchNotificationsSummary')
      this.socketNotification()
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    getId (e) {
      switch (e) {
        case 'Report':
          return 'reporting-hint'
        case 'Settings':
          return 'settings-hint'
        case 'Messages':
          return 'message-hint-nav'
        case 'Schedule':
          return 'session-st-nav'
        case 'Payment':
          return 'billing-hint-nav'
        default:
          return ''
      }
    },
    ...mapMutations({
      localUpdateClient: 'client/LOCAL_UPDATE_CLIENT'
    }),
    socketNotification (data) {
      const url = new URL(process.env.BASEURL_HOST)
      // eslint-disable-next-line
      const socket = io(`${url.origin}`, {
        path: `${url.pathname}socket.io`,
        query: {
          accessToken: localStorage
            .getItem('auth._token.local')
            .split('Bearer ')[1]
        }
      })
      socket.on('connect', () => {
        console.log('CONNECTED 🚀')
      })
      socket.on('new-notification', async (data) => {
        console.log('NEW SOCKET MESSAGE >>>>', data)
        const { type } = data
        switch (type) {
          case 'LOGIN_WITH_QR':
            this.$nuxt.$emit('device-paired')
            break
          case 'INVITE_REQUEST_ACCEPTED':
            this.localUpdateClient(data.data)
            this.$lunaToast.show(
              `${data.data.firstName} just accepted your invite`
            )
            break
          case 'PAYMENT_ACCEPTED':
            this.$lunaToast.show(`${data.message}`)
            break
          case 'NEW_PAYMENT_RECEIPT':
            this.$lunaToast.show(`${data.message}`)
            this.getInvoices()
            break
          case 'STRIPE_CONNECTION_SUCCESSFUL':
            await this.getPaymentMethods()
            this.$lunaToast.show('Stripe has just connected successful')
            break
          case 'SESSION_RESCHEDULED':
            this.$lunaToast.show('Session has been Rescheduled')
            break
          default:
            this.$lunaToast.show('You have a new notification')
            break
        }
        this.$store.dispatch('notifications/fetchNotificationsSummary')
      })
      socket.on('CALENDAR_SYNC', () => {})
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
      getInvoices: 'invoice/getInvoices',
      logOut: 'authorize/logOut',
      connectSendbird: 'sendbird-v2/connect',
      getChannelsMetadata: 'sendbird-v2/getChannelsMetadata',
      getPaymentMethods: 'payment-methods/getPaymentMethods'
    }),
    inviteClient () {
      this.$modal.show('invite-client')
    },
    signOut () {
      this.logOut()
    },
    hideSidebarMenu () {
      this.$nuxt.$emit('hideSidebarMenu')
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
