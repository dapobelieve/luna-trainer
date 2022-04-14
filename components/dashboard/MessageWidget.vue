<template>
  <DashboardCard class="pt-4">
    <div class="flex items-center px-4">
      <div class="inline-flex items-center">
        <div
          class="
            h-12
            mr-2
            w-12
            bg-sky-50
            rounded-full
            inline-flex
            justify-center
            items-center
          "
        >
          <i class="fi-rr-comment-alt text-xl text-sky-500 mt-1"></i>
        </div>
        <h3 class="text-black text-xl">Messages</h3>
      </div>
      <div class="ml-auto">
        <span class="text-gray-500">
          {{ unreadMessages }} new message{{ unreadMessages > 1 ? "s" : "" }}
        </span>
      </div>
    </div>
    <div class="flex h-full w-full">
      <template v-if="loading">
        <div class="h-full grid place-content-center">
          <SingleLoader />
        </div>
      </template>
      <ul v-else-if="unreadMessages" role="list" class="relative z-0 px-1 w-full">
        <li v-for="client in clients" :key="client.sendbirdId">
          <button
            v-if="
              unreadMessagesCount[client.sendbirdId] &&
              unreadMessagesCount[client.sendbirdId] > 0
            "
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
              <div class="flex w-full min-w-0 flex-col text-left">
                <div class="w-full relative">
                  <span class="font-bold text-base capitalize text-gray-700">{{
                    client.firstName
                  }}</span>
                  <span
                    v-if="latestMessages[client.sendbirdId]"
                    class="text-sm font-medium text-gray-400"
                  >
                    {{
                      latestMessages[client.sendbirdId].createdAt | howLongAgo
                    }}
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
                      <span>{{
                        latestMessages[client.sendbirdId].message
                      }}</span>
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
        </li>
      </ul>
      <template v-else class="">
        <div class="text-center flex-col flex items-center h-full w-full justify-center">
          <i class="fi-rr-comment-alt text-4xl text-amber-500"></i>
          <h3 class="text-gray-700 text-lg">You have no unread messages</h3>
          <p class="text-base text-gray-500"
            >Your new and unread messages will show up here</p
          >
          <button class="button-fill mt-3" @click.prevent="gotoMessages">
            Start conversation
          </button>
        </div>
      </template>
    </div>
  </DashboardCard>
</template>

<script>
import { mapGetters } from "vuex";
import DashboardCard from "~/components/dashboard/DashboardCard";

export default {
  components: { DashboardCard },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      unreadMessagesCount: "sendbird-v2/getUnreadMessagesCount",
      latestMessages: "sendbird-v2/getChannelsMetadata", 
      connectionStatus:"sendbird-v2/getConnectionStatus",
      clients: "client/getAllClients",
      
    }),
    unreadMessages() {
      let count = 0;
      for (let key in this.unreadMessagesCount) {
        count += this.unreadMessagesCount[key] || 0;
      }
      return count;
    },
  },
  methods: {
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
    gotoMessages() {
      try {
        this.$router.push({
          name: "messages",
        });
      } catch (error) {
        this.$lunaToast.error("Something went wrong, Please contact admin.");
      }
    },
  },
};
</script>

<style scoped>
</style>
