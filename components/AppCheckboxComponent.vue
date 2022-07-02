<template>
  <label>
    <input
      :id="id"
      class="cursor-pointer h-4 w-4 border-grey-500"
      :value="value"
      :checked="shouldBeChecked"
      type="checkbox"
      :disabled="disabled"
      @click="$event.stopPropagation()"
      @change="check"
    >
    <slot></slot>
  </label>
</template>

<script>
/* eslint-disable */
let checkbox = 0
export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    checked: Boolean,
    disabled: Boolean,
    value: {
      type: [String, Number],
    },
    modelValue: {
      default: false
    },
    trueValue: {
      default: true
    },
    falseValue: {
      default: false
    },
  },
  data() {
    return {
      id: checkbox++
    }
  },
  computed: {
    shouldBeChecked() {
      if(this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value);
      }
      return this.modelValue === this.trueValue
    }
  },
  methods: {
    check (event) {
      if(this.disabled) {
        return;
      }
      let isChecked = event.target.checked;
      if(this.modelValue instanceof Array) {
        let newValue = [...this.modelValue];
        
        if(isChecked) {
          newValue.push(this.value);
        } else {
          newValue = newValue.filter(item => item !== this.value);
        }        
        this.$emit('change', newValue);
      }else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue);
      }
    }
  }
}
</script>

<style scoped>

</style>
