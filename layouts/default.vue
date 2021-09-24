<template>
  <async-view loader-id="logout">
    <div class="tail-min-h-screen">
      <GwHeader />
      <div
        class="tail-py-0 tail-max-w-12xl tail-mx-auto sm:tail-px-0 lg:tail-px-0 lg:tail-pl-0 lg:tail-grid lg:tail-grid-cols-12 tail-h-screen"
      >
        <Navigation />
        <main class="lg:tail-col-span-9 xl:tail-col-span-10">
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
            class="tail-bg-white tail-rounded-md tail-text-sm tail-font-medium tail-capitalize hover:tail-text-gray-500 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-indigo-500 tail-text-blue-700"
            @click="retry"
          >
            retry
          </button>
        </template>
      </NotificationsModal>
    </div>
  </async-view>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      page: this.$route.name,
      showNotification: false
    }
  },
  computed: {
    ...mapState({
      connectedChannels: state => state.sendBird.connectedChannels
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
    }
  },
  async mounted () {
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
    this.$sb.addChannelHandler('deafultLayoutHandler', channelHandler)
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
    ...mapActions({
      connectToSendBird: 'sendBird/connect_to_sb_server_with_userid',
      newMessage: 'sendBird/updateConnectedChannels',
      addChannel: 'sendBird/addNewChannel'
    }),
    retry () {
      this.$store.commit('sendBird/CONNECTION_ERROR', false)
      this.showNotification = false
      return this.connectToSendBird(this.$auth.user.sendbirdId).then((result) => {
        if (result !== 'error') {
          this.$toast.success('Chat connection successful')
        }
      })
    },

    // events for sendbird
    onMessageReceived (channel, message) {
      if (this.$route.name !== 'Dashboard') {
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
