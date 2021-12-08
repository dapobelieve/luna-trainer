export default {
  created () {
    // sendbird events
    const channelHandler = new this.$sb.ChannelHandler()

    channelHandler.onMessageReceived = this.onMessageReceived
    channelHandler.onMessageUpdated = this.onMessageUpdated
    channelHandler.onMessageDeleted = this.onMessageDeleted
    channelHandler.onChannelChanged = this.onChannelChanged
    channelHandler.onChannelDeleted = this.onChannelDeleted
    channelHandler.onDeliveryReceiptUpdated = this.onDeliveryReceiptUpdated
    channelHandler.onReadReceiptUpdated = this.onReadReceiptUpdated
    channelHandler.onTypingStatusUpdated = this.onTypingStatusUpdated

    this.$sb.addChannelHandler('deafultLayoutHandler', channelHandler)
  },

  methods: {
    // events for sendbird
    onMessageReceived (channel, message) {
      const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png']
      const { messageType: incomingMessageType } = message
      const { type: incomingFileType } = message
      if (
        (incomingMessageType === 'file' &&
          acceptedImageTypes.includes(incomingFileType)) ||
        incomingMessageType === 'user'
      ) {
        this.$store.dispatch('sendBird/newMessageReceived', {
          channel,
          message
        })
        if (
          this.$route.name === 'client-id-messages' &&
          channel.url === this.channelUrl
        ) {
          this.messageHistory.push(message)
          this.$nextTick(() => {
            this.scrollFeedToBottom()
            // this.markAsRead(channel)
          })
        }
      }
    },

    // message has been updated in chat
    onMessageUpdated () {},

    // user deletes message
    onMessageDeleted (channel, message) {},

    // something changes in the chat
    onChannelChanged () {},

    // message has been delivered
    onDeliveryReceiptUpdated (channel) {
      console.log('this channels delivery is updated ', channel)
    },

    // user reads a specific unread message in the chat
    onReadReceiptUpdated (groupChannel) {
      if (this.channelUrl === groupChannel.url) {
        this.messageReadReceipt = true
      }
    },

    // a group channel has been deleted on the sendbord server
    async onChannelDeleted (channelUrl, channelType) {
      const currentChannel = sessionStorage.getItem('deletingChannelUrl')
      if (
        currentChannel === null ||
        (currentChannel && currentChannel !== channelUrl)
      ) {
        try {
          await this.$store.commit(
            'sendBird/DELETE_CHANNEL_LOCALLY',
            channelUrl
          )
        } catch (error) {
          this.$gwtoast.error('An error occured, please reload')
          console.log(error)
        }
      }
      if (currentChannel) {
        sessionStorage.removeItem('deletingChannelUrl')
      }
    },

    // a user starts typing a message
    onTypingStatusUpdated (groupChannel) {
      const membersTyping = groupChannel.getTypingMembers()
      return membersTyping
    }
  }
}
