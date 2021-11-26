export default {
  async created () {
    console.log('+1')
    // connect user to sendbird server
    try {
      await this.connectToSendBird(this.$auth.user.sendbirdId).then(async (sendbirdUser) => {
        const { userId } = sendbirdUser
        console.log(1)
        if (userId === this.$auth.user.sendbirdId) {
          console.log(2)
          // fetch connected channels
          await this.$store
            .dispatch('sendBird/listOfConnectedChannels')
            .then(() =>
              this.$store.commit(
                'sendBird/CHANGE_SENDBIRD_CHANNEL_STATUS',
                'not fetching'
              )
            )
          console.log(3)
        }
      })
    } catch (error) {
      console.log('errors in await ', error)
    }
  }
}
