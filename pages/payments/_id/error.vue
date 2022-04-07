<template>
    <payment-feedback title="Payment failed"  >
        <i class="fi fi-rr-cross my-3 text-white text-[30px]" slot="icon" />
        <p slot="description">Your payment on invoice <b class="text-black">#{{invoice}}</b> failed</p>
         <button
            slot="button"
            class="button-fill"
        >
            Retry
        </button>
    </payment-feedback>
</template>

<script>
import PaymentFeedback from '../../../components/invoices/PaymentFeeback.vue'
export default {
  name: 'InvoicePaymentError',
  components: {PaymentFeedback},
  layout: 'empty',
  middleware: ['validToken'],
  auth: false,
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    routeName () {
      return this.$route.name
    },
    invoice() {
        return this.$route?.params?.id
    }
  },
  head () {
    return {
      title: 'InvoicePaymentError'
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
