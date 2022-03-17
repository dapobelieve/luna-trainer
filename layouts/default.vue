<template>
  <async-view loader-id="logout">
    <Toast />
    <div v-if="loading" class="fixed preloader top-0 h-full w-full flex items-center justify-center">
      <div class="inline-flex flex-col items-center">
        <img class="h-8 mb-3" src="~/assets/img/logo-v2.svg">
        <SingleLoader height="20px" width="20px" />
      </div>
    </div>
    <div class="min-h-screen">
      <GwHeader
        :class="{
          hidden:
            $route.name === 'client-id-information' ||
            $route.name === 'client-id-messages'
        }"
      />
      <div class="flex">
        <invite-new-client-modal />
        <Navigation class="hidden lg:block" />
        <div v-if="showSidebarMenu" class="block lg:hidden">
          <Navigation />
        </div>
        <main class="w-full bg-gray-100">
          <Nuxt :key="$route.fullpath" />
        </main>
        <transition
          enter-active-class="transition-all ease-in-out duration-[500ms]"
          leave-active-class="transition-all ease-in-out duration-[500ms]"
          enter-class="transform translate-x-full"
          leave-class="-translate-x-0"
          enter-to-class="-translate-x-0"
          leave-to-class="translate-x-full"
        >          
          <SchedulerDrawer v-model="schedulerDrawer.activePage" v-if="schedulerDrawer.open" />
        </transition>
      </div>
      <NotificationsModal
        :visible="showNotification"
        @close="showNotification = $event"
      >
        <template v-slot:title>
          Chat Connection Failed
        </template>
        <template v-slot:subtitle>
          Reconnect chat to enjoy all of GetWelp's features
        </template>
        <template v-slot:actionButtons>
          <button
            class="bg-white rounded-md text-sm font-medium capitalize hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-blue-700"
            @click="retry"
          >
            retry
          </button>
        </template>
      </NotificationsModal>
    </div>

    <!-- modal -->
    <modal
      name="view-image"
      height="100%"
      width="100%"
      :click-to-close="false"
    >
      <div v-if="isImageOpen">
        <div class="bg-black flex items-center justify-between px-4 py-2 text-white">
          <div class="flex items-center">
            <ClientAvatar
              :client-info="{
                firstName: imageDetails.nickname,
                imgUrl: imageDetails.profileImg
              }"
            />
            <div class="ml-4">
              <p class="capitalize mb-0">
                {{ imageDetails.nickname }}
              </p>
              <small>
                {{ new Date(imageDetails.dateTime).toDateString() }}
              </small>
            </div>
          </div>
          <div class="space-x-3 text-xl cursor-pointer">
            <i class="ns-comment-alt"></i>
            <i class="ns-download"></i>
            <i class="ns-share"></i>
            <i class="ns-cross" @click="closeImage"></i>
          </div>
        </div>
        <div class="flex justify-center bg-black" style="height: calc(100vh - 64px)">
          <img
            class="w-full h-full object-contain"
            :src="imageDetails.url"
          />
        </div>
      </div>
    </modal>
    <!-- adding notes -->
    <div id="no-border">
      <modal
        name="add-note"
        height="100%"
        :resizable="true"
        :adaptive="true"
        :shift-x="1"
        width="25%"
        :click-to-close="false"
      >
        <notes-add-note :adding-mode="$store.state.notes.addingMode" :note-in-view="$store.state.notes.noteInView" />
      </modal>
    </div>

    <!-- expanding notes modal -->
    <div id="no-border">
      <modal
        name="expand-add-note"
        height="100%"
        width="100%"
        :adaptive="true"
        :click-to-close="false"
      >
        <notes-add-note :adding-mode="$store.state.notes.addingMode" :note-in-view="$store.state.notes.noteInView" />
      </modal>
    </div>

    <ExpiredSessionAuthModal />
  </async-view>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import InviteNewClientModal from '../components/modals/InviteNewClientModal.vue'
import sendBird from '../mixins/sendBird'
import sendBirdEvents from '../mixins/sendBirdEvents'
import sendBirdConnectionEvents from '../mixins/sendBirdConnectionEvents'
import auth from '~/mixins/auth'
import ExpiredSessionAuthModal from '~/components/modals/ExpiredSessionAuthModal'
import SchedulerDrawer from "~/components/scheduler/SchedulerDrawer";
import Toast from "~/components/toasts/toast"
export default {
  components: {Toast, SchedulerDrawer, ExpiredSessionAuthModal, InviteNewClientModal },
  mixins: [sendBird, sendBirdEvents, sendBirdConnectionEvents, auth],
  data () {
    return {
      page: this.$route.name,
      showNotification: false,
      showSidebarMenu: false
    }
  },
  computed: {
    ...mapState({
      connectedChannels: state => state.sendBird.connectedChannels,
      isImageOpen: state => state.sendBird.openImage,
      imageDetails: state => state.sendBird.imageDetails,
      addNoteModal: state => state.notes.addNoteModal,
      expandModal: state => state.notes.expandModal
    }),
    ...mapGetters({
      schedulerDrawer: 'scheduler/drawer',
      loading: 'profile/getLoading',
      sendBirdConnStatus: 'sendBird/connectingToSendbirdServerWithUserStatus'
    })
  },
  watch: {
    '$route': {
      immediate: true,
      handler(data) {
        if(data.name === 'schedule') {
          this.$store.commit('scheduler/setStates',{ drawer: {open: false, activePage: null}})
        }else if(data.name === 'schedule-create') {
          this.$store.commit('scheduler/setStates',{ drawer: {open: true, activePage: 'new-session'}})
        }else if(data.name === 'schedule-events-id') {
          this.$store.commit('scheduler/setStates',{ drawer: {open: true, activePage: 'schedule-details'}})
        }else {
          this.$store.commit('scheduler/setStates',{ drawer: {open: false, activePage: null}})
        }
      }
    },
    sendBirdConnStatus (newValue, oldValue) {
      if (newValue || oldValue || !this.store.state.sendbirdId.sbUser) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.showNotification = true
          }, 2000)
        })
      }
    },
    isImageOpen (newValue) {
      if (newValue) {
        this.$modal.show('view-image')
      } else if (!newValue) {
        this.$modal.hide('view-image')
      }
    },
    addNoteModal (newValue) {
      if (newValue) {
        this.$modal.show('add-note')
      } else if (!newValue) {
        this.$modal.hide('add-note')
      }
    },
    expandModal (newValue) {
      if (newValue) {
        this.$modal.show('expand-add-note')
      } else if (!newValue) {
        this.$modal.hide('expand-add-note')
      }
    }
  },
  created () {
    this.$nuxt.$on('displayPageSidebar', () => {
      this.toggleSidebarMenu()
    })
    this.$nuxt.$on('hideSidebarMenu', () => {
      this.hideMobileMenu()
    })
    this.startFullPageLoad()
    const tokenValidity = this.$auth.strategy.token.status().valid()
    if (
      this.$auth.loggedIn &&
      Object.entries(this.$auth.user).length === 0 &&
      tokenValidity
    ) {
      this.$router.replace({ name: 'auth-onboarding' }).then(() => {
        this.endFullPageLoad()
      })
    } else {
      this.endFullPageLoad()
    }
  },
  updated () {
    this.$nextTick(() => {
      if (this.sendBirdConnStatus) {
        setTimeout(() => {
          this.showNotification = true
        }, 2000)
      }
    })
  },
  methods: {
    closeImage () {
      this.$store.commit('sendBird/VIEW_IMAGE', { imageDetails: null, status: false })
    },
    toggleSidebarMenu () {
      this.showSidebarMenu = !this.showSidebarMenu
    },
    hideMobileMenu () {
      this.showSidebarMenu = false
    },
    ...mapActions('authorize', {
      startFullPageLoad: 'startFullPageLoading',
      endFullPageLoad: 'endFullPageLoading'
    }),
    ...mapActions('sendBird', {
      connectToSendBird: 'connect_to_sb_server_with_userid',
      newMessage: 'updateConnectedChannels',
      addChannel: 'addNewChannel'
    }),
    retry () {
      this.$store.commit('sendBird/CONNECTION_ERROR', false)
      this.showNotification = false
      return this.connectToSendBird(this.$auth.user.sendbirdId).then((result) => {
        if (result !== 'error') {
          this.$lunaToast.success('Chat connection successful')
        }
      })
    }
  }
}
</script>

<style lang="scss">
@media print {
  .page-header,
  .navigation,
  .gw-header {
    display: none !important;
  }
}
</style>
