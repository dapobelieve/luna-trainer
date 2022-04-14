export default {
  created () {
    // sendbird connection events
    const connectionHandler = new this.$sb.ConnectionHandler()

    connectionHandler.onReconnectStarted = this.onReconnectStarted
    connectionHandler.onReconnectSucceeded = this.onReconnectSucceeded
    connectionHandler.onReconnectFailed = this.onReconnectFailed

    this.$sb.addConnectionHandler('defaultLayoutHandler', connectionHandler)
  },
  methods: {
    onReconnectStarted () {
      console.log('Reconnection Started')
    },
    onReconnectSucceeded () {
      console.log('Reconnection Successful')
    },
    onReconnectFailed () {
      console.log('Reconnection Failed')
    }
  }
}
