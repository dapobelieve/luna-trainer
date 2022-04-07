<template>
  <div class="pt-14">
    <div class="messages">
      <div class="header">
        <p class="title">
          Messages
        </p>
        <div class="pt-4 bg-white">
          <div class="relative flex items-center h-8">
            <i class="fi-rr-search absolute left-2 text-gray-400 h-4"></i>
            <input
              v-model="search"
              type="text"
              class="focus:outline-none w-full sm:text-sm border rounded-md h-8 pl-7 shadow-sm focus:border-blue-500"
              placeholder="Search name to start new chat"
            />
          </div>
        </div>
      </div>
      <template v-if="fetchingMessages">
        <div class="mt-20 flex justify-center">
          <SingleLoader />
        </div>
      </template>
      <template v-else-if="search">
        <template v-if="searchClient.length">
          <div
            v-for="client in searchClient"
            :key="client._id"
            role="button"
            class="flex hover:bg-gray-100 px-3 mx-0.5 py-3 rounded-lg"
            @click="messageClient(client)"
          >
            <div class="flex-none w-12 mr-4">
              <ClientAvatar
                :client-info="{
                  firstName: client.firstName
                }"
              />
            </div>
            <div class="truncate flex-grow">
              <div class="flex items-center">
                <span
                  class="text-base text-gray-700 font-medium capitalize mr-2 flex-grow truncate"
                >{{ client.firstName }}</span>
                <span
                  :class="[client.status === 'accepted' ? 'bg-green-200 text-green-700' : 'text-red-700', 'rounded text-sm font-normal normal-case flex-none w-18 items-center flex']"
                >
                  <i :class="{ hidden : client.status === 'accepted' }" class="fi-rr-time-add text-xs mr-1"></i>
                </span>
              </div>
              <div
                class="text-gray-700 text-xs font-normal normal-case truncate"
              >
                {{ client.email }}
              </div>
            </div>
          </div>
        </template>
        <div v-else class="text-center mt-10">
          😩 Client not found.
        </div>
      </template>
      <div v-else-if="acceptedClients.length && !search.length" class="px-1">
        <button
          v-for="client in acceptedClients"
          :key="client._id"
          class="rounded-md py-4 px-3 flex items-center space-x-0 w-full hover:bg-gray-100"
          @click="gotoMessage(client._id)"
        >
          <span class="w-full flex items-center">
            <div class="flex-shrink-0 h-12 w-12 mr-4">
              <ClientAvatar
                :client-info="{
                  sendbirdId: client.sendbirdId,
                  firstName: client.firstName
                }"
              />
            </div>
            <div class="flex-grow min-w-0 text-left">
              <div class="focus:outline-none">
                <span
                  class="font-bold text-base capitalize text-gray-700"
                >{{ client.firstName }}</span>
                <template v-if="checkForUnreadMessage(client.sendbirdId) !== undefined">
                  <p
                    v-if="checkForUnreadMessage(client.sendbirdId).lastMessage.messageType === 'user'"
                    class="truncate text-sm w-48 xl:w-56 normal-case font-medium"
                  >
                    {{ checkForUnreadMessage(client.sendbirdId).lastMessage.message }}
                  </p>
                  <p
                    v-else-if="checkForUnreadMessage(client.sendbirdId).lastMessage.messageType === 'file'"
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
                    {{ checkForUnreadMessage(client.sendbirdId).lastMessage.createdAt | howLongAgo }}
                  </p>
                </template>
                <p v-else class="font-normal">
                  {{ client.email }}
                </p>
              </div>
            </div>
          </span>
          <span class="text-xs text-gray-500 truncate">
            <p
              v-if="checkForUnreadMessage(client.sendbirdId) !== undefined"
              class="bg-blue-700 p-1 rounded-full"
            ></p>
            <i v-else class="fi-rr-angle-right text-blue-500"></i>
          </span>
        </button>
      </div>
      <NoMessages v-else />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import NoMessages from '~/components/messages/NoMessages.vue'
export default {
  name: 'MessagesSubMenu',
  components: {
    NoMessages
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState('sendBird', ['fetchingMessages']),
    ...mapGetters({
      allClients: 'client/getAllClients',
      listOfChannels: 'sendBird/listOfChannels',
      getUnreadMessages: 'sendBird/getUnreadMessages'
    }),
    acceptedClients () {
      return this.allClients.filter(c => c.status === 'accepted')
    },
    acceptedImageTypes (file) {
      const allowableImageTypes = ['image/gif', 'image/jpeg', 'image/png']
      return allowableImageTypes.includes(file)
    },
    searchClient () {
      return this.allClients.filter((client) => {
        if (this.search && this.allClients.length) {
          return client.firstName.toLowerCase().match(this.search.toLowerCase())
        }
        return 'No Result'
      })
    }
  },
  methods: {
    gotoMessage (clientId) {
      try {
        this.$router.push({
          name: 'client-id-messages',
          params: { id: clientId }
        })
      } catch (error) {
        this.$lunaToast.error('Something went wrong, Please contact admin.')
      }
    },
    messageClient (client) {
      if (client.status === 'accepted') {
        this.$router.push({ name: 'client-id-messages', params: { id: client._id } })
      } else {
        this.$lunaToast.error('This client has not accepted your request.')
      }
    },
    checkForUnreadMessage (sendbirdId) {
      return this.getUnreadMessages.find(member => member.members.find(m => m.userId === sendbirdId))
    }
  }
}
</script>

<style lang="scss" scoped>
.unread-bg {
background-color: #F8FAFC;
}
.no-messages {
  height: 444px;
}

.messages {
  @apply bg-white shadow-sm rounded-xl pb-4 lg:w-3/4 xl:w-[578.5px] mx-auto overflow-y-auto;
  height: 80vh;

  .header {
    @apply sticky top-0 bg-white;
    @apply p-4;
  .title {
    @apply text-xl font-normal text-gray-700;
  }
  }
}
</style>
