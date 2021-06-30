<template>
  <div class="tail-grid tail-gap-4">
    <div class="tail-col-12">
      <h3 class="tail-text-3xl tail-mb-3">Forgot your password?</h3>
      <small class="tail-text-gray-400 tail-text-sm">
        Enter your registered email below to receive password reset instruction.
      </small>
    </div>
    <div class="tail-grid tail-gap-4">
      <form @submit.prevent="reset" class="tail-grid tail-gap-4">
        <div class="">
          <div class="tail-grid">
            <label for="email" class="tail-block tail-text-base tail-font-medium tail-text-gray-700">Email address</label>
            <input v-model="email" autocomplete="off" type="text" class="tail-bg-white tail-p-2.5 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
          </div>
        </div>

        <div class="tail-flex tail-justify-center">
          <ButtonSpinner :is-loading="isLoading">
            Send
          </ButtonSpinner>
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
