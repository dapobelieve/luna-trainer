<template>
  <button
    type="submit"
    :disabled="isLoading"
    :class="[isLoading ? 'button--loading' : '', 'button', 'base-button']"
  >
    <slot class="button__text">
      Save
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

<style lang="scss" scoped>
.button {
  position: relative;
  padding: 8px 16px;
  background: #56ccf2;
  border: none;
  outline: none;
  border-radius: 2px;
  width: 100%;

  &:hover {
    background: #46A6C8;
  }
  &:focus {
    outline: none;
  }
}

.button:active {
  background: #3890A8;
}

.button__text {
  color: #ffffff;
  transition: all 0.2s;
}
.button--loading {
    cursor: not-allowed;
    background: #B6EAF8 !important;
}
.button--loading .button__text {
  visibility: hidden;
  opacity: 0;
}

.button--loading::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 4px solid transparent;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: button-loading-spinner 1s ease infinite;
}

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}

</style>
