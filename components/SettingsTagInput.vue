<template>
  <div>
    <div
      class="bg-white border rounded py-3"
      style="position: relative;"
    >
      <vue-tags-input
        v-model.trim="input"
        placeholder="Input an item"
        :tags="items"
        @tags-changed="e => onChange(e)"
      />
    </div>
    <p v-if="input.length" class="text-gray-500 text-sm font-normal mt-2">
      Press enter to add another item, or tab to continue
    </p>
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
