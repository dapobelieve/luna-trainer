<template>
  <ul
    role="list"
    class="relative z-0 rounded-xl border bg-white overflow-hidden p-1 hidden lg:block"
  >
    <li v-for="menu in menuItems" :key="menu.index" class="w-full">
      <containers-summary-information-with-avatar
        :url="`client-id-${menu.pathName}`"
        :parameter="{ id: $route.params.id }"
        hover-color="bg-gray-100"
      >
        <template v-slot:avatar="{ matchedRoute }">
          <i
            :class="[matchedRoute ? 'text-blue-500 bg-blue-50' : 'text-gray-500 bg-gray-100', `${menu.icon}` ]"
            class="p-1 rounded-full text-2xl h-12 w-12 flex items-center justify-center flex-shrink-0"
          ></i>
        </template>
        <template v-slot:content>
          <span class="capitalize">
            {{
              menu.pathName
            }}
          </span>
        </template>
        <template v-slot:button="{ matchedRoute }">
          <div class="lg:hidden">
            <svg
              v-if="matchedRoute"
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon h-5 text-blue-500"
              viewBox="0 0 512 512"
            >
              <title>Chevron Down</title>
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M112 184l144 144 144-144"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon h-5"
              viewBox="0 0 512 512"
            >
              <title>Chevron Forward</title>
              <path
                fill="none"
                stroke="#808080"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M184 112l144 144-144 144"
              />
            </svg>
          </div>
          <div class="hidden lg:block">
            <svg
              v-if="matchedRoute"
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon h-5"
              viewBox="0 0 512 512"
            >
              <title>Chevron Forward</title>
              <path
                fill="none"
                stroke="#3B82F6"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M184 112l144 144-144 144"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon h-5"
              viewBox="0 0 512 512"
            >
              <title>Chevron Forward</title>
              <path
                fill="none"
                stroke="#808080"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M184 112l144 144-144 144"
              />
            </svg>
          </div>
        </template>
      </containers-summary-information-with-avatar>
    </li>
  </ul>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'ClientCardNavigation',
  data () {
    return {
      menuItems: [
        {
          pathName: 'messages',
          icon: 'ns-comment-alt'
        },
        {
          pathName: 'information',
          icon: 'ns-user'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      thisUser: state => state.sendBird.tempClient
    }),
    ...mapGetters({
      unreadMessagesCount: 'sendBird/getUserUnreadMessageCount'
    }),
    unreadMessages () {
      return this.unreadMessagesCount(this.thisUser)
        ? this.unreadMessagesCount(this.thisUser).unreadMessageCount
        : 0
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
