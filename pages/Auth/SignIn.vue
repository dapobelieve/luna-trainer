<template>
  <div class="tail-grid tail-gap-12">
    <div class="">
      <h2 class="tail-text-3xl">
        Sign in
      </h2>
    </div>
    <div class="">
      <button
        type="button"
        class="tail-border tail-border-gray-300 tail-w-full tail-flex tail-items-center tail-justify-center tail-py-2 tail-rounded-md"
      >
        <img src="~/assets/img/googleLogoImg.png" alt="google logo" />
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
    <div class="tail-grid tail-gap-12 md:tail-gap-8">
      <form class="tail-grid tail-gap-12 md:tail-gap-8">
        <div class="tail-grid">
          <label
            for="email"
            class="tail-block tail-text-base tail-font-medium tail-text-gray-700"
          >
            Username
          </label>
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

        <div class="tail-flex tail-justify-center">
          <button :disabled="disabled" type="button" class="base-button tail-items-center tail-justify-center tail-px-6 tail-py-2.5 tail-border tail-border-transparent tail-rounded-md tail-shadow-sm tail-text-base tail-font-medium tail-text-white primary-color" @click="login">
            Login
          </button>
        </div>
      </form>
      <div class="tail-mx-auto">
        <NuxtLink
          :to="{ name: 'Auth-ForgotPassword' }"
          class="tail-underline tail-text-gray-700"
        >
          Forgot your password?
        </NuxtLink>
      </div>
      <div class="tail-mx-auto">
        <span
          class="tail-text-gray-400"
        >Don't have an account?
          <NuxtLink
            :to="{ name: 'Auth-SignUp' }"
            class="tail-text-gray-700 tail-underline"
          >
            Sign up
          </NuxtLink>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SignIn',
  layout: 'authLayout',
  auth: false,
  data () {
    return {
      showPassword: false,
      disabled: false,
      userInfo: {
        userName: '',
        password: '',
        domain: 'getwelp-trainer-ui'
      }
    }
  },
  methods: {
    async login () {
      if (this.userInfo.userName && this.userInfo.password) {
        this.disabled = true
        try {
          await this.$auth.login({
            data: this.userInfo
          })
            .then((response) => {
              this.$toast.success('Login Successful', { position: 'bottom-right' })
              const tokens = {
                token: response.data.data.accessToken,
                refreshToken: response.data.data.refreshToken
              }
              // set necessary tokens
              this.$store.dispatch('setToken', tokens)
              // fetch user profile
              this.$store.dispatch('getUserProfile').then((response) => {
                if (response === null) {
                  this.$router.push({ name: 'Auth-ProfileSetup' })
                } else {
                  this.$auth.setUser(response)
                  this.$router.push({ name: 'Dashboard' })
                }
              })
            }).catch((err) => {
              this.$toast.error('Login attempt failed', { position: 'bottom-right' })
              console.log('error in comp', err)
            })
        } catch (error) {
          this.$toast.error('Incorrect Login Credentials', { position: 'bottom-right' })
          console.log(error)
        }
        this.disabled = false
      }
    }
  }
}
</script>
<style scoped lang="scss">
.base-button {
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
