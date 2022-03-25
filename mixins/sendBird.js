export default {
  async created () {
    console.log('+1')
    // connect user to sendbird server
    try {
      const { userId } = await this.connectToSendBird(this.$auth.user.sendbirdId)
      if (userId === this.$auth.user.sendbirdId) {
        // fetch connected channels
        await this.$store.dispatch('sendBird/listOfConnectedChannels')
        this.$store.commit(
          'sendBird/CHANGE_SENDBIRD_CHANNEL_STATUS',
          'not fetching'
        )
        console.log('Sendbird Connected 🚀')
      }
    } catch (error) {
      this.$lunaToast.error('An error occured. Please contact support.')
    }
  }
}
