<template>
  <div class="main tail-p-3 tail-flex">
    <div class="message-box tail-pr-5">
      <div class="tail-border tail-border-gray-200 tail-rounded-md tail-overflow-hidden tail-flex tail-flex-col tail-justify-between tail-h-full tail-items-center tail-relative">
        <!-- header part -->
        <div class="tail-bg-white tail-px-3 tail-py-2 tail-flex tail-items-center tail-w-full">
          <i role="button" class="ns-angle-left tail-p-1 tail-border tail-rounded tail-border-gray-300 tail-mr-5" @click="$router.push({ name: 'Clients' })"></i>
          <span class="tail-capitalize tail-ml-2 tail-font-medium">{{ client && client.firstName }} {{ client && client.lastName }}</span>
        </div>

        <!-- messages area -->
        <div v-if="!isLoading" id="messageFeed" class=" tail-h-full tail-mx-auto" style="width: 85%">
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
        <SingleLoader v-else />
        <!-- input area -->
        <div class="tail-w-full">
          <form @submit.prevent="sendChat">
            <div
              class="tail-border tail-flex align-items-center tail-bg-white tail-rounded-md tail-shadow-sm tail-pl-4 tail-pr-14 tail-py-3"
            >
              <input
                v-model="message"
                :disabled="isLoading"
                type="text"
                class="tail-w-full focus:tail-outline-none"
                :placeholder="isLoading ? 'Please wait...' : 'Type a message'"
              />
              <!-- <button class="tail-mr-3" type="submit">
                <i class="ns-upload text-muted"></i>
              </button> -->
              <button v-if="!isLoading" type="submit">
                <i class="ns-paper-plane text-muted"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="contact tail-rounded-md tail-p-3">
      <div class="tail-flex tail-items-center">
        <ClientAvatar :firstname="client && client.firstName" :lastname="client && client.lastName" />
        <div class="tail-ml-2">
          <p class="tail-text-sm">
            <span class="tail-font-medium">{{ client && client.firstName }} {{ client && client.lastName }}</span>
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
            <span class="tail-text-xs tail-ml-1">{{ client && client.location.address }}</span>
          </div>
        </div>
      </div>
      <div class="tail-py-4 tail-border-gray-200 tail-border-t tail-border-b tail-my-3">
        <button class="base-button" @click.prevent="createInvoice">
          new invoice
        </button>
      </div>
    </div>
    <NotificationsModal :visible="showAlert" @close="showAlert = $event">
      <template v-slot:title>
        Messaging Error
      </template>
      <template v-slot:subtitle>
        Please login again
      </template>
    </NotificationsModal>
    <!-- <StripeAlertModal :visible="showStripeAlert" @close="showStripeAlert = $event" /> -->
    <Modal :is-open="openBankModal" @close="openBankModal = $event">
      <BankAccountDetails />
    </Modal>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import OpenChatDialog from '~/plugins/mixin-openChatDialog.js'
export default {
  name: 'Messages',
  mixins: [OpenChatDialog],
  data () {
    return {
      message: '',
      openBankModal: false,
      showAlert: false
    }
  },
  computed: {
    sender () {
      return this.$store.state.qb.qbUser.id
    }
  },
  methods: {
    ...mapMutations({
      clearMessageCount: 'qb/CLEAR_MESSAGE_COUNT'
    }),
    async sendChat () {
      if (this.listOfIds.includes(parseInt(this.client.qbId))) {
        if (!this.dialogId) {
          await this.$axios
            .$get(`${process.env.BASEURL_HOST}/qb/dialogs?userId=${this.$route.params.id}`).then(({ result }) => {
              if (result.length) {
                this.dialogId = result[0]._id
              }
            }).catch((err) => {
              console.log('error fetching dialog', err)
            })
        }
        const opponentId = parseInt(this.client.qbId)
        const message = {
          type: 'chat',
          body: this.message,
          extension: {
            save_to_history: 1,
            dialog_id: this.dialogId
          },
          markable: 1
        }
        try {
          message.id = this.$quickblox.chat.send(opponentId, message)
          this.msgHistory.push({
            message: this.message,
            recipient_id: opponentId
          })
          this.$nextTick(() => {
            this.scrollFeedToBottom()
          })
          this.message = ''
        } catch (e) {
          if (e.name === 'ChatNotConnectedError') {
            // not connected to chat
          }
        }
      }
    },
    scrollFeedToBottom () {
      const messageFeed = document.getElementById('messageFeed')
      return messageFeed.scrollTo(0, messageFeed.scrollHeight)
    },
    createInvoice () {
      if (!this.$auth.user.services.length) {
        this.showAlert = true
      } else {
        this.$router.push({ name: 'NewInvoice-id', params: { id: this.$route.params.id } })
      }
      // else if (!this.$store.state.payment.isBankLinked) {
      //   this.openBank = true
      // }
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
