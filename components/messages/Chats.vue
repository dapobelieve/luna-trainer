<template>
  <PreviewImage
    v-if="isUploading"
    :file-image="fileImage"
    @removeImage="removeImage"
    @sendFile="sendFile()"
  />
  <div
    v-else
    class="flex flex-col justify-between h-full"
    @dragenter.prevent="dragging = true"
    @dragend.prevent="dragging = false"
    @dragover.prevent
    @drop.prevent="onDropImage($event)"
  >
    <!-- when dragEntered is true -->
    <div
      v-show="dragging"
      class="dragEnter"
      @dragleave.prevent="dragging = false"
    >
      Drop Image Here
    </div>
    <ul id="chatBody" class="h-full w-full p-4 overflow-y-auto list-none">
      <template v-if="Object.keys(msgHistory).length">
        <div v-for="(msgs, propertyName) in msgHistory" :key="msgs.index">
          <div class="text-center my-2 z-10 sticky top-0">
            <span class="bg-gray-500 p-1.5 text-xs text-white rounded">
              {{ formatGroupDateToDaysOfWeek(propertyName) }}
            </span>
          </div>
          <div v-for="msg in msgs" :key="msg.index">
            <li
              v-if="msg._sender.userId === sender"
              class="me flex justify-end pl-6"
            >
              <small class="self-end text-xs mr-1.5">
                <img
                  v-if="messageReadReceipt"
                  class="text-center inline-block h-3"
                  src="~/assets/img/svgs/checkmark-done-outline.svg"
                  alt
                  srcset
                />
                <img
                  v-else
                  class="text-center inline-block h-3"
                  src="~/assets/img/svgs/checkmark-outline.svg"
                  alt
                  srcset
                />
                <span class="">{{
                  new Date(msg.createdAt).toLocaleTimeString()
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
            <li v-else class="you flex items-end pr-6">
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
              <div v-else class="msg p-2 max-w-lg break-all">
                {{ msg.message }}
              </div>
              <small class="ml-2 text-xs">{{
                new Date(msg.createdAt).toLocaleTimeString()
              }}</small>
            </li>
          </div>
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
              emitValue($event)
              resize()
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
              class="button-text button-sm w-8 ml-2"
              type="button"
              @click="showUpload = !showUpload"
            >
              <i class="fi-rr-link text-blue-500"></i>
            </button>
          </div>
          <button
            class="button-fill flex items-center button-sm w-8 ml-2"
            type="submit"
            :class="{ 'opacity-50 cursor-default': message === '' }"
            :disabled="message === ''"
          >
            <i class="fi-rr-paper-plane h-4"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import sendBirdEvents from '../../mixins/sendBirdEvents'
import PreviewImage from '~/components/messages/PreviewImage.vue'

export default {
  name: 'Chats',
  components: {
    PreviewImage
  },
  mixins: [sendBirdEvents],
  props: {
    channel: {
      type: Object,
      required: true
    },
    channelUrl: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dragging: false,
      messageReadReceipt: false,
      uploadingFileToSb: false,
      message: '',
      showUpload: false,
      msgHistory: {},
      isUploading: false,
      fileImage: null,
      fileToBeSent: null
    }
  },
  computed: {
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
  mounted () {
    this.fetchMessageHistory()
  },
  methods: {
    ...mapActions('sendBird', {
      markMessagesAsRead: 'markMessageAsRead'
    }),
    // fetch message history
    fetchMessageHistory () {
      const listQuery = this.channel.createPreviousMessageListQuery()
      listQuery.limit = 100
      // Retrieving previous messages.
      listQuery.load((messages, error) => {
        if (error) {
          this.$lunaToast.error('Error fetching messages', error)
        }
        if (messages) {
          console.log('message history ', messages)
          this.msgHistory = messages.reduce((groupedDates, message) => {
            const date = new Date(message.createdAt).toDateString()
            if (!groupedDates[date]) {
              groupedDates[date] = []
            }
            groupedDates[date].push(message)
            return groupedDates
          }, {})
          this.isChannelLoading = false
          this.markMessagesAsRead(this.channel)
          this.$nextTick(() => {
            this.scrollFeedToBottom()
          })
        }
      })
    },
    formatGroupDateToDaysOfWeek (d) {
      const weekDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      const currentDate = new Date()
      const groupDate = new Date(d)
      const diff = (currentDate.getTime() - groupDate.getTime()) / (1000 * 3600 * 24)
      if (diff <= 6) {
        return weekDays[groupDate.getDay()]
      }
      return new Date(d).toDateString()
    },
    onDropImage (event) {
      const files = event.dataTransfer.files
      const fileType =
        event.dataTransfer.files[0].type.split('/')[0] === 'image'
      if (fileType) {
        this.fileToBeSent = files[0]
        this.createImage(files[0])
      } else {
        this.$lunaToast.error('File is not an image')
      }
      this.dragging = false
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

    uploadPhoto () {
      this.$refs.fileUpload.click()
      this.showUpload = false
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
      // this.$refs.fileUpload.value = ''
    },

    sendChat () {
      if (this.message) {
        console.log('treatment ', this.message)
        const params = new this.$sb.UserMessageParams()
        params.parentMessageId = parseInt(this.parentMessageId)
        params.message = this.message
        params.mentionType = 'users'
        params.pushNotificationDeliveryOption = 'default'
        this.channel.sendUserMessage(params, (userMessage, error) => {
          if (error) {
            // Handle error.
            this.$lunaToast.error('Message not sent: ', error)
            return
          }
          const createdDate = new Date(
            userMessage.createdAt
          ).toDateString()
          if (createdDate in this.msgHistory) {
            this.msgHistory[createdDate].push(userMessage)
          } else {
            console.log('here working ', [
              this.msgHistory[createdDate],
              userMessage
            ])
            this.msgHistory[createdDate] = userMessage
          }
          this.$nextTick(() => {
            this.scrollFeedToBottom()
          })
          this.message = ''
          this.parentMessageId = 0
        })
      }
    },

    sendFile () {
      // Sending a file message with a raw file
      const params = new this.$sb.FileMessageParams()
      params.parentMessageId = parseInt(this.parentMessageId)
      params.file = this.fileToBeSent
      params.fileName = this.fileToBeSent.name
      params.fileSize = this.fileToBeSent.size
      params.mentionType = 'users'
      params.mentionedUserIds = [this.receiver]
      params.pushNotificationDeliveryOption = 'default'
      this.isUploading = false
      this.uploadingFileToSb = true
      this.channel.sendFileMessage(params, (fileMessage, error) => {
        if (error) {
          // Handle error.
          this.$lunaToast.error('Error uploading image')
          console.log(error)
          this.uploadingFileToSb = false
        }
        const messageId = fileMessage.messageId
        if (messageId) {
          this.uploadingFileToSb = false
          const createdDate = new Date(
            fileMessage.createdAt
          ).toLocaleDateString()
          if (createdDate in this.msgHistory) {
            this.msgHistory[createdDate].push({
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
          } else {
            this.msgHistory[createdDate] = {
              messageId,
              imaging: this.fileImage,
              messageType: 'file',
              createdAt: fileMessage.createdAt,
              sendingStatus: fileMessage.sendingStatus,
              url: fileMessage.url,
              _sender: {
                userId: this.sender
              }
            }
          }
          this.fileImage = null
          this.fileToBeSent = null
          this.$nextTick(() => {
            this.scrollFeedToBottom()
          })
        }
      })
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
