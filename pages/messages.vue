<template>
  <div class="pt-14">
    <div class="messages">
      <div class="header">
        <p class="title">Messages</p>
        <div class="pt-4 bg-white">
          <div class="relative flex items-center h-8">
            <i class="fi-rr-search absolute left-2 text-gray-400 h-4"></i>
            <input
              v-model="search"
              type="text"
              class="
                focus:outline-none
                w-full
                sm:text-sm
                border
                rounded-md
                h-8
                pl-7
                shadow-sm
                focus:border-blue-500
              "
              placeholder="Search name to start new chat"
            />
          </div>
        </div>
      </div>
      <template v-if="isLoading">
        <div class="mt-20 flex justify-center">
          <SingleLoader />
        </div>
      </template>
      <template v-else-if="search">
        <template v-if="filteredClients.length">
          <div
            v-for="client in filteredClients"
            :key="client._id"
            role="button"
            class="flex hover:bg-gray-100 px-3 mx-0.5 py-3 rounded-lg"
            @click="messageClient(client)"
          >
            <div class="flex-none w-12 mr-4">
              <ClientAvatar
                :client-info="{
                  firstName: client.firstName,
                  lastName: client.lastName || '',
                }"
              />
            </div>
            <div class="truncate flex-grow">
              <div class="flex items-center">
                <span
                  class="
                    text-base text-gray-700
                    font-medium
                    capitalize
                    mr-2
                    flex-grow
                    truncate
                  "
                  >{{ client.firstName }} {{ client.lastName || ""}} </span
                >
                <span
                  :class="[
                    client.status === 'accepted'
                      ? 'bg-green-200 text-green-700'
                      : 'text-red-700',
                    'rounded text-sm font-normal normal-case flex-none w-18 items-center flex',
                  ]"
                >
                  <i
                    :class="{ hidden: client.status === 'accepted' }"
                    class="fi-rr-user-time text-xs mr-1"
                  ></i>
                </span>
              </div>
              <div
                class="text-gray-500 font-normal normal-case truncate"
              >
              <small> You'll be able to send a message when they accept your request</small>
              </div>
            </div>
          </div>
        </template>
        <div v-else class="text-center mt-10">😩 Client not found.</div>
      </template>
      <template
        v-else-if="acceptedClients.length && !search.length"
        class="px-1"
      >
        <button
          v-for="client in acceptedClients"
          :key="client._id"
          class="
            rounded-md
            py-4
            px-3
            flex
            items-center
            space-x-0
            w-full
            hover:bg-gray-100
          "
          @click="gotoMessage(client._id)"
        >
          <div class="w-full flex items-center">
            <div class="mr-4 w-14 h-12">
              <ClientAvatar
                :client-info="{
                  sendbirdId: client.sendbirdId,
                  firstName: client.firstName,
                  imgURL: client.imgURL,
                }"
                :online="connectionStatus[client.sendbirdId] == 'online'"
              />
            </div>
            <div class="flex w-full  min-w-0 flex-col text-left">
              <div class="w-full relative">
                <span class="font-bold text-base capitalize text-gray-700">{{
                  `${client.firstName} ${client.lastName || ""}`
                }}</span>
                <span
                  v-if="latestMessages[client.sendbirdId]"
                  class="text-sm font-medium text-gray-400"
                >
                  {{ latestMessages[client.sendbirdId].createdAt | howLongAgo }}
                </span>
                <span
                  v-if="unreadMessagesCount[client.sendbirdId]"
                  class="
                    bg-blue-500
                    absolute
                    right-0
                    text-sm
                    rounded-full
                    p-1
                    px-2
                    text-white
                  "
                >
                  {{ unreadMessagesCount[client.sendbirdId] }}
                </span>
              </div>
              <div class="focus:outline-none">
                <div v-if="latestMessages[client.sendbirdId]">
                  <p
                    v-if="
                      latestMessages[client.sendbirdId].messageType === 'user'
                    "
                    class="
                      truncate
                      text-sm
                      w-48
                      xl:w-56
                      mt-[4px]
                      normal-case
                      font-medium
                      text-gray-600
                    "
                  >
                    <i
                      v-if="
                        latestMessages[client.sendbirdId]._sender.userId !=
                        client.sendbirdId
                      "
                      class="fi-rr-check text-sm text-green-500 mr-1"
                    ></i>
                    <span :class="[ unreadMessagesCount[client.sendbirdId] > 0 ? 'font-bold' : '' ]">{{ latestMessages[client.sendbirdId].message }}</span>
                  </p>
                  <p
                    v-else-if="
                      latestMessages[client.sendbirdId].messageType === 'file'
                    "
                    class="flex items-center text-gray-500 mt-[4px]"
                  >
                    <i
                      v-if="
                        latestMessages[client.sendbirdId]._sender.userId !=
                        client.sendbirdId
                      "
                      class="fi-rr-check text-sm text-green-500 mr-1"
                    ></i>
                    <i class="fi-rr-camera text-sm"></i>
                    <span class="ml-1 font-medium text-sm">Photo</span>
                  </p>
                </div>
                <div v-else>
                  <small>Click to start a conversation</small>
                </div>
              </div>
            </div>
            <span class="text-xs text-gray-500 truncate">
              <i
                v-if="!latestMessages[client.sendbirdId]"
                class="fi-rr-angle-right text-blue-500"
              ></i>
            </span>
          </div>
        </button>
      </template>
      <NoMessages v-else @invite-client="$modal.show('invite-client')"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NoMessages from "~/components/messages/NoMessages.vue";
export default {
  name: "MessagesSubMenu",
  components: {
    NoMessages,
  },
  data() {
    return {
      search: "",
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;
    await this.getChannelsMetadata();
    this.loading = false;
  },
  computed: {
    ...mapGetters({
      allClients: "client/getAllClients",
      latestMessages: "sendbird-v2/getChannelsMetadata",
      unreadMessagesCount: "sendbird-v2/getUnreadMessagesCount",
      connectionStatus:"sendbird-v2/getConnectionStatus",
    }),
    isLoading(){
      return this.loading && !this.unreadMessagesCount && !this.latestMessages;
    },
    acceptedClients() {
      const clients = this.allClients.filter((c) => c.status === "accepted");
      if (this.latestMessages){
        clients.sort((a, b) => {
          return this.latestMessages[b.sendbirdId]?.createdAt - this.latestMessages[a.sendbirdId]?.createdAt
        });
      }
      return clients
    },
    filteredClients() {
      return this.allClients.filter((client) => {
        if (this.search && this.allClients.length) {
          return client.firstName
            .toLowerCase()
            .match(this.search.toLowerCase());
        }
        return "No Result";
      });
    },
  },
  methods: {
    ...mapActions("sendbird-v2", ["getChannelsMetadata"]),
    gotoMessage(clientId) {
      try {
        this.$router.push({
          name: "client-id-messages",
          params: { id: clientId },
        });
      } catch (error) {
        this.$lunaToast.error("Something went wrong, Please contact admin.");
      }
    },
    messageClient(client) {
      if (client.status === "accepted") {
        this.$router.push({
          name: "client-id-messages",
          params: { id: client._id },
        });
      } else {
        this.$lunaToast.error("This client has not accepted your request.");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.unread-bg {
  background-color: #f8fafc;
}
.no-messages {
  height: 444px;
}

.messages {
  @apply bg-white shadow-sm rounded-xl pb-4 md:w-[500px] xl:w-[600px] mx-auto overflow-y-auto;
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
