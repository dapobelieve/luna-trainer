<template>
  <label>
    <input
      :id="id"
      class="cursor-pointer h-5 w-5 border-grey-500"
      :value="value"
      :checked="items.includes(value)"
      type="checkbox"
      @click="$event.stopPropagation()"
      @change="check"
    >
    <slot></slot>
  </label>
</template>

<script>
/* eslint-disable */
export default {
  model: {
    prop: 'items',
    event: 'change'
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    id: {
      type: [String, Number]
    },
    value: {
      type: [String, Number, Boolean]
    }
  },
  methods: {
    check (e) {
      if (this.items.includes(this.value)) {
        this.items.splice(this.items.indexOf(this.value), 1)
      } else {
        this.items.push(this.value)
      }
      this.$emit('change', [...this.items])
    }
  }
}
</script>

<style scoped>

</style>
