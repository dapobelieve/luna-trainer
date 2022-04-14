<template>
  <span class="messages flex justify-end pl-6">
    <small class="self-end text-xs mr-1.5">
      <i
        :class="[msg.sendingStatus === 'succeeded' ? 'fi-rr-check text-green-500' : 'fi-rr-time-oclock text-gaey-500']" 
        class="text-xs bold h-1"
      ></i>
      <span class="">{{
        new Date(msg.createdAt).toLocaleTimeString().substring(0, 5)
      }}</span>
    </small>

    <SenderFileMessage v-if="msg.messageType === 'file'" :msg="msg" />
    <div v-else class="msg p-2 max-w-lg break-all" style="calc(100% - 2.5rem)">
      {{ msg.message }}
    </div>   
  </span>
</template>

<script>
import SenderFileMessage from '~/components/messages/SenderFileMessage.vue'
export default {
  name: 'SenderMessages',
  components: {
    SenderFileMessage
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
