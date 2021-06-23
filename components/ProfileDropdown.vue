<template>
  <div class="tail-block profile-dropdown-box tail-rounded-md tail-p-4 tail-bg-white">
    <div class="tail-grid tail-gap-1 tail-place-items-center">
      <a>
        <img
          class="tail-rounded-full tail-h-14"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
        >
      </a>
      <a>
        <span class="tail-text-lg tail-capitalize">
          {{ $store.state.auth.user.firstName }} {{ $store.state.auth.user.lastName }}
        </span>
      </a>
      <a>
        <span class="tail-text-sm tail-text-gray-400 tail-capitalize">
          {{ $store.state.auth.user.location }}
        </span>
      </a>
    </div>
    <div class="tail-block tail-grid tail-gap-4 tail-place-items-start tail-py-4">
      <a class="tail-flex" href="#"><i class="ns-settings" /><span class="tail-text-base tail-font-light tail-px-2">Settings</span></a>
      <a @click.prevent="signOut" class="tail-flex tail-text-red-600" href="#"><i class="ns-power" /><span class="tail-text-base tail-font-light tail-px-2">Signout</span></a>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'ProfileDropdown',
  methods: {
    ...mapActions({
      logOut: 'logOut'
    }),
    signOut () {
      this.logOut()
    }
  }
}
</script>
