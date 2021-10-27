<template>
  <div class="w-full">
    <div
      v-if="isLoading"
      class="mt-40 px-5 grid gap-5 justify-center text-center"
    >
      <SingleLoader width="50px" height="50px" />
    </div>

    <slot v-else></slot>
  </div>
</template>

<script>
/* eslint-disable curly */
export default {
  name: 'AsyncView',
  props: {
    loaderId: {
      type: String,
      default: ''
    }
  },
  computed: {
    isLoading () {
      if (!this.$store.state.loader.isLoading) return false
      if (this.$store.state.loader.id === this.loaderId) return true
      return false
    }
  }
}
</script>
