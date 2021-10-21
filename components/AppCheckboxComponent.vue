<template>
  <label>
    <input :id="id" class="tail-h-5 tail-w-5 tail-border-grey-500" :value="value" :checked="items.includes(value)" @change="check" type="checkbox" >
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
      type: Array
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
      console.log(this.items)
      if(e.target.checked) {
        this.items.push(this.value)
        this.$emit('change', [...this.items])
        console.log()
      }else {
        this.$emit('change', [...this.items.filter(item => item !== this.value)]) // emit based on type of variable
      }
    }
  }
}
</script>

<style scoped>

</style>