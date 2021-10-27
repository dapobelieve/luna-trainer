<template>
  <div>
    <div class="flex items-center justify-center flex-col">
      <div
        class="p-1 purple h-10 w-10 mb-4 rounded-full"
      >
        <h3 class="font-bold text-white text-2xl text-center">
          S
        </h3>
      </div>
      <div class="text-center font-normal text-base tracking-wide">
        <p>
          If you’re an existing Stripe user or have a verified account, you can connect to Stripe by click on the Stripe logo below. It’ll makes your whole experience easier.
        </p>  <br>
        <p>
          But, we also appreciate you’re new here so if you want to skip this section and head on into the rest of the onboarding process, you can do so and come back to setting up Stripe later! ✌️
        </p>
      </div>
      <div class="mt-5 lg:mt-6 mb-3 ">
        <button
          :disabled="isLoading"
          type="button"
          class="bg-white border border-gray-400 w-100 flex items-center justify-center py-3 h-12 lg:m-0 m-auto rounded-md w-full px-3 lg:px-12 hover:bg-gray-50 shadow-sm max-w-xs"
          @click="stripeConnect"
        >
          <SingleLoader v-if="isLoading" class="mr-2" />
          <template v-if="isLoading">
            Establishing Connection
          </template>
          <template v-else>
            Connect with
            <span
              class="pl-1 purple-text font-bold normal-case"
            >stripe</span>
          </template>
        </button>
      </div>
    </div>
    <div class=" flex justify-end mt-2 lg:mt-4">
      <button class="font-medium whitespace-nowrap text-blue-500 outline-none" @click="$emit('closeModal')">
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
