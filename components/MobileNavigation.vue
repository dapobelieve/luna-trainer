<template>
  <div class="lg:hidden h-screen w-screen block index border-r shadow-md bg-white">
    <!-- Sidebar Search -->

    <!-- main navigation -->
    <nav aria-label="Sidebar" class="sticky top-0 divide-y divide-gray-300">
      <div class="relative pt-8">
        <div class="px-3 py-0.5 mt-3 mb-4">
          <label for="search" class="sr-only">Search</label>
          <div class="mt-1 relative rounded-md border border-gray-200">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
              <i class="ns-search mr-3 text-gray-400 flex-shrink-0 text-lg" />
            </div>
            <input type="text" name="search" class="bg-gray-100 py-0.5 focus:border-gray-700 focus:outline-none block w-full pl-9 sm:text-sm border-gray-300 rounded-md" placeholder="Search">
          </div>
        </div>
        <div class="space-y-1">
          <div v-for="menu in menus.menu" :key="menu.index" class="navItems" @click.prevent="hideSidebar">
            <NuxtLink
              v-if="menu.path && !['signout', 'Notifications', 'Messages'].includes(menu.path)"
              :to="{ name: menu.path, params:menu.params }"
              exact-active-class="active"
              class="capitalize text-gray-500 group flex items-center pr-0 py-0.5 font-medium hover:bg-gray-50"
            >
              <div class="flex">
                <i :class="[menu.icon ? menu.icon : '']" class="text-gray-500 ml-3 mr-4 flex-shrink-0 text-lg" />
                <span class="truncate text-sm font-normal">
                  {{ menu.title }}
                </span>
              </div>
              <span v-if="menu.dev" class="inline-block rounded-full mx-3 bg-gray-500 text-indigo-50 text-xs px-2 float-right font-mono">Development</span>
            </NuxtLink>
            <button
              v-else-if="menu.path === 'Notifications'"
              class="capitalize text-gray-500 group flex items-center pr-0 py-0.5 text-sm font-medium hover:bg-gray-50 w-full"
              @click.prevent.stop="toggleMenu(menu.path)"
            >
              <i :class="[menu.icon ? menu.icon : '']" class="text-gray-500 ml-3 mr-4 flex-shrink-0 text-lg" />
              <span class="truncate text-sm font-normal">Notifications</span>
            </button>
            <button
              v-else-if="menu.path === 'Messages'"
              class="capitalize text-gray-500 group flex items-center pr-0 py-0.5 text-sm font-medium hover:bg-gray-50 w-full"
              @click.prevent.stop="toggleMenu(menu.path)"
            >
              <i :class="[menu.icon ? menu.icon : '']" class="text-gray-500 ml-3 mr-4 flex-shrink-0 text-lg" />
              <div class="flex">
                <span class="truncate text-sm font-normal">Messages</span>
                <b
                  v-if="unreadMessages.length"
                  class="flex py-0.5 px-1.5 bg-red-500 rounded-full text-xs text-white ml-2"
                >{{ unreadMessages.length }}</b>
              </div>
            </button>
            <button
              v-else-if="menu.path === 'signout'"
              class="capitalize text-gray-500 group flex items-center pr-0 py-0.5 text-sm font-medium hover:bg-gray-50 w-full"
              @click="signOut"
            >
              <i class="ns-power ml-3 mr-4 flex-shrink-0 text-lg text-red-600" />
              <span class="truncate text-sm font-normal">Signout</span>
            </button>
            <p v-if="menu.section" class="px-3 text-sm my-2 text-gray-500 uppercase tracking-wider">
              <span>{{ menu.section }}</span>
              <span v-if="menu.dev" class="inline-block rounded-full mx-3 bg-gray-500 text-indigo-50 text-xs px-2 float-right font-mono">Development</span>
            </p>
          </div>
        </div>
        <!-- flyout notifications -->
        <navigation-sub-menu v-model="showNotificationsMenu">
          <template v-slot:title>
            <h2 class="font-semibold">
              Notifications
            </h2>
          </template>
          <template v-slot:body>
            <div v-if="0" class="px-4 py-2 grid gap-6">
              <div v-for="n in 20" :key="n.index" class="flex space-x-3">
                <div>
                  <img src="https://picsum.photos/seed/picsum/200/300" class="rounded-full w-12 h-12" />
                </div>
                <div>
                  <div class="flex flex-col text-sm">
                    <span>
                      APBC Committee Meeting with Ali R
                    </span>
                    <span>7pm - 9pm . Remote</span>
                  </div>
                  <div class="flex space-x-2 pt-2">
                    <button class="base-button px-0 text-sm">
                      Accept
                    </button>
                    <button class="outline-button px-0 text-sm">
                      Re-schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="flex justify-center items-center pt-2">
              <div class="text-center py-5">
                <h2 class="font-bold">
                  No Notifications.
                </h2>
                <div class="pt-3 ">
                  <p class="mx-2">
                    We will notify you when something arrives
                  </p>
                </div>
              </div>
            </div>
          </template>
        </navigation-sub-menu>

        <!-- flyout messages -->
        <navigation-sub-menu v-model="showMessagesMenu">
          <template v-slot:title>
            <h2 class="font-semibold">
              Messages
            </h2>
          </template>
          <template v-slot:search>
            <div class="flex px-5 py-2 bg-gray-100 items-center">
              <i class="ns-search text-gray-400 text-2xl pr-2"></i>
              <input type="text" class="w-full focus:outline-none bg-transparent" placeholder="Search name to start new chat">
            </div>
          </template>
          <template v-slot:body>
            <div v-if="unreadMessages.length" class="py-2 grid">
              <button v-for="n in unreadMessages" :key="n.url" type="button" class="flex space-x-3 hover:bg-gray-100 px-4 py-2 cursor-pointer" @click="gotoMessage(n.members)">
                <div>
                  <ClientAvatar
                    :client-info="{
                      firstName: 'Get',
                      lastName: 'Welp'
                    }"
                  />
                </div>
                <div class="text-sm">
                  <div class="capitalize font-semibold">
                    <span class="capitalize font-semibold mr-2">
                      {{ n.lastMessage._sender.nickname }}
                    </span> <span class="text-gray-400 text-xs normal-case">{{ formatDistance(new Date(n.lastMessage.createdAt), new Date(), { addSuffix: true }) }}.</span>
                  </div>
                  <div class="flex space-x-2 pt-2 text-gray-600">
                    {{ n.lastMessage.message.length > 76 ? `${n.lastMessage.message.substring(0, 76)}...` : n.lastMessage.message }}
                  </div>
                </div>
              </button>
            </div>
            <div v-else class="flex justify-center items-center pt-2">
              <div class="text-center py-5">
                <h2 class="font-bold">
                  No New Messages.
                </h2>
                <div class="pt-3">
                  <p class="mx-2">
                    We will notify you when something arrives
                  </p>
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
          !acceptedClients.length ? 'You need to invite a client before you can create an invoices.' : 'You need to add at least one service before you can create an invoices.' }}
      </template>
      <template v-slot:actionButtons>
        <button v-if="!acceptedClients.length" class="base-button normal-case" style="width: fit-content" @click="inviteClient = true">
          Invite a client
        </button>
        <NuxtLink v-else to="/Settings#services" class="base-button normal-case" style="width: fit-content">
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
      showNotificationsMenu: false,
      showMessagesMenu: false
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
  background-color: rgba(59, 130, 246, 1);
  height: 30px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
}
.index{
  z-index: 40;
}
</style>
