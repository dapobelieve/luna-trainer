<template>
  <div
    class="tail-block lg:tail-flex lg:tail-h-screen tail-z-40 lg:tail-w-64 tail-fixed lg:tail-border-r lg:tail-shadow-sm tail-bg-white lg:tail-sticky lg:tail-top-0 tail-left-0 lg:tail-rounded-none tail-text-gray-500 tail-flex-shrink-0 tail-top-14 tail-border tail-rounded-xl tail-shadow-xl tail-h-full tail-w-full md:tail-w-1/2"
  >
    <!-- Sidebar Search -->

    <!-- main navigation -->
    <nav aria-label="Sidebar" class="tail-w-full">
      <div class="tail-relative">
        <div
          class="tail-px-1 tail-pb-1 tail-pt-1 lg:tail-pt-0 lg:tail-pb-6 tail-overflow-y-auto tail-h-screen tail-max-h-screen"
        >
          <div class="tail-px-3 tail-py-4">
            <label for="search" class="tail-sr-only">Search</label>
            <div class="tail-relative tail-flex tail-items-center tail-h-8">
              <i class="ns-search tail-absolute tail-left-2 tail-text-gray-400" aria-hidden="true"></i>
              <input
                type="text"
                name="search"
                class="focus:tail-outline-none tail-w-full sm:tail-text-sm tail-border tail-rounded-md tail-h-8 tail-pl-7 tail-shadow-sm focus:tail-border-blue-500"
                placeholder="Search"
              />
            </div>
          </div>
          <div>
            <div v-for="menu in menus.menu" :key="menu.index" @click.prevent="hideSidebar">
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
                      'Schedules',
                      'Courses'
                    ].includes(menu.path)
                "
                :to="{ name: menu.path, params: menu.params }"
                exact-active-class="active"
                class="tail-flex tail-items-center tail-relative navItems"
              >
                <div
                  class="tail-capitalize tail-flex tail-items-center tail-justify-start tail-gap-3 hover:tail-bg-gray-100 tail-w-full tail-h-9 tail-rounded-md tail-px-4"
                >
                  <i :class="[menu.icon ? menu.icon : '']" />
                  <span class="tail-truncate">{{ menu.title }}</span>
                </div>
                <span
                  v-if="menu.dev"
                  class="tail-inline-block tail-rounded-full tail-mx-3 tail-text-indigo-50 tail-text-xs tail-px-2 tail-float-right tail-font-mono"
                >Development</span>
              </NuxtLink>
              <a
                v-else-if="menu.path === 'comingNext'"
                href="https://getwelp.notion.site/Where-is-GetWelp-going-f6089a0568ff442ca6b825c422c45d08"
                target="_blank"
                class="tail-capitalize tail-flex tail-items-center tail-justify-start tail-gap-3 hover:tail-bg-gray-100 tail-w-full tail-h-9 tail-rounded-md tail-px-4"
              >
                <i class="ns-time-add" />
                <span class="tail-truncate">What’s coming next...</span>
              </a>
              <button
                v-else-if="menu.path === 'inviteClient'"
                class="tail-capitalize tail-flex tail-items-center tail-justify-start tail-gap-3 hover:tail-bg-gray-100 tail-w-full tail-h-9 tail-rounded-md tail-px-4"
                @click="inviteClient = true"
              >
                <i class="ns-plus" />
                <span class="tail-truncate">Invite Client</span>
              </button>
              <div
                v-else-if="menu.path === 'addSession'"
                class="tail-bg-gray-50 tail-border tail-rounded-lg"
              >
                <button
                  class="tail-capitalize tail-flex tail-items-center tail-justify-start tail-gap-3 tail-cursor-default tail-w-full tail-h-9 tail-rounded-md tail-px-4 disabled:tail-opacity-50"
                  disabled
                  @click="addSession = true"
                >
                  <i class="ns-plus" />
                  <span class="tail-truncate">New Session</span>
                </button>
                <p
                  class="tail-text-gray-400 tail-px-4 tail-py-3 tail-text-sm"
                >
                  We’re still developing this, so bear with us!
                </p>
              </div>
              <div
                v-else-if="menu.path === 'newCourse'"
                class="tail-bg-gray-50 tail-border tail-rounded-lg"
              >
                <button
                  class="tail-capitalize tail-flex tail-items-center tail-justify-start tail-gap-3 tail-cursor-default tail-w-full tail-h-9 tail-rounded-md tail-px-4 disabled:tail-opacity-50"
                  disabled
                  @click="newCourse = true"
                >
                  <i class="ns-plus" />
                  <span class="tail-truncate">New Course</span>
                </button>
                <p
                  class="tail-text-gray-400 tail-px-4 tail-py-3 tail-text-sm"
                >
                  We’re still developing this, so bear with us!
                </p>
              </div>
              <button
                v-else-if="menu.path === 'Notifications'"
                class="tail-capitalize tail-flex tail-items-center tail-justify-start tail-gap-3 hover:tail-bg-gray-100 tail-w-full tail-h-9 tail-rounded-md tail-px-4"
                @click="toggleMenu(menu.path)"
              >
                <i :class="[menu.icon ? menu.icon : '']" />
                <span class="tail-truncate">Notifications</span>
              </button>
              <button
                v-else-if="menu.path === 'Messages'"
                class="tail-capitalize tail-flex tail-items-center tail-justify-start tail-gap-3 hover:tail-bg-gray-100 tail-w-full tail-h-9 tail-rounded-md tail-px-4"
                @click="toggleMenu(menu.path)"
              >
                <i :class="[menu.icon ? menu.icon : '']" />
                <div class="tail-flex tail-items-center tail-flex-grow tail-justify-between">
                  <span class="tail-truncate">Messages</span>
                  <span
                    v-if="unreadMessages.length"
                    class="tail-inline-flex tail-items-center tail-justify-center tail-bg-blue-500 tail-rounded-full tail-text-xs tail-text-white tail-ml-2 tail-px-1 tail-h-5 tail-font-medium tail-flex-shrink-0 tail-min-w-[1.25rem]"
                  >{{ unreadMessages.length }}</span>
                </div>
              </button>
              <button
                v-else-if="menu.path === 'signout'"
                class="tail-capitalize tail-flex tail-items-center tail-justify-start tail-gap-3 hover:tail-bg-gray-100 tail-w-full tail-h-9 tail-rounded-md tail-px-4"
                @click="signOut"
              >
                <i class="ns-power" />
                <span class="tail-truncate">Sign out</span>
              </button>
              <div
                v-if="menu.section"
                class="tail-p-4 tail-flex tail-justify-between tail-items-center"
              >
                <span
                  class="tail-uppercase tail-tracking-wider tail-font-medium tail-text-xs"
                >{{ menu.section }}</span>
                <span
                  v-if="menu.dev"
                  class="tail-inline-flex tail-items-center tail-rounded-full tail-bg-indigo-50 tail-text-indigo-500 tail-text-xs tail-p-1.5 tail-h-6 tail-normal-case tail-font-medium"
                >Coming soon</span>
              </div>
            </div>
          </div>
        </div>
        <!-- flyout notifications -->
        <navigation-sub-menu v-model="showNotificationsMenu">
          <template v-slot:title>
            <h5 class="tail-text-xl tail-text-gray-700">
              Notifications
            </h5>
          </template>
          <template v-slot:body>
            <div v-if="10" class="tail-px-1 tail-pb-20 lg:tail-pb-1">
              <div
                v-for="n in 20"
                :key="n.index"
                class="tail-flex tail-gap-4 tail-py-4 tail-px-3 tail-rounded-lg hover:tail-bg-gray-100 hover:tail-transition-all"
              >
                <div class="tail-flex-shrink-0">
                  <img
                    src="https://picsum.photos/seed/picsum/200/300"
                    class="tail-rounded-full tail-w-12 tail-h-12"
                  />
                </div>
                <div>
                  <div class="tail-flex tail-flex-col tail-gap-1">
                    <span
                      class="tail-font-medium tail-text-gray-700"
                    >APBC Committee Meeting with Ali R</span>
                    <span class="tail-text-sm">7pm - 9pm . Remote</span>
                  </div>
                  <div class="tail-flex tail-gap-2 tail-mt-3">
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

            <div
              v-else
              class="tail-text-center tail-py-8 tail-px-4 tail-flex tail-w-full tail-justify-center"
            >
              <div class="tail-max-w-xs tail-flex tail-gap-3 tail-flex-col">
                <h5 class="tail-font-bold tail-text-lg tail-text-gray-700">
                  No Notifications.
                </h5>
                <p class="tail-text-sm">
                  We will notify you when something arrives
                </p>
              </div>
            </div>
          </template>
        </navigation-sub-menu>

        <!-- flyout messages -->
        <navigation-sub-menu v-model="showMessagesMenu">
          <template v-slot:title>
            <h5 class="tail-text-xl tail-text-gray-700">
              Messages
            </h5>
          </template>
          <template v-slot:search>
            <div class="tail-pb-2 tail-px-4 tail-bg-white">
              <div class="tail-relative tail-flex tail-items-center tail-h-8">
                <i class="ns-search tail-absolute tail-left-2 tail-text-gray-400"></i>
                <input
                  type="text"
                  class="focus:tail-outline-none tail-w-full sm:tail-text-sm tail-border tail-rounded-md tail-h-8 tail-pl-7 tail-shadow-sm focus:tail-border-blue-500"
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
                class="tail-flex tail-justify-start tail-space-x-3 hover:tail-bg-gray-100 tail-px-4 tail-py-2 tail-cursor-pointer tail-w-full"
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
                <div class="tail-text-sm">
                  <div class="tail-capitalize tail-font-semibold">
                    <span
                      class="tail-capitalize tail-font-semibold tail-mr-2"
                    >{{ n.lastMessage._sender.nickname }}</span>
                    <span class="tail-text-gray-400 tail-text-xs tail-normal-case">
                      {{
                        formatDistance(
                          new Date(n.lastMessage.createdAt),
                          new Date(),
                          { addSuffix: true }
                        )
                      }}.
                    </span>
                  </div>
                  <div
                    class="tail-flex tail-space-x-2 tail-pt-2 tail-text-gray-700"
                  >
                    {{ n.lastMessage.message.length > 76 ? `${n.lastMessage.message.substring(0, 76)}` : n.lastMessage.message }}
                  </div>
                </div>
              </button>
            </div>
            <div
              v-else
              class="tail-text-center tail-py-8 tail-px-4 tail-flex tail-w-full tail-justify-center"
            >
              <div class="tail-max-w-xs tail-flex tail-gap-3 tail-flex-col">
                <h2 class="tail-font-bold tail-text-lg tail-text-gray-700">
                  No New Messages.
                </h2>
                <p class="tail-text-sm">
                  We will notify you when something arrives
                </p>
              </div>
            </div>
          </template>
        </navigation-sub-menu>
      </div>
    </nav>

    <Modal
      :input-width="40"
      :is-open="inviteClient"
      @close="inviteClient = $event"
      @closeBackDrop="inviteClient = $event"
    >
      <InviteNewClient @close="inviteClient = $event" />
    </Modal>
    <Modal
      :input-width="40"
      :is-open="inviteClient"
      @close="inviteClient = $event"
      @closeBackDrop="inviteClient = $event"
    >
      <InviteNewClient @close="inviteClient = $event" />
    </Modal>
    <Modal
      :is-open="addSession"
      :input-width="40"
      @close="addSession = $event"
      @closeBackDrop="openEditModal = $event"
    >
      <CreateSchedule @close="addSession = $event" />
    </Modal>
    <Modal
      :is-open="newCourse"
      :input-width="40"
      @close="newCourse = $event"
      @closeBackDrop="newCourse = $event"
    >
      <CreateCourse @close="newCourse = $event" />
    </Modal>
    <Modal
      :input-width="30"
      :is-open="openModal"
      @close="openModal = $event"
      @closeBackDrop="openModal = $event"
    >
      <template v-slot:status>
        <div
          class="tail-bg-gray-100 tail-text-gray-500 tail-px-2 tail-rounded-3xl"
        >
          Create New Invoice
        </div>
      </template>
      <CreateNewInvoice @close="openModal = $event" />
    </Modal>
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
          class="base-button tail-normal-case"
          style="width: fit-content"
          @click="inviteClient = true"
        >
          Invite a client
        </button>
        <NuxtLink
          v-else
          to="/Settings#services"
          class="base-button tail-normal-case"
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
import { formatDistance } from 'date-fns'
import menus from '~/navigation.json'

export default {
  name: 'Navigation',
  data () {
    return {
      formatDistance,
      menus,
      showNotification: false,
      inviteClient: false,
      openModal: false,
      showNotificationsMenu: false,
      showMessagesMenu: false,
      addSession: false,
      newCourse: false
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
    signOut () {
      this.logOut()
    },
    hideSidebar (e) {
      if (window.innerWidth <= 768 && e.currentTarget.classList.contains('navItems')) {
        this.$nuxt.$emit('hideSideBar')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  @apply tail-text-gray-700 tail-font-medium;
  &::before {
    @apply tail-bg-blue-500 tail-w-1 tail-h-6 tail-rounded-sm tail-shadow-md tail-absolute tail-left-0;
    content: "";
  }
}
button {
  @apply tail-font-normal tail-text-base;
}
i {
  @apply tail-text-lg;
}
</style>
