<template>
  <div class="async">
    <p v-if="state.pending">Loading....</p>
    <p v-else-if="state.error">Error while fetching mountains</p>
    <slot v-else ></slot>
  </div>
</template>
<script>
export default {
  name: "Async",
  props:{
    state:{
      type:Object,
      required:true
    }
  }
}
</script>
<style lang="scss" scoped></style>
