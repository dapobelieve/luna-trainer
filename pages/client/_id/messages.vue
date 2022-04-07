<template>
  <div class="messages">
    <MessagesChannelLoading v-if="channelIsLoading" />
    <ErrorCreatingChannel v-else-if="ErrorCreatingChannel" />
    <Chats v-else :channel="channel" :channel-url="channelUrl" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ErrorCreatingChannel from '~/components/messages/ErrorCreatingChannel.vue'
import Chats from '~/components/messages/Chats.vue'

export default {
  name: 'Messages',
  components: {
    ErrorCreatingChannel,
    Chats
  },
  async asyncData ({ params, store }) {
    try {
      const res = await store
        .dispatch('client/getSingleClientById', params.id)
      return { sendbirdId: res.sendbirdId }
    } catch (error) {
      console.log('error fetching client profile ', error)
    }
  },
  data () {
    return {
      channelIsLoading: true,
      ErrorCreatingChannel: false,
      channelUrl: null,
      channel: null,
      sendbirdId: null
    }
  },
  computed: {
    ...mapState('sendBird', ['sendbirdConnected', 'fetchingMessages'])
  },
  mounted () {
    try {
      this.$watch(
        vm => [vm.sendbirdConnected, vm.fetchingMessages],
        async (val) => {
          if (val[0] && !val[1]) {
            let channel = await this.checkIfConversationExits(
              this.sendbirdId
            )
            if (!channel) {
              channel = await this.createPrivateChannel(
                this.sendbirdId
              )
            }
            this.channelUrl = channel.url
            this.channel = channel
            this.channelIsLoading = false
          }
        },
        {
          immediate: true
        }
      )
    } catch (error) {
      console.log('something went wrong')
    }
  },

  methods: {
    ...mapActions('sendBird', {
      checkIfConversationExits: 'checkIfConversationExits',
      createPrivateChannel: 'createPrivateChannel'
    })
  }
}
</script>

<style lang="scss" scoped>
.messages {
  @apply bg-white w-full rounded-xl overflow-hidden;
  height: calc(100vh - 90px);
}
</style>
