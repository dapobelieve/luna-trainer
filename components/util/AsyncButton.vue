<template>
  <button v-bind="$attrs" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  }
}
</script>
