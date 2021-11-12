<template>
  <div
    class="block lg:h-screen z-40 lg:w-56 xl:w-64 fixed lg:border-r lg:shadow-sm bg-white lg:sticky lg:top-0 left-0 lg:rounded-none text-gray-500 flex-shrink-0 top-14 border rounded-xl shadow-xl h-full w-full md:w-1/2"
  >
    <!-- Sidebar Search -->

    <!-- main navigation -->
    <nav aria-label="Sidebar" class="w-full">
      <div class="relative">
        <div class="px-1 pb-1 pt-1 lg:pt-0 lg:pb-6 overflow-y-auto h-screen max-h-screen">
          <div class="px-3 py-4">
            <label for="search" class="sr-only">Search</label>
            <div class="relative flex items-center h-8">
              <i class="ns-search absolute left-2 text-gray-400" aria-hidden="true"></i>
              <input
                type="text"
                name="search"
                class="focus:outline-none w-full sm:text-sm border rounded-md h-8 pl-7 shadow-sm focus:border-blue-500"
                placeholder="Search"
              />
            </div>
          </div>
          <div>
            <div v-for="menu in menus.menu" :key="menu.index" @click.prevent="hideSidebarMenu">
              <NuxtLink
                v-if="
                  menu.path &&
                    ![
                      'signout',
                      'Notifications',
                      'Messages',
                      'inviteClient',
                      'addSession',
                      'newCourse',
                      'comingNext',
                      'getHelp',
                      'Schedules',
                      'Courses'
                    ].includes(menu.path)
                "
                :to="{ name: menu.path, params: menu.params }"
                exact-active-class="active"
                :class="[$route.path.includes(menu.title) ? 'active': '']"
                class="flex items-center relative navItems"
              >
                <div
                  class="capitalize flex items-center justify-start gap-3 hover:bg-gray-100 w-full h-9 rounded-md px-4"
                >
                  <i :class="[menu.icon ? menu.icon : '']" />
                  <span class="truncate">{{ menu.title }}</span>
                </div>
                <span
                  v-if="menu.dev"
                  class="inline-block rounded-full mx-3 text-indigo-50 text-xs px-2 float-right font-mono"
                >Development</span>
              </NuxtLink>
              <a
                v-else-if="menu.path === 'comingNext'"
                href="https://getwelp.notion.site/Where-is-GetWelp-going-f6089a0568ff442ca6b825c422c45d08"
                target="_blank"
                class="capitalize flex items-center justify-start gap-3 hover:bg-gray-100 w-full h-9 rounded-md px-4"
              >
                <i class="ns-time-add" />
                <span class="truncate">What’s coming next...</span>
              </a>
              <button
                v-else-if="menu.path === 'inviteClient'"
                class="capitalize flex items-center justify-start gap-3 hover:bg-gray-100 w-full h-9 rounded-md px-4"
                @click="inviteClient"
              >
                <i class="ns-plus" />
                <span class="truncate">Invite Client</span>
              </button>
              <div v-else-if="menu.path === 'addSession'" class="bg-gray-50 border rounded-lg">
                <div class="p-4 flex justify-between items-center">
                  <span class="uppercase tracking-wider font-medium text-xs">SCHEDULE</span>
                  <span
                    class="inline-flex items-center rounded-full bg-indigo-50 text-indigo-500 text-xs p-1.5 h-6 normal-case font-medium"
                  >Coming soon</span>
                </div>
                <button
                  class="capitalize flex items-center justify-start gap-3 cursor-default w-full h-9 rounded-md px-4 disabled:opacity-50"
                  disabled
                  @click="addSession = true"
                >
                  <i class="ns-calendar" />
                  <span class="truncate">My Schedule</span>
                </button>
                <button
                  class="capitalize flex items-center justify-start gap-3 cursor-default w-full h-9 rounded-md px-4 disabled:opacity-50"
                  disabled
                  @click="addSession = true"
                >
                  <i class="ns-plus" />
                  <span class="truncate">New Session</span>
                </button>
                <p
                  class="text-gray-400 px-4 py-3 text-sm"
                >
                  We’re still developing this, so bear with us!
                </p>
              </div>
              <div v-else-if="menu.path === 'newCourse'" class="bg-gray-50 border rounded-lg mt-2">
                <div class="p-4 flex justify-between items-center">
                  <span class="uppercase tracking-wider font-medium text-xs">COURSES</span>
                  <span
                    class="inline-flex items-center rounded-full bg-indigo-50 text-indigo-500 text-xs p-1.5 h-6 normal-case font-medium"
                  >Coming soon</span>
                </div>
                <button
                  class="capitalize flex items-center justify-start gap-3 cursor-default w-full h-9 rounded-md px-4 disabled:opacity-50"
                  disabled
                  @click="addSession = true"
                >
                  <img class="p-1 rounded-full" src="~/assets/img/svgs/course.svg" alt="course" />
                  <span class="truncate">My Courses</span>
                </button>
                <button
                  class="capitalize flex items-center justify-start gap-3 cursor-default w-full h-9 rounded-md px-4 disabled:opacity-50"
                  disabled
                  @click="newCourse = true"
                >
                  <i class="ns-plus" />
                  <span class="truncate">New Course</span>
                </button>
                <p
                  class="text-gray-400 px-4 py-3 text-sm"
                >
                  We’re still developing this, so bear with us!
                </p>
              </div>
              <div v-else-if="menu.path === 'getHelp'" class="bg-blue-50 border rounded-lg">
                <div class="flex items-center justify-between p-2">
                  <div>
                    <h5 class="text-gray-400 px-2 py-2 text-base">
                      Need Help?
                    </h5>
                    <p
                      class="text-gray-400 px-2 py-2 text-sm"
                    >
                      Activate the switch button to send a message to us
                    </p>
                  </div>
                  <Toggle
                    small-size
                    :value="toggleIntercom"
                    @input="allowIntercom"
                  />
                </div>
              </div>
              <button
                v-else-if="menu.path === 'Notifications'"
                class="capitalize flex items-center justify-start gap-3 hover:bg-gray-100 w-full h-9 rounded-md px-4"
                @click="toggleMenu(menu.path)"
              >
                <i :class="[menu.icon ? menu.icon : '']" />
                <span class="truncate">Notifications</span>
              </button>
              <button
                v-else-if="menu.path === 'Messages'"
                class="capitalize flex items-center justify-start gap-3 hover:bg-gray-100 w-full h-9 rounded-md px-4"
                @click="toggleMenu(menu.path)"
              >
                <i :class="[menu.icon ? menu.icon : '']" />
                <div class="flex items-center flex-grow justify-between">
                  <span class="truncate">Messages</span>
                  <span
                    v-if="unreadMessages.length"
                    class="inline-flex items-center justify-center bg-blue-500 rounded-full text-xs text-white ml-2 px-1 h-5 font-medium flex-shrink-0 min-w-[1.25rem]"
                  >{{ unreadMessages.length }}</span>
                </div>
              </button>
              <button
                v-else-if="menu.path === 'signout'"
                class="capitalize flex items-center justify-start gap-3 hover:bg-gray-100 w-full h-9 rounded-md px-4"
                @click="signOut"
              >
                <i class="ns-power" />
                <span class="truncate">Sign out</span>
              </button>
              <div v-if="menu.section" class="p-4 flex justify-between items-center">
                <span class="uppercase tracking-wider font-medium text-xs">{{ menu.section }}</span>
                <span
                  v-if="menu.dev"
                  class="inline-flex items-center rounded-full bg-indigo-50 text-indigo-500 text-xs p-1.5 h-6 normal-case font-medium"
                >Coming soon</span>
              </div>
            </div>
          </div>
        </div>
        <!-- flyout notifications -->
        <navigation-sub-menu v-model="showNotificationsMenu">
          <template v-slot:title>
            <h5 class="text-xl text-gray-700">
              Notifications
            </h5>
          </template>
          <template v-slot:body>
            <div v-if="10" class="px-1 pb-20 lg:pb-1">
              <div
                v-for="n in 20"
                :key="n.index"
                class="flex gap-4 py-4 px-3 rounded-lg hover:bg-gray-100 hover:transition-all"
              >
                <div class="flex-shrink-0">
                  <img
                    src="https://picsum.photos/seed/picsum/200/300"
                    class="rounded-full w-12 h-12"
                  />
                </div>
                <div>
                  <div class="flex flex-col gap-1">
                    <span class="font-medium text-gray-700">APBC Committee Meeting with Ali R</span>
                    <span class="text-sm">7pm - 9pm . Remote</span>
                  </div>
                  <div class="flex gap-2 mt-3">
                    <button class="button-fill">
                      Accept
                    </button>
                    <button class="button-outline">
                      Re-schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-8 px-4 flex w-full justify-center">
              <div class="max-w-xs flex gap-3 flex-col">
                <h5 class="font-bold text-lg text-gray-700">
                  No Notifications.
                </h5>
                <p class="text-sm">
                  We will notify you when something arrives
                </p>
              </div>
            </div>
          </template>
        </navigation-sub-menu>

        <!-- flyout messages -->
        <navigation-sub-menu v-model="showMessagesMenu">
          <template v-slot:title>
            <h5 class="text-xl text-gray-700">
              Messages
            </h5>
          </template>
          <template v-slot:search>
            <div class="pb-2 px-4 bg-white">
              <div class="relative flex items-center h-8">
                <i class="ns-search absolute left-2 text-gray-400"></i>
                <input
                  type="text"
                  class="focus:outline-none w-full sm:text-sm border rounded-md h-8 pl-7 shadow-sm focus:border-blue-500"
                  placeholder="Search name to start new chat"
                />
              </div>
            </div>
          </template>
          <template v-slot:body>
            <div v-if="unreadMessages.length">
              <button
                v-for="n in unreadMessages"
                :key="n.url"
                type="button"
                class="flex justify-start space-x-3 hover:bg-gray-100 px-4 py-2 cursor-pointer w-full"
                @click="gotoMessage(n.members)"
              >
                <div>
                  <ClientAvatar
                    :client-info="{
                      firstName: n.lastMessage._sender.nickname.split(' ')[0],
                      lastName: n.lastMessage._sender.nickname.split(' ')[1]
                    }"
                  />
                </div>
                <div class="text-sm">
                  <div class="capitalize font-semibold">
                    <span class="capitalize font-semibold mr-2">{{ n.lastMessage._sender.nickname }}</span>
                    <span class="text-gray-400 text-xs normal-case">
                      {{ n.lastMessage.createdAt | howLongAgo }}.
                    </span>
                  </div>
                  <div
                    class="flex space-x-2 pt-2 text-gray-700"
                  >
                    {{ n.lastMessage.message.length > 76 ? `${n.lastMessage.message.substring(0, 76)}` : n.lastMessage.message }}
                  </div>
                </div>
              </button>
            </div>
            <div v-else class="text-center py-8 px-4 flex w-full justify-center">
              <div class="max-w-xs flex gap-3 flex-col">
                <h2 class="font-bold text-lg text-gray-700">
                  No New Messages.
                </h2>
                <p class="text-sm">
                  We will notify you when something arrives
                </p>
              </div>
            </div>
          </template>
        </navigation-sub-menu>
      </div>
    </nav>
    <GwModal
      :is-open="addSession"
      :input-width="40"
      @close="addSession = $event"
      @closeBackDrop="openEditModal = $event"
    >
      <CreateSchedule @close="addSession = $event" />
    </GwModal>
    <GwModal
      :is-open="newCourse"
      :input-width="40"
      @close="newCourse = $event"
      @closeBackDrop="newCourse = $event"
    >
      <CreateCourse @close="newCourse = $event" />
    </GwModal>
    <GwModal
      :input-width="30"
      :is-open="openModal"
      @close="openModal = $event"
      @closeBackDrop="openModal = $event"
    >
      <template v-slot:status>
        <div class="bg-gray-100 text-gray-500 px-2 rounded-3xl">
          Create New Invoice
        </div>
      </template>
      <CreateNewInvoice @close="openModal = $event" />
    </GwModal>
    <NotificationsModal :visible="showNotification" @close="showNotification = $event">
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
import menus from '~/navigation.json'

export default {
  name: 'Navigation',
  data () {
    return {
      menus,
      showNotification: false,
      openModal: false,
      showNotificationsMenu: false,
      showMessagesMenu: false,
      addSession: false,
      newCourse: false,
      toggleIntercom: true
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
    allowIntercom () {
      this.toggleIntercom = !this.toggleIntercom
      if (this.$route.name === 'Client-id-Messages') {
        if (!this.toggleIntercom) {
          window && window.Intercom('update', {
            hide_default_launcher: true
          })
          window.Intercom('hide')
        } else {
          window && window.Intercom('update', {
            hide_default_launcher: false
          })
          window.Intercom('show')
        }
        return
      }
      !this.toggleIntercom ? window.Intercom('hide') : window.Intercom('show')
    },
    gotoMessage (arr) {
      const user = arr.find(m => m.userId !== this.$auth.user.sendbirdId)
      const client = this.acceptedClients.find(
        c => c.sendbirdId === user.userId
      )
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
    inviteClient () {
      this.$modal.show('inviteClientModal')
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
  @apply text-gray-700 font-medium;
  &::before {
    @apply bg-blue-500 w-1 h-6 rounded-sm shadow-md absolute left-0;
    content: "";
  }
}
button {
  @apply font-normal text-base;
}
i {
  @apply text-lg;
}
</style>
