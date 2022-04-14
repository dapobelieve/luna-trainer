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
      :src="msg.fileBinary || msg.url"
    />
  </span>
  <span
    v-else-if="msg.messageType === 'file' && msg.sendingStatus === 'succeeded'"
    class="msg overflow-hidden relative"
    @click="viewImage(msg)"
  >
    <img class="bg-white cursor-pointer imgSize" :src="msg.image || msg.url" />
  </span>
</template>

<script>
import ViewChatImage from "./ViewChatImage.vue";
export default {
  name: "SenderFileMessage",
  components: {
    ViewChatImage,
  },
  props: {
    msg: {
      type: Object,
      required: true,
    },
  },
  methods: {
    viewImage(msg) {
      this.$modal.show(
        ViewChatImage,
        {
          imageDetails: {
            url: msg.url,
            nickname: msg._sender.nickname,
            profileImg: msg._sender.plainProfileUrl,
            dateTime: msg.createdAt,
          },
        },
        {
          height: "100%",
          width: "100%",
        }
      );
    },
  },
};
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
