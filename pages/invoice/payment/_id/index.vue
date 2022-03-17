<template></template>
<script>
export default {
  name: 'InvoicePayment',
  layout: 'InvoicePayment',
  middleware: ['validToken'],
  auth: false,
  data() {
    return {}
  },
  head() {
    return {
      title: 'InvoicePayment',
    }
  },
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
  content: ' *';
  @apply text-red-500 text-sm;
}
</style>
