<template>
  <span
    v-if="msg.messageType === 'file' && msg.sendingStatus === 'pending'"
    class="msg overflow-hidden relative"
  >
    <div
      v-show="msg.sendingStatus === 'pending'"
      class="bg-gray-200 absolute inset-0 grid place-content-center"
    >
      <SingleLoader />
    </div>
    <img
      class="bg-white cursor-not-allowed imgSize opacity-20"
      :src="msg.imaging || msg.url"
    />
  </span>
  <span
    v-else-if="msg.messageType === 'file' && msg.sendingStatus === 'succeeded'"
    class="msg overflow-hidden relative"
    @click="viewImage(msg)"
  >
    <img
      class="bg-white cursor-pointer imgSize"
      :src="msg.imaging || msg.url"
    />
  </span>
</template>

<script>
export default {
  name: 'SenderFileMessage',
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
</style>
