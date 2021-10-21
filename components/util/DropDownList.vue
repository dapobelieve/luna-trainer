<template>
  <div>
    <div
      v-for="option in options"
      :key="option[valueKey]"
      class="dropdown-Client"
      :class="[isSelected(option[valueKey]) ? 'tail-bg-blue-50' : 'tail-bg-white']"
      @click="toggleOption(option)"
    >
      <div class="tail-flex tail-justify-between tail-min-w-full tail-items-center">
        <div class="tail-flex tail-content-center">
          <ClientAvatar :width="2" :height="2" :client-info="option" v-if="showAvatar" />
          <div class="tail-flex tail-flex-col tail-ml-2 tail-text-gray-700">
            <p class="tail-capitalize">
              {{ flattenObject(option)[name]}}
            </p>
            <small class="tail-text-gray-500"> {{ flattenObject(option)[description] }}</small>
          </div>
        </div>
        <div v-if="isSelected(option[valueKey])">
          <i class="ns-check tail-text-blue-500 tail-text-lg"></i>
        </div>
      </div>
    </div>
    <button type="button" class="tail-py-4 tail-pl-3 tail-outline-none" @click="emitAddNewItem">
      <div class="tail-flex">
        <div class="tail-rounded-full tail-px-2 tail-py-1 tail-flex tail-items-center tail-justify-center">
          <i class="ns-plus tail-text-base tail-rounded-full tail-text-blue-500 tail-p-1" />
          <span class="text-primary-color tail-text-base tail-pl-2">{{ newItemText }} </span>
        </div>
      </div>
    </button>
  </div>
</template>

<script>
import Helpers from '../../mixins/helpers'
export default {
  mixins: [Helpers],
  props: {
    single: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true
    },
    selectedOptions: {
      type: Array,
      required: false
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
      $$selectedOptions: this.selectedOptions || []
    }
  },
  model: {
    prop: 'selectedOptions',
    event: 'change'
  },
  methods: {
    isSelected (key) {
      return this.$data.$$selectedOptions.find(option => option[this.valueKey] === key)
    },
    toggleOption (option) {
      if (this.single) {
        // we want only one item so we remove anything that was
        this.$data.$$selectedOptions.splice(1)
      }
      const selectedOptionId = option[this.valueKey]
      const selectedOptionIndex = this.$data.$$selectedOptions.findIndex(option => selectedOptionId === option[this.valueKey])
      if (selectedOptionIndex === -1) {
        this.$data.$$selectedOptions.push(option)
      } else {
        this.$data.$$selectedOptions.splice(selectedOptionIndex, 1)
      }
      this.$emit('change', this.$data.$$selectedOptions)
    },
    emitAddNewItem () {
      this.$emit('add-new-item')
    }
  }
}
</script>

<style>

</style>
