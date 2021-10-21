<template>
  <label>
    <input :id="id" class="tail-cursor-pointer tail-h-5 tail-w-5 tail-border-grey-500" :value="value" :checked="items.includes(value)" @change="check" type="checkbox" >
    <slot></slot>
  </label>
</template>

<script>
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
    },
  },
  methods: {
    check(e) {
      if(this.items.includes(this.value)) {
        this.items.splice(this.items.indexOf(this.value), 1)
      }else {
        this.items.push(this.value)
      }
      this.$emit('change', [...this.items])
    }
  }
}
</script>

<style scoped>

</style>