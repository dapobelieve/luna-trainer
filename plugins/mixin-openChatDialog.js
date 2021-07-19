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
    await this.getThisClient(this.$route.params.id)
      .then((response) => {
        this.client = response
        // check if this user is in the array chat in store
        if (this.listOfIds.includes(parseInt(this.client.qbId))) {
          console.log('yes it is')
          // get the dialog
          this.$axios
            .$get(`${process.env.BASEURL_HOST}/qb/dialogs?userId=${this.$route.params.id}`).then(({ result }) => {
              if (result.length) {
                this.dialogId = result[0]._id
                const dialogId = result[0]._id

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
                    this.msgHistory = messages.items.reverse()
                    // scroll to bottom
                    if (this.msgHistory.length) {
                      setTimeout(() => {
                        if (!this.isFeedAtBottom) {
                          // eslint-disable-next-line no-unused-expressions
                          this.scrollFeedToBottom
                        }
                      }, 5)
                    }
                  }
                })
              }
            }).catch((err) => {
              console.log('error fetching dialog', err)
            })
        } else {
          // create a dialog quickly
          const opponentId = parseInt(this.client.qbId)
          // this.$axios
          //   .$post('https://api.quickblox.com/chat/Dialog.json',
          //     {
          //       type: 3,
          //       occupants_ids: opponentId
          //     },
          //     {
          //       headers: {
          //         'QB-Token': this.$store.state.qb.QBSessionToken
          //       }
          //     }).then((response) => {
          //     console.log('created dialog', response)
          //     // send dialog to store
          //     this.updateDialog({
          //       ...response,
          //       dialog_id: response._id
          //     })
          //   }).catch((err) => {
          //     console.log('error creating dialog', err)
          //   })
          const params = {
            type: 3,
            occupants_ids: opponentId
          }

          this.$quickblox.chat.dialog.create(params, (error, dialog) => {
            if (error) {
              console.log('error creating dialog', error)
            }
            if (dialog) {
              console.log('dialog created', dialog)
              this.updateDialog({
                ...response,
                dialog_id: response._id
              })
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
      console.log('watcher new value', newValue)
      if (newValue.dialog_id === this.dialogId) {
        console.log('here')
        this.updateMsgHistory(newValue.userId, newValue)
        setTimeout(() => {
          if (!this.isFeedAtBottom) {
            const messageFeed = document.getElementById('messageFeed')
            messageFeed.scrollTop = messageFeed.scrollHeight
          }
        }, 5)
      }
    }
  },
  methods: {
    ...mapActions({
      getThisClient: 'client/getSingleClient',
      updateDialog: 'qb/update_message_dialogs'
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
