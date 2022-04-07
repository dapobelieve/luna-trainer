<template>
  <modal name="payment-method-bank-account" height="auto" width="500" :click-to-close="false">
    <PaymentMethodBankAccount @close="$modal.hide('payment-method-bank-account')" />
  </modal>
</template>

<script>

export default {
  name: 'PaymentMethodBankAccountModal'
}
</script>

<style lang="scss" scoped>

</style>
