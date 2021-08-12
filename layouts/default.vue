<template>
  <div class="tail-min-h-screen tail-bg-gray-100">
    <GwHeader />
    <div class="tail-py-0 tail-max-w-12xl tail-mx-auto sm:tail-px-0 lg:tail-px-0 lg:tail-pl-0 lg:tail-grid lg:tail-grid-cols-12 tail-overflow-x-hidden">
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
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      page: this.$route.name,
      showNotification: false
    }
  },
  computed: {
    ...mapGetters({
      sendBirdConnStatus: 'sendBird/connectingToSendbirdServerWithUserStatus'
    })
  },
  watch: {
    sendBirdConnStatus (newValue, oldValue) {
      if (newValue || oldValue) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.showNotification = true
          }, 2000)
        })
      }
    }
  },
  mounted () {
    // connect user to sendbird server
    this.connectToSendBird(this.$auth.user.sendbirdId)

    // sendbird events
    const channelHandler = new this.$sb.ChannelHandler()

    channelHandler.onMessageReceived = this.onMessageReceived
    channelHandler.onMessageUpdated = function (channel, message) {}
    channelHandler.onMessageDeleted = function (channel, messageId) {}
    channelHandler.onMentionReceived = function (channel, message) {}
    channelHandler.onChannelChanged = function (channel) {}
    channelHandler.onChannelDeleted = function (channelUrl, channelType) {}
    channelHandler.onChannelFrozen = function (channel) {}
    channelHandler.onChannelUnfrozen = function (channel) {}
    channelHandler.onMetaDataCreated = function (channel, metaData) {}
    channelHandler.onMetaDataUpdated = function (channel, metaData) {}
    channelHandler.onMetaDataDeleted = function (channel, metaDataKeys) {}
    channelHandler.onMetaCountersCreated = function (channel, metaCounter) {}
    channelHandler.onMetaCountersUpdated = function (channel, metaCounter) {}
    channelHandler.onMetaCountersDeleted = function (channel, metaCounterKeys) {}
    channelHandler.onChannelHidden = function (groupChannel) {}
    channelHandler.onUserReceivedInvitation = function (groupChannel, inviter, invitees) {}
    channelHandler.onUserDeclinedInvitation = function (groupChannel, inviter, invitee) {}
    channelHandler.onUserJoined = function (groupChannel, user) {}
    channelHandler.onUserLeft = function (groupChannel, user) {}
    channelHandler.onDeliveryReceiptUpdated = function (groupChannel) {}
    channelHandler.onReadReceiptUpdated = function (groupChannel) {}
    channelHandler.onTypingStatusUpdated = function (groupChannel) {}
    channelHandler.onUserEntered = function (openChannel, user) {}
    channelHandler.onUserExited = function (openChannel, user) {}
    channelHandler.onUserMuted = function (channel, user) {}
    channelHandler.onUserUnmuted = function (channel, user) {}
    channelHandler.onUserBanned = function (channel, user) {}
    channelHandler.onUserUnbanned = function (channel, user) {}
    channelHandler.onChannelMemberCountChanged = function (channels) {}
    channelHandler.onChannelParticipantCountChanged = function (channels) {}

    // Add this channel event handler to the `SendBird` instance.
    this.$sb.addChannelHandler('mainHandler', channelHandler)
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
      connectToSendBird: 'sendBird/connect_to_sb_server_with_userid'
    }),
    retry () {
      this.showNotification = false
      return this.connectToSendBird(this.$auth.user.sendbirdId).then((result) => {
        if (result !== 'error') {
          this.$toast.success('Chat connection successful')
        }
      })
    },

    // events
    onMessageReceived (channel, message) {
      console.log('the channel ', channel, ' the message ', message)
    }
  }
}
</script>

<style lang="scss"></style>
