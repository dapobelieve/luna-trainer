<template>
  <div>
    <h5 class="tail-text-lg tail-font-medium">Connect your Stripe account</h5>
    <div class="tail-mt-6 lg:tail-mt-10">
      <button
        :disabled="isLoading"
        type="button"
        class="tail-bg-white tail-border tail-border-gray-400 tail-w-100 tail-flex tail-items-center tail-justify-center tail-py-3 tail-h-12 lg:tail-m-0 tail-m-auto tail-rounded-md tail-w-full tail-px-3 lg:tail-px-12 hover:tail-bg-gray-50 tail-shadow-sm tail-max-w-xs"
      >
        <SingleLoader v-if="isLoading" class="tail-mr-2" />
        <template v-if="isLoading">Establishing Stripe Connection</template>
        <template v-else>
          Connect with
          <span
            class="tail-pl-1 tail-text-blue-700 tail-font-bold tail-normal-case"
          >stripe</span>
        </template>
      </button>
    </div>
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
