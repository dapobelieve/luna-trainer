<template>
  <div class="bg-white rounded-xl border w-full flex flex-col">
    <slot class=""></slot>
    <button v-if="viewAll" class="mb-auto w-full bg-white py-2 mt-2 rounded-b-xl text-primary-color" @click="$emit('action', $event)">
      View all
    </button>
  </div>
</template>
<script>
export default {
  props: {
    viewAll: {
      type: Boolean,
      default: false
    }
  },
  components: {
  }
}
</script>

<style scoped>

</style>
