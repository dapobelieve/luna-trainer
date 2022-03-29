export default {
  async created () {
    try {
      const { userId } = await this.connectToSendBird(this.$auth.user.sendbirdId)
      if (userId === this.$auth.user.sendbirdId) {
        // fetch connected channels
        await this.$store.dispatch('sendBird/listOfConnectedChannels')
        this.$store.commit(
          'sendBird/SET_STATES', { fetchingMessages: false }
        )
        console.log('Sendbird Connected 🚀')
      }
    } catch (error) {
      this.$lunaToast.error('An error occured. Please contact support.')
    }
  }
}
