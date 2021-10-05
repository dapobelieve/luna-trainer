<template>
  <async-view loader-id="logout">
    <GwHeader />
    <div class="tail-flex">
      <Navigation />
      <div class="tail-w-full tail-p-4 tail-bg-gray-50">
        <div class="tail-text-right tail-mx-3 lg:tail-mx-0 tail-my-2">
          <span class="tail-text-gray-700 tail-text-base tail-font-medium">
            {{ new Date().toDateString() }}
          </span>
        </div>
        <Nuxt />
      </div>
    </div>
  </async-view>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      page: this.$route.name
    }
  },
  computed: {
    ...mapState({
      connectedChannels: state => state.sendBird.connectedChannels
    })
  },
  async created () {
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
