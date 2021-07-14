<template>
  <div class="tail-grid tail-gap-10">
    <div class="tail-grid tail-grid-col-12">
      <h3 class="tail-text-3xl">
        Sign up
      </h3>
    </div>
    <div class="tail-grid tail-grid-col-12 tail-mb-4">
      <button
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
        <div class="tail-grid error" :class="{ 'error': $v.userInfo.userName.$error }">
          <label
            for="username"
            class="tail-block tail-text-base tail-font-medium tail-text-gray-700"
          >Username</label>
          <input
            v-model.trim="$v.userInfo.userName.$model"
            autocomplete="off"
            type="text"
            class="tail-bg-white tail-p-2.5 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
            :class="{invalid: $v.userInfo.userName.$error}"
            @click="$v.userInfo.userName.$touch()"
          />
          <div v-if="$v.userInfo.userName.$error" class=" tail-mt-1">
            <small
              v-if="!$v.userInfo.userName.required"
              class="error tail-text-red-500"
            >
              Field is required.
            </small>
          </div>
        </div>
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
            :class="{invalid: $v.userInfo.email.$error}"
            @click="$v.userInfo.email.$touch()"
          />
          <div v-if="$v.userInfo.email.$error" class=" tail-mt-1">
            <small
              v-if="!$v.userInfo.email.required"
              class="error tail-text-red-500"
            >
              Field is required.
            </small>
            <small
              v-if="!$v.userInfo.email.email"
              class="error tail-text-red-500"
            >
              Must be valid email.
            </small>
          </div>
        </div>
        <div class="tail-grid">
          <div class="tail-flex tail-justify-between tail-items-center">
            <label
              for="password"
              class="tail-block tail-text-base tail-font-medium tail-text-gray-700"
            >Password</label>
            <button
              type="button"
              class="focus:tail-outline-none"
              @click="showPassword = !showPassword"
            >
              <img
                v-if="showPassword"
                class="tail-h-4"
                src="~/assets/img/eye-off-outline.svg"
                alt=""
                srcset=""
              />
              <img
                v-else
                class="tail-h-4"
                src="~/assets/img/eye-outline.svg"
                alt=""
                srcset=""
              />
            </button>
          </div>
          <input
            v-model.trim="$v.userInfo.password.$model"
            :type="showPassword ? 'text' : 'password'"
            class="tail-bg-white tail-p-2.5 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
            :class="{invalid: $v.userInfo.password.$error}"
            @click="$v.userInfo.password.$touch()"
          />
          <div v-if="$v.userInfo.password.$error" class="tail-mt-1">
            <small
              v-if="!$v.userInfo.password.required"
              class="error tail-text-red-500"
            >
              Password is required.
            </small>
            <small
              v-if="!$v.userInfo.password.minLength"
              class="error tail-text-red-500"
            >
              Password must have at least
              {{ $v.userInfo.password.$params.minLength.min }} letters.
            </small>
          </div>
        </div>

        <div class="tail-grid">
          <div class="tail-flex tail-justify-between tail-items-center">
            <label
              for="password"
              class="tail-block tail-text-base tail-font-medium tail-text-gray-700"
            >Confirm Password</label>
            <button
              type="button"
              class="focus:tail-outline-none"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <img
                v-if="showConfirmPassword"
                class="tail-h-4"
                src="~/assets/img/eye-off-outline.svg"
                alt=""
                srcset=""
              />
              <img
                v-else
                class="tail-h-4"
                src="~/assets/img/eye-outline.svg"
                alt=""
                srcset=""
              />
            </button>
          </div>
          <input
            v-model.trim="$v.userInfo.confirmPassword.$model"
            :type="showConfirmPassword ? 'text' : 'password'"
            class="tail-bg-white tail-p-2.5 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
            @click="$v.userInfo.confirmPassword.$touch()"
          />
          <div v-if="$v.userInfo.confirmPassword.$error" class="tail-mt-1">
            <small
              v-if="!$v.userInfo.confirmPassword.required"
              class="error tail-text-red-500"
            >
              Password is required.
            </small>
            <small
              v-if="!$v.userInfo.confirmPassword.sameAsPassword"
              class="error tail-text-red-500"
            >
              Passwords must be identical.
            </small>
          </div>
        </div>
        <div class="tail-flex tail-justify-center">
          <button-spinner  :loading="isLoading" :disabled="disabled" type="submit"> Get Started </button-spinner>
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
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'SignUp',
  layout: 'authLayout',
  auth: false,
  data () {
    return {
      showPassword: false,
      showConfirmPassword: false,
      isLoading: false,
      userInfo: {
        userName: null,
        email: '',
        password: null,
        confirmPassword: null,
        domain: 'getwelp-trainer-ui'
      }
    }
  },
  validations: {
    userInfo: {
      userName: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  computed: {
    disabled () {
      console.log(this.$v)
      return this.$v.$error || this.isLoading
    }
  },
  methods: {
    ...mapActions({
      signUpUser: 'authorize/signUpUser'
    }),
    signUp () {
      this.isLoading = true
      return this.signUpUser(this.userInfo)
        .then((result) => {
          if (result === 'success') {
            try {
              this.$auth
                .login({
                  data: {
                    userName: this.userInfo.userName,
                    password: this.userInfo.password,
                    domain: 'getwelp-trainer-ui'
                  }
                })
                .then((response) => {
                  this.$toast.success('Signup Successful', {
                    position: 'bottom-right'
                  })
                  const tokens = {
                    token: response.data.data.accessToken,
                    refreshToken: response.data.data.refreshToken
                  }
                  // set necessary tokens
                  this.$store.dispatch('authorize/setToken', tokens)
                  // fetch user profile
                  this.$store
                    .dispatch('authorize/getUserProfile')
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
        }).finally(() => {
          this.isLoading = false
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
