<template>
  <div class="main tail-p-3 tail-pl-20 tail-flex">
    <div class="message-box tail-pr-5">
      <div class="tail-border tail-border-gray-200 tail-rounded-md tail-overflow-hidden tail-flex tail-flex-col tail-justify-between tail-h-full tail-items-center tail-relative">
        <!-- header part -->
        <div class="tail-bg-white tail-px-3 tail-py-2 tail-flex tail-items-center tail-w-full">
          <i role="button" class="ns-angle-left tail-p-1 tail-border tail-rounded tail-border-gray-300 tail-mr-5" @click="$router.push({ name: 'Clients' })"></i>
          <span class="tail-capitalize tail-ml-2 tail-font-medium">{{ $route.params.client.firstName }} {{ $route.params.client.lastName }}</span>
        </div>

        <!-- messages area -->
        <div id="messageFeed" class=" tail-h-full tail-mx-auto" style="width: 85%">
          <div
            v-for="messages in msgHistory"
            :key="messages._id"
            class="tail-flex tail-flex-col tail-w-full"
          >
            <div
              v-if="messages.recipient_id === sender"
              class="tail-flex align-items-end tail-items-end tail-mb-3"
            >
              <span
                class="tail-border tail-mb-0 tail-p-2 message text-wrap bgw text-break tail-bg-white"
                style="max-width: 95%"
              >
                {{ messages.message }}
              </span>
            </div>
            <p
              v-else
              style="max-width: 70%"
              class="sent tail-p-2 text-wrap tail-text-white text-break tail-mb-3 outgoing-message tail-self-end"
            >
              {{ messages.message }}
            </p>
          </div>
        </div>
        <!-- input area -->
        <div class="tail-w-full">
          <form @submit.prevent="sendChat">
            <div
              class="tail-border tail-flex align-items-center tail-bg-white tail-rounded-md tail-shadow-sm tail-pl-4 tail-pr-14 tail-py-3"
            >
              <input
                v-model="message"
                type="text"
                class="tail-w-full focus:tail-outline-none"
                placeholder="Type a message"
              />
              <button class="tail-mr-3" type="submit">
                <i class="ns-upload text-muted"></i>
              </button>
              <button class="" type="submit">
                <i class="ns-paper-plane text-muted"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="contact tail-rounded-md tail-p-3">
      <div class="tail-flex tail-items-center">
        <ClientAvatar :firstname="$route.params.client.firstName" :lastname="$route.params.client.lastName" />
        <div class="tail-ml-2">
          <p class="tail-text-sm">
            <span class="tail-font-medium">{{ $route.params.client.firstName }} {{ $route.params.client.lastName }}</span>
          </p>
          <div class="tail-flex tail-items-center">
            <img
              class="tail-bg-green-700 tail-rounded-full tail-inline-block"
              src="~/assets/img/dog-paw.svg"
              alt="dog paw"
            />
            <span class="tail-text-xs tail-ml-2">Shep</span>
          </div>
          <div class="tail-flex tail-items-center">
            <i class="ns-location-alt"></i>
            <span class="tail-text-xs tail-ml-1">{{ $route.params.client.location.address }}</span>
          </div>
        </div>
      </div>
      <div class="tail-py-4 tail-border-gray-200 tail-border-t tail-border-b tail-my-3">
        <button class="base-button" @click.prevent="createInvoice">
          new invoice
        </button>
      </div>
    </div>
    <AlertModal :visible="showAlert" @close="showAlert = $event" />
    <!-- <StripeAlertModal :visible="showStripeAlert" @close="showStripeAlert = $event" /> -->
    <MainModal ref="openBank">
      <template v-slot:body>
        <BankAccountDetails />
      </template>
    </MainModal>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
const QuickBlox = require('quickblox/quickblox.min')
export default {
  name: 'Messages',
  data () {
    return {
      showAlert: false,
      // showStripeAlert: false,
      message: '',
      msgHistory: [],
      occupantId: this.$route.params.client ? this.$route.params.client.qbId : null,
      dialogStatus: false,
      dialogId: null
    }
  },
  computed: {
    ...mapState({
      checkStatus: state => state.qb.statusForMessaging,
      messageDialogs: state => Object.values(state.qb.messageDialogs),
      latestChatEntry: state => state.qb.latestChatEntry
    }),
    ...mapGetters({
      listOfOccupants: 'qb/getOccupantsId'
    }),
    sender () {
      return this.$store.state.qb.qbUser.id
    },
    // scroll-to-bottom for messages
    isFeedAtBottom () {
      // eslint-disable-next-line prefer-const
      let messageFeed = document.getElementById('messageFeed')
      return (
        messageFeed.offsetHeight + messageFeed.scrollTop ===
        messageFeed.scrollHeight
      )
    },
    // eslint-disable-next-line vue/return-in-computed-property
    scrollFeedToBottom () {
      // eslint-disable-next-line prefer-const
      let messageFeed = document.getElementById('messageFeed')
      messageFeed.scrollTop = messageFeed.scrollHeight
    }
  },
  watch: {
    latestChatEntry (newValue) {
      console.log('watcher new value', newValue)
      // if (newValue.dialog_id === this.dialogId) {
      if (newValue.dialog_id === this.$route.params.dialogId) {
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
  mounted () {
    this.$nextTick(async () => {
      await this.$axios
        .$get(`${process.env.BASEURL_HOST}/qb/dialogs?userId=${this.$route.params.client.userId}`).then(({ result }) => {
          if (result.length) {
            this.dialogId = result[0]._id
          }
        }).catch((err) => {
          console.log('err', err)
        })

      const userCredentials = {
        userId: this.$store.state.qb.qbUser.id,
        password: this.$store.state.qb.qbUser.password
      }
      console.log('gotten here')
      QuickBlox.chat.connect(userCredentials, (error) => {
        if (error) {
          console.log('chat connect error', error)
          QuickBlox.chat.disconnect()
          // destroy opened session
          QuickBlox.destroySession((error) => {
            error
              ? console.log('Error Destroying Session:', error)
              : console.log('Session Destroyed successfully')
          })
          // eslint-disable-next-line no-useless-return
          return // exit quickbox init
        } else {
          // eslint-disable-next-line no-lonely-if
          if (this.$route.params.dialogId) {
            const deets = {
              chat_dialog_id: this.$route.params.dialogId,
              sort_desc: 'date_sent',
              limit: 100,
              skip: 0
            }

            QuickBlox.chat.message.list(
              deets,
              function (error, messages) {
                if (messages) {
                  console.log('mssage history', messages)
                  this.msgHistory = messages.items.reverse()
                  this.loading = false
                  this.clearMessageCount(this.$route.params.dialogId)
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
                if (error) {
                  QuickBlox.getSession(function (error, session) {
                    if (error) {
                      console.log('this is a getSession error', error) // redirect user to login screen
                    // inform design team to make a screen for 'Chat Session Expired, with a please relogin button'
                    }
                    if (session) {
                      console.log('if session is available', session)
                    }
                  })
                  console.log('fetching chat history error', error)
                }
              }.bind(this)
            )
          }
          // else {
          //   // removing this whole block
          //   const params = {
          //     type: 3,
          //     occupants_ids: [this.$route.params.client.qbId]
          //   }
          //   QuickBlox.chat.dialog.create(params, (error, dialog) => {
          //     if (error) {
          //       console.log('error creating dialog', error)
          //     } else if (dialog) {
          //       console.log('new dialog', dialog)
          //       this.dialogStatus = true
          //       this.dialogId = dialog._id
          //       const dialogId = this.dialogId
          //       const params1 = {
          //         chat_dialog_id: dialogId,
          //         sort_desc: 'date_sent',
          //         limit: 100,
          //         skip: 0
          //       }

          //       QuickBlox.chat.message.list(
          //         params1,
          //         function (error, messages) {
          //           if (messages) {
          //             console.log('mssage history', messages)
          //             this.msgHistory = messages.items.reverse()
          //             this.loading = false
          //             this.clearMessageCount(this.dialogId)
          //             // scroll to bottom
          //             if (this.msgHistory.length) {
          //               setTimeout(() => {
          //                 if (!this.isFeedAtBottom) {
          //                   // eslint-disable-next-line no-unused-expressions
          //                   this.scrollFeedToBottom
          //                 }
          //               }, 5)
          //             }
          //           }
          //           if (error) {
          //             QuickBlox.getSession(function (error, session) {
          //               if (error) {
          //                 console.log('this is a getSession error', error) // redirect user to login screen
          //                 // inform design team to make a screen for 'Chat Session Expired, with a please relogin button'
          //               }
          //               if (session) {
          //                 console.log('if session is available', session)
          //               }
          //             })
          //             console.log('fetching chat history error', error)
          //           }
          //         }.bind(this)
          //       )
          //     }
          //   })
          // } removed

          // QuickBlox.chat.dialog.create(params, (error, dialog) => {
          //   if (error) {
          //     console.log('error creating dialog', error)
          //   } else if (dialog) {
          //     console.log('new dialog', dialog)
          //     this.dialogStatus = true
          //     this.dialogId = dialog._id
          //     const dialogId = this.dialogId
          //     const params1 = {
          //       chat_dialog_id: dialogId,
          //       sort_desc: 'date_sent',
          //       limit: 100,
          //       skip: 0
          //     }

        //     QuickBlox.chat.message.list(
        //       params1,
        //       function (error, messages) {
        //         if (messages) {
        //           console.log('mssage history', messages)
        //           this.msgHistory = messages.items.reverse()
        //           this.loading = false
        //           this.clearMessageCount(this.dialogId)
        //           // scroll to bottom
        //           if (this.msgHistory.length) {
        //             setTimeout(() => {
        //               if (!this.isFeedAtBottom) {
        //                 // eslint-disable-next-line no-unused-expressions
        //                 this.scrollFeedToBottom
        //               }
        //             }, 5)
        //           }
        //         }
        //         if (error) {
        //           QuickBlox.getSession(function (error, session) {
        //             if (error) {
        //               console.log('this is a getSession error', error) // redirect user to login screen
        //               // inform design team to make a screen for 'Chat Session Expired, with a please relogin button'
        //             }
        //             if (session) {
        //               console.log('if session is available', session)
        //             }
        //           })
        //           console.log('fetching chat history error', error)
        //         }
        //       }.bind(this)
        //     )
        //   }
        // })
        }
      })
      QuickBlox.chat.onMessageTypingListener = this.onMessageTypingListener
    })
  },
  methods: {
    ...mapMutations('qb', {
      clearMessageCount: 'CLEAR_MESSAGE_COUNT'
    }),
    createInvoice () {
      if (!this.$auth.user.services.length) {
        this.showAlert = true
      } else {
        this.$router.push({ name: 'NewInvoices', params: { client: this.$route.params.client } })
      }
      // else if (!this.$store.state.payment.isBankLinked) {
      //   this.$refs.openBank.openModal()
      // }
    },
    updateMsgHistory (userId, message) {
      this.msgHistory.push({
        id: message.id,
        message: message.body,
        recipient_id: message.occupants_ids[0], // double check this
        dialog_id: message.dialog_id
      })
    },
    onMessageTypingListener (isTyping, userId, dialogId) {
      if (this.$route.params.id === dialogId && isTyping) {
        this.isTyping = true
      } else {
        this.isTyping = false
      }
    },
    sendChat () {
      // const dialogId = this.$route.params.dialogId ? this.$route.params.dialogId : this.dialogId
      if (this.$route.params.dialogId) {
        console.log('one')
        // create dialog
        const params = {
          type: 3,
          occupants_ids: [this.occupantId]
        }

        QuickBlox.chat.dialog.create(params, (error, dialog) => {
          if (error) {
            console.log('error creating dialog', error)
          }
          if (dialog) {
            console.log('the dialog', dialog)
            const message = {
              type: 'chat',
              body: this.message,
              extension: {
                save_to_history: 1,
                dialog_id: dialog._id
              },
              markable: 1
            }
            // const opponentId = dialog.occupants_ids[1]
            const opponentId = parseInt(this.occupantId)
            // console.log('said occupant', opponentId)
            try {
              console.log('message from model', this.message)
              message.id = QuickBlox.chat.send(opponentId, message)
              console.log('sent', message, ' id:', message.id)
              this.msgHistory.push({
                message: this.message,
                recipient_id: opponentId
              })
              this.message = ''
              setTimeout(() => {
                if (!this.isFeedAtBottom) {
                  const messageFeed = document.getElementById('messageFeed')
                  messageFeed.scrollTop = messageFeed.scrollHeight
                }
              }, 5)
            } catch (error) {
              console.log(error)
            }
          }
        })
      } else {
        // if (this.message) {
        console.log('two')
        const dialogId = this.$route.params.dialogId ? this.$route.params.dialogId : this.dialogId
        console.log('sent to dialog id', dialogId)
        const message = {
          type: 'chat',
          body: this.message,
          extension: {
            save_to_history: 1,
            dialog_id: dialogId
            // dialog_id: '60ddd75893a945005591565f'
          },
          markable: 1
        }
        const opponentId = parseInt(this.occupantId)
        console.log('opp id', opponentId)
        try {
          message.id = QuickBlox.chat.send(opponentId, message)
          console.log('sent', message, ' id:', message.id)
          // if ((this.dialogId = dialogId)) {
          console.log('check')
          this.msgHistory.push({
            message: this.message,
            recipient_id: opponentId
          })
          this.message = ''
          setTimeout(() => {
            if (!this.isFeedAtBottom) {
              const messageFeed = document.getElementById('messageFeed')
              messageFeed.scrollTop = messageFeed.scrollHeight
            }
          }, 5)
          // }
        } catch (error) {
          if (error.name === 'ChatNotConnectedError') {
            console.log(error)
          }
        }
        // }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
    height: calc(100vh - 72px);
    overflow: hidden !important;
    margin-bottom: 0;
    .message-box {
        width: 70%
    }
    .contact {
        width: 30%
    }
}

.message {
  border: 1px solid #d2ddec;
  border-radius: 16px 16px 16px 2px;
}
.sent {
  background: #56CCF2 0% 0% no-repeat padding-box;
  border-radius: 16px 16px 2px 16px;
  opacity: 1;
}
input:focus {
  outline: none !important;
  border: none !important;
}
::-webkit-scrollbar {
  width: 0;
  background: gray;
}
/* chat stuff */
.messages {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.messages .message-item.outgoing-message {
  margin-left: auto;
}
/* .messages .message-item {
  max-width: 75%;
} */
#messageFeed {
  height: calc(100vh - 200px);
  overflow-y: scroll;
}
</style>
