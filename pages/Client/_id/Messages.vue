<template>
  <div
    v-if="isChannelLoading"
    class="tail-h-full tail-grid tail-place-content-center"
  >
    <div class="tail-flex tail-flex-col tail-items-center">
      <SingleLoader />
      <p class="tail-text-center">
        Starting Chat...
      </p>
    </div>
  </div>
  <div
    v-else-if="!clientIsReady"
    class="tail-h-full tail-grid tail-place-content-center"
  >
    <div class="tail-flex tail-items-center">
      <span class="tail-mr-2">You can only message clients who have accepted your invites</span>
      <img
        class="tail-text-center tail-inline-block"
        src="~/assets/img/svgs/paw.svg"
        alt=""
        srcset=""
      />
    </div>
  </div>
  <div
    v-else-if="errorCreatingChannel"
    class="tail-h-full tail-grid tail-place-content-center"
  >
    <div class="tail-flex tail-flex-col tail-items-center">
      <p class="tail-text-center">
        An error occured. Please try again.
      </p>
      <button
        class="base-button tail-text-sm tail-px-4"
        style="width: fit-content"
        type="button"
        @click="retry"
      >
        retry
      </button>
    </div>
  </div>
  <div
    v-else-if="!isUploading"
    class="tail-flex tail-flex-col tail-justify-between tail-h-full"
  >
    <ul id="chatBody" class="tail-h-full tail-w-full">
      <template v-if="messageHistory.length">
        <div v-for="msg in messageHistory" :key="msg.messageId">
          <li
            v-if="msg._sender.userId === sender"
            class="me tail-flex tail-justify-end tail-mb-3"
          >
            <span
              v-if="msg.messageType === 'file'"
              class="msg tail-overflow-hidden tail-border-4"
              style="border-color: rgba(86, 204, 242, 1);"
            >
              <img
                class="tail-bg-white"
                :src="msg.imaging || msg.url"
                style="max-width: 250px"
              />
            </span>
            <div v-else class="msg tail-p-2 tail-max-w-lg tail-break-all">
              {{ msg.message }}
            </div>
          </li>
          <li v-else class="you tail-flex tail-items-end tail-mb-3">
            <ClientAvatar
              firstname="get"
              lastname="welp"
              :height="2"
              :width="2"
            />
            <span
              v-if="msg.messageType === 'file'"
              class="msg tail-overflow-hidden tail-border-4"
              style="border-color: rgba(86, 204, 242, 1);"
            >
              <img
                class="tail-bg-white"
                :src="msg.url"
                style="max-width: 250px"
              />
            </span>
            <div v-else class="msg tail-p-2 tail-max-w-lg tail-break-all">
              {{ msg.message }}
            </div>
          </li>
        </div>
      </template>
      <template v-else>
        <div
          class="tail-h-full tail-grid tail-place-content-center tail-text-gray-500"
        >
          <div class="tail-flex tail-items-center">
            <span class="tail-mr-2">Start a conversation</span>
            <img
              class="tail-text-center tail-inline-block"
              src="~/assets/img/svgs/paw.svg"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </template>
    </ul>
    <!-- input area -->
    <div class="">
      <!-- loading notice -->
      <div
        v-if="uploadingFileToSb"
        class="tail-bg-black tail-text-white tail-px-4 tail-py-2 tail-z-50"
        style="width: fit-content"
      >
        {{ fileToBeSent.name }} file is uploading...
      </div>
      <form class="tail-w-full" @submit.prevent="sendChat">
        <div
          class="tail-border tail-flex align-items-center tail-bg-white tail-rounded-b-lg tail-shadow-sm tail-px-6 tail-py-3"
        >
          <input
            v-model="message"
            type="text"
            class="tail-w-full focus:tail-outline-none"
            placeholder="Type a message"
          />
          <div class="tail-relative">
            <transition name="fadeIn">
              <img
                v-if="showUpload"
                role="button"
                class="tail-text-2xl tail-text-center tail-inline-block tail-p-1 tail-absolute tail-z-50 tail--top-14 tail-right-2 tail-rounded-full"
                src="~/assets/img/svgs/image.svg"
                style="background: #56CCF2"
                @click="uploadPhoto"
              />
            </transition>
            <input
              ref="fileUpload"
              type="file"
              name="image"
              accept="image/*"
              class="tail-hidden"
              @change="onChange"
            />
            <button
              class="tail-mr-3"
              type="button"
              @click="showUpload = !showUpload"
            >
              <i class="ns-upload tail-text-2xl tail-text-gray-500"></i>
            </button>
          </div>
          <button class="" type="submit">
            <i class="ns-paper-plane tail-text-2xl tail-text-gray-500"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
  <div
    v-else
    class="tail-flex tail-flex-col tail-justify-between tail-bg-gray-50 tail-overflow-hidden"
  >
    <div class="tail-h-full tail-relative">
      <div
        class="tail-bg-green-200 tail-px-5 tail-py-3 tail-flex tail-items-center tail-justify-between"
      >
        <span class="tail-capitalize tail-font-semibold">
          preview
        </span>
        <button type="button" @click="removeImage">
          <i class="ns-cross tail-text-sm tail-text-black"></i>
        </button>
      </div>
      <button
        type="button"
        class="tail-absolute tail--bottom-4 tail-right-5"
        @click="sendFile"
      >
        <i
          class="ns-envelope tail-text-xl tail-text-black tail-bg-green-400 tail-p-4 tail-rounded-full"
        ></i>
      </button>
      <div
        class=" tail-grid tail-place-content-center"
        style="height: calc(100vh - 271px)"
      >
        <img
          :src="fileImage"
          class="tail-inline-block"
          style="max-width: 450px;"
        />
      </div>
    </div>
    <div
      class="tail-h-32 tail-grid tail-place-items-center tail-py-0"
      style="background: rgba(230, 246, 255, 1)"
    >
      <div class="tail-border-4 tail-relative" style="border-color: #56ccf2">
        <button
          type="button"
          class="tail-px-1.5 tail-bg-red-500 tail-rounded-full tail-absolute tail--right-3 tail--top-3"
          @click="removeImage"
        >
          <i class="ns-cross tail-text-xs tail-text-white"></i>
        </button>
        <img
          :src="fileImage"
          class="tail-inline-block tail-object-contain tail-h-20"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Messages',
  data () {
    return {
      isChannelLoading: true,
      uploadingFileToSb: false,
      isUploading: false,
      id: this.$route.params.id,
      errorCreatingChannel: false,
      message: '',
      showUpload: false,
      fileImage: null,
      fileToBeSent: null,
      messageHistory: [],
      messageSentStatus: false,
      messageDeliveryStatus: false,
      channel: null,
      clientIsReady: true
    }
  },
  computed: {
    ...mapState({
      connectedChannels: state => state.sendBird.connectedChannels
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
  mounted () {
    const channelHandler = new this.$sb.ChannelHandler()

    channelHandler.onMessageReceived = this.onMessageReceived
    // Add this channel event handler to the `SendBird` instance.
    this.$sb.addChannelHandler('msgHandler', channelHandler)
  },
  created () {
    try {
      this.getClientProfile(this.id).then(async (response) => {
        await response
        if (response.status === 'invited') {
          this.clientIsReady = false
        } else {
          this.checkChannel(response.sendbirdId).then((res) => {
            if (res === undefined) {
              this.createChannel(response.sendbirdId)
            } else if (res) {
              this.existingChannel(res)
            }
          })
        }
      })
    } catch (error) {
      console.log('error occured ', error)
    }
  },
  methods: {
    ...mapActions({
      getClientProfile: 'client/getSingleClient'
    }),
    ...mapActions('sendBird', {
      markAsRead: 'markMessageAsRead',
      addChannel: 'addNewChannel',
      newMessage: 'updateConnectedChannels',
      checkChannel: 'checkIfChannelExists'
    }),
    retry () {
      this.createChannel(this.receiver)
    },
    fetchMessageHistory (channel) {
      const listQuery = channel.createPreviousMessageListQuery()
      listQuery.includeMetaArray = true // Retrieve a list of messages along with their metaarrays.
      listQuery.includeReaction = true // Retrieve a list of messages along with their reactions.

      // Retrieving previous messages.
      listQuery.load((messages, error) => {
        if (error) {
          // Handle error.
          console.log('error retrieving chat', error)
        }
        if (messages) {
          this.messageHistory = messages
          this.$nextTick(() => {
            this.scrollFeedToBottom()
            this.markAsRead(channel)
          })
        }
      })
    },
    existingChannel (groupChannel) {
      this.channel = groupChannel
      this.fetchMessageHistory(groupChannel)
      this.isChannelLoading = false
    },
    createChannel (receiver) {
      // this.isChannelLoading = true
      const params = new this.$sb.GroupChannelParams()
      params.isPublic = false
      params.isEphemeral = false
      params.isDistinct = true
      params.isSuper = false
      params.addUserIds([receiver])
      params.operatorUserIds = [this.$auth.user.sendbirdId] // Or .operators(Array<User>)
      // params.name = NAME
      // params.channelUrl = UNIQUE_CHANNEL_URL // In a group channel, you can create a new channel by specifying its unique channel URL in a 'GroupChannelParams' object.
      // params.coverImage = FILE // Or .coverUrl = COVER_URL;
      // params.data = DATA
      // params.customType = CUSTOM_TYPE

      this.$sb.GroupChannel.createChannel(params, (groupChannel, error) => {
        if (error) {
          // Handle error.
          console.log('error creating channel', error)
          this.errorCreatingChannel = true
          this.isChannelLoading = false
        }
        if (groupChannel) {
          this.channel = groupChannel
          this.fetchMessageHistory(groupChannel)
          this.isChannelLoading = false
          if (
            Object.keys(this.connectedChannels).length === 0 &&
            this.connectedChannels.constructor === Object
          ) {
            this.addChannel({ channel: groupChannel, message: groupChannel })
          } else if (
            this.connectedChannels.size &&
            !this.connectedChannels.has(groupChannel.url)
          ) {
            this.newMessage({ channel: groupChannel, message: groupChannel })
          }
        }
      })
    },
    sendChat () {
      if (this.message) {
        const params = new this.$sb.UserMessageParams()

        params.message = this.message
        params.mentionType = 'users' // Either 'users' or 'channel'
        params.mentionedUserIds = [this.receiver]
        params.pushNotificationDeliveryOption = 'default' // Either 'default' or 'suppress'

        this.channel.sendUserMessage(params, (userMessage, error) => {
          if (error) {
            // Handle error.
            console.log('error sending messge', error)
          }
          this.messageHistory.push(userMessage)
          this.$nextTick(() => {
            this.scrollFeedToBottom()
          })
          this.message = ''
        })
      }
    },
    sendFile () {
      // Sending a file message with a raw file
      const params = new this.$sb.FileMessageParams()

      params.file = this.fileToBeSent // Or .fileUrl  = FILE_URL (You can also send a file message with a file URL.)
      params.fileName = this.fileToBeSent.name
      params.fileSize = this.fileToBeSent.size
      // params.thumbnailSizes = [{ maxWidth: 100, maxHeight: 100 }, { maxWidth: 200, maxHeight: 200 }] // Add the maximum sizes of thumbnail images (allowed number of thumbnail images: 3).
      // params.mimeType = MIME_TYPE
      // params.customType = CUSTOM_TYPE
      params.mentionType = 'users' // Either 'users' or 'channel'
      params.mentionedUserIds = [this.receiver] // Or mentionedUsers = Array<User>;
      params.pushNotificationDeliveryOption = 'default' // Either 'default' or 'suppress'

      this.isUploading = false
      this.$nextTick(() => {
        this.scrollFeedToBottom()
      })
      this.uploadingFileToSb = true
      this.channel.sendFileMessage(params, (fileMessage, error) => {
        if (error) {
          // Handle error.
          console.log('error uploading file', error)
          this.uploadingFileToSb = false
        }
        const messageId = fileMessage.messageId
        console.log('file id', fileMessage)
        if (messageId) {
          this.uploadingFileToSb = false
          this.messageHistory.push({
            messageId,
            imaging: this.fileImage,
            messageType: 'file',
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
        console.log(this.fileImage)
      }
      reader.readAsDataURL(file)
    },
    removeImage () {
      this.isUploading = false
      this.fileImage = null
    },
    scrollFeedToBottom () {
      const messageFeed = document.getElementById('chatBody')
      return messageFeed.scrollTo(0, messageFeed.scrollHeight)
    },
    onMessageReceived (channel, message) {
      console.log(
        'new message in the channel ',
        channel,
        ' the message ',
        message
      )
      if (
        this.$route.name === 'Client-id-Messages' &&
        channel.url === this.channel.url
      ) {
        console.log('logging in messages')
        this.messageHistory.push(message)
        this.$nextTick(() => {
          this.scrollFeedToBottom()
          this.markAsRead(channel)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// chat styles
#chatBody {
  overflow-y: auto;
  list-style: none;
  padding: 0.5em 1em;
  .me,
  .you {
    div {
      padding: 6px;
    }
  }
  .me {
    .msg {
      border-radius: 8px 8px 1px 8px;
      background-color: rgba(86, 204, 242, 1);
      color: #fff;
    }
  }
  .you {
    .msg {
      border-radius: 8px 8px 8px 1px;
      background-color: #f0f5fa;
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
