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
            >
              <SenderMessages :msg="msg" />
            </li>
            <li v-else>
              <OpponentMessage :msg="msg" />
            </li>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="h-full grid place-content-center text-gray-500">
          <div class="flex items-center">
            <span class="mr-2">Start a conversation</span>
            <i class="fi-rr-paw font-bold h-5"></i>
          </div>
        </div>
      </template>
    </ul>
    <div class>
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
import OpponentMessage from '~/components/messages/OpponentMessage.vue'
import SenderMessages from '~/components/messages/SenderMessages.vue'

export default {
  name: 'Chats',
  components: {
    PreviewImage,
    OpponentMessage,
    SenderMessages
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
    fetchMessageHistory () {
      const listQuery = this.channel.createPreviousMessageListQuery()
      listQuery.limit = 100
      listQuery.load((messages, error) => {
        if (error) {
          this.$lunaToast.error('Error fetching messages', error)
        }
        if (messages) {
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
    },

    sendChat () {
      if (this.message) {
        const params = new this.$sb.UserMessageParams()
        params.parentMessageId = parseInt(this.parentMessageId)
        params.data = (Date.now() + Math.random()).toString(36)
        params.message = this.message
        params.mentionType = 'users'
        params.pushNotificationDeliveryOption = 'default'

        const createdMessageDate = new Date().toDateString()
        const baseMessage = {
          ...params,
          message: this.message,
          messageType: 'user',
          sendingStatus: 'pending',
          createdAt: new Date(),
          _sender: {
            userId: this.sender
          }
        }
        if (createdMessageDate in this.msgHistory) {
          this.msgHistory[createdMessageDate].push(baseMessage)
        } else {
          this.msgHistory[createdMessageDate] = [baseMessage]
        }

        this.$nextTick(() => {
          this.scrollFeedToBottom()
        })
        this.message = ''
        // hitting sendbird server with message
        this.channel.sendUserMessage(params, (userMessage, error) => {
          if (error) {
            this.$lunaToast.error('Message not sent')
          }
        })
      }
    },

    sendFile () {
      // Sending a file message with a raw file
      const params = new this.$sb.FileMessageParams()
      params.parentMessageId = parseInt(this.parentMessageId)
      params.data = (Date.now() + Math.random()).toString(36)
      params.file = this.fileToBeSent
      params.fileName = this.fileToBeSent.name
      params.fileSize = this.fileToBeSent.size
      params.mentionType = 'users'
      params.pushNotificationDeliveryOption = 'default'
      this.isUploading = false
      const createdMessageDate = new Date().toDateString()
      const baseMessage = {
        imaging: this.fileImage,
        messageType: 'file',
        createdAt: new Date(),
        sendingStatus: 'pending',
        _sender: {
          userId: this.sender
        }
      }

      if (createdMessageDate in this.msgHistory) {
        this.msgHistory[createdMessageDate].push(baseMessage)
      } else {
        this.msgHistory[createdMessageDate] = [baseMessage]
      }
      this.fileImage = null
      this.fileToBeSent = null
      this.$nextTick(() => {
        this.scrollFeedToBottom()
      })

      this.channel.sendFileMessage(params, (fileMessage, error) => {
        if (error) {
          this.$lunaToast.error('Error uploading image')
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
  .imgSize {
    width: 200px;
    height: 200px;
    object-fit: cover;
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
