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
      v-if="msg.messageType === 'file'"
      class="msg overflow-hidden border"
      @click="viewImage(msg)"
    >
      <img class="bg-white cursor-pointer imgSize" :src="msg.url" />
    </span>
    <div v-else class="msg p-2 max-w-lg break-all">
      {{ msg.message }}
    </div>
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
.imgSize {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
