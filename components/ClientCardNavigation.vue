<template>
  <ul
    role="list"
    class="tail-relative tail-z-0 tail-rounded-tr-lg tail-rounded-tl-lg lg:tail-rounded-lg lg:tail-border tail-bg-white tail-p-1 tail-flex lg:tail-grid"
  >
    <li v-for="menu in menuItems" :key="menu.index" class="tail-w-full">
      <containers-summary-information-with-avatar
        :url="`Client-id-${menu.pathName}`"
        :parameter="{ id: $route.params.id }"
        hover-color="bg-blue-50"
      >
        <template v-slot:avatar="{ matchedRoute }">
          <i
            :class="[matchedRoute ? 'tail-text-blue-500' : 'tail-text-gray-500', `${menu.icon}` ]"
            class="tail-bg-indigo-50 tail-p-1 tail-rounded-full tail-text-2xl tail-h-12 tail-w-12 tail-flex tail-items-center tail-justify-center tail-flex-shrink-0"
          ></i>
        </template>
        <template v-slot:content>
          <span class="tail-capitalize">{{
            menu.pathName
          }}</span>
        </template>
        <template v-slot:button="{ matchedRoute }">
          <div class="lg:tail-hidden">
            <svg v-if="matchedRoute" xmlns="http://www.w3.org/2000/svg" class="ionicon tail-h-5 tail-text-blue-500" viewBox="0 0 512 512"><title>Chevron Down</title><path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="48"
              d="M112 184l144 144 144-144"
            /></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="ionicon tail-h-5" viewBox="0 0 512 512"><title>Chevron Forward</title><path
              fill="none"
              stroke="#808080"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="48"
              d="M184 112l144 144-144 144"
            /></svg>
          </div>
          <div class="tail-hidden lg:tail-block">
            <svg v-if="matchedRoute" xmlns="http://www.w3.org/2000/svg" class="ionicon tail-h-5" viewBox="0 0 512 512"><title>Chevron Forward</title><path
              fill="none"
              stroke="#3B82F6"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="48"
              d="M184 112l144 144-144 144"
            /></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="ionicon tail-h-5" viewBox="0 0 512 512"><title>Chevron Forward</title><path
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
