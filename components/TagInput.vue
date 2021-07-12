<template>
   <div class="tail-border tail-rounded tail-py-3 tail-bg-white">
    <div class="tail-flex tail-flex-wrap tail-px-4 tail-pb-3">
      <div
        v-for="tag in value"
        :key="tag.index"
        class="tail-flex tail-items-center tail-border tail-rounded tail-p-2 tail-my-1 tail-ml-2"
      >
        <span class="tail-ml-1 tail-capitalize">
          {{ tag }}
        </span>
        <button
          title="Delete item"
          type="button"
          class="btn tail-bg-red-400"
          style="line-height: 0.5; padding: 0.1em"
          @click="removeItem(tag)"
        >
          <span
            class="tail-text-white"
            style="font-size: .9em;line-height: 0.5; padding: 0.1em"
          >x</span>
        </button>
      </div>
      <input
        v-model.trim="input"
        class="tail-border-0 tail-text-blue-400 tail-ml-2"
        placeholder="Type in here..."
        @keydown.enter.prevent="addItem"
        @keydown.tab.prevent="addItem"
      />
    </div>
    <div
      class="tail-flex tail-items-center tail-px-4 tail-pt-2 tail-border-t border-top"
    >
      <i class="ns-plus tail-text-blue-400 tail-ml-1"></i>
      <span class="tail-text-blue-400">Insert and press enter or tab</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TagInput',
  props: {
    block: Boolean,
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
    addItem () {
      if (!this.items.includes(this.input.toLowerCase())) {
        this.items.push(this.input)
        this.$emit('input', this.items)
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
  input{
    outline: none;
  }
</style>
