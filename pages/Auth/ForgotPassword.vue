<template>
  <div class="w-full">
    <div
      class="bg-white rounded-xl border p-4 md:p-6 flex flex-col gap-4 md:gap-6"
    >
      <div>
        <h1 class="text-xl font-bold mt-0 md:mt-2">
          Forgot Password?
        </h1>
        <p
          class="text-gray-500 mt-2 text-sm"
        >
          Please enter your registered email address to receive password reset instruction.
        </p>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent="reset">
        <div class="flex flex-col gap-1.5">
          <label
            for="email"
            class="required"
            :class="{'text-red-400' : $v.email.$error}"
          >Email address</label>
          <input
            v-model="
              $v.email.$model"
            :disabled="isLoading"
            autocomplete="off"
            type="text"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
            :class="{'border-red-400' : $v.email.$error}"
          />
          <div v-if="$v.email.$error">
            <small
              v-if="!$v.email.email"
              class="error text-red-700"
            >Please enter a valid email address.</small>
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
            {{ isLoading ? 'Resetting...' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
    <div
      class="text-center mt-4 bg-white rounded-xl border h-auto md:h-20 flex items-center justify-center px-4 py-6"
    >
      <NuxtLink :to="{ name: 'Auth-SignIn' }">
        Back to
        <span
          class="text-blue-500 font-medium ml-1 no-underline hover:underline"
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
            this.$router.replace({ name: 'Auth-SignIn' }).then(() => {
              this.$toast.success('Reset password sent to your email', { position: 'bottom-right' })
            })
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
  @apply text-red-500 text-sm;
}
</style>
