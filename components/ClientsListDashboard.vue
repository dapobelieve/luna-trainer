<template>
  <div class="tail-grid tail-grid-cols-3 tail-gap-4">
    <div
      v-for="n in 5"
      :key="n"
      class="card-width tail-rounded tail-bg-gray-300"
    >
      <div>stuff</div>
    </div>
    <div>another</div>
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
.card-width {
    width: 8.125rem;
    height: 9.813rem;
}
</style>
