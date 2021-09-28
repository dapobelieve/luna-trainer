<template>
  <div
    class="tail-bg-white tail-h-auto tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md tail-flex tail-flex-wrap tail-gap-1"
  >
    <div
      v-for="tag in value"
      :key="tag.index"
      class="tail-bg-whites tail-inline-flex tail-items-center tail-border tail-rounded-full tail-h-8 tail-w-auto tail-pl-2 tail-pr-1 tail-font-medium"
    >
      <span class="tail-text-sm tail-capitalize">{{ tag }}</span>
      <button
        title="Delete item"
        type="button"
        class="tail-text-blue-500 tail-text-xs tail-h-5 tail-w-5 tail-flex tail-justify-center tail-items-center tail-ml-1 hover:tail-bg-blue-50 tail-rounded-full"
        @click="removeItem(tag)"
      >
        <i class="ns-cross"></i>
      </button>
    </div>
    <input
      v-model.trim="input"
      :tabindex="tabindex"
      class="tail-border-0 tail-bg-transparent tail-w-full tail-text-sm tail-h-6"
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
      console.log($event)
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
