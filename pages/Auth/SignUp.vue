<template>
  <div class="tail-grid tail-gap-10">
    <div class="tail-grid tail-grid-col-12">
      <h3 class="tail-text-3xl">Sign up</h3>
    </div>
    <div class="tail-grid tail-grid-col-12 tail-mb-4">
      <button
        type="button"
        class="tail-bg-white tail-border tail-w-100 tail-flex tail-align-center tail-justify-center tail-p-1.5 tail-rounded"
      >
        <img src="~/assets/img/googleLogoImg.png" alt="google logo">
        <span class="tail-ml-1">Google</span>
      </button>
    </div>
    <div class="tail-relative">
      <hr />
      <div
        class="tail-w-full tail-absolute tail-transform tail--translate-y-4 tail-flex tail-align-center tail-justify-center"
      >
        <small
          class="tail-border tail-rounded-full or-secondary tail-text-grey tail-p-2 body-background"
        >OR</small>
      </div>
    </div>
    <div class="tail-grid tail-gap-8 md:tail-gap-4">
      <form class="tail-grid tail-gap-12 md:tail-gap-4">
        <div class="tail-grid">
          <label for="email" class="tail-block tail-text-base tail-font-medium tail-text-gray-700">Email address</label>
          <input v-model="userInfo.userName" autocomplete="off" type="text" class="tail-bg-white tail-p-2.5 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
        </div>
        <div class="tail-grid">
          <div class="tail-flex tail-justify-between tail-items-center">
            <label for="password" class="tail-block tail-text-base tail-font-medium tail-text-gray-700">Password</label>
            <button type="button" class="focus:tail-outline-none" @click="showPassword = !showPassword">
              <img v-if="showPassword" class="tail-h-4" src="~/assets/img/eye-off-outline.svg" alt="" srcset="">
              <img v-else class="tail-h-4" src="~/assets/img/eye-outline.svg" alt="" srcset="">
            </button>
          </div>
          <input v-model="userInfo.password" :type="showPassword ? 'text':'password'" class="tail-bg-white tail-p-2.5 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
        </div>

        <div class="tail-grid">
          <div class="tail-flex tail-justify-between tail-items-center">
            <label for="password" class="tail-block tail-text-base tail-font-medium tail-text-gray-700">Confirm Password</label>
            <button type="button" class="focus:tail-outline-none" @click="showConfirmPassword = !showConfirmPassword">
              <img v-if="showConfirmPassword" class="tail-h-4" src="~/assets/img/eye-off-outline.svg" alt="" srcset="">
              <img v-else class="tail-h-4" src="~/assets/img/eye-outline.svg" alt="" srcset="">
            </button>
          </div>
          <input v-model="userInfo.confirmPassword" :type="showConfirmPassword ? 'text':'password'" class="tail-bg-white tail-p-2.5 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
        </div>
        <div class="tail-flex tail-justify-center">
          <button
            type="button"
            class="submit-button tail-items-center tail-justify-center tail-px-6 tail-py-2.5 tail-border tail-border-transparent tail-rounded-md tail-shadow-sm tail-text-base tail-font-medium tail-text-white primary-color"
          >
            Get started
          </button>
        </div>
      </form>
      <div class="tail-text-center">
        <span
          class="tail-text-gray-400"
        >Already have an account?
          <NuxtLink
            :to="{ name: 'Auth-SignIn' }"
            class="tail-text-gray-900"
          >Sign In</NuxtLink></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SignUp',
  layout: 'authLayout',
  auth: false,
  data () {
    return {
      showPassword: false,
      showConfirmPassword: false,
      userInfo: {
        userName: '',
        password: '',
        confirmPassword: '',
        domain: 'getwelp-trainer-ui'
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.submit-button {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #46A6C8;
  }
  &:focus {
    outline: none;
  }
}
</style>
