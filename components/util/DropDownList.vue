<template>
  <div>
    <div
      v-for="option in options"
      :key="option[valueKey]"
      class="dropdown-Client"
      :class="[option[valueKey] === selectedOptionId ? 'tail-bg-blue-50' : 'tail-bg-white']"
      @click="selectOption(option)"
    >
      <div class="tail-flex tail-justify-between tail-min-w-full tail-items-center">
        <div class="tail-flex">
          <ClientAvatar :client-info="option" v-if="showAvatar" />
          <div class="tail-flex tail-flex-col tail-ml-2 tail-text-gray-700">
            <p class="tail-capitalize">
              {{ option[name]}}
            </p>
            <p> {{ option[description] }}</p>
          </div>
        </div>
        <div v-if="option[valueKey] === selectedOptionId">
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
export default {
  props: {
    options: {
      type: Array,
      required: true
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
      selectedOptionId: ''
    }
  },
  methods: {
    selectOption (option) {
      this.selectedOptionId = option[this.valueKey]
      this.$emit('selected-option', option)
    },
    emitAddNewItem () {
      this.$emit('add-new-item')
    }
  }
}
</script>

<style>

</style>
