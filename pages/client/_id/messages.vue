<template>
  <div class="messages">
    <ChatsV2 v-if="sendbirdId" :receipientId="sendbirdId" />
  </div>
</template>

<script>
import ChatsV2 from '../../../components/messages/Chats-v2.vue'
import {mapActions} from 'vuex'
export default {
  name: 'Messages',
  components: {
    ChatsV2
  },
  data(){
    return {
      sendbirdId: null
    }
  },
  methods: {
    ...mapActions('client', {
      getSingleClientById: 'getSingleClientById'
    })
  },
  async mounted(){
    const {sendbirdId} = await this.getSingleClientById(this.$route.params.id)
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
