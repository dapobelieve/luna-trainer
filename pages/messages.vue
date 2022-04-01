<template>
  <div
    style="height: calc(100vh - 2px)"
    :class="[
      'fixed w-full lg:left-56 xl:left-64 left-0 z-10 bg-gray-50 bg-opacity-95'
    ]"
  >
    <div
      class="relative p-0 sm:p-3 h-full  flex justify-center lg:justify-start"
      @click.stop="$router.go(-1)"
    >
      <transition
        enter="ease-out duration-300"
        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leave-from="opacity-100 translate-y-0 sm:scale-100"
        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          class="sm:border border-none bg-white rounded-none sm:rounded-xl overflow-y-auto shadow-xl sm:max-w-md lg:max-w-sm w-full h-full"
          @click.stop=""
        >
          <div
            class="opacity-50 w-full h-full absolute left-0 top-0 -z-10"
          ></div>

          <div class="sticky top-0">
            <div class="flex justify-between items-center bg-white p-4">
              <h5 class="text-xl text-gray-700">
                Messages
              </h5>
              <div
                class="hover:bg-blue-50 h-8 w-8 flex items-center justify-center rounded-full"
              >
                <i
                  class="fi-rr-cross text-base text-blue-500"
                  role="button"
                  @click.stop="$router.go(-1)"
                ></i>
              </div>
            </div>
            <div class="pb-2 px-4 bg-white">
              <div class="relative flex items-center h-8">
                <i class="fi-rr-search absolute left-2 text-gray-400"></i>
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
                :class="{ 'cursor-not-allowed': client.status !== 'accepted' }"
                class="flex hover:bg-gray-100 px-3 mx-0.5 py-3 rounded-lg"
                @click="client.status === 'accepted' ? $router.push({ name: 'client-id-messages', params: { id: client._id } }) : '#'"
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
                      :class="[client.status === 'accepted' ? 'bg-green-200 text-green-700' : 'text-red-700', 'rounded text-sm font-normal normal-case flex-none w-18 text-sm items-center flex']"
                    >
                      <i :class="{ hidden : client.status === 'accepted' }" class="fi-rr-time-add text-xs mr-1"></i>
                    </span>
                  </div>
                  <div
                    class="text-gray-700 text-xs font-normal normal-case truncate"
                  >
                    {{ client.status === 'accepted' ? 'Message' : 'Invitation Pending' }}
                  </div>
                </div>
              </div>
            </template>
            <div v-else class="text-center mt-10">
              😩 Client not found.
            </div>
          </template>
          <div v-else-if="listOfChannels.length && !search.length">
            <button
              v-for="n in listOfChannels"
              :key="n.url"
              class="rounded-md py-4 px-3 flex items-center space-x-0 w-full hover:bg-gray-100"
              :class="{ 'unread-bg': Boolean(n.unreadMessageCount) }"
              @click="gotoMessage(n.members)"
            >
              <span class="w-full flex items-center">
                <div class="flex-shrink-0 h-12 w-12 mr-4">
                  <ClientAvatar
                    :client-info="{
                      sendbirdId: n.lastMessage._sender.userId,
                      firstName: n.lastMessage._sender.nickname
                    }"
                  />
                </div>
                <div class="flex-grow min-w-0 text-left">
                  <div class="focus:outline-none">
                    <span
                      class="font-bold text-base capitalize text-gray-700"
                    >{{ n.lastMessage._sender.nickname }}</span>
                    <p
                      v-if="n.lastMessage.messageType === 'user'"
                      class="truncate text-sm w-48 xl:w-56 normal-case"
                      :class="[
                        Boolean(n.unreadMessageCount)
                          ? 'font-medium'
                          : 'font-normal',
                      ]"
                    >
                      {{ n.lastMessage.message }}
                    </p>
                    <p
                      v-else-if="n.lastMessage.messageType === 'file'"
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
                      class="text-sm"
                      :class="[
                        Boolean(n.unreadMessageCount)
                          ? 'font-medium text-blue-500'
                          : 'text-gray-500 font-normal',
                      ]"
                    >
                      {{ n.lastMessage.createdAt | howLongAgo }}
                    </p>
                  </div>
                </div>
              </span>
              <span class="text-xs text-gray-500 truncate">
                <p
                  v-if="Boolean(n.unreadMessageCount)"
                  class="bg-blue-700 p-1 rounded-full"
                ></p>
                <i v-else class="fi-rr-angle-right text-blue-500"></i>
              </span>
            </button>
          </div>
          <div v-else class="text-center py-8 px-4 flex w-full justify-center">
            <div class="max-w-xs flex gap-3 flex-col">
              <h2 class="font-bold text-lg text-gray-700">
                No New Messages.
              </h2>
              <p class="text-sm">
                We will notify you when something arrives
              </p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'MessagesSubMenu',
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState('sendBird', ['fetchingMessages']),
    ...mapGetters({
      allClients: 'client/getAllClients',
      listOfChannels: 'sendBird/listOfChannels'
    }),
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
    gotoMessage (arr) {
      try {
        const user = arr.find(m => m.userId !== this.$auth.user.sendbirdId)
        const client = this.allClients.find(
          c => c.sendbirdId === user.userId
        )
        this.$router.push({
          name: 'client-id-messages',
          params: { id: client._id }
        })
      } catch (error) {
        this.$lunaToast.error('Something went wrong, Please contact admin.')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.unread-bg {
background-color: #F8FAFC;
}
</style>
