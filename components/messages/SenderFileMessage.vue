<template>
  <span
    v-if="msg.messageType === 'file' && msg.sendingStatus === 'pending'"
    class="msg overflow-hidden relative"
  >
    <div
      v-show="msg.sendingStatus === 'pending' && !msg.type.includes('video')"
      class="bg-gray-200 absolute inset-0 grid place-content-center"
    >
      <SingleLoader />
    </div>
    <div class="absolute inset-0 grid place-content-center" v-show="msg.type.includes('video')">
      <ProgressBar></ProgressBar>
    </div>
    <embed
      class="bg-white imgSize opacity-20"
      :src="msg.fileBinary || msg.url"
    />
  </span>
  <span
    v-else-if="msg.messageType === 'file' && msg.sendingStatus === 'succeeded' && msg.url && msg.url.includes('pdf')"
    class="msg overflow-hidden relative"
  >
    <div class="bg-white imgSize border-4 border-blue-500">
      <span class="flex justify-center text-blue-500 text-lg pt-2"> {{msg.name}} </span>
      <div class="absolute inset-0 grid place-content-center">
        <i class="fi fi-rr-document"></i>
      </div>
      <div class="absolute inset-0 grid place-content-end right-4 bottom-4 cursor-pointer">
        <i class="fi fi-rr-download" @click.prevent="downloadItem(msg.url)"></i>
      </div>
    </div>
  </span>
  <span
    v-else
    class="msg overflow-hidden relative cursor-pointer"
    @click="viewImage(msg)"
  >
    <img v-if="msg.type.includes('image')" class="bg-white imgSize pointer-events-none" :src="msg.image || msg.url" />
    <video v-else width="290" height="200" controls>
      <source :src="msg.url" type="video/mp4">
    </video>
  </span>
</template>

<script>
import ProgressBar from '../ProgressBar.vue'
import ViewChatImage from './ViewChatImage.vue'
export default {
  name: 'SenderFileMessage',
  Components: {
    ViewChatImage,
    ProgressBar
  },
  props: {
    msg: {
      type: Object,
      required: true
    }
  },
  methods: {
    viewImage (msg) {
      this.$modal.show(
        ViewChatImage,
        {
          imageDetails: {
            url: msg.url,
            nickname: msg._sender.nickname,
            profileImg: msg._sender.plainProfileUrl,
            dateTime: msg.createdAt
          }
        },
        {
          height: '100%',
          width: '100%'
        }
      )
    },
    downloadItem ({ url, label }) {
      this.$axios.get(url, { responseType: 'blob' })
        .then((response) => {
          const blob = new Blob([response.data], { type: 'application/pdf' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = label
          link.click()
          URL.revokeObjectURL(link.href)
        }).catch(console.error)
    }
  }
}
</script>

<style lang="scss" scoped>
.imgSize {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.msg {
  @apply bg-gray-100 text-gray-700 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm;
}

.fi:before {
  @apply text-blue-500
}
.fi-rr-document:before {
  @apply text-6xl
}

.fi-rr-download:before {
  @apply text-xl
}
</style>
