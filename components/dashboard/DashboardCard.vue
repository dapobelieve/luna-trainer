<template>
  <div class="bg-white rounded-xl border w-full">
    <slot></slot>
    <button @click="$emit('action', $event)" class="w-full bg-white py-2 mt-2 text-primary-color">View all</button>
  </div>
</template>
<script>
export default {
  components: {
  }
}
</script>

<style scoped>

</style>
