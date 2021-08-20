<template>
  <div class="tail-grid tail-gap-10">
    <div class="tail-grid tail-grid-col-12">
      <h3 class="tail-text-3xl">
        Sign up
      </h3>
    </div>
    <div class="tail-grid tail-grid-col-12 tail-mb-4">
      <button
        @click.prevent="handleOnClickGoogleButton"
        type="button"
        class="tail-bg-white tail-border tail-w-100 tail-flex tail-align-center tail-justify-center tail-p-1.5 tail-rounded"
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
    <div class="tail-grid tail-gap-8 md:tail-gap-4">
      <form
        class="tail-grid tail-gap-12 md:tail-gap-4"
        @submit.prevent="signUp"
      >
        <div class="tail-grid">
          <label
            for="email"
            class="tail-block tail-text-base tail-font-medium tail-text-gray-700"
          >Email address</label>
          <input
            v-model.trim="$v.userInfo.email.$model"
            autocomplete="off"
            type="text"
            class="tail-bg-white tail-p-2.5 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
          />
          <div v-if="$v.$anyDirty" class="tail-mt-1">
            <small
              v-if="!$v.userInfo.email.required"
              class="error tail-text-gray-500"
            >
              Email address is required.
            </small>
            <small
              v-if="!$v.userInfo.email.email"
              class="error tail-text-gray-500"
            >
              Email address be valid email.
            </small>
          </div>
        </div>
        <div class="tail-grid">
          <div class="tail-flex tail-justify-between tail-items-center">
            <label
              for="password"
              class="tail-block tail-text-base tail-font-medium tail-text-gray-700"
            >Password</label>
            <password-toggle v-model="showPassword" />
          </div>
          <input
            v-model.trim="$v.userInfo.password.$model"
            :type="showPassword ? 'text' : 'password'"
            class="tail-bg-white tail-p-2.5 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
          />
          <div v-if="$v.$anyDirty" class="tail-mt-1">
            <small
              v-if="!$v.userInfo.password.required"
              class="error tail-text-gray-500"
            >
              Password is required.
            </small>
            <small
              v-if="!$v.userInfo.password.minLength"
              class="error tail-text-gray-500"
            >
              Password must have at least
              {{ $v.userInfo.password.$params.minLength.min }} letters.
            </small>
          </div>
        </div>
        <div class="tail-flex tail-justify-center">
          <button-spinner type="submit" :loading="isLoading" :disabled="$v.$invalid">
            {{ signUpText }}
          </button-spinner>
        </div>
      </form>
      <div class="tail-text-center tail-mt-4">
        <span
          class="tail-text-gray-400"
        >Already have an account?
          <NuxtLink
            :to="{ name: 'Auth-SignIn' }"
            class="tail-text-gray-900 tail-underline"
          >Sign In</NuxtLink></span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'SignUp',
  layout: 'auth',
  auth: false,
  data () {
    return {
      showPassword: false,
      signUpText: 'get started',
      isLoading: false,
      userInfo: {
        email: '',
        password: null,
        domain: 'getwelp-trainer-ui'
      }
    }
  },
  head () {
    return {
      title: 'Sign Up'
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
        minLength: minLength(6)
      }
    }
  },
  methods: {
    ...mapActions({
      signUpUser: 'authorize/signUpUser'
    }),
    handleOnClickGoogleButton () {
      const { host, protocol } = window.location
      window.location = `${process.env.ACCOUNT_HOST_URL}/auth/google?redirectUrl=${protocol}//${host}/Auth/SignIn%3FredirectClient%3Dgoogle`
    },
    signUp () {
      this.isLoading = true
      this.userInfo.userName = `${this.userInfo.email.split('@')[1]}_${new Date().getTime()}`
      return this.signUpUser(this.userInfo)
        .then((result) => {
          if (result === 'success') {
            try {
              this.$auth
                .login({
                  data: {
                    email: this.userInfo.email,
                    password: this.userInfo.password,
                    domain: 'getwelp-trainer-ui'
                  }
                })
                .then((response) => {
                  this.$toast.success('Signup Successful', {
                    position: 'bottom-right'
                  })
                  this.isLoading = false
                  this.signUpText = 'please wait...'
                  const tokens = {
                    token: response.data.data.accessToken,
                    refreshToken: response.data.data.refreshToken
                  }
                  // set necessary tokens
                  this.$store.dispatch('authorize/setToken', tokens)
                  // fetch user profile
                  this.$store
                    .dispatch('profile/getUserProfile')
                    .then((response) => {
                      response === null
                        ? this.$router.push({
                          name: 'Auth-ProfileSetup',
                          params: { email: this.userInfo.email }
                        })
                        : this.$router.push({ name: 'Dashboard' })
                    })
                })
            } catch (error) {
              console.log(error)
              if (error.response) {
                this.$toast.error(
                  `Something went wrong: ${error.response.data.message}`,
                  { position: 'bottom-right' }
                )
              } else if (error.request) {
                this.$toast.error('Something went wrong. Try again', {
                  position: 'bottom-right'
                })
              } else {
                this.$toast.error(`Something went wrong: ${error.message}`, {
                  position: 'bottom-right'
                })
              }
            }
          }
        })
        .catch((err) => {
          this.isLoading = false
          this.signUpText = 'get started'
          console.log(err)
          if (err.response) {
            this.$toast.error(
              `Something went wrong: ${err.response.data.message}`,
              { position: 'bottom-right' }
            )
          } else if (err.request) {
            this.$toast.error('Something went wrong. Try again', {
              position: 'bottom-right'
            })
          } else {
            this.$toast.error(`Something went wrong: ${err.message}`, {
              position: 'bottom-right'
            })
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.base-button {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #46a6c8;
  }
  &:focus {
    outline: none;
  }
}
.error{
  border-color: red;
}
</style>
