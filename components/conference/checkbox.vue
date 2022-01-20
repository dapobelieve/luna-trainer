<template>
  <label class="border block w-full rounded-lg px-2 py-2 cursor-pointer">
    <div class="checkbox">
      <span class="text-base text-gray-700">{{ label }}</span>
      <input :checked="isChecked" :value="value" type="radio" name="radio" @change="updateInput">
      <span class="checkmark"></span>
    </div>
  </label>
</template>

<script>
let checkbox = 0
export default {
  model: {
    prop: 'checkboxValue',
    event: 'change'
  },
  props: {
    label: {},
    checkboxValue: {
      default: ''
    },
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      checkboxId: checkbox++
    }
  },
  computed: {
    isChecked () {
      return this.checkboxValue === this.value
    }
  },
  methods: {
    updateInput () {
      this.$emit('change', this.value)
    }
  }
}
</script>

<style lang="scss">
.checkbox {
  display: block;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
}

.checkmark {
  position: absolute;
  top: 1px;
  left: 0;
  height: 20px;
  width: 20px;
  border: 1px solid #64748B;
  border-radius: 50%;
  &:after {
    content: "";
    position: absolute;
    display: none;
    top: 6px;
    left: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
   }
}

.checkbox input:checked ~ .checkmark {
  background-color: #3B82F6;
  border: none;
}
.checkbox input:checked ~ .checkmark:after {
  display: block;
}
</style>
