<template>
  <div>
    <div
      class="bg-white border rounded overflow-hidden rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-blue-50"
      style="position: relative;"
    >
      <vue-tags-input
        v-model.trim="input"
        placeholder="Add an item"
        :tags="items"
        :separators="[',',';']"
        @tags-changed="e => onChange(e)"
      />
    </div>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'
export default {
  name: 'TagInput',
  components: {
    VueTagsInput
  },
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
      input: '',
      showHint: false
    }
  },
  methods: {
    onChange (e) {
      this.items = e.map(i => i.text)
      this.$emit('input', this.items)
    }
  }
}
</script>

<style>
  @import '../assets/css/inputtag.css';
</style>

<style scoped>
input {
  outline: none;
}
</style>
