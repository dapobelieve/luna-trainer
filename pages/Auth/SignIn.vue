<template>
  <div class="tail-max-w-full">
    <div class="tail-grid tail-gap-6 md:tail-gap-10 tail-w-full tail-p-6 tail-bg-white tail-rounded-md tail-text-gray-600">
      <div class="tail-grid tail-grid-col-12">
        <h2 class="tail-text-2xl tail-font-semibold">
          Sign in with email
        </h2>
      </div>
      <div class="tail-grid tail-gap-12 md:tail-gap-8">
        <form class="tail-grid tail-gap-12 md:tail-gap-8" @submit.prevent="login">
          <div class="tail-grid">
            <label
              for="userName"
              class="tail-block tail-text-base tail-font-medium tail-text-gray-700 required"
            >
              Email
            </label>
            <input
              v-model.trim="$v.userInfo.userName.$model"
              tabindex="1"
              :disabled="isLoading"
              autocomplete="off"
              type="text"
              class="tail-bg-white tail-py-2 tail-px-4 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
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
              <label for="password" class="tail-block tail-text-base tail-font-medium tail-text-gray-700 required">Password</label>
              <password-toggle v-model="showPassword" />
            </div>
            <input
              v-model.trim="$v.userInfo.password.$model"
              tabindex="2"
              :disabled="isLoading"
              :type="showPassword ? 'text':'password'"
              class="tail-bg-white tail-py-2 tail-px-4 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
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
          <!-- <div class="tail-flex tail-justify-center">
            <button-spinner type="submit" :loading="isLoading" :disabled="$v.$invalid">
              Login
            </button-spinner>
          </div> -->
          <div class="tail-flex tail-justify-between tail-items-center tail-py-4">
            <div>
              <NuxtLink
                :to="{ name: 'Auth-ForgotPassword' }"
                class="tail-text-blue-500 tail-no-underline"
              >
                Forgot your password?
              </NuxtLink>
            </div>
            <button
              style="width: fit-content"
              :class="{ 'tail-opacity-50 tail-cursor-not-allowed': $v.$invalid }"
              type="submit"
              :loading="isLoading"
              :disabled="$v.$invalid"
              class="primary-button"
            >
              <SingleLoader v-if="isLoading" class="tail-mr-2" />
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="tail-text-center tail-mt-4 lg:tail-mt-8 tail-mb-6 md:tail-mb-0  tail-bg-white tail-rounded-md tail-py-8 tail-px-12">
      <span
        class="tail-text-gray-400"
      >Don't have an account?
        <NuxtLink
          :to="{ name: 'Auth-SignUp' }"
          class="tail-text-blue-500 tail-no-underline"
        >
          Sign up
        </NuxtLink>
      </span>
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
  methods: {
    authenticateWithTokens () {
      // set necessary tokens
      // this.$store.dispatch('authorize/setToken', tokens)
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
              this.authenticateWithTokens()
            }
          })
          .catch(() => {
            this.$toast.error('Incorrect Login Credentials', { position: 'bottom-right' })
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.required:after {
    content:" *";
    color: red;
  }
</style>
