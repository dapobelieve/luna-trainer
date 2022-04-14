<template>
  <button
    type="button"
    class="focus:outline-none"
    @click="toggle()"
  >
    <i v-if="value" class="fi-rr-eye text-sm text-gray-500"></i>
    <i v-else class="fi-rr-eye-crossed text-sm text-gray-500"></i>
  </button>
</template>

<script>
export default {
  name: 'PasswordToggle',
  props: {
    value: Boolean,
    default: true
  },
  data () {
    return {
      input: this.value
    }
  },
  methods: {
    toggle () {
      this.input = !this.input
      this.$emit('input', this.input)
    }
  }
}
</script>
