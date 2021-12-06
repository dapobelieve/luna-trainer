<template>
  <div
    class="bg-white rounded-xl overflow-y-auto overscroll-contain sticky lg:top-[4.5rem] w-full border"
    style="height: calc(100vh - 5.5rem);"
  >
    <div class="relative h-full">
      <div
        v-show="isUploading"
        class="flex flex-col justify-between h-full bg-black absolute right-0 left-0 z-10"
      >
        <div class="flex justify-between bg-white pt-5 px-4 pb-2">
          <p class="text-gray-700 text-xl font-normal">
            Preview
          </p>
          <button type="button" @click="removeImage">
            <i class="ns-cross text-xl text-blue-500"></i>
          </button>
        </div>
        <div class="flex justify-center">
          <img
            style="max-width: 568px; max-height: 568px"
            class="w-full"
            :src="fileImage"
          />
        </div>
        <div class="bg-white flex justify-between items-center p-4">
          <div
            class="overflow-hidden relative rounded-lg"
            style="border: 3px solid #3B82F6;"
          >
            <img
              style="max-width: 80px; max-height: 80px"
              class="inline-block object-contain"
              :src="fileImage"
            />
            <button
              type="button"
              class="absolute right-1 top-1"
              @click="removeImage"
            >
              <i class="ns-cross text-md text-white"></i>
            </button>
          </div>
          <button
            class="button-fill button-sm w-11"
            style="height: 40px"
            @click="sendFile"
          >
            <i class="ns-paper-plane text-xl"></i>
          </button>
        </div>
      </div>
      <div v-if="isChannelLoading" class="h-full grid place-content-center">
        <div class="flex flex-col items-center">
          <SingleLoader />
          <p class="text-center">
            Starting Chat...
          </p>
        </div>
      </div>
      <div v-else-if="!clientIsReady" class="h-full grid place-content-center">
        <div class="flex items-center">
          <i class="ns-lock text-lg mr-1"></i>
          <span
            class="mr-2"
          >You can only message clients who have accepted your invite.</span>
        </div>
      </div>
      <div
        v-else-if="errorCreatingChannel"
        class="h-full grid place-content-center"
      >
        <div class="flex flex-col items-center">
          <p class="text-center pt-8 pb-12 px-4 text-gray-500 text-sm">
            An error occured. Please contact support.
          </p>
        </div>
      </div>
      <div
        v-else
        class="flex flex-col justify-between h-full"
        @dragenter.prevent="dragging = true"
        @dragend.prevent="dragging = false"
        @dragover.prevent
        @drop.prevent="onDropImage($event)">
        <!-- when dragEntered is true -->
        <div v-show="dragging" class="dragEnter" @dragleave.prevent="dragging = false">
          Drop Image Here
        </div>
        <ul id="chatBody" class="h-full w-full p-4 overflow-y-auto list-none">
          <template v-if="messageHistory.length">
            <div v-for="msg in messageHistory" :key="msg.messageId">
              <li
                v-if="msg._sender.userId === sender"
                class="me flex justify-end pl-6"
                @dblclick="replyParentMessageWithText(msg)"
              >
                <small class="self-end text-xs mr-1.5">
                  <!-- <img
                    v-if="msg.sendingStatus === 'succeeded'"
                    class="text-center inline-block h-3"
                    src="~/assets/img/svgs/checkmark-done-outline.svg"
                    alt
                    srcset
                  /> -->
                  <img
                    v-if="msg.sendingStatus === 'succeeded'"
                    class="text-center inline-block h-3"
                    src="~/assets/img/svgs/checkmark-outline.svg"
                    alt
                    srcset
                  />
                  <span class="">{{
                    new Date(msg.createdAt).toLocaleTimeString().substring(0, 5)
                  }}</span>
                </small>
                <span
                  v-if="msg.messageType === 'file'"
                  class="msg overflow-hidden"
                  @click="viewImage(msg)"
                >
                  <img
                    class="bg-white cursor-pointer"
                    :src="msg.imaging || msg.url"
                    style="max-width: 250px"
                  />
                </span>
                <div
                  v-else
                  class="msg p-2 max-w-lg break-all"
                  style="calc(100% - 2.5rem)"
                >
                  {{ msg.message }}
                </div>
              </li>
              <li
                v-else
                class="you flex items-end pr-6"
                @dblclick="replyParentMessageWithText(msg)"
              >
                <ClientAvatar
                  v-if="msg._sender.profileUrl"
                  class="mr-2 flex-shrink-0"
                  :client-info="{ imgURL: msg._sender.profileUrl }"
                  :height="2"
                  :width="2"
                />
                <ClientAvatar
                  v-else
                  class="mr-2 flex-shrink-0"
                  :client-info="{ firstName: msg._sender.nickname }"
                  :height="2"
                  :width="2"
                />
                <span
                  v-if="msg.messageType === 'file'"
                  class="msg overflow-hidden border"
                  @click="viewImage(msg)"
                >
                  <img
                    class="bg-white max-w-[16rem] max-h-[13.4rem] cursor-pointer"
                    :src="msg.url"
                  />
                </span>
                <div
                  v-else
                  class="msg p-2 max-w-lg break-all"
                  @dblclick="replyParentMessageWithText(msg)"
                >
                  {{ msg.message }}
                </div>
                <small class="ml-2 text-xs">{{
                  new Date(msg.createdAt).toLocaleTimeString().substring(0, 5)
                }}</small>
              </li>
            </div>
          </template>
          <template v-else>
            <div class="h-full grid place-content-center text-gray-500">
              <div class="flex items-center">
                <span class="mr-2">Start a conversation</span>
                <img
                  class="text-center inline-block"
                  src="~/assets/img/svgs/paw.svg"
                  alt
                  srcset
                />
              </div>
            </div>
          </template>
        </ul>
        <div class>
          <div
            v-if="uploadingFileToSb"
            class="bg-black text-white px-4 py-2 z-50"
            style="width: fit-content"
          >
            {{ fileToBeSent.name }} file is uploading...
          </div>
          <form class="w-full" @submit.prevent="sendChat">
            <div
              v-if="replyToThread"
              class="h-auto px-6 py-2 bg-gray-100 flex items-center justify-between"
            >
              <div
                :class="[
                  replyToThread.messageType === 'file'
                    ? 'h-[4.93rem]'
                    : 'h-[3.67rem]',
                  'mr-4 rounded-md border-l-[5px] py-2 px-3 bg-gray-200 w-full border-blue-500 overflow-hidden'
                ]"
              >
                <p class="font-medium text-blue-500 capitalize">
                  {{
                    replyToThread._sender.nickname === $auth.user.firstName
                      ? "you"
                      : replyToThread._sender.nickname
                  }}
                </p>
                <p v-if="replyToThread.messageType === 'user'" class="">
                  {{ replyToThread.message }}
                </p>
                <img
                  v-else
                  class="text-center inline-block h-10 w-10"
                  :src="replyToThread.url"
                  alt
                />
              </div>
              <button type="button" @click="replyToThread = null">
                <i class="ns-cross text-lg text-blue-500"></i>
              </button>
            </div>
            <div
              class="border-t flex items-center justify-center bg-white rounded-b-xl shadow-sm px-4 py-2 h-auto"
            >
              <textarea
                ref="chatArea"
                v-model="message"
                type="text"
                class="w-full focus:outline-none text-sm resize-none h-6 box-border"
                placeholder="Type a message"
                @keyup.enter="sendChat"
                @input="
                  emitValue($event);
                  resize();
                "
                @keydown.enter.exact="emitEnter"
              />
              <div class="relative">
                <transition name="fadeIn">
                  <img
                    v-if="showUpload"
                    role="button"
                    class="text-2xl text-center inline-block p-1 absolute z-50 -top-14 right-0 rounded-full"
                    src="~/assets/img/svgs/image.svg"
                    style="background: rgba(59, 130, 246, 1)"
                    @click="uploadPhoto"
                  />
                </transition>
                <input
                  ref="fileUpload"
                  class="hidden"
                  type="file"
                  name="image"
                  accept="image/*"
                  @change="onChange"
                />
                <button
                  v-show="!replyToThread"
                  class="button-text button-sm w-8 ml-2"
                  type="button"
                  @click="showUpload = !showUpload"
                >
                  <i class="ns-upload"></i>
                </button>
              </div>
              <button
                class="button-fill button-sm w-8 ml-2"
                type="submit"
                :class="{ 'opacity-50 cursor-default': message === '' }"
                :disabled="message === ''"
              >
                <i class="ns-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import sendBirdEvents from '../../../mixins/sendBirdEvents'
export default {
  name: 'Messages',
  mixins: [sendBirdEvents],
  async asyncData ({ params, store }) {
    try {
      const res = await store
        .dispatch('client/getSingleClientById', params.id)
        .then(res => res)
      return { client: res }
    } catch (error) {
      console.log('error fetching client profile ', error)
    }
  },
  data () {
    return {
      client: null,
      channelUrl: null,
      isChannelLoading: true,
      replyToThread: null,
      parentMessageId: 0,
      uploadingFileToSb: false,
      isUploading: false,
      id: this.$route.params.id,
      errorCreatingChannel: false,
      message: '',
      showUpload: false,
      fileImage: null,
      fileToBeSent: null,
      messageHistory: [],
      channel: null,
      clientIsReady: true,
      dragging: false
    }
  },
  computed: {
    ...mapState({
      connectedChannels: state => state.sendBird.connectedChannels,
      isSendbirdConnected: state => state.sendBird.sendbirdConnected
    }),
    sender () {
      return this.$auth.user.sendbirdId
    },
    receiver () {
      return (
        this.channel &&
        this.channel.members.find(u => u.userId !== this.sender).userId
      )
    }
  },
  watch: {
    isSendbirdConnected: {
      async handler (newValue, oldValue) {
        if (
          (newValue || oldValue) &&
          this.client !== null &&
          this.$store.state.sendBird.sendbirdChannels === 'not fetching'
        ) {
          if (this.client.status === 'accepted') {
            const conversations = await this.checkIfConversationExits(
              this.client.sendbirdId
            )
            if (!conversations || conversations === undefined) {
              try {
                const createdChannel = await this.createPrivateChannel(
                  this.client.sendbirdId
                )
                this.channelUrl = createdChannel.url
                this.channel = createdChannel
                return
              } catch (error) {
                this.errorCreatingChannel = true
                return
              } finally {
                this.isChannelLoading = false
              }
            }
            this.existingChannel(conversations)
            return
          }
          this.clientIsReady = false
          this.isChannelLoading = false
        }
      },
      immediate: true
    },
    value (newVal, oldVal) {
      if (newVal === '') {
        this.$refs.chatArea.style.height = '55px'
      }
    }
  },
  destroyed () {
    if (
      this.channelUrl !== null &&
      this.channel.creator.userId === this.sender &&
      !this.messageHistory.length
    ) {
      // since no messages were exchanged, delete channel
      sessionStorage.setItem('deletingChannelUrl', this.channelUrl)
      this.deleteChannel(this.channelUrl)
    }
  },
  methods: {
    ...mapActions({
      getClientProfile: 'client/getSingleClientById'
    }),
    ...mapActions('sendBird', {
      createPrivateChannel: 'createPrivateChannel',
      deleteChannel: 'deleteChannel',
      checkIfConversationExits: 'checkIfConversationExits',
      markAsRead: 'markMessageAsRead',
      addChannel: 'addNewChannel',
      newMessage: 'updateConnectedChannels',
      connectToSendBird: 'connect_to_sb_server_with_userid',
      getChannelListing: 'listOfConnectedChannels'
    }),

    emitEnter (e) {
      e.preventDefault()
      this.$emit('enter-pressed')
    },
    emitValue (e) {
      this.$emit('input', e.target.value)
    },
    resize () {
      if (this.$refs.chatArea.value === '') {
        this.$refs.chatArea.style.height = '46px'
      }
      const h = parseInt(this.$refs.chatArea.scrollHeight, 10)
      if (h < 150) {
        if (h > 46) {
          this.$refs.chatArea.style.maxHeight = 'none'
        }
        this.$refs.chatArea.style.height = 'auto'
        this.$refs.chatArea.style.height = `${this.$refs.chatArea.scrollHeight}px`
      } else if (h > 150) {
        this.$refs.chatArea.style.height = '150px'
      } else {
        this.$refs.chatArea.style.height = 'auto'
      }
    },

    viewImage (image) {
      this.$store.commit('sendBird/VIEW_IMAGE', {
        imageDetails: {
          url: image.url,
          nickname: image._sender.nickname,
          profileImg: image._sender.plainProfileUrl,
          dateTime: image.createdAt
        },
        status: true
      })
    },

    // fetch message history
    fetchMessageHistory (channel) {
      const listQuery = channel.createPreviousMessageListQuery()
      listQuery.replyType = 'ONLY_REPLY_TO_CHANNEL'
      listQuery.includeThreadInfo = true
      listQuery.includeParentMessageInfo = true

      // Retrieving previous messages.
      listQuery.load((messages, error) => {
        if (error) {
          this.$gwtoast.error('Error fetching messages', error)
        }
        if (messages) {
          this.messageHistory = messages
          this.isChannelLoading = false
          this.$nextTick(() => {
            this.scrollFeedToBottom()
            // this.markAsRead(channel)
          })
        }
      })
    },

    // if an existing chat exist between trainer and current client in view
    existingChannel (groupChannel) {
      this.channel = groupChannel
      this.channelUrl = groupChannel.url
      this.fetchMessageHistory(groupChannel)
    },

    // send text message
    sendChat () {
      if (this.message) {
        const params = new this.$sb.UserMessageParams()
        params.parentMessageId = parseInt(this.parentMessageId)
        params.message = this.message
        params.mentionType = 'users' // Either 'users' or 'channel'
        params.pushNotificationDeliveryOption = 'default' // Either 'default' or 'suppress'
        this.channel.sendUserMessage(params, (userMessage, error) => {
          if (error) {
            // Handle error.
            this.$gwtoast.error('Message not sent: ', error)
            return
          }
          this.messageHistory.push(userMessage)
          this.$nextTick(() => {
            this.scrollFeedToBottom()
          })
          this.message = ''
          this.replyToThread = null
          this.parentMessageId = 0
        })
      }
    },

    // call when replying to a particular message
    replyParentMessageWithText (msgObject) {
      this.parentMessageId = msgObject.messageId
      this.replyToThread = msgObject
    },

    // when sending a file message (for images only)
    sendFile () {
      // Sending a file message with a raw file
      const params = new this.$sb.FileMessageParams()
      params.parentMessageId = parseInt(this.parentMessageId)
      params.file = this.fileToBeSent // Or .fileUrl  = FILE_URL (You can also send a file message with a file URL.)
      params.fileName = this.fileToBeSent.name
      params.fileSize = this.fileToBeSent.size
      params.mentionType = 'users' // Either 'users' or 'channel'
      params.mentionedUserIds = [this.receiver] // Or mentionedUsers = Array<User>;
      params.pushNotificationDeliveryOption = 'default' // Either 'default' or 'suppress'
      this.isUploading = false
      // this.$nextTick(() => {
      //   this.scrollFeedToBottom()
      // })
      this.uploadingFileToSb = true
      this.channel.sendFileMessage(params, (fileMessage, error) => {
        if (error) {
          // Handle error.
          this.$gwtoast.error('Error uploading image')
          console.log(error)
          this.uploadingFileToSb = false
        }
        const messageId = fileMessage.messageId
        if (messageId) {
          this.uploadingFileToSb = false
          this.messageHistory.push({
            messageId,
            imaging: this.fileImage,
            messageType: 'file',
            createdAt: fileMessage.createdAt,
            sendingStatus: fileMessage.sendingStatus,
            url: fileMessage.url,
            _sender: {
              userId: this.sender
            }
          })
          this.fileImage = null
          this.fileToBeSent = null
          this.$nextTick(() => {
            this.scrollFeedToBottom()
          })
        }
      })
    },

    uploadPhoto () {
      this.$refs.fileUpload.click()
      this.showUpload = false
    },
    onDropImage (event) {
      const files = event.dataTransfer.files
      const fileType = event.dataTransfer.files[0].type.split('/')[0] === 'image'
      if (fileType) {
        this.fileToBeSent = files[0]
        this.createImage(files[0])
      } else {
        this.$gwtoast.error('File is not an image')
      }
      this.dragging = false
    },
    onChange (e) {
      const files = e.target.files
      this.fileToBeSent = files[0]
      this.createImage(files[0])
    },
    createImage (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.isUploading = true
        this.fileImage = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage () {
      this.isUploading = false
      this.fileImage = null
      this.fileToBeSent = null
      this.$refs.fileUpload.value = ''
    },

    // scroll chat feed to bottom onload
    scrollFeedToBottom () {
      const messageFeed = document.getElementById('chatBody')
      return messageFeed.scrollTo(0, messageFeed.scrollHeight)
    }
  }
}
</script>

<style lang="scss" scoped>
.dragEnter {
  @apply rounded-md absolute bg-gray-100 grid place-content-center;
  border: 5px dashed #E2E8F0;
  padding: 0.5em;
  inset: 0.5em;
}

// chat styles
#chatBody {
  .me,
  .you {
    @apply pb-4;
    div {
      @apply p-2 shadow-sm;
    }
  }
  .me {
    .msg {
      @apply bg-blue-500 text-white rounded-tl-2xl rounded-tr-2xl rounded-br-sm rounded-bl-2xl;
    }
  }
  .you {
    .msg {
      @apply bg-gray-100 text-gray-700 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm;
    }
  }
}
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.3s;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}
</style>
