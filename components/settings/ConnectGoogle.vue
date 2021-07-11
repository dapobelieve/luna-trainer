<template>
  <div>
    <div class="tail-py-6">
      <h3 class="tail-text-2xl tail-font-medium sec-color">
        Connect
      </h3>
    </div>
    <div class="tail-pb-4 tail-py-5 tail-px-5 tail-rounded-md tail-bg-white">
      <form autocomplete="off" class="tail-grid tail-gap-6">
        <div><span>Integrations</span></div>
        <div class="tail-border tail-w-full tail-rounded tail-flex tail-justify-between tail-p-4">
          <div class="tail-flex tail-justify-between tail-items-center">
            <div>
              <img class="tail-h-8" src="~/assets/img/strip.png" alt="google logo">
            </div>
          </div>

          <button
            v-if="!$store.state.authorize.stripeConnected"
            :disabled="isLoading"
            class="tail-flex tail-border-2 tail-border-gray-400 tail-px-2 tail-py-1 tail-rounded-md"
            @click.prevent="stripeConnect"
          >
            <SingleLoader v-if="isLoading" class="tail-mr-2" />
            {{ isLoading ? 'Establishing Stripe Connection' : 'Connect with Stripe' }}
          </button>
          <button v-else disabled class="tail-border-2 tail-border-gray-400 tail-px-2 tail-py-1 tail-rounded-md" @click.prevent="stripeConnect">
            Stripe Connected
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SettingsConnectGoogle',
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
