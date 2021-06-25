<template>
  <div class="card">
    <div class="tail-flex tail-justify-between tail-p-5">
      <div>
        <span>Create Invoice</span>
      </div>
      <div>
        <i class="ns-cross" />
      </div>
    </div>
    <div class="tail-flex">
      <div class="tail-px-64">
        <LeftInvoiceForm />
      </div>
      <div class="tail-absolute tail-right-0 tail-pb-10">
        <RightInvoiceForm />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.card {
  background-color: #fff;
  padding: 10px;
}

</style>
