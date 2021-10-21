<template>
  <main class="tail-bg-white">
    <div class="tail-flex tail-justify-between tail-p-5">
      <span>
        Create Invoice
      </span>
      <i role="button" class="ns-cross" @click="$router.go(-1)"></i>
    </div>
    <Nuxt />
  </main>
</template>
<script>
export default {
  name: 'Invoice'
}
</script>
<style lang="scss">
</style>
