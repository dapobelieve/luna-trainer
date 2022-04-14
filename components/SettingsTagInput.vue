<template>
  <div>
    <div
      class="bg-white border rounded"
      style="position: relative;"
    >
      <vue-tags-input
        v-model.trim="input"
        placeholder="Input an item"
        :tags="items"
        :separators="[',',';']"
        @tags-changed="e => onChange(e)"
      />
    </div>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
export default {
  name: 'SettingsTagInput',
   components: {
    VueTagsInput,
  },
  props: {
    block: Boolean,
    tabindex: Number,
    value: {
      type: Array,
      required: true
    }
  },
  methods: {
    onChange (e) {
      this.items = e.map(i => i.text)
      this.$emit('input', this.items)
    }
  },
  data () {
    return {
      items: this.value,
      input: '',
      showHint: false
    }
  },
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
