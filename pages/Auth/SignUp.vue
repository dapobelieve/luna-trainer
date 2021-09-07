<template>
  <div class="tail-max-w-full">
    <div class="tail-grid tail-gap-10 tail-w-full tail-p-6 tail-bg-white tail-rounded-md tail-text-gray-600">
      <div class="tail-grid tail-grid-col-12">
        <h3 class="tail-text-xl tail-font-semibold">
          Sign up with email
        </h3>
      </div>
      <div class="tail-grid tail-gap-8 md:tail-gap-4">
        <form
          class="tail-grid tail-gap-12 md:tail-gap-4"
          @submit.prevent="signUp"
        >
          <div class="tail-grid">
            <label
              for="email"
              class="tail-block tail-text-base tail-font-medium tail-text-gray-700 required"
            >Email address</label>
            <input
              v-model.trim="$v.userInfo.email.$model"
              autocomplete="off"
              type="text"
              class="tail-bg-white tail-py-2 tail-px-4 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
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
                class="tail-block tail-text-base tail-font-medium tail-text-gray-700 required"
              >Password</label>
              <password-toggle v-model="showPassword" />
            </div>
            <input
              v-model.trim="$v.userInfo.password.$model"
              :type="showPassword ? 'text' : 'password'"
              class="tail-bg-white tail-py-2 tail-px-4 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
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
          <!-- <div class="tail-flex tail-justify-center">
          <button-spinner type="submit" :loading="isLoading" :disabled="$v.$invalid">
            {{ signUpText }}
          </button-spinner>
        </div> -->
          <div class="tail-flex tail-justify-end tail-py-4">
            <button
              style="width: fit-content"
              :class="{ 'tail-opacity-50 tail-cursor-not-allowed': $v.$invalid }"
              type="submit"
              :loading="isLoading"
              :disabled="$v.$invalid"
              class="primary-button"
            >
              <SingleLoader v-if="isLoading" class="tail-mr-2" />
              {{ signUpText }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="tail-text-center tail-mt-4 lg:tail-mt-8 tail-mb-6 md:tail-mb-0  tail-bg-white tail-rounded-md tail-py-8 tail-px-12">
      <span
        class="tail-text-gray-600"
      >Already have an account?
        <NuxtLink
          :to="{ name: 'Auth-SignIn' }"
          class="tail-text-blue-500 tail-no-underline"
        >Sign In</NuxtLink></span>
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
 .required:after {
    content:" *";
    color: red;
  }
</style>
