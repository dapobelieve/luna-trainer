<template>
  <div
    class="flex flex-col justify-between w-full h-full"
    @dragenter.prevent="dragging = true"
    @dragend.prevent="dragging = false"
    @drop.prevent="onDropImage($event)"
  >
    <div
      v-show="dragging"
      class="dragEnter"
      @dragleave.prevent="dragging = false"
    >
      Drop Image Here
    </div>
    <ul id="chatBody" class="h-full w-full p-4 overflow-y-auto list-none" @scroll="chatBodyScroll">
      <template v-if="isLoading">
        <div class="flex items-center w-full mt-4 justify-center">
          <SingleLoader class=""></SingleLoader>
        </div>
      </template>
      <template v-else-if="Object.keys(groupedMessages).length">
        <div v-if="loadingMore" class="flex items-center w-full justify-center">
          <SingleLoader></SingleLoader>
        </div>
        <div
          v-for="(messages, groupId) in groupedMessages"
          :key="messages.index"
        >
          <div class="text-center my-2 z-10 sticky top-0">
            <span class="bg-gray-500 p-1.5 text-xs text-white rounded">
              {{ dateToDaysOfWeek(groupId) }}
            </span>
          </div>
          <div v-for="message in messages" :key="message.index">
            <li v-if="message._sender.userId === senderId">
              <SenderMessages :msg="message" />
            </li>
            <li v-else>
              <OpponentMessage :msg="message" />
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
      <form class="w-full" @submit.prevent="sendTextMessage">
        <div
          class="
            border-t
            flex
            items-end
            justify-center
            bg-white
            rounded-b-xl
            shadow-sm
            px-4
            py-2
          "
        >
          <textarea
            ref="chatTextArea"
            v-model="message"
            type="text"
            rows="1"
            style="white-space: pre-wrap"
            class="w-full focus:outline-none text-sm py-2 max-h-40 min-h-10 box-border resize-none"
            placeholder="Type a message, press enter to send or shift + enter for new line"
            @keydown.enter.exact.prevent="sendTextMessage"
          />
          <div class="relative">
            <transition name="fadeIn">
              <img
                v-if="showUpload"
                alt="Upload Image"
                role="button"
                class="
                  text-2xl text-center
                  inline-block
                  p-2
                  shadow-2xl
                  shadow-cyan-500
                  absolute
                  bg-blue-500
                  z-50
                  -top-14
                  right-0
                  rounded-full
                "
                src="~/assets/img/svgs/image.svg"
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
import { mapActions, mapGetters, mapMutations } from 'vuex'
import PreviewImage from '~/components/messages/PreviewImage.vue'
import OpponentMessage from '~/components/messages/OpponentMessage.vue'
import SenderMessages from '~/components/messages/SenderMessages.vue'

export default {
  name: 'ChatsV2',
  components: {
    OpponentMessage,
    SenderMessages
  },
  props: {
    receipientId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dragging: false,
      message: '',
      showUpload: false,
      uploadFile: null,
      uploadFileImage: null,
      channel: {},
      collection: null,
      loadingMore: false,
      loading: false
    }
  },

  computed: {
    ...mapGetters({
      connected: 'sendbird-v2/isConnected',
      messages: 'sendbird-v2/getMessages'
    }),
    senderId () {
      return this.$auth.user.sendbirdId
    },
    isLoading () {
      return this.loading && (!this.messages[this.receipientId] || this.messages[this.receipientId].length === 0)
    },
    groupedMessages () {
      const groupedMessages = {}
      if (this.channel) {
        const messages = this.messages[this.receipientId]
        if (messages) {
          messages.forEach((message) => {
            const createdDate = new Date(message.createdAt).toDateString()
            if (!groupedMessages[createdDate]) {
              groupedMessages[createdDate] = []
            }
            groupedMessages[createdDate].push(message)
          })
        }
        this.channel.markAsRead && this.channel.markAsRead()
      }
      return groupedMessages
    }
  },
  watch: {
    async connected () {
      await this.initializeChat()
    },
    message () {
      this.recomputeTextareaHeight()
    }
  },
  async beforeMount () {
    await this.initializeChat()
    this.scrollFeedToBottom()
  },
  methods: {
    ...mapMutations({
      swapMessage: 'sendbird-v2/swapMessage'
    }),
    ...mapActions({
      getChannel: 'sendbird-v2/getChannel',
      getMessages: 'sendbird-v2/getMessages',
      getPrevMessages: 'sendbird-v2/getPrevMessages',
      sendMessage: 'sendbird-v2/sendMessage',
      createChannelIfNoneExists: 'sendbird-v2/createChannelIfNoneExists'
    }),
    async initializeChat () {
      this.loading = true
      if (this.connected) {
        this.channel = await this.getChannel({
          receipient: this.receipientId,
          sender: this.senderId
        })
        if (this.channel) {
          this.collection = await this.getMessages(this.channel)
          this.collection.onCacheResult((err, messages) => {
            console.log('Messages from Cache: ', messages)
            if (!err) {
              messages && messages.forEach((newMessage) => {
                this.swapMessage({ id: this.receipientId, newMessage })
              })
              this.scrollFeedToBottom()
              this.loading = false
            } else {
              console.err(err)
            }
          })
            .onApiResult((err, messages) => {
              console.log('Messages from API: ', messages)
              if (!err) {
                messages && messages.forEach((newMessage) => {
                  this.swapMessage({ id: this.receipientId, newMessage })
                })
                this.scrollFeedToBottom()
              } else {
                console.err(err)
              }
            })
        } else {
          this.loading = false
        }
      }
    },
    async chatBodyScroll (event) {
      if (this.collection && event.target.scrollTop < 5 && this.channel && !this.loadingMore) {
        this.loadingMore = true
        await this.getPrevMessages(this.collection)
        this.loadingMore = false
      }
    },
    dateToDaysOfWeek (d) {
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
      const diff =
        (currentDate.getTime() - groupDate.getTime()) / (1000 * 3600 * 24)
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
        this.uploadFile = files[0]
        this.showImagePreview()
      } else {
        this.$lunaToast.error('File is not an image')
      }
      this.dragging = false
    },
    onChange (e) {
      this.uploadFile = e.target.files[0]
      this.showImagePreview()
    },
    uploadPhoto () {
      this.$refs.fileUpload.click()
      this.showUpload = false
    },
    showImagePreview () {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.uploadFileImage = e.target.result
        this.$modal.show(
          PreviewImage,
          {
            fileImage: this.uploadFileImage,
            sendFile: this.sendFileMessage,
            removeImage: this.removeImage
          },
          { adaptive: true, height: '100%', width: '100%' }
        )
      }
      reader.readAsDataURL(this.uploadFile)
    },
    removeImage () {
      this.uploadFile = null
      this.uploadFileImage = null
    },
    async sendTextMessage () {
      if (this.message.match(/\S/)) {
        this.channel =
          this.channel ||
          (await this.createChannelIfNoneExists({
            sender: this.senderId,
            receipient: this.receipientId
          }))
        console.log(this.channel)
        this.sendMessage({ message: this.message, channel: this.channel })
        this.message = ''
        this.scrollFeedToBottom()
      }
    },
    async sendFileMessage () {
      if (this.uploadFile) {
        this.channel =
          this.channel ||
          (await this.createChannelIfNoneExists({
            sender: this.senderId,
            receipient: this.receipientId
          }))
        await this.sendMessage({
          message: this.uploadFile,
          meta: this.uploadFileImage,
          channel: this.channel
        })
        this.removeImage()
        this.scrollFeedToBottom()
      }
    },
    scrollFeedToBottom () {
      this.$nextTick(() => {
        const messageFeed = document.getElementById('chatBody')
        return messageFeed && messageFeed.scrollTo(0, messageFeed.scrollHeight)
      })
    },
    recomputeTextareaHeight () {
      this.$nextTick(() => {
        const textarea = this.$refs.chatTextArea
        if (textarea) {
          textarea.style.height = 'auto'
          textarea.style.height = textarea.scrollHeight + 'px'
        }
      })
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
