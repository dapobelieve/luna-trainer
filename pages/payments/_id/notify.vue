<template>
  <payment-feedback title="Trainer notified">
    <i slot="icon" class="fi fi-rr-bell-ring my-3 text-white text-[30px]" />
    <p slot="description">
      Your trainer has been notified of payment on <br /> invoice <b class="text-black">#{{ invoice }}</b>. Thank you
    </p>
  </payment-feedback>
</template>

<script>
import PaymentFeedback from '../../../components/invoices/PaymentFeeback.vue'
export default {
  name: 'InvoicePaymentNotify',
  components: { PaymentFeedback },
  layout: 'empty',
  middleware: ['validToken'],
  auth: false,
  data () {
    return {
    }
  },
  head () {
    return {
      title: 'InvoicePaymentNotify'
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    },
    invoice () {
      return this.$route?.params?.id
    }
  },
  methods: {
    goToHome () {
      this.$router?.replace({ name: 'auth' })
    }
  }
}
</script>
<style lang="scss" scoped>
.base-button {
  &:hover {
    background: #46a6c8;
  }
  &:focus {
    outline: none;
  }
}
.error {
  @apply border-red-500;
}
.required:after {
  content: " *";
  @apply text-red-500 text-sm;
}
</style>
