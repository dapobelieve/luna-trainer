<template>
  <span class="messages flex justify-end pl-6">
    <small class="self-end text-xs mr-1.5">
      <!-- <img
                  v-if="msg.sendingStatus === 'succeeded'"
                  class="text-center inline-block h-3"
                  src="~/assets/img/svgs/checkmark-done-outline.svg"
                  alt
                  srcset
                /> -->
      <i
        v-if="msg.sendingStatus === 'succeeded'"
        class="fi-rr-check text-xs h-1"
      ></i>
      <i v-else class="fi-rr-clock text-xs h-1"></i>
      <span class="">{{
        new Date(msg.createdAt).toLocaleTimeString().substring(0, 5)
      }}</span>
    </small>
    <MyFileMessage v-if="msg.messageType === 'file'" :msg="msg" />
    <div v-else class="msg p-2 max-w-lg break-all" style="calc(100% - 2.5rem)">
      {{ msg.message }}
    </div>
  </span>
</template>

<script>
import MyFileMessage from '~/components/messages/MyFileMessage.vue'
export default {
  name: 'MyMessages',
  components: {
    MyFileMessage
  },
  props: {
    msg: {
      type: Object,
      required: true
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
    @apply bg-blue-500 text-white rounded-tl-2xl rounded-tr-2xl rounded-br-sm rounded-bl-2xl;
  }
}
</style>
