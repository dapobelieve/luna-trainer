<template>
  <span class="messages flex items-end pr-6">
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
      v-if="msg.messageType === 'file' && msg.type.includes('image')"
      class="msg overflow-hidden border"
      @click="viewImage(msg)"
    >
      <img class="bg-white cursor-pointer imgSize" :src="msg.url" />
    </span>
    <span
      v-else-if="msg.messageType === 'file' && msg.type.includes('pdf')"
      class="msg overflow-hidden border relative"
    >
      <div class="bg-white imgSize border-4 border-blue-500">
        <span class="flex justify-center text-blue-500 text-lg"> {{msg.name}} </span>
        <div class="absolute inset-0 grid place-content-center">
          <i class="fi fi-rr-document"></i>
        </div>
        <div class="absolute inset-0 grid place-content-end right-4 bottom-4 cursor-pointer">
          <i class="fi fi-rr-download" @click.prevent="downloadItem(msg.url)"></i>
        </div>
      </div>
    </span>
    <span
      v-else-if="msg.messageType === 'file' && msg.type.includes('video')"
      class="msg overflow-hidden border"
    >
      <video width="290" height="200" controls>
        <source :src="msg.url" type="video/mp4">
      </video>
    </span>
    <div v-else class="msg p-2 max-w-lg whitespace-pre-line break-words">{{ msg.message.trim() }}</div>
    <small class="ml-2 text-xs">{{
      new Date(msg.createdAt).toLocaleTimeString().substring(0, 5)
    }}</small>
  </span>
</template>

<script>
export default {
  name: 'OpponentMessages',
  props: {
    msg: {
      type: Object,
      required: true
    }
  },
  methods: {
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
.messages {
  @apply pb-4;
  div {
    @apply p-2 shadow-sm;
  }

  .msg {
    @apply bg-gray-100 text-gray-700 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm;
  }
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
.imgSize {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
