<template>
  <async-view loader-id="logout">
    <modal name="stripe-modal" height="auto" :adaptive="true" :max-width="450">
      <onboarding-stripe class="tail-m-6" @closeModal="skipStripeProcess" />
    </modal>
    <GwHeader />
    <div class="tail-flex">
      <invite-new-client-modal />
      <Navigation :class="open ? 'tail-block' : 'tail-hidden'" />
      <div class="tail-w-full tail-p-4 tail-pb-24 tail-bg-gray-100 tail-flex tail-justify-center">
        <div class="tail-max-w-xl md:tail-max-w-4xl 2xl:tail-max-w-7xl lg:tail-max-w-full tail-w-full">
          <div class="tail-text-right tail-mb-4">
            <span class="tail-font-medium">{{ new Date().toDateString() }}</span>
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
      open: true
    }
  },
  computed: {
    ...mapState({
      connectedChannels: state => state.sendBird.connectedChannels,
      isStripeConnected: state => state.profile.isStripeConnected
    })
  },
  async created () {
    this.$nuxt.$on('toggleSideBar', () => {
      this.toggleSide()
    })
    this.$nuxt.$on('hideSideBar', () => {
      this.hideSide()
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
  mounted () {
    const isProfileSetUpCompleted = localStorage.getItem('profileCompleted')
    if (isProfileSetUpCompleted && !this.isStripeConnected) {
      this.$modal.show('stripe-modal')
    }
    if (window.innerWidth <= 768) {
      this.open = false
    }
  },
  methods: {
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
