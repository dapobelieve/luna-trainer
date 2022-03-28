<template>
  <div
    class="rounded-xl border bg-white flex flex-col min-h-0 md:h-[23rem] overflow-y-auto"
  >
    <div class="w-full h-full mb-auto">
      <!-- header -->
      <div class="w-full flex items-center p-4 sticky top-0 z-20 bg-white">
        <div class="mr-auto flex items-center space-x-4">
          <i
            class="fi-rr-comment-alt bg-indigo-50 p-1 rounded-full text-indigo-500 text-lg h-12 w-12 flex items-center justify-center flex-shrink-0"
          ></i>
          <h4 class="capitalize text-md lg:text-lg font-medium">
            messages
          </h4>
        </div>
        <div v-if="unreadMessages.length" class="text-gray-500 text-xs lg:text-sm text-right">
          {{ unreadMessages.length }} new message{{
            unreadMessages.length > 1 ? "s" : ""
          }}
        </div>
      </div>

      <div>
        <ul v-if="unreadMessages.length" role="list" class="relative z-0 px-1">
          <li v-for="value in listOfChannels" :key="value.url">
            <nuxt-link :to="{ name: 'client-id-messages', params: { id: userId(value) } }" :class="{ 'unread' : Boolean(value.unreadMessageCount) }" class="rounded-md py-4 px-3 flex items-center space-x-0 w-full">
              <div class="flex-shrink-0 h-12 w-12 mr-4">
                <ClientAvatar
                  :client-info="{
                    firstName: opponentUserName(value)
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
                      opponentUserName(value)
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
          </li>
        </ul>
        <div v-else class="text-center pt-12 pb-12 px-4 text-gray-500 text-sm">
          <img src="~/assets/img/svgs/messagesIcon.svg" alt="messages icon" class="inline-block text-center mb-4">
          <p class="text-gray-700 text-lg font-normal mb-1">
            You have no new messages
          </p>
          <p class="text-sm text-gray-500 font-normal">
            Your messages would be displayed here.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDistance } from 'date-fns'
import { mapGetters } from 'vuex'
export default {
  name: 'DashboardMessages',
  data () {
    return {
      formatDistance
    }
  },
  computed: {
    ...mapGetters({
      unreadMessages: 'sendBird/getUnreadMessages',
      listOfChannels: 'sendBird/listOfChannels',
      acceptedClients: 'client/acceptedClients'
    })
  },
  methods: {
    opponentUser (userObj) {
      return userObj.members.find(u => u.userId !== this.$auth.user.sendbirdId)
    },
    opponentUserName (userObj) {
      return userObj.members.find(u => u.userId !== this.$auth.user.sendbirdId).nickname
    },
    userId (userObj) {
      const { userId } = this.opponentUser(userObj)
      return userId
    }
  }
}
</script>

<style lang="scss" scoped>
.unread {
  background-color: #F8FAFC;
}
</style>
