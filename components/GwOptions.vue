<template>
  <div>
    <div class="flex justify-end">
      <ul
        class="absolute z-10 mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
      >
        <li v-for="(option,index) in options" id="listbox-option-0" :key="index" class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9" role="option">
          <span
            class="font-normal block truncate"
            @click="select(option)"
          >
            {{ option }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    selected: {
      type: String,
      required: true
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      $selected: this.selected
    }
  },
  methods: {
    select (optionValue) {
      this.$data.$selected = optionValue
      this.$emit('input', optionValue)
      this.$emit('selected', optionValue)
    }
  }
}
</script>

<style>

</style>
