<template>
  <div>
    <div class="grid grid-cols-1 gap-4 text-base">
      <a
        class="flex flex-col px-2 pb-2"
        href="#profile"
        exact-active-class="active"
      >
        <span class="text-sm">
          Profile
        </span>
      </a>
      <a
        href="#services"
        class="flex flex-col px-2 pb-2"
      >
        <span class="text-sm">
          Services
        </span>
      </a>
      <a
        href="#security"
        class="flex flex-col px-2 pb-2"
      >
        <span class="text-sm">
          Security
        </span>
      </a>
      <a
        href="#connect"
        class="flex flex-col px-2 pb-2"
      >
        <span class="text-sm">
          Connect
        </span>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a {
  // @apply text-gray-500 no-underline;
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
