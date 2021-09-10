<template>
  <div class="tail-max-w-full">
    <div class="tail-grid tail-gap-4 tail-w-full tail-p-6 tail-bg-white tail-rounded-md tail-text-gray-600">
      <div class="tail-grid tail-grid-col-12">
        <div class="">
          <h2 class="tail-text-2xl tail-font-semibold tail-my-2">
            Forgot Password?
          </h2>
        </div>
        <small class="tail-text-gray-400 tail-text-base tail-my-2">
          Please enter your registered email address to receive password reset instruction.
        </small>
      </div>
      <div class="tail-grid tail-gap-4">
        <form class="tail-grid tail-gap-4" @submit.prevent="reset">
          <div class="">
            <div class="tail-grid">
              <label for="email" class="tail-block tail-text-base tail-font-medium tail-text-gray-700 required">Email address</label>
              <input
                v-model.trim="$v.email.$model"
                :disabled="isLoading"
                autocomplete="off"
                type="text"
                class="tail-bg-white tail-py-2 tail-px-4 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
                :class="{invalid: $v.email.$error}"
                @click="$v.email.$touch()"
              />
              <div v-if="$v.email.$error" class="tail-mt-2">
                <small
                  v-if="!$v.email.required"
                  class="error tail-text-gray-500"
                >
                  Field is required.
                </small>
                <small
                  v-if="!$v.email.email"
                  class="error tail-text-gray-500 tail-text-sm"
                >
                  Must be valid email.
                </small>
              </div>
            </div>
          </div>

          <div class="tail-flex tail-justify-end tail-py-1">
            <button :loading="isLoading" class="primary-button" style="width: fit-content" :class="{ 'tail-opacity-50 tail-cursor-not-allowed': $v.$invalid }" :disabled="$v.$invalid">
              <SingleLoader v-if="isLoading" class="tail-mr-2" />
              {{ isLoading ? 'Resetting...' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="tail-text-center tail-mt-4 lg:tail-mt-8 tail-mb-6 md:tail-mb-0  tail-bg-white tail-rounded-md tail-py-8 tail-px-12">
      <NuxtLink :to="{ name: 'Auth-SignIn' }" class="tail-text-gray-900 tail-no-underline">
        Back to <span class="tail-text-blue-500">Sign in</span>
      </NuxtLink>
    </div>
  </div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'ForgotPassword',
  layout: 'authPassword',
  auth: false,
  data () {
    return {
      email: null,
      isLoading: false
    }
  },
  head () {
    return {
      title: 'Forgot Password'
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
<style scoped>
 .required:after {
    content:" *";
    color: red;
  }
</style>
