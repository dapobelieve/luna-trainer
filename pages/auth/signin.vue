<template>
  <div class="w-full">
    <div
      class="bg-white rounded-xl border p-4 md:p-6 flex flex-col gap-4 md:gap-6"
    >
      <h1 class="text-xl font-bold mt-0 md:mt-2">
        Sign in with email
      </h1>
      <form class="flex flex-col gap-4" @submit.prevent="login">
        <div class="flex flex-col gap-1.5 relative mb-3">
          <label
            for="email"
            class="required"
            :class="{ 'text-red-500': $v.userInfo.email.$error }"
          >Email</label>

          <input
            v-model="$v.userInfo.email.$model"
            :disabled="isLoading"
            tabindex="1"
            autocomplete="off"
            type="email"
            class="bg-white h-10 flex justify-center py-2 px-3 mb-2 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
            :class="{ 'border-red-500': $v.userInfo.email.$error }"
          />
          <div v-if="$v.userInfo.email.$error" class="absolute -bottom-5">
            <small
              v-if="!$v.userInfo.email.email"
              class="error text-red-500"
            >Please enter a valid email address.</small>
          </div>
        </div>
        <div class="flex flex-col gap-1.5 relative mb-3">
          <label
            for="password"
            class="required"
            :class="{ 'text-red-500': $v.userInfo.password.$error }"
          >Password</label>

          <div class="flex justify-between items-center relative">
            <input
              v-model.trim="$v.userInfo.password.$model"
              tabindex="2"
              :disabled="isLoading"
              :type="showPassword ? 'text' : 'password'"
              class="bg-white h-10 flex justify-center py-2 px-3 mb-2 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500 pr-8"
              :class="{
                'shadow-md border-red-500': $v.userInfo.password.$error,
              }"
            />
            <password-toggle
              v-model="showPassword"
              class="absolute right-0 p-3"
            />
          </div>
          <div v-if="$v.userInfo.password.$error" class="absolute -bottom-5">
            <small
              v-if="!$v.userInfo.password.minLength"
              class="error text-red-500"
            >
              Password must have at least
              {{ $v.userInfo.password.$params.minLength.min }} characters.
            </small>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <NuxtLink
              :to="{ name: 'auth-forgotpassword' }"
              class="text-blue-500 font-medium no-underline hover:underline"
            >
              Forgot your password?
            </NuxtLink>
          </div>
          <button
            :class="{ 'opacity-50 cursor-not-allowed': $v.$invalid }"
            type="submit"
            :disabled="isLoading"
            class="button-fill"
          >
            <SingleLoader v-if="isLoading" class="mr-2" />Login
          </button>
        </div>
      </form>
    </div>
    <div
      class="text-center mt-4 bg-white rounded-xl border h-auto md:h-20 flex items-center justify-center px-4 py-6"
    >
      Don't have an account?
      <NuxtLink
        :to="{ name: 'auth-signup' }"
        class="text-blue-500 font-medium ml-1 no-underline hover:underline"
      >
        Sign up
      </NuxtLink>
    </div>
  </div>
</template>
<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'SignIn',
  layout: 'auth',
  middleware: ['validToken'],
  auth: false,
  data () {
    return {
      showPassword: false,
      isLoading: false,
      userInfo: {
        email: '',
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
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
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
    ...mapMutations({
      setTempState: 'profile/SET_STATE',
      setProfile: 'profile/SET_PROFILE'
    }),
    ...mapActions({
      setToken: 'authorize/setToken',
      getUserProfile: 'profile/getUserProfile'
    }),
    authenticateWithTokens (tokens) {
      this.$store.dispatch('authorize/setToken', tokens)
      this.authenticate()
    },
    async authenticate () {
      try {
        const profile = await this.getUserProfile()
        this.setProfile(profile)
        localStorage.setItem('profile', JSON.stringify(profile))
        if (!profile.services.length) {
          console.log('hit here')
          this.$router.push({ name: 'auth-onboarding' })
        } else {
          console.log('hit there')
          this.$router.push({ name: 'dashboard' })
        }
      } catch (err) {
        this.$gwtoast.error('Something went wrong', {
          position: 'bottom-right'
        })
      }
    },
    async login () {
      if (this.userInfo.email && this.userInfo.password) {
        this.isLoading = true
        try {
          const { data } = await this.$auth.loginWith('local', {
            data: {
              email: this.userInfo.email.toLowerCase(),
              password: this.userInfo.password,
              domain: 'getwelp-trainer-ui'
            }
          })
          this.$gwtoast.success('Login Successful')
          const forceResetPassword = data.data.forceResetPassword
          this.setToken({
            token: data.data.accessToken,
            refreshToken: data.data.refreshToken
          })
          if (forceResetPassword) {
            this.$router.push({ name: 'auth-createnewpassword' })
            this.$gwtoast.show('Please Create A New Password')
          } else {
            this.authenticate()
          }
        } catch (err) {
          if (err.response) {
            this.$gwtoast.error(
              `Something went wrong: ${err.response.data.message}`,
              { position: 'bottom-right' }
            )
          } else if (err.request) {
            this.$gwtoast.error('Something went wrong. Try again', {
              position: 'bottom-right'
            })
          } else {
            this.$gwtoast.error(`Something went wrong: ${err.message}`, {
              position: 'bottom-right'
            })
          }
        }
        this.isLoading = false
      }
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
<style lang="scss"></style>
