<template>
  <div class="tail-w-full">
    <div
      class="tail-bg-white tail-rounded-xl tail-border tail-p-4 md:tail-p-6 tail-flex tail-flex-col tail-gap-4 md:tail-gap-6"
    >
      <div>
        <h1 class="tail-text-xl tail-font-bold tail-mt-0 md:tail-mt-2">
          Forgot Password?
        </h1>
        <p
          class="tail-text-gray-500 tail-mt-2 tail-text-sm"
        >
          Please enter your registered email address to receive password reset instruction.
        </p>
      </div>

      <form class="tail-flex tail-flex-col tail-gap-4" @submit.prevent="reset">
        <div class="tail-flex tail-flex-col tail-gap-1.5">
          <label
            for="email"
            class="required"
            :class="{'tail-text-red-400' : $v.email.$error}"
          >Email address</label>
          <input
            v-model.lazy="
              $v.email.$model"
            :disabled="isLoading"
            autocomplete="off"
            type="text"
            class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
            :class="{'tail-border-red-400' : $v.email.$error}"
            @blur="$v.email.$touch()"
          />
          <div v-if="$v.email.$error">
            <small
              v-if="!$v.email.email"
              class="error tail-text-red-700"
            >Please enter a valid email address.</small>
          </div>
        </div>

        <div class="tail-flex tail-justify-end">
          <button
            :loading="isLoading"
            class="button-fill"
            :class="{ 'tail-opacity-50 tail-cursor-not-allowed': $v.$invalid }"
            :disabled="$v.$invalid"
          >
            <SingleLoader v-if="isLoading" class="tail-mr-2" />
            {{ isLoading ? 'Resetting...' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
    <div
      class="tail-text-center tail-mt-4 tail-bg-white tail-rounded-xl tail-border tail-h-auto md:tail-h-20 tail-flex tail-items-center tail-justify-center tail-px-4 tail-py-6"
    >
      <NuxtLink :to="{ name: 'Auth-SignIn' }">
        Back to
        <span
          class="tail-text-blue-500 tail-font-medium tail-ml-1 tail-no-underline hover:tail-underline"
        >Sign in</span>
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
  content: " *";
  @apply tail-text-red-500 tail-text-sm;
}
</style>
