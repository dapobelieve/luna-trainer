<template>
  <div class="tail-grid tail-gap-4">
    <div class="tail-col-12">
      <h3 class="tail-text-3xl tail-mb-3">
        Forgot your password?
      </h3>
      <small class="tail-text-gray-400 tail-text-sm">
        Enter your registered email below to receive password reset instruction.
      </small>
    </div>
    <div class="tail-grid tail-gap-4">
      <form class="tail-grid tail-gap-4" @submit.prevent="reset">
        <div class="">
          <div class="tail-grid">
            <label for="email" class="tail-block tail-text-base tail-font-medium tail-text-gray-700">Email address</label>
            <input
              v-model.trim="$v.email.$model"
              :disabled="isLoading"
              autocomplete="off"
              type="text"
              class="tail-bg-white tail-p-2.5 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
              :class="{invalid: $v.email.$error}"
              @click="$v.email.$touch()"
            />
            <div v-if="$v.email.$error" class="tail-mt-2">
              <small
                v-if="!$v.email.required"
                class="error tail-text-red-500"
              >
                Field is required.
              </small>
              <small
                v-if="!$v.email.email"
                class="error tail-text-red-500 tail-text-sm"
              >
                Must be valid email.
              </small>
            </div>
          </div>
        </div>

        <div class="tail-flex tail-justify-center">
          <button :disabled="isLoading" class="base-button">
            <SingleLoader v-if="isLoading" class="tail-mr-2" />
            {{ isLoading ? 'Resetting...' : 'Reset Password' }}
          </button>
        </div>
      </form>
      <div class="tail-text-center tail-pt-4">
        <NuxtLink :to="{ name: 'Auth-SignIn' }" class="tail-text-gray-900 tail-underline">
          Back to Sign in
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'ForgotPassword',
  layout: 'authLayout',
  auth: false,
  data () {
    return {
      email: null,
      isLoading: false
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    async reset () {
      if (this.email) {
        this.isLoading = true
        await this.$store.dispatch('authorize/forgotPassword', { email: this.email }).then((response) => {
          if (response.status === 'successful') {
            this.$toast.success('Reset password sent to your email', { position: 'bottom-right' })
          }
        }).catch((err) => {
          if (err.response) {
            this.$toast.error(`Something went wrong: ${err.response.data.message}`, { position: 'bottom-right' })
          } else if (err.request) {
            this.$toast.error('Something went wrong. Try again', { position: 'bottom-right' })
          } else {
            this.$toast.error(`Something went wrong: ${err.message}`, { position: 'bottom-right' })
          }
        }).finally(() => {
          this.isLoading = false
        })
      }
    }
  }
}
</script>
<style scoped></style>
