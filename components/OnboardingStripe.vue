<template>
  <div>
    <div class="tail-flex tail-items-center tail-justify-center tail-flex-col">
      <div
        class="tail-p-1 purple tail-h-10 tail-w-10 tail-mb-4 tail-rounded-full"
      >
        <h3 class="tail-font-bold tail-text-white tail-text-2xl tail-text-center">
          S
        </h3>
      </div>
      <div class="tail-text-center tail-font-normal tail-text-base leading-8 tail-tracking-wide">
        <p>
          If you’re an existing Stripe user or have a verified account, you can connect to Stripe by click on the Stripe logo below. It’ll makes your whole experience easier.
        </p>  <br>
        <p>
          But, we also appreciate you’re new here so if you want to skip this section and head on into the rest of the onboarding process, you can do so and come back to setting up Stripe later! ✌️
        </p>
      </div>
      <div class="tail-mt-5 lg:tail-mt-10 tail-mb-3 ">
        <button
          :disabled="isLoading"
          type="button"
          class="tail-bg-white tail-border tail-border-gray-400 tail-w-100 tail-flex tail-items-center tail-justify-center tail-py-3 tail-h-12 lg:tail-m-0 tail-m-auto tail-rounded-md tail-w-full tail-px-3 lg:tail-px-12 hover:tail-bg-gray-50 tail-shadow-sm tail-max-w-xs"
          @click="stripeConnect"
        >
          <SingleLoader v-if="isLoading" class="tail-mr-2" />
          <template v-if="isLoading">
            Establishing Connection
          </template>
          <template v-else>
            Connect with
            <span
              class="tail-pl-1 purple-text tail-font-bold tail-normal-case"
            >stripe</span>
          </template>
        </button>
      </div>
    </div>
    <div class=" tail-flex tail-justify-end tail-mt-2 lg:tail-mt-4">
      <button class="tail-font-medium tail-whitespace-nowrap tail-text-blue-500 tail-outline-none" @click="$emit('closeModal')">
        Skip
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
      return this.$store.dispatch('invoice/stripeConnect').then((response) => {
        window.location.href = response
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.purple{
  background: #635BFF;
}
.purple-text{
  color: #635BFF;
}

</style>
