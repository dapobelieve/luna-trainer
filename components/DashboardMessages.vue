<template>
  <containers-summary-card-with-notifications :display-view-all-button="false">
    <template v-slot:icon>
      <i
        class="ns-comment-alt bg-indigo-50 p-1 rounded-full text-indigo-500 text-2xl h-12 w-12 flex items-center justify-center flex-shrink-0"
      ></i>
    </template>
    <template v-slot:title>
      messages
    </template>
    <template v-slot:notifications>
      {{ unreadMessages.length }} new message{{
        unreadMessages.length > 1 ? "s" : ""
      }}
    </template>
    <template v-slot:content>
      <ul
        v-if="unreadMessages.length"
        role="list"
        class="relative z-0 px-1"
      >
        <li v-for="msg in unreadMessages" :key="msg.url">
          <containers-summary-information-with-avatar
            :show-chevron-right="false"
          >
            <template v-slot:avatar>
              <ClientAvatar
                :client-info="{
                  firstName: msg.lastMessage._sender.nickname.split(' ')[0],
                  lastName: msg.lastMessage._sender.nickname.split(' ')[1]
                }"
              />
            </template>
            <template v-slot:content>
              <span class="font-medium capitalize">{{
                msg.lastMessage._sender.nickname
              }}</span>
              <p>
                {{
                  msg.lastMessage.message.length > 76
                    ? `${msg.lastMessage.message.substring(0, 76)}`
                    : msg.lastMessage.message
                }}
              </p>
            </template>
            <template v-slot:date>
              {{
                formatDistance(
                  new Date(msg.lastMessage.createdAt),
                  new Date(),
                  { addSuffix: true }
                )
              }}.
            </template>
          </containers-summary-information-with-avatar>
        </li>
      </ul>
      <div
        v-else
        class="text-center pt-8 pb-12 px-4 text-gray-500 text-sm"
      >
        New messages will appear here.
      </div>
    </template>
  </containers-summary-card-with-notifications>
</template>

<script>
import { formatDistance } from 'date-fns'
import { mapGetters } from 'vuex'
export default {
  name: 'DbMessages',
  data () {
    return {
      formatDistance
    }
  },
  computed: {
    ...mapGetters({
      unreadMessages: 'sendBird/getUnreadMessages',
      acceptedClients: 'client/acceptedClients'
    })
  }
}
</script>

<style lang="scss" scoped></style>
