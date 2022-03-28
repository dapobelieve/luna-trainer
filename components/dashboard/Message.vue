<template>
  <nuxt-link :to="{ name: 'client-id-messages', params: { id: userId } }" :class="{ 'unread' : Boolean(value.unreadMessageCount) }" class="rounded-md py-4 px-3 flex items-center space-x-0 w-full hover:bg-red-400">
    <div class="flex-shrink-0 h-12 w-12 mr-4">
      <ClientAvatar
        :client-info="{
          firstName: opponentUserName()
        }"
      />
    </div>
    <div class="flex-grow min-w-0">
      <div class="focus:outline-none">
        <span class="absolute inset-0" aria-hidden="true"></span>
        <p
          class="text-base text-gray-700"
        >
          <span class="font-bold text-base capitalize">{{
            opponentUserName()
          }}</span>
        </p><p v-if="value.lastMessage.messageType === 'user'" class="truncate text-sm w-48 xl:w-80 normal-case" :class="[Boolean(value.unreadMessageCount) ? 'font-medium' : 'font-normal']">
          {{ value.lastMessage.message }}
        </p>
        <p v-else-if="value.lastMessage.messageType === 'file'" class="flex items-center">
          <img src="~/assets/img/image-outline.svg" class="w-5 h-5" alt="" srcset="">
          <span class="ml-1 font-medium text-sm">Photo</span>
        </p>
        <p class="text-sm" :class="[Boolean(value.unreadMessageCount) ? 'font-medium text-blue-500' : 'text-gray-500 font-normal']">
          {{ value.lastMessage.createdAt | howLongAgo }}
        </p>
        </p>
      </div>
    </div>
    <span class="text-xs text-gray-500 truncate">
      <p v-if="Boolean(value.unreadMessageCount)" class="bg-blue-700 p-1 rounded-full"></p>
      <i v-else class="fi-rr-angle-right text-blue-500"></i>
    </span>
  </nuxt-link>
</template>

<script>
export default {
  name: 'Message',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    userId () {
      const { userId } = this.opponentUser(this.value)
      return userId
    }
  },
  methods: {
    opponentUser () {
      return this.value.members.find(u => u.userId !== this.$auth.user.sendbirdId)
    },
    opponentUserName () {
      return this.opponentUser(this.value).nickname
    }
    // goto () {
    //   const { userId } = this.opponentUser(this.value)
    //   return userId
    // }
  }
}
</script>

<style lang="scss" scoped>

</style>
