<template>
  <DashboardCard class="pt-4">
    <div class="flex items-center px-4">
      <div class="inline-flex items-center">
        <div
          class="h-12 mr-2 w-12 bg-sky-50 rounded-full inline-flex justify-center items-center"
        >
          <i class="fi-rr-comment-alt text-xl text-sky-500 mt-1"></i>
        </div>
        <h3 class="text-black text-xl">
          Messages
        </h3>
      </div>
      <div class="ml-auto">
        <span class="text-gray-500">
          {{ unreadMessages.length }} new message{{
            unreadMessages.length > 1 ? 's' : ''
          }}
        </span>
      </div>
    </div>
    <div class="h-full overflow-y-auto">
      <template v-if="fetchingMessages">
        <div class="h-full grid place-content-center">
          <SingleLoader />
        </div>
      </template>
      <ul
        v-else-if="unreadMessages.length"
        role="list"
        class="relative z-0 px-1"
      >
        <li v-for="value in unreadMessages.slice(0, 3)" :key="value.url">
          <nuxt-link
            :to="{ name: 'client-id-messages', params: { id: userId(value) } }"
            class="rounded-md py-4 px-3 flex items-center space-x-0 w-full hover:bg-gray-100 unread"
          >
            <span class="w-full flex items-center">
              <div class="flex-shrink-0 h-12 w-12 mr-4">
                <ClientAvatar
                  :client-info="{
                    firstName: opponentUserName(value),
                  }"
                />
              </div>
              <div class="flex-grow min-w-0 text-left">
                <div class="focus:outline-none">
                  <span
                    class="font-bold text-base capitalize text-gray-700"
                  >{{ opponentUserName(value) }}</span>
                  <p
                    v-if="value.lastMessage.messageType === 'user'"
                    class="truncate text-sm w-48 xl:w-80 normal-case font-medium"
                  >
                    {{ value.lastMessage.message }}
                  </p>
                  <p
                    v-else-if="value.lastMessage.messageType === 'file'"
                    class="flex items-center"
                  >
                    <img
                      src="~/assets/img/image-outline.svg"
                      class="w-5 h-5"
                      alt=""
                      srcset=""
                    />
                    <span class="ml-1 font-medium text-sm">Photo</span>
                  </p>
                  <p
                    class="text-sm font-medium text-blue-500"
                  >
                    {{ value.lastMessage.createdAt | howLongAgo }}
                  </p>
                </div>
              </div>
            </span>
            <span class="text-xs text-gray-500 truncate">
              <p
                class="bg-blue-700 p-1 rounded-full"
              ></p>
            </span>
          </nuxt-link>
        </li>
      </ul>
      <div v-else class="flex items-center h-full justify-center">
        <div class="flex flex-col items-center">
          <i class="fi-rr-comment-alt text-5xl text-sky-500"></i>
          <h3 class="text-gray-700 text-lg">
            You have no new messages
          </h3>
          <small
            class="text-base text-gray-500"
          >New messages would be displayed here.</small>
        </div>
      </div>
      <div v-if="unreadMessages.length > 2">
        <button
          type="button"
          class="text-blue-500 h-10 w-full hover:bg-blue-50 p-1 rounded-md"
          @click="$router.push({ name: 'messages' })"
        >
          <span>
            View all
          </span>
        </button>
      </div>
    </div>
  </DashboardCard>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import DashboardCard from '~/components/dashboard/DashboardCard'

export default {
  components: { DashboardCard },
  computed: {
    ...mapState('sendBird', ['fetchingMessages']),
    ...mapGetters({
      unreadMessages: 'sendBird/getUnreadMessages',
      listOfChannels: 'sendBird/listOfChannels',
      getAllClients: 'client/getAllClients'
    })
  },
  methods: {
    opponentUser (userObj) {
      return userObj.members.find(
        u => u.userId !== this.$auth.user.sendbirdId
      )
    },
    opponentUserName (userObj) {
      return this.opponentUser(userObj).nickname
    },
    userId (userObj) {
      const client = this.getAllClients.find(
        c => c.sendbirdId === this.opponentUser(userObj).userId
      )
      return client && client._id
    }
  }
}
</script>

<style scoped>
</style>
