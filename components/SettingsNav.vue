<template>
  <div>
    <div class="tail-grid tail-grid-cols-1 tail-gap-4 tail-text-base">
      <NuxtLink
        :to="{ name: 'Settings' }"
        class="tail-flex tail-flex-col tail-items-center tail-px-4 tail-py-3"
        href=""
        exact-active-class="active"
      >
        <span class="tail-text-sm">
          Profile
        </span>
      </NuxtLink>
      <NuxtLink
        :to="{ name: 'Settings' }"
        class="tail-flex tail-flex-col tail-items-center tail-px-4 tail-py-3"
        href=""
        exact-active-class="active"
      >
        <span class="tail-text-sm">
          Services
        </span>
      </NuxtLink>
      <NuxtLink
        :to="{ name: 'Settings' }"
        class="tail-flex tail-flex-col tail-items-center tail-px-4 tail-py-3"
        href=""
        exact-active-class="active"
      >
        <span class="tail-text-sm">
          Security
        </span>
      </NuxtLink>
      <NuxtLink
        :to="{ name: 'Settings' }"
        class="tail-flex tail-flex-col tail-items-center tail-px-4 tail-py-3"
        href=""
        exact-active-class="active"
      >
        <span class="tail-text-sm">
          Connect
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a {
  // @apply tail-text-gray-500 tail-no-underline;
  text-decoration: none;
  color: gray;
}

.active {
  color: rgb(23,41,67);
}
.active:focus {
  outline: none !important;
}

@media only screen and (min-width: 769px) {
  .nav {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    margin-top: 5em;
    height: calc(100% - 64px);
    position: fixed;
    left: 0;
    text-transform: capitalize;
  }

  .active {
    border: 1px solid rgba(156, 163, 175) !important;
    border-radius: 0.375rem;
    background: #fff;
    border-radius: 0.5rem !important;
    background: #fff !important;
  }
}
</style>
