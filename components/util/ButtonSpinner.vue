<template>
  <button
    :disabled="loading || disabled"
    class="base-button"
    :class="[disabled?['tail-bg-gray-500', 'tail-pointer-events-none']: [] ]"
    type="submit"
    v-bind="$attrs"
    v-on="$listeners">
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
