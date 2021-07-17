<template>
  <div>
    <CreateInvoice />
  </div>
</template>
<script>
export default {
  name: 'CreateInvoicePage',
  components: 'CreateInvoice',
  layout: 'emptyLayout',
  head () {
    return {
      title: 'New Invoice'
    }
  }
}
</script>

<style lang="scss" scoped></style>
