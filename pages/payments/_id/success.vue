<template>
  <payment-feedback title="Payment successful">
    <i slot="icon" class="fi-rr-check my-3 text-white text-[30px]" />
    <p slot="description">
      Your payment on invoice <b class="text-black">#{{ invoice }}</b> was <br /> successful. Thank you
    </p>
  </payment-feedback>
</template>

<script>
import PaymentFeedback from '../../../components/invoices/PaymentFeeback.vue'

export default {
  name: 'InvoicePaymentSuccess',
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
      title: 'InvoicePaymentSuccess'
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
