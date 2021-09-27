<template>
  <div class="tail-w-full">
    <div
      class="tail-bg-white tail-rounded-xl tail-border tail-p-4 md:tail-p-6 tail-flex tail-flex-col tail-gap-4 md:tail-gap-6"
    >
      <h1 class="tail-text-xl tail-font-bold tail-mt-0 md:tail-mt-2">Sign in with email</h1>
      <form class="tail-flex tail-flex-col tail-gap-4" @submit.prevent="login">
        <div class="tail-flex tail-flex-col tail-gap-1.5">
          <label for="userName" class="required">Email</label>
          <input
            v-model.trim="$v.userInfo.userName.$model"
            tabindex="1"
            :disabled="isLoading"
            autocomplete="off"
            type="text"
            class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
          />
          <div v-if="$v.$dirty">
            <small
              v-if="!$v.userInfo.userName.required"
              class="tail-text-gray-500"
            >Field is required.</small>
          </div>
        </div>
        <div class="tail-flex tail-flex-col tail-gap-1.5">
          <label for="password" class="required">Password</label>
          <div class="tail-flex tail-justify-between tail-items-center tail-relative">
            <input
              v-model.trim="$v.userInfo.password.$model"
              tabindex="2"
              :disabled="isLoading"
              :type="showPassword ? 'text':'password'"
              class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500 tail-pr-8"
              :class="{invalid: $v.userInfo.password.$error}"
            />
            <password-toggle v-model="showPassword" class="tail-absolute tail-right-0 tail-p-3" />
          </div>
          <div v-if="$v.$anyDirty">
            <small
              v-if="!$v.userInfo.password.required"
              class="tail-text-gray-500"
            >Password is required.</small>
            <small v-if="!$v.userInfo.password.minLength" class="tail-text-gray-500">
              Password must have at least
              {{ $v.userInfo.password.$params.minLength.min }} letters.
            </small>
          </div>
        </div>
        <!-- <div class="tail-flex tail-justify-center">
            <button-spinner type="submit" :loading="isLoading" :disabled="$v.$invalid">
              Login
            </button-spinner>
        </div>-->
        <div class="tail-flex tail-justify-between tail-items-center">
          <div>
            <NuxtLink
              :to="{ name: 'Auth-ForgotPassword' }"
              class="tail-text-blue-500 tail-font-medium tail-no-underline hover:tail-underline"
            >Forgot your password?</NuxtLink>
          </div>
          <button
            :class="{ 'tail-opacity-50 tail-cursor-not-allowed': $v.$invalid }"
            type="submit"
            :loading="isLoading"
            :disabled="$v.$invalid"
            class="button-fill"
          >
            <SingleLoader v-if="isLoading" class="tail-mr-2" />Login
          </button>
        </div>
      </form>
    </div>
    <div
      class="tail-text-center tail-mt-4 tail-bg-white tail-rounded-xl tail-border tail-h-auto md:tail-h-20 tail-flex tail-items-center tail-justify-center tail-px-4 tail-py-6"
    >
      Don't have an account?
      <NuxtLink
        :to="{ name: 'Auth-SignUp' }"
        class="tail-text-blue-500 tail-font-medium tail-ml-1 tail-no-underline hover:tail-underline"
      >Sign up</NuxtLink>
    </div>
  </div>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'SignIn',
  layout: 'auth',
  auth: false,
  data () {
    return {
      showPassword: false,
      isLoading: false,
      userInfo: {
        userName: '',
        password: '',
        domain: 'getwelp-trainer-ui'
      }
    }
  },
  head () {
    return {
      title: 'Sign In'
    }
  },
  validations: {
    userInfo: {
      userName: {
        required
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  created () {
    const { redirectClient } = this.$route.query
    if (redirectClient === 'google') {
      this.handleGoogleAuthCallback()
    }
  },
  methods: {
    authenticateWithTokens (tokens) {
      // set necessary tokens
      this.$store.dispatch('authorize/setToken', tokens)
      this.authenticate()
    },
    authenticate () {
      // fetch user profile
      this.$store.dispatch('profile/getUserProfile').then((response) => {
        if (response === null) {
          this.$router.push({ name: 'Auth-onboardingProfileSetup' })
        } else {
          this.$auth.setUser(response)
          // set user in local storage
          const getWelpUser = localStorage.getItem('getWelpUser')
          // eslint-disable-next-line curly
          if (getWelpUser !== null) localStorage.removeItem('getWelpUser')
          localStorage.setItem('getWelpUser', JSON.stringify(response))

          // set user in store
          this.$store.commit('profile/SET_GETWELP_USER', response)
          this.$router.push({ name: 'Dashboard' })
        }
      })
    },
    login () {
      if (this.userInfo.userName && this.userInfo.password) {
        this.isLoading = true
        this.$auth.loginWith('local', {
          data: {
            userName: this.userInfo.userName.toLowerCase(),
            password: this.userInfo.password,
            domain: 'getwelp-trainer-ui'
          }
        })
          .then((response) => {
            this.$toast.success('Login Successful', { position: 'bottom-right' })
            this.$store.dispatch('authorize/setToken', {
              token: response.data.data.accessToken,
              refreshToken: response.data.data.refreshToken
            })
            if (response.data.data.forceResetPassword) {
              this.$router.push({ name: 'Auth-CreateNewPassword' })
              this.$toast.info('Please Create A New Password', { position: 'bottom-right' })
            } else {
              this.authenticate()
            }
          })
          .catch(() => {
            this.$toast.error('Incorrect Login Credentials', { position: 'bottom-right' })
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },
    handleGoogleAuthCallback () {
      // console.log('hi', {
      //   token: this.$cookies.get('access_token'),
      //   refreshToken: this.$cookies.get('refresh_token')
      // })
      this.authenticateWithTokens({
        token: this.$cookies.get('access_token'),
        refreshToken: this.$cookies.get('refresh_token')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
