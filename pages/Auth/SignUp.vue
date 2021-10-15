<template>
  <div class="tail-w-full">
    <div
      class="tail-bg-white tail-rounded-xl tail-border tail-p-4 md:tail-p-6 tail-flex tail-flex-col tail-gap-4 md:tail-gap-6"
    >
      <h1 class="tail-text-xl tail-font-bold tail-mt-0 md:tail-mt-2">
        Sign up with email
      </h1>
      <form class="tail-flex tail-flex-col tail-gap-4" @submit.prevent="signUp">
        <div class="tail-flex tail-flex-col tail-gap-1.5 tail-relative tail-mb-3">
          <label for="email" class="required" :class="{'tail-text-red-500' : $v.userInfo.email.$error}">Email address</label>

          <input
            v-model="$v.userInfo.email.$model"
            autocomplete="off"
            tabindex="1"
            type="email"
            class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-mb-2 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
            :class="{'tail-border-red-500' : $v.userInfo.email.$error}"
            @blur="$v.userInfo.email.$touch()"
          />
          <div v-if="$v.userInfo.email.$error" class="tail-absolute tail--bottom-5">
            <small
              v-if="!$v.userInfo.email.email"
              class="error tail-text-red-500"
            >Please enter a valid email address.</small>
          </div>
        </div>

        <div class="tail-flex tail-flex-col tail-gap-1.5 tail-relative tail-mb-3">
          <label for="password" class="required" :class="{'tail-text-red-500' : $v.userInfo.password.$error}">Password</label>
          <div class="tail-flex tail-justify-between tail-items-center tail-relative">
            <input
              v-model.trim="$v.userInfo.password.$model"
              :type="showPassword ? 'text' : 'password'"
              tabindex="2"
              class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-mb-2 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500 tail-pr-8"
              :class="{'tail-shadow-md tail-border-red-500' : $v.userInfo.password.$error}"
              @blur="$v.userInfo.password.$touch()"
            />
            <password-toggle v-model="showPassword" class="tail-absolute tail-right-0 tail-p-3" />
          </div>
          <div v-if="$v.userInfo.password.$error" class="tail-absolute tail--bottom-5">
            <small v-if="!$v.userInfo.password.minLength" class="error tail-text-red-500">
              Password must have at least
              {{ $v.userInfo.password.$params.minLength.min }} characters.
            </small>
          </div>
        </div>
        <div class="tail-flex tail-justify-end">
          <button
            :class="{ 'tail-opacity-50 tail-cursor-not-allowed': $v.$invalid }"
            type="submit"
            :loading="isLoading"
            :disabled="$v.$invalid"
            class="button-fill"
          >
            <SingleLoader v-if="isLoading" class="tail-mr-2" />
            {{ signUpText }}
          </button>
        </div>
      </form>
    </div>

    <div
      class="tail-text-center tail-mt-4 tail-bg-white tail-rounded-xl tail-border tail-h-auto md:tail-h-20 tail-flex tail-items-center tail-justify-center tail-px-4 tail-py-6"
    >
      Already have an account?
      <NuxtLink
        :to="{ name: 'Auth-SignIn' }"
        class="tail-text-blue-500 tail-font-medium tail-no-underline tail-ml-1 hover:tail-underline"
      >
        Sign in
      </NuxtLink>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'SignUp',
  layout: 'auth',
  middleware: ['validToken'],
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
        minLength: minLength(8)
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
                        ? this.$nuxt.$emit('profile')
                        : this.$router.replace({ name: 'Dashboard' })
                    })
                })
            } catch (error) {
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
  &:hover {
    background: #46a6c8;
  }
  &:focus {
    outline: none;
  }
}
.error {
  @apply tail-border-red-500;
}
.required:after {
  content: " *";
  @apply tail-text-red-500 tail-text-sm;
}
</style>
