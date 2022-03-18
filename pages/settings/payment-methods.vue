<template>
  <async-view>
    <div
      class="rounded-lg p-4 bg-white parent-container"
      style="min-height: calc(100vh - 96px)"
    >
      <h3 class="text-xl font-normal text-gray-700 mb-8">  Payments configuration </h3>
      <StripePaymentMethod :paymentMethod="stripe"/>
      <BankAccountPaymentMethod :paymentMethod="bankAccount"/>
    </div>
  </async-view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BankAccountPaymentMethod from '../../components/settings/payments-methods/BankAccountPaymentMethod'
import StripePaymentMethod from '../../components/settings/payments-methods/StripePaymentMethod'

export default {
  components: { BankAccountPaymentMethod,StripePaymentMethod },
  name: 'PaymentMethods',
  computed: {
    ...mapGetters('payment-methods', {
      bankAccount: 'getBankAccountPaymentMethod',
      stripe: 'getStripePaymentMethod',
    })
  },
  async mounted () {
    try {
      await this.getPaymentMethods() 
      console.log(this.stripe)
    } catch (error) {
      this.$gwtoast.error('No connected payment method')
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
