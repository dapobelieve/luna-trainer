<template>
  <button
    :disabled="loading || disabled"
    class="button-fill"
    :class="[disabled?['bg-gray-500', 'cursor-not-allowed']: [] ]"
    type="submit"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <SingleLoader v-if="loading" class="mr-2" />
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
