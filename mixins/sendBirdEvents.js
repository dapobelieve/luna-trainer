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
      console.log('message sent ', [channel, message])
    },

    // message has been updated in chat
    onMessageUpdated (channel, message) {
      console.log([channel, message])
    },

    // user deletes message
    onMessageDeleted (channel, message) {},

    // something changes in the chat
    onChannelChanged (channel) {
      const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png']
      const { messageType: incomingMessageType } = channel.lastMessage
      const { type: incomingFileType } = channel.lastMessage
      if (
        (incomingMessageType === 'file' &&
          acceptedImageTypes.includes(incomingFileType)) ||
        incomingMessageType === 'user'
      ) {
        this.$store.dispatch('sendBird/newMessageReceived', {
          channel,
          message: channel.lastMessage
        })
        if (
          this.$route.name === 'client-id-messages' &&
          channel.url === this.channelUrl
        ) {
          const createdDate = new Date(channel.lastMessage.createdAt).toDateString()
          if (this.channel.lastMessage._sender.userId === this.sender) {
            const sendbirdMsgDate = new Date(channel.lastMessage.createdAt).toDateString()
            const messages = this.msgHistory[sendbirdMsgDate]
            const messageIndex = messages.findIndex(m => m.data === channel.lastMessage.data)
            this.msgHistory[sendbirdMsgDate].splice(messageIndex, 1, channel.lastMessage)
          } else if (createdDate in this.msgHistory) {
            this.msgHistory[createdDate].push(channel.lastMessage)
          } else {
            this.msgHistory[createdDate] = [channel.lastMessage]
          }
          this.markMessagesAsRead(channel)
          this.$nextTick(() => {
            this.scrollFeedToBottom()
          })
        }
      }
    },

    // message has been delivered
    onDeliveryReceiptUpdated (channel) {
      console.log('this channels delivery is updated ', channel)
    },

    // user reads a specific unread message in the chat
    onReadReceiptUpdated (groupChannel) {
      console.log('updating read receipt ', groupChannel)
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
          this.$lunaToast.error('An error occured, please reload')
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
