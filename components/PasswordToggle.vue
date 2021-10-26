<template>
  <button
    type="button"
    class="focus:outline-none"
    @click="toggle()"
  >
    <img
      v-if="value"
      class="h-4"
      src="~/assets/img/eye-off-outline.svg"
      alt=""
      srcset=""
    />
    <img
      v-else
      class="h-4"
      src="~/assets/img/eye-outline.svg"
      alt=""
      srcset=""
    />
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
