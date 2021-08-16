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
        @click="handleOnClickGoogleButton"
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
      <form class="tail-grid tail-gap-12 md:tail-gap-8" @submit.prevent="login">
        <div class="tail-grid">
          <label
            for="userName"
            class="tail-block tail-text-base tail-font-medium tail-text-gray-700"
          >
            Email
          </label>
          <input
            v-model.trim="$v.userInfo.userName.$model"
            tabindex="1"
            :disabled="isLoading"
            autocomplete="off"
            type="text"
            class="tail-bg-white tail-p-2.5 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
          />
          <div v-if="$v.$dirty" class="tail-mt-0.5">
            <small
              v-if="!$v.userInfo.userName.required"
              class="tail-text-gray-600"
            >
              Field is required.
            </small>
          </div>
        </div>
        <div class="tail-grid">
          <div class="tail-flex tail-justify-between tail-items-center">
            <label for="password" class="tail-block tail-text-base tail-font-medium tail-text-gray-700">Password</label>
            <password-toggle v-model="showPassword" />
          </div>
          <input
            v-model.trim="$v.userInfo.password.$model"
            tabindex="2"
            :disabled="isLoading"
            :type="showPassword ? 'text':'password'"
            class="tail-bg-white tail-p-2.5 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"

            :class="{invalid: $v.userInfo.password.$error}"
          />
          <div v-if="$v.$anyDirty" class="tail-mt-0.5">
            <small
              v-if="!$v.userInfo.password.required"
              class="tail-text-gray-600"
            >
              Password is required.
            </small>
            <small
              v-if="!$v.userInfo.password.minLength"
              class="tail-text-gray-600"
            >
              Password must have at least
              {{ $v.userInfo.password.$params.minLength.min }} letters.
            </small>
          </div>
        </div>
        <div class="tail-flex tail-justify-center">
          <button-spinner type="submit" :loading="isLoading" :disabled="$v.$invalid">
            Login
          </button-spinner>
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
      // fetch user profile
      this.$store.dispatch('authorize/getUserProfile').then((response) => {
        if (response === null) {
          this.$router.push({ name: 'Auth-ProfileSetup' })
        } else {
          this.$auth.setUser(response)
          // set user in local storage
          const getWelpUser = localStorage.getItem('getWelpUser')
          // eslint-disable-next-line curly
          if (getWelpUser !== null) localStorage.removeItem('getWelpUser')
          localStorage.setItem('getWelpUser', JSON.stringify(response))

          // set user in store
          this.$store.commit('authorize/SET_GETWELP_USER', response)
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
            this.authenticateWithTokens({
              token: response.data.data.accessToken,
              refreshToken: response.data.data.refreshToken
            })
          })
          .catch(() => {
            this.$toast.error('Incorrect Login Credentials', { position: 'bottom-right' })
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },
    handleOnClickGoogleButton () {
      window.location = `${process.env.ACCOUNT_HOST_URL}/auth/google?redirectUrl=${window.location.href}%3FredirectClient%3Dgoogle`
    },
    handleGoogleAuthCallback () {
      this.authenticateWithTokens({
        token: this.$cookies.get('access_token'),
        refreshToken: this.$cookies.get('refresh_token')
      })
    }
  }
}
</script>
