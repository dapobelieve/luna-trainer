<template>
  <div class="w-full">
    <div
      class="bg-white rounded-xl border p-4 md:p-6 flex flex-col gap-4 md:gap-6"
    >
      <h1 class="text-xl font-bold mt-0 md:mt-2">
        Sign up with email
      </h1>
      <form class="flex flex-col gap-4" @submit.prevent="signUp">
        <div class="flex flex-col gap-1.5 relative mb-3">
          <label for="email" class="required" :class="{'text-red-500' : $v.userInfo.email.$error}">Email address</label>

          <input
            v-model="$v.userInfo.email.$model"
            autocomplete="off"
            tabindex="1"
            type="email"
            class="bg-white h-10 flex justify-center py-2 px-3 mb-2 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
            :class="{'border-red-500' : $v.userInfo.email.$error}"
          />
          <div v-if="$v.userInfo.email.$error" class="absolute -bottom-5">
            <small
              v-if="!$v.userInfo.email.email"
              class="error text-red-500"
            >Please enter a valid email address.</small>
          </div>
        </div>
        <div class="flex flex-col gap-1.5 relative mb-3">
          <label for="password" class="required" :class="{'text-red-500' : $v.userInfo.password.$error}">Password</label>
          <div class="flex justify-between items-center relative">
            <input
              v-model.trim="$v.userInfo.password.$model"
              :type="showPassword ? 'text' : 'password'"
              tabindex="2"
              class="bg-white h-10 flex justify-center py-2 px-3 mb-2 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500 pr-8"
              :class="{'shadow-md border-red-500' : $v.userInfo.password.$error}"
            />
            <password-toggle v-model="showPassword" class="absolute right-0 p-3" />
          </div>
          <div v-if="$v.userInfo.password.$error" class="absolute -bottom-5">
            <small v-if="!$v.userInfo.password.minLength" class="error text-red-500">
              Password must have at least
              {{ $v.userInfo.password.$params.minLength.min }} characters.
            </small>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            :class="{ 'opacity-50 cursor-not-allowed': $v.$invalid }"
            type="submit"
            :disabled="isLoading"
            class="button-fill"
          >
            <SingleLoader v-if="isLoading" class="mr-2" />
            {{ signUpText }}
          </button>
        </div>
      </form>
    </div>

    <div
      class="text-center mt-4 bg-white rounded-xl border h-auto md:h-20 flex items-center justify-center px-4 py-6"
    >
      Already have an account?
      <NuxtLink
        :to="{ name: 'auth-signin' }"
        class="text-blue-500 font-medium no-underline ml-1 hover:underline"
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
                  this.$gwtoast.success('Signup Successful', {
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
                this.$gwtoast.error(
                  `Something went wrong: ${error.response.data.message}`,
                  { position: 'bottom-right' }
                )
              } else if (error.request) {
                this.$gwtoast.error('Something went wrong. Try again', {
                  position: 'bottom-right'
                })
              } else {
                this.$gwtoast.error(`Something went wrong: ${error.message}`, {
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
        })
        .finally(() => {
          this.isLoading = false
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
  @apply border-red-500;
}
.required:after {
  content: " *";
  @apply text-red-500 text-sm;
}
</style>