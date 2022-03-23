<template>
  <async-view>
    <div
      class="rounded-lg p-4 bg-white parent-container"
      style="min-height: calc(100vh - 96px)"
    >
      <h1 class="text-xl font-normal text-gray-700 mb-8">  Billing Setup </h1>
      <h3 class="tracking-wide uppercase font-medium text-gray-500 text-xs mb-8">  Payment methods </h3>
      <StripePaymentMethod/>
      <BankAccountPaymentMethod/>
    </div>
  </async-view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BankAccountPaymentMethod from '../../components/settings/billing-setup/BankAccountPaymentMethod'
import StripePaymentMethod from '../../components/settings/billing-setup/StripePaymentMethod'

export default {
  components: { BankAccountPaymentMethod,StripePaymentMethod },
  name: 'PaymentMethods',
  async mounted () {
    try {
      await this.getPaymentMethods() 
      console.log(this.stripe)
    } catch (error) {
      this.$lunaToast.error('No connected payment method')
    }
  },
  methods: {
    ...mapActions({
      getPaymentMethods: 'payment-methods/getPaymentMethods',
    })
  }
}
</script>

<style lang="scss" scoped></style>
