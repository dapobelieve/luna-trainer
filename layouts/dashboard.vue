<template>
  <async-view loader-id="logout">
    <modal name="stripe-modal" height="auto" :adaptive="true" :max-width="500">
      <onboarding-stripe class="m-6" @closeModal="skipStripeProcess" />
    </modal>
    <GwHeader />
    <div class="flex">
      <invite-new-client-modal />
      <Navigation class="hidden lg:block" />
      <div v-if="showSidebarMenu" class="block lg:hidden">
        <Navigation />
      </div>
      <div class="w-full p-4 pb-24 bg-gray-100 flex justify-center">
        <div class="max-w-xl md:max-w-4xl 2xl:max-w-7xl lg:max-w-full w-full">
          <div class="text-right mb-4">
            <span class="font-medium">{{ new Date().toDateString() }}</span>
          </div>
          <Nuxt />
        </div>
      </div>
    </div>
  </async-view>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import InviteNewClientModal from '../components/modals/InviteNewClientModal.vue'
export default {
  components: { InviteNewClientModal },
  data () {
    return {
      page: this.$route.name,
      showSidebarMenu: false
    }
  },
  computed: {
    ...mapState({
      connectedChannels: state => state.sendBird.connectedChannels,
      isStripeConnected: state => state.profile.isStripeConnected
    })
  },
  async created () {
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
      this.$router.replace({ name: 'Auth-onboardingProfileSetup' }).then(() => {
        this.endFullPageLoad()
      })
    } else {
      this.endFullPageLoad()
      this.fetchAllClients()
      // connect user to sendbird server
      await this.connectToSendBird(this.$auth.user.sendbirdId)
      // sendbird events
      const channelHandler = new this.$sb.ChannelHandler()

      channelHandler.onMessageReceived = this.onMessageReceived
      channelHandler.onMessageUpdated = function (channel, message) {}
      channelHandler.onMessageDeleted = function (channel, messageId) {}
      channelHandler.onMentionReceived = function (channel, message) {}
      channelHandler.onChannelChanged = function (channel) {}
      channelHandler.onMetaDataCreated = function (channel, metaData) {}
      channelHandler.onMetaDataUpdated = function (channel, metaData) {}
      channelHandler.onMetaDataDeleted = function (channel, metaDataKeys) {}
      channelHandler.onMetaCountersCreated = function (channel, metaCounter) {}
      channelHandler.onMetaCountersUpdated = function (channel, metaCounter) {}
      channelHandler.onMetaCountersDeleted = function (
        channel,
        metaCounterKeys
      ) {}
      channelHandler.onDeliveryReceiptUpdated = function (groupChannel) {}
      channelHandler.onReadReceiptUpdated = function (groupChannel) {}
      channelHandler.onTypingStatusUpdated = function (groupChannel) {}
      channelHandler.onChannelMemberCountChanged = function (channels) {}
      channelHandler.onChannelParticipantCountChanged = function (channels) {}

      // Add this channel event handler to the `SendBird` instance.
      this.$sb.addChannelHandler('dashboardLayoutHandler', channelHandler)
    }
  },
  async mounted () {
    const isProfileSetUpCompleted = localStorage.getItem('profileCompleted')
    if (isProfileSetUpCompleted && !this.isStripeConnected) {
      this.$modal.show('stripe-modal')
    }
  },
  methods: {
    toggleSidebarMenu () {
      this.showSidebarMenu = !this.showSidebarMenu
    },
    hideMobileMenu () {
      this.showSidebarMenu = false
    },
    ...mapActions('sendBird', {
      connectToSendBird: 'connect_to_sb_server_with_userid',
      newMessage: 'updateConnectedChannels',
      addChannel: 'addNewChannel'
    }),
    ...mapActions('authorize', {
      startFullPageLoad: 'startFullPageLoading',
      endFullPageLoad: 'endFullPageLoading'
    }),
    ...mapActions({
      fetchAllClients: 'client/fetchAllClients'
    }),
    toggleSide () {
      this.open = !this.open
    },
    hideSide () {
      this.open = false
    },
    skipStripeProcess () {
      localStorage.removeItem('profileCompleted')
      this.$modal.hide('stripe-modal')
    },
    // events for sendbird
    onMessageReceived (channel, message) {
      if (this.$route.name === 'Dashboard') {
        if (
          Object.keys(this.connectedChannels).length === 0 &&
          this.connectedChannels.constructor === Object &&
          channel.memberMap[this.$auth.user.sendbirdId]
        ) {
          this.addChannel({ channel, message })
        } else if (
          this.connectedChannels.size &&
          this.connectedChannels.has(channel.url)
        ) {
          this.newMessage({ channel, message })
        }
      }
    }
  }

}
</script>

<style lang="scss"></style>
