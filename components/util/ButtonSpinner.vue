<template>
  <button class="base-button" v-bind="$attrs" type="submit" v-on="$listeners">
    <SingleLoader v-if="isLoading" class="tail-mr-2" />
    <slot v-if="!isLoading">
    </slot>
  </button>
</template>

<script>
export default {
  name: 'ButtonSpinner',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
