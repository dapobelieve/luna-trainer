<template>
  <div class="dropdown">
    <div
      class="
            tail-flex
            tail-justify-between
            tail-items-center
            tail-relative"
    >
      <input
        ref="dropdowninput"
        v-model.trim="inputValue"
        @blur="closeDropdown"
        class="dropdown-input"
        type="text"
      />
      <i
        class="ns-caret-down tail-font-bold tail-text-xl tail-cursor-pointer tail-absolute tail-right-0 tail-p-3"
        @click="showDropdown = !showDropdown"
      ></i>
    </div>
    <div
      v-show="showDropdown"
      class="dropdown-list"
    >
      <DropDownList
        :options="showFilteredOptions ? filteredOptions : options"
        @selected-option="selectOption"
        @add-new-item="addNewItem"
        v-bind="{...$props, ...$attrs}"/>
    </div>
  </div>
</template>

<script>
import DropDown from '../../mixins/dropdowns'
export default {
  mixins: [DropDown],
  model: {
    prop: 'options',
    event: 'change'
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    single: {
      type: Boolean,
      default: false
    },
    valueKey: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'firstName'
    },
    description: {
      type: String,
      default: 'description'
    },
    newItemText: {
      type: String,
      default: 'Add New Item'
    },
    showAvatar: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inputValue: '',
      showFilteredOptions: false,
      showDropdown: false,
      selectedOptions: []
    }
  },
  computed: {
    filteredOptions () {
      return this.options.filter((option) => {
        const keyword = `${option[this.name]} ${option[this.description]}`
        return keyword.toLowerCase().includes(this.inputValue.toLowerCase())
      })
    }
  },
  methods: {
    selectOption (option) {
      this.selectedOptions.push(option)

      this.inputValue = this.single ? option[this.name] : ''

      this.hideDropdown()

      this.$emit('change', this.single ? this.selectedOptions[0] : this.selectedOptions)
    },
    hideDropdown () {
      this.$nextTick(() => {
        this.showFilteredDropdown = false
        this.showDropdown = false
      })
    },
    closeDropdown (e) {
      const timeout = setTimeout(() => {
        this.hideDropdown()
        clearTimeout(timeout)
      }, 100)
    },
    addNewItem () {
      this.$emit('add-new-item', this.inputValue)
    }
  }
}
</script>

<style scoped>
</style>
