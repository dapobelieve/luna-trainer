<template>
  <div>
    <h2
      class="tail-text-lg tail-font-extrabold tail-tracking-tight tail-text-gray-700"
    >
      Connect your Stripe account
    </h2>
    <button
      :disabled="isLoading"
      type="button"
      class="base-button tail-bg-white tail-text-black tail-border tail-border-black tail-px-3 tail-py-1 tail-rounded tail-mt-5 tail-w-60"
    >
      <SingleLoader v-if="isLoading" class="tail-mr-2" />
      <template v-if="isLoading">
        Establishing Stripe Connection
      </template>
      <template v-else>
        Connect with <span class="tail-pl-1 tail-text-blue-700 tail-font-bold tail-normal-case">stripe</span>
      </template>
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'OnboardingStripe',
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    ...mapActions({
      connectStripe: 'invoice/stripeConnect'
    }),
    stripeConnect () {
      this.isLoading = true
      return this.connectStripe.then((response) => {
        window.location.href = response
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
