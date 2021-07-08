<template>
  <div class="tail-w-full">
    <div
      v-if="isLoading"
      class="tail-mt-40 tail-px-5 tail-grid tail-gap-5 tail-justify-center tail-text-center"
    >
      <SingleLoader width="50px" height="50px" />
    </div>

    <slot v-else></slot>
  </div>
</template>

<script>
/* eslint-disable curly */
export default {
  name: 'PageLoaderView',
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
