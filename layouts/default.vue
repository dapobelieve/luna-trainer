<template>
  <async-view loader-id="logout">
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
    <AuthModal />
  </async-view>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import InviteNewClientModal from '../components/modals/InviteNewClientModal.vue'
import sendBird from '../mixins/sendBird'
import sendBirdEvents from '../mixins/sendBirdEvents'
import sendBirdConnectionEvents from '../mixins/sendBirdConnectionEvents'
import auth from '~/mixins/auth'
import ExpiredSessionAuthModal from "~/components/modals/ExpiredSessionAuthModal";
export default {
  components: {ExpiredSessionAuthModal, InviteNewClientModal },
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
      imageDetails: state => state.sendBird.imageDetails
    }),
    ...mapGetters({
      sendBirdConnStatus: 'sendBird/connectingToSendbirdServerWithUserStatus'
    })
  },
  watch: {
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
          this.$gwtoast.success('Chat connection successful')
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
