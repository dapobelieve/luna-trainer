<template>
  <div
    v-if="!fileImage"
    class="tail-flex tail-flex-col tail-justify-between tail-h-full"
  >
    <ul id="chatBody" class="tail-h-full tail-w-full">
      <div v-for="msg in messageHistory" :key="msg.index">
        <li v-if="msg.message.includes('from uche') || msg.type === 'file'" class="me tail-flex tail-justify-end tail-mb-3">
          <span v-if="msg.type === 'file'" class="msg tail-overflow-hidden tail-border-4" style="border-color: rgba(86, 204, 242, 1);">
            <img class="tail-bg-white" :src="msg.message" style="max-width: 250px">
          </span>
          <div v-else class="msg tail-p-2 tail-max-w-lg tail-break-all">
            {{ msg.message.replace('from uche', '') }}
          </div>
        </li>
        <li v-else class="you tail-flex tail-items-end tail-mb-3">
          <ClientAvatar
            firstname="get"
            lastname="welp"
            :height="2"
            :width="2"
          />
          <div class="msg tail-p-2 tail-max-w-lg tail-ml-2 tail-break-all">
            {{ msg.message }}
          </div>
        </li>
      </div>
    </ul>
    <!-- input area -->
    <div class="tail-w-full">
      <form @submit.prevent="sendChat">
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
        <img :src="fileImage" class="tail-inline-block" style="max-width: 450px;" />
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
export default {
  name: 'Messages',
  data () {
    return {
      message: '',
      showUpload: false,
      fileImage: null,
      messageHistory: [],
      messageSentStatus: false,
      messageDeliveryStatus: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scrollFeedToBottom()
    })
  },
  methods: {
    sendChat () {
      if (this.message) {
        this.messageHistory.push({
          type: 'text',
          message: this.message
        })
        this.$nextTick(() => {
          this.scrollFeedToBottom()
        })
        this.message = ''
      }
    },
    sendFile () {
      this.messageHistory.push({
        type: 'file',
        message: this.fileImage
      })
      this.fileImage = null
      this.$nextTick(() => {
        this.scrollFeedToBottom()
      })
    },
    uploadPhoto () {
      this.$refs.fileUpload.click()
      this.showUpload = false
    },
    onChange (e) {
      const files = e.target.files
      this.createImage(files[0])
    },
    createImage (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.fileImage = e.target.result
        console.log(this.fileImage)
      }
      reader.readAsDataURL(file)
    },
    removeImage () {
      this.fileImage = null
    },
    scrollFeedToBottom () {
      const messageFeed = document.getElementById('chatBody')
      return messageFeed.scrollTo(0, messageFeed.scrollHeight)
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
