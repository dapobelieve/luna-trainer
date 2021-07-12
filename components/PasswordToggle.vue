<template>
  <button
    type="button"
    class="focus:tail-outline-none"
    @click="toggle()"
  >
    <img
      v-if="value"
      class="tail-h-4"
      src="~/assets/img/eye-off-outline.svg"
      alt=""
      srcset=""
    />
    <img
      v-else
      class="tail-h-4"
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
    value: Boolean
  },
  data () {
    return {
      input: Boolean
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
