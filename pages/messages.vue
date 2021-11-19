<template>
  <div
    style="height: calc(100vh - 2px)"
    :class="[
      'fixed w-full lg:left-56 xl:left-64 left-0 z-10 bg-gray-50 bg-opacity-95']"
  >
    <div class="relative p-0 sm:p-3 h-full  flex justify-center lg:justify-start" @click.stop="$router.go(-1)">
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
              <div class="hover:bg-blue-50 h-8 w-8 flex items-center justify-center rounded-full">
                <i class="ns-cross text-blue-500" role="button" @click.stop="$router.go(-1)"></i>
              </div>
            </div>
            <div class="pb-2 px-4 bg-white">
              <div class="relative flex items-center h-8">
                <i class="ns-search absolute left-2 text-gray-400"></i>
                <input
                  type="text"
                  class="focus:outline-none w-full sm:text-sm border rounded-md h-8 pl-7 shadow-sm focus:border-blue-500"
                  placeholder="Search name to start new chat"
                />
              </div>
            </div>
          </div>
          <div v-if="unreadMessages.length">
            <button
              v-for="n in unreadMessages"
              :key="n.url"
              type="button"
              class="flex justify-start space-x-3 hover:bg-gray-100 px-4 py-2 cursor-pointer w-full"
              @click="gotoMessage(n.members)"
            >
              <div>
                <ClientAvatar
                  :client-info="{
                    firstName: n.lastMessage._sender.nickname.split(' ')[0],
                    lastName: n.lastMessage._sender.nickname.split(' ')[1]
                  }"
                />
              </div>
              <div class="text-sm">
                <div class="font-semibold">
                  <span class="font-semibold mr-2">{{ n.lastMessage._sender.nickname }}</span>
                  <span class="text-gray-400 text-xs normal-case">
                    {{ n.lastMessage.createdAt | howLongAgo }}.
                  </span>
                </div>
                <div
                  v-if="n.lastMessage.message"
                  class="flex space-x-2 pt-2 text-gray-700"
                >
                  {{ n.lastMessage.message.length > 76 ? `${n.lastMessage.message.substring(0, 76)}` : n.lastMessage.message }}
                </div>
              </div>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MessagesSubMenu',
  computed: {
    ...mapGetters({
      unreadMessages: 'sendBird/getUnreadMessages',
      acceptedClients: 'client/acceptedClients'
    })
  },
  methods: {
    gotoMessage (arr) {
      const user = arr.find(m => m.userId !== this.$auth.user.sendbirdId)
      const client = this.acceptedClients.find(
        c => c.sendbirdId === user.userId
      )
      this.$router.push({
        name: 'Client-id-Messages',
        params: { id: client._id }
      })
    }
  }
}
</script>
