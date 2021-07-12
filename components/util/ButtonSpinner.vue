<template>
  <button :disabled="loading" class="base-button" v-bind="$attrs" v-on="$listeners">
    <SingleLoader v-if="loading" class="tail-mr-2" />
    <slot v-if="!loading" />
  </button>
</template>

<script>
export default {
  name: 'ButtonSpinner',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
