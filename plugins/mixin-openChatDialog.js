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
      listOfIds: state => state.allChatUsers,
      latestChatEntry: state => state.latestChatEntry
    })
  },
  async mounted () {
    this.isLoading = true
    await this.getThisClient(this.$route.params.id)
      .then((response) => {
        this.client = response
        // check if this user is in the array chat in store
        if (this.listOfIds.includes(parseInt(this.client.qbId))) {
          this.fetchDialog(this.$route.params.id).then((result) => {
            if (result.length) {
              const dialogId = this.dialogId = result[0]._id
              const params = {
                chat_dialog_id: dialogId,
                sort_desc: 'date_sent',
                limit: 100,
                skip: 0
              }
              this.$quickblox.chat.message.list(params, (error, messages) => {
                if (error) {
                  console.log('error fetching messages', error)
                }
                if (messages) {
                  this.isLoading = false
                  this.msgHistory = messages.items.reverse()
                  this.$nextTick(() => {
                    this.scrollFeedToBottom()
                    this.clearMessageCount(this.dialogId)
                  })
                }
              })
            }
          }).catch()
        } else {
          // create a dialog
          const opponentId = parseInt(this.client.qbId)
          const params = {
            type: 3,
            occupants_ids: opponentId
          }

          this.$quickblox.chat.dialog.create(params, (error, dialog) => {
            if (error) {
              this.isLoading = false
              console.log('error creating dialog', error)
            }
            if (dialog) {
              this.dialogId = dialog._id
              console.log('dialog created', dialog)
              this.updateDialog({
                ...dialog,
                dialog_id: dialog._id
              })
              this.isLoading = false
            }
          })
        }
      })
      .catch((err) => {
        console.log('couldnt get client', err)
      })
  },
  watch: {
    latestChatEntry (newValue) {
      if (
        newValue.dialog_id === this.dialogId &&
        (newValue.userId !== this.sender)
      ) {
        this.updateMsgHistory(newValue.userId, newValue)
        this.$nextTick(() => {
          this.scrollFeedToBottom()
        })
      }
    }
  },
  methods: {
    ...mapActions({
      getThisClient: 'client/getSingleClient',
      updateDialog: 'qb/update_message_dialogs',
      fetchDialog: 'qb/fetchSingleUserDialog'
    }),
    updateMsgHistory (userId, message) {
      this.msgHistory.push({
        id: message.id,
        message: message.body,
        recipient_id: message.occupants_ids[0], // double check this
        dialog_id: message.dialog_id
      })
    }
  }
}
