<template>
  <nav>
    <NuxtLink
      v-for="menu in menuItems"
      :key="menu.index"
      class="card"
      exact-active-class="active"
      :to="{
        name: `Client-id-${menu.pathName}`,
        params: { id: $route.params.id }
      }"
      aria-current="page"
    >
      <div class="tail-flex tail-items-center">
        <span class="tail-p-2 tail-rounded-full tail-flex tail-items-center">
          <i
            :class="[
              menu.pathName === 'Messages'
                ? 'ns-comment-alt'
                : menu.pathName === 'Information'
                  ? 'ns-user'
                  : 'ns-calendar',
              'tail-text-lg',
              'tail-text-gray-500'
            ]"
          ></i>
        </span>
        <span class="tail-pl-3">{{ menu.pathName }}</span>
      </div>
      <span class="tail-flex tail-items-center">
        <b
          v-if="menu.pathName === 'Messages' && $route.name !== 'Messages' && unreadMessages"
          class="tail-flex tail-py-0.5 tail-px-1.5 tail-bg-red-500 tail-rounded-full tail-text-xs tail-text-white tail-mr-1"
        >{{ unreadMessages }}</b>
        <b
          v-else-if="menu.pathName === 'Calendar'"
          class="tail-flex tail-py-0.5 tail-px-1.5 tail-bg-yellow-300 tail-rounded-full tail-text-xs tail-text-yellow-700 tail-mr-1"
        >9+</b>
        <img src="~/assets/img/svgs/chevron-right.svg" alt="" srcset="" />
      </span>
    </NuxtLink>
  </nav>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'ClientCardNavigation',
  data () {
    return {
      menuItems: [
        {
          pathName: 'Messages'
        },
        {
          pathName: 'Information'
        },
        {
          pathName: 'Calendar'
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
        ? this.unreadMessagesCount(this.thisUser)
          .unreadMessageCount
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

.active {
  border: 2px solid #56ccf2;
  span:first-child {
    background: rgba(230, 246, 255, 1);
  }
  span:first-child i {
    color: rgba(86, 204, 242, 1);
  }
}
</style>
