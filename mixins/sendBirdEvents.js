export default {
  created () {
    // sendbird events
    const channelHandler = new this.$sb.ChannelHandler()

    channelHandler.onMessageReceived = this.onMessageReceived
    channelHandler.onMessageUpdated = this.onMessageUpdated
    channelHandler.onMessageDeleted = this.onMessageDeleted
    channelHandler.onChannelChanged = this.onChannelChanged
    // channelHandler.onDeliveryReceiptUpdated = this.onDeliveryReceiptUpdated
    // channelHandler.onReadReceiptUpdated = this.onReadReceiptUpdated
    channelHandler.onTypingStatusUpdated = this.onTypingStatusUpdated

    this.$sb.addChannelHandler('deafultLayoutHandler', channelHandler)
  },

  methods: {
    // events for sendbird
    onMessageReceived (channel, message) {
      console.log('got message from channel: ', channel, ' and the message: ', message)
      this.$store.dispatch('sendBird/newMessageReceived', { channel, message })
      if (
        this.$route.name === 'Client-id-Messages' &&
        channel.url === this.channelUrl
      ) {
        console.log('logging in messages')
        // this.messageHistory.push(message)
        // this.$nextTick(() => {
        //   this.scrollFeedToBottom()
        //   // this.markAsRead(channel)
        // })
      }
    },

    // message has been updated in chat
    onMessageUpdated () {},

    // user deletes message
    onMessageDeleted (channel, message) {},

    // something changes in the chat
    onChannelChanged () {},

    // message has been delivered
    onDeliveryReceiptUpdated () {},

    // user reads a specific unread message in the chat
    onReadReceiptUpdated () {},

    // a user starts typing a message
    onTypingStatusUpdated () {}
  }
}
