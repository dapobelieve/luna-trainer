<template>
  <div class="flex justify-between items-center mb-8">
    <drop-down-menu>
      <button
        :class="{
          'cursor-not-allowed text-gray-400': disabled,
        }"
        :disabled="isDefault || disabled"
        type="button"
        class="dropdown-button"
        @click="emitAndHideDropdown('default')"
      >
        Make default
      </button>
      <button
        type="button"
        class="dropdown-button"
        @click="emitAndHideDropdown(!disabled ? 'disable' : 'enable')"
      >
        {{ disabled ? "Enable" : "Disable" }}
      </button>
      <button
        type="button"
        class="dropdown-button flex items-center"
        @click="emitAndHideDropdown('action')"
      >
        {{ primaryActionText }}
      </button>
    </drop-down-menu>
  </div>
</template>

<script>
export default {
  name: 'PaymentMethodDropdown',
  props: {
    primaryActionText: '',
    isDefault: false,
    disabled: false
  },
  methods: {
    emitAndHideDropdown (event) {
      this.$emit(event)
    }
  }
}
</script>

<style lang="scss" scoped></style>
