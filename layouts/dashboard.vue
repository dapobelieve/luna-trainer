<template>
  <async-view loader-id="logout">
    <div class="tail-min-h-screen tail-bg-gray-100">
      <GwHeader />
      <div class="tail-py-0">
        <div
          class="tail-max-w-3xl tail-mx-auto sm:tail-px-0 lg:tail-max-w-full lg:tail-px-0 lg:tail-pl-0 lg:tail-grid lg:tail-grid-cols-12 lg:tail-gap-8 tail-overflow-x-hidden"
        >
          <Navigation />
          <main class="lg:tail-col-span-9 md:tail-col-span-10 sm:tail-col-span-12 xl:tail-col-span-8 sm:tail-pr-0 lg:tail-pr-8 xl:tail-pr-8">
            <Nuxt />
          </main>
        </div>
      </div>
    </div>
  </async-view>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  middleware: 'refreshToken',
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
  async mounted () {
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
  },
  methods: {
    ...mapActions({
      fetchAllClients: 'client/fetchAllClients',
      connectToSendBird: 'sendBird/connect_to_sb_server_with_userid',
      newMessage: 'sendBird/updateConnectedChannels',
      addChannel: 'sendBird/addNewChannel'
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
