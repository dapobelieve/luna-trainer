<template>
  <ul
    role="list"
    class="relative z-0 rounded-tr-lg rounded-tl-lg lg:rounded-lg lg:border bg-white p-1 flex lg:grid"
  >
    <li v-for="menu in menuItems" :key="menu.index" class="w-full">
      <containers-summary-information-with-avatar
        :url="`Client-id-${menu.pathName}`"
        :parameter="{ id: $route.params.id }"
        hover-color="bg-blue-50"
      >
        <template v-slot:avatar="{ matchedRoute }">
          <i
            :class="[matchedRoute ? 'text-blue-500' : 'text-gray-500', `${menu.icon}` ]"
            class="bg-indigo-50 p-1 rounded-full text-2xl h-12 w-12 flex items-center justify-center flex-shrink-0"
          ></i>
        </template>
        <template v-slot:content>
          <span class="capitalize">{{
            menu.pathName
          }}</span>
        </template>
        <template v-slot:button="{ matchedRoute }">
          <div class="lg:hidden">
            <svg v-if="matchedRoute" xmlns="http://www.w3.org/2000/svg" class="ionicon h-5 text-blue-500" viewBox="0 0 512 512"><title>Chevron Down</title><path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="48"
              d="M112 184l144 144 144-144"
            /></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="ionicon h-5" viewBox="0 0 512 512"><title>Chevron Forward</title><path
              fill="none"
              stroke="#808080"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="48"
              d="M184 112l144 144-144 144"
            /></svg>
          </div>
          <div class="hidden lg:block">
            <svg v-if="matchedRoute" xmlns="http://www.w3.org/2000/svg" class="ionicon h-5" viewBox="0 0 512 512"><title>Chevron Forward</title><path
              fill="none"
              stroke="#3B82F6"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="48"
              d="M184 112l144 144-144 144"
            /></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="ionicon h-5" viewBox="0 0 512 512"><title>Chevron Forward</title><path
              fill="none"
              stroke="#808080"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="48"
              d="M184 112l144 144-144 144"
            /></svg>
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
          pathName: 'Messages',
          icon: 'ns-comment-alt'
        },
        {
          pathName: 'Information',
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
nav {
  display: grid;
  grid-gap: 14px;
}
.card {
  background: white;
  width: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  span:first-child {
    background: rgba(240, 245, 250, 1);
  }
  &:hover {
    background: #46a6c8;
    color: #000;
    opacity: 0.5;
  }
  &:hover span:nth-child(2) {
    color: #000;
  }
  &:hover span:first-child {
    background: rgba(230, 246, 255, 1);
  }
  &:hover span:first-child i {
    color: rgba(86, 204, 242, 1);
  }
}
</style>
