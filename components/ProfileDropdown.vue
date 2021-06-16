<template>
  <div class="tail-block profile-dropdown-box tail-rounded-md tail-p-4 tail-bg-white">
    <div class="tail-grid tail-gap-1 tail-place-items-center">
      <a>
        <img
          class="tail-rounded-full tail-h-14"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
        >
      </a>
      <a><span class="tail-text-lg">Ali R</span></a>
      <a><span class="tail-text-sm tail-text-gray-400">Location</span></a>
    </div>
    <div class="tail-block tail-grid tail-gap-4 tail-place-items-start tail-py-4">
      <Nuxt-link
        :to="{ name: 'Settings' }"
      >
        <div class="tail-flex">
          <i class="ns-settings" /><span class="tail-text-base tail-font-light tail-px-2">Settings</span>
        </div>
      </Nuxt-link>
      <button class="tail-flex tail-text-red-600">
        <i class="ns-power" />
        <span class="tail-text-base tail-font-light tail-px-2">Signout</span>
      </button>
    </div>
  </div>
</template>
