<template>
  <div>
    <div class="py-6">
      <h3 class="text-2xl font-medium sec-color">
        Connect
      </h3>
    </div>
    <div class="pb-4 py-5 px-5 rounded-md bg-white">
      <form autocomplete="off" class="grid gap-6">
        <div><span>Integrations</span></div>
        <div class="border w-full rounded flex flex-col md:flex-row justify-between p-4">
          <div class="flex justify-between items-center mx-auto md:mx-0 mb-2">
            <div>
              <img class="h-8" src="~/assets/img/strip.png" alt="google logo">
            </div>
          </div>

          <button
            v-if="!user.stripe || !user.stripe.connected"
            :disabled="isLoading"
            class="flex border-2 border-gray-400 px-2 py-1 rounded-md"
            @click.prevent="stripeConnect"
          >
            <SingleLoader v-if="isLoading" class="mr-2" />
            {{ isLoading ? 'Establishing Stripe Connection' : 'Connect with Stripe' }}
          </button>
          <button v-else disabled class="border-2 border-gray-400 px-2 py-1 rounded-md" @click.prevent="stripeConnect">
            Stripe Already Connected
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SettingsIntegration',
  props: {
    user: Object
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
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
