<template>
  <div class="block border border-gray-200 rounded-xl p-4 bg-white shadow-2xl">
    <div class="grid gap-1">
      <img
        class="rounded-full h-14 mx-auto"
        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
      >
      <p class="text-sm text-center capitalize truncate px-4">
        {{ $store.state.authorize.getWelpUser.firstName }} {{ $store.state.authorize.getWelpUser.lastName }}
      </p>
      <p class="text-sm text-gray-400 capitalize text-center">
        {{ $store.state.authorize.getWelpUser.location }}
      </p>
    </div>
    <div class="block grid gap-4 place-items-start pt-4">
      <Nuxt-link
        :to="{ name: 'Settings' }"
      >
        <div class="flex">
          <i class="ns-settings" /><span class="text-base font-light px-2">Settings</span>
        </div>
      </Nuxt-link>
      <button class="flex text-red-600" @click="signOut">
        <i class="ns-power" />
        <span class="text-base font-light px-2">Signout</span>
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
