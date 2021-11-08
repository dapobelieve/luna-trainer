<template>
  <div
    class="bg-white h-auto py-2 px-3 w-full border shadow-sm rounded-md flex flex-wrap gap-1"
  >
    <div
      v-for="tag in value"
      :key="tag.index"
      class="bg-whites inline-flex items-center border rounded-full h-8 w-auto pl-2 pr-1 font-medium"
    >
      <span class="text-sm capitalize">{{ tag }}</span>
      <button
        title="Delete item"
        type="button"
        class="text-blue-500 text-xs h-5 w-5 flex justify-center items-center ml-1 hover:bg-blue-50 rounded-full"
        @click="removeItem(tag)"
      >
        <i class="ns-cross"></i>
      </button>
    </div>
    <input
      v-model.trim="input"
      :tabindex="tabindex"
      class="border-0 bg-transparent w-full text-sm h-6"
      placeholder="Type here and press enter or tab"
      @keydown.enter.prevent="addItem($event)"
      @keydown.tab.prevent="addItem($event)"
    />
  </div>
</template>
<script>
export default {
  name: 'SettingsTagInput',
  props: {
    block: Boolean,
    tabindex: Number,
    value: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      items: this.value,
      input: ''
    }
  },
  methods: {
    addItem ($event) {
      if (this.input && !this.items.includes(this.input.toLowerCase())) {
        this.items.push(this.input)
        this.$emit('input', this.items)
        $event.preventDefault()
      }
      this.input = ''
    },
    removeItem (tag) {
      if (this.items.includes(tag)) {
        this.items.splice(this.items.indexOf(tag), 1)
        this.$emit('input', this.items)
      }
    }
  }
}
</script>

<style scoped>
input {
  outline: none;
}
</style>
