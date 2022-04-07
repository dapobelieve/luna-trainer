<template>
 <payment-feedback title="Trainer notified"  >
        <i class="fi fi-rr-bell-ring my-3 text-white text-[30px]" slot="icon" />
        <p slot="description">Your trainer has been notified of payment on <br/> invoice <b class="text-black">#{{invoice}}</b>. Thank you</p>
         <button
            slot="button"
            class="button-fill"
        >
            Done
        </button>
    </payment-feedback>
</template>

<script>
import PaymentFeedback from '../../../components/invoices/PaymentFeeback.vue'
export default {
  name: 'InvoicePaymentNotify',
  layout: 'empty',
  components: {PaymentFeedback},
  middleware: ['validToken'],
  auth: false,
  data () {
    return {
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    },
    invoice() {
        return this.$route?.params?.id
    }
  },
  methods: {
  },
  head () {
    return {
      title: 'InvoicePaymentNotify'
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
