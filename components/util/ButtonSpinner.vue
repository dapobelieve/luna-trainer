<template>
  <button :disabled="loading || disabled" class="base-button" type="submit" v-bind="$attrs" v-on="$listeners">
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
