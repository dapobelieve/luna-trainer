<template>
  <div class="bg-gray-100 w-full min-h-screen">
    <div
      class="flex justify-between lg:grid grid-cols-3 bg-white px-4 py-3 items-center border-b border-gray-200"
    >
      <span class="text-2xl to-gray-700 font-normal">
        {{ sharedPage.page }}
      </span>
      <span :class="[showAutosavingText ? 'visible' : 'invisible', 'text-xs text-gray-500 lg:justify-self-center']">
        Saving as draft...
      </span>
      <i
        role="button"
        class="fi-rr-cross text-blue-500 text-md lg:justify-self-end"
        @click="$router.go(-1)"
      ></i>
    </div>
    <Nuxt
      class="m-4 lg:m-0 lg:pt-12 flex justify-center"
    />
    <!-- modals -->
    <modal
      name="connection"
      height="auto"
      width="500px"
      :adaptive="true"
      :click-to-close="false"
    >
      <PaymentConnection @closeModal="$modal.hide('connection')" />
    </modal>
  </div>
</template>
<script>
import PaymentConnection from '~/components/invoices/paymentConnectionStatus'
export default {
  name: 'InvoiceLayout',
  components: { PaymentConnection },
  provide () {
    return {
      sharedPage: this.sharedPage
    }
  },
  middleware ({ store, redirect, $gwtoast, $modal }) {
    const isBankAvailable = Boolean(Object.keys(store.state.payment.accountDetails.bank).length)
    const isStripeAvailable = Boolean(Object.keys(store.state.payment.accountDetails.stripe).length)
    console.log('hey')
    if (!isBankAvailable || !isStripeAvailable) {
      $gwtoast.success('Please connect a payment method')
      // return redirect('/settings/payment')
      $modal.show('connectionStatus')
    }
  },
  data () {
    return {
      showAutosavingText: false,
      sharedPage: {
        page: 'Create Invoice'
      }
    }
  },
  created () {
    this.$nuxt.$on('autosaving-invoice', () => {
      this.showAutosavingText = true
      setTimeout(() => {
        this.showAutosavingText = false
      }, 3500)
    })
  }
}
</script>
