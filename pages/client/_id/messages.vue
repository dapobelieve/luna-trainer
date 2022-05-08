<template>
  <div class="messages">
    <ChatsV2 v-if="sendbirdId" :receipient-id="sendbirdId" />
    <div class="flex flex-col items-center h-full mt-20" v-else>
      <i class="fi-rr-comment-alt text-3xl text-red-500"></i>
      <h3 class="text-gray-700 text-lg">
        Client has not accepted your request
      </h3>
      <small
        class="text-base text-gray-500"
      >You'll be able to send them a message when they accept the request</small>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ChatsV2 from '../../../components/messages/Chats-v2.vue'
export default {
  name: 'Messages',
  components: {
    ChatsV2
  },
  data () {
    return {
      sendbirdId: null
    }
  },
  methods: {
    ...mapActions('client', {
      getSingleClientById: 'getSingleClientById'
    })
  },
  async mounted () {
    const { sendbirdId } = await this.getSingleClientById(this.$route.params.id)
    this.sendbirdId = sendbirdId
  }
}
</script>

<style lang="scss" scoped>
.messages {
  @apply bg-white w-full rounded-xl overflow-hidden;
  height: calc(100vh - 90px);
}
</style>
