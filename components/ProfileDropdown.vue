<template>
  <div class="tail-block tail-border tail-border-gray-200 tail-rounded-xl tail-p-4 tail-bg-white tail-shadow-2xl">
    <div class="tail-grid tail-gap-1">
      <img
        class="tail-rounded-full tail-h-14 tail-mx-auto"
        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
      >
      <p class="tail-text-sm tail-capitalize tail-truncate tail-px-4">
        {{ $store.state.authorize.getWelpUser.firstName }} {{ $store.state.authorize.getWelpUser.lastName }}
      </p>
      <p class="tail-text-sm tail-text-gray-400 tail-capitalize tail-text-center">
        {{ $store.state.authorize.getWelpUser.location }}
      </p>
    </div>
    <div class="tail-block tail-grid tail-gap-4 tail-place-items-start tail-pt-4">
      <Nuxt-link
        :to="{ name: 'Settings' }"
      >
        <div class="tail-flex">
          <i class="ns-settings" /><span class="tail-text-base tail-font-light tail-px-2">Settings</span>
        </div>
      </Nuxt-link>
      <button class="tail-flex tail-text-red-600" @click.prevent="signOut">
        <i class="ns-power" />
        <span class="tail-text-base tail-font-light tail-px-2">Signout</span>
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'ProfileDropdown',
  methods: {
    ...mapActions({
      logOut: 'authorize/logOut'
    }),
    signOut () {
      this.logOut()
    }
  }
}
</script>
