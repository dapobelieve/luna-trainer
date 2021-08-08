<template>
  <nav>
    <NuxtLink
      v-for="menu in menuItems"
      :key="menu.index"
      class="card"
      :exact-active-class="$route.name === `Client-id-${menu.pathName}` ? 'active' : ''"
      :to="{ name: `Client-id-${menu.pathName}`, params: { id: $route.params.id } }"
      aria-current="page"
    >
      <div class="tail-flex tail-items-center">
        <span
          class="tail-p-2 tail-rounded-full tail-flex tail-items-center"
        >
          <i
            class="tail-text-lg tail-text-gray-500"
            :class="[ menu.pathName === 'Messages' ? 'ns-comment-alt' : menu.pathName === 'Information' ? 'ns-user' : 'ns-calendar' ]"
          ></i>
        </span>
        <span class="tail-pl-3">{{ menu.pathName }}</span>
      </div>
      <img src="~/assets/img/svgs/chevron-right.svg" alt="" srcset="">
    </NuxtLink>
  </nav>
</template>

<script>
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
  }
}
</script>

<style lang="scss" scoped>
nav {
  display: grid;
  grid-gap: 12px;
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
  &:hover span:nth-child(2){
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
  border: 2px solid #56CCF2;
  span:first-child {
      background: rgba(230, 246, 255, 1);
  }
  span:first-child i {
      color: rgba(86, 204, 242, 1);
  }
}
</style>
