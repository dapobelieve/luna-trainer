import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      client: null,
      dialogId: null,
      msgHistory: [],
      isLoading: false
    }
  },
  computed: {
    ...mapState('qb', {
      listOfIds: state => state.allChatUsers
    })
  },
  async mounted () {
    await this.getThisClient(this.$route.params.id)
      .then((response) => {
        this.client = response
        // check if this user is in the array chat in store
        if (this.listOfIds.includes(parseInt(this.client.qbId))) {
          // get the dialog
          this.$axios
            .$get(`${process.env.BASEURL_HOST}/qb/dialogs?userId=${this.$route.params.id}`).then(({ result }) => {
              if (result.length) {
                this.dialogId = result[0]._id
                return this.$axios.$get(
              `https://api.quickblox.com/chat/Message.json?chat_dialog_id=${result[0]._id}`,
              {
                headers: {
                  'QB-Token': this.$store.state.qb.QBSessionToken
                }
              }
                ).then((response) => {
                  this.msgHistory = response.items
                }).catch(err => console.log('fetching messages error', err))
              }
            }).catch((err) => {
              console.log('error fetching dialog', err)
            })
        } else {
          // create a dialog quickly
          const opponentId = parseInt(this.client.qbId)
          this.$axios
            .$post('https://api.quickblox.com/chat/Dialog.json',
              {
                type: 3,
                occupants_ids: opponentId
              },
              {
                headers: {
                  'QB-Token': this.$store.state.qb.QBSessionToken
                }
              }).then((response) => {
              console.log('created dialog', response)
              // send dialog to store
              this.updateDialog({
                ...response,
                dialog_id: response._id
              })
            }).catch((err) => {
              console.log('error creating dialog', err)
            })
        }
      })
      .catch((err) => {
        console.log('couldnt get client', err)
      })
  },
  methods: {
    ...mapActions({
      getThisClient: 'client/getSingleClient',
      updateDialog: 'qb/update_message_dialogs'
    })
  }
}
