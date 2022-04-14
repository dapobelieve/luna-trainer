
import { mapActions, mapMutations } from 'vuex'
export default {
  data: () => ({
    channelHandler: null,
    connectionHandler: null,
  }),
  methods: {
    ...mapMutations("sendbird-v2", {
      "addMessage": "addMessage",
      "swapMessage": "swapMessage"
    }),
    ...mapActions("sendbird-v2", {
      "getChannelsMetadata": "getChannelsMetadata"
    }),
    configureChannelHandler() {
      this.channelHandler = new this.$sb.ChannelHandler()
      this.channelHandler.onMessageReceived = (channel, message) => {
        const id = Object.keys(channel.memberMap).find(key => key !== this.$auth.user.userId)
        this.addMessage({ id , message })
        this.getChannelsMetadata()
        this.$nuxt.$emit('chat-message-received', { channel, message })
      }
      this.channelHandler.onMessageUpdated = (channel, newMessage) => {
        const id = Object.keys(channel.memberMap).find(key => key !== this.$auth.user.userId)
        this.swapMessage({ id, newMessage })
      }
      this.channelHandler.onDeliveryReceiptUpdated = (channel, newMessage) => {
        const id = Object.keys(channel.memberMap).find(key => key !== this.$auth.user.userId)
        this.swapMessage({ id, newMessage })
      }
      this.channelHandler.onTypingStatusUpdated = (channel) => {
        const membersTyping = channel.getTypingMembers()
        console.log(membersTyping, "is typing")
        return membersTyping
      }
    },
    configureConnectionHandler() {
      this.connectionHandler = new this.$sb.ConnectionHandler()
      this.connectionHandler.onReconnectStarted = () => {
        console.log('Reconnection Started')
      }
      this.connectionHandler.onReconnectSucceeded = () => {
        console.log('Reconnection Successful')
      },
      this.connectionHandler.onReconnectFailed = () => {
        console.log('Reconnection Failed')
      }
    }
  },
  created() {
    this.configureConnectionHandler()
    this.configureChannelHandler()
    this.$sb.addConnectionHandler('defaultLayoutHandler', this.connectionHandler)
    this.$sb.addChannelHandler('defaultLayoutHandler', this.channelHandler)
  }
}
