<template>
  <div class="gw-text-input">
    <label v-if="label" :for="idName" class="input-text-label text-gray-700 block">{{ label }}</label>
    <input
      :id="idName"
      :style="computeStyle"
      :type="type"
      :class="className"
      :required="required"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="value"
      :autocomplete="autocomplete"
      :inputmode="inputmode"
      :step="step"
      :min="min"
      @input="onInput"
      @focus="$emit('focus')"
      @change="$emit('change')"
      @keyup="$emit('keyup')"
    />
  </div>
</template>

<script>
export default {
  name: 'GwInputField',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    invalid: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    inverted: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    idName: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    inputmode: {
      type: String,
      default: null
    },
    step: {
      type: String,
      default: null
    },
    min: {
      type: String,
      default: null
    },
    appendText: {
      type: String,
      default: null
    },
    alignRight: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computeStyle () {
      return {
        'text-align': this.alignRight ? 'right' : 'left'
      }
    }
  },
  methods: {
    onInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  @apply border-0 bg-none bg-transparent shadow-none focus:outline-none block w-full;
}
.information_box{
  height: 2.5rem;
  border: 1px solid #E2E8F0;
  padding: 7px 12px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  text-transform: capitalize;
}
</style>
