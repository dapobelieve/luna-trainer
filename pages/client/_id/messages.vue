<template>
  <div class="messages">
    <MessagesChannelLoading v-if="channelIsLoading" />
    <MessagesInvitePending v-else-if="client === null" />
    <div v-else>
      two
    </div>
  </div>
</template>

<script>
export default {
  name: 'Messages',
  async asyncData ({ params, store, lunaToast }) {
    try {
      const res = await store.dispatch('client/getSingleClientById', params.id)
      return {
        client: res,
        channelIsLoading: false
      }
    } catch (error) {
      lunaToast.error('An error occured. Please reload page!')
    }
  },
  data () {
    return {
      channelIsLoading: true,
      client: null
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.messages {
  @apply bg-white w-full rounded-xl overflow-hidden;
  height: calc(100vh - 90px);
}
</style>
