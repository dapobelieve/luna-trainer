<template>
  <div>
    <div class="tail-grid tail-grid-cols-1 tail-gap-4 tail-text-base">
      <NuxtLink
        :to="{ name: 'Settings' }"
        class="tail-flex tail-flex-col tail-px-2 tail-pb-2"
        href=""
        exact-active-class="active"
      >
        <span class="tail-text-sm">
          Profile
        </span>
      </NuxtLink>
      <NuxtLink
        :to="{ name: 'Settings' }"
        class="tail-flex tail-flex-col tail-px-2 tail-pb-2"
        href=""
      >
        <span class="tail-text-sm">
          Services
        </span>
      </NuxtLink>
      <NuxtLink
        :to="{ name: 'Settings' }"
        class="tail-flex tail-flex-col tail-px-2 tail-pb-2"
        href=""
      >
        <span class="tail-text-sm">
          Security
        </span>
      </NuxtLink>
      <NuxtLink
        :to="{ name: 'Settings' }"
        class="tail-flex tail-flex-col tail-px-2 tail-pb-2"
        href=""
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

.active:focus {
  outline: none !important;
}

.active {
    border-left: 2px solid rgba(23, 41, 66, 1)!important;
    color: rgb(23,41,67);
    height: 1rem;
}

</style>
