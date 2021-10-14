<template>
  <containers-summary-card-with-notifications :display-view-all-button="false">
    <template v-slot:icon>
      <i
        class="ns-comment-alt tail-bg-indigo-50 tail-p-1 tail-rounded-full tail-text-indigo-500 tail-text-2xl tail-h-12 tail-w-12 tail-flex tail-items-center tail-justify-center tail-flex-shrink-0"
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
        class="tail-relative tail-z-0 tail-px-1"
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
              <span class="tail-font-medium tail-capitalize">{{
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
        class="tail-text-center tail-pt-8 tail-pb-12 tail-px-4 tail-text-gray-500 tail-text-sm"
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
      unreadMessages: 'sendBird/getUnreadMessages'
    })
    // computeMessages () {
    //   if (this.unreadMessages.length) {

    //   }
    // }
  }
}
</script>

<style lang="scss" scoped></style>
