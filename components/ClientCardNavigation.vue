<template>
  <nav>
    <NuxtLink class="card" :exact-active-class="$route.name === 'Client-id-Messages' ? 'active' : ''" :to="{ name: 'Client-id-Messages' }" aria-current="page">
      <div class="tail-flex tail-items-center">
        <span
          class="tail-p-2 tail-rounded-full tail-flex tail-items-center"
        >
          <i
            class="ns-comment-alt tail-text-lg tail-text-gray-500"
          ></i>
        </span>
        <span class="tail-pl-3">Messages</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 512 512"
      >
        <title>ionicons-v5-a</title>
        <polyline
          points="184 112 328 256 184 400"
          style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
        />
      </svg>
    </NuxtLink>
    <NuxtLink class="card" :exact-active-class="$route.name === 'Client-id-Information' ? 'active' : ''" :to="{ name: 'Client-id-Information' }" aria-current="page">
      <div class="tail-flex tail-items-center">
        <span
          class="tail-p-2 tail-rounded-full tail-flex tail-items-center"
        >
          <i
            class="ns-user tail-text-lg tail-text-gray-500"
          ></i>
        </span>
        <span class="tail-pl-3">Information</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 512 512"
      >
        <title>ionicons-v5-a</title>
        <polyline
          points="184 112 328 256 184 400"
          style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
        />
      </svg>
    </NuxtLink>
    <NuxtLink class="card" :exact-active-class="$route.name === 'Client-id-Calendar' ? 'active' : ''" :to="{ name: 'Client-id-Calendar' }" aria-current="page">
      <div class="tail-flex tail-items-center">
        <span
          class="tail-p-2 tail-rounded-full tail-flex tail-items-center"
        >
          <i
            class="ns-calendar tail-text-lg tail-text-gray-500"
          ></i>
        </span>
        <span class="tail-pl-3">Calendar</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 512 512"
      >
        <title>ionicons-v5-a</title>
        <polyline
          points="184 112 328 256 184 400"
          style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
        />
      </svg>
    </NuxtLink>
  </nav>
</template>

<script>
export default {
  name: 'ClientCardNavigation'
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
svg {
  stroke: rgba(143, 151, 166, 1)
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
