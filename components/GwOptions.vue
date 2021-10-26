<template>
  <div>
    <div class="tail-flex tail-justify-end">
      <ul
        class="tail-absolute tail-z-10 tail-mt-1 tail-bg-white tail-shadow-lg tail-max-h-60 tail-rounded-md tail-py-1 tail-text-base tail-ring-1 tail-ring-black tail-ring-opacity-5 tail-overflow-auto focus:tail-outline-none sm:tail-text-sm"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
      >
        <li v-for="(option,index) in options" id="listbox-option-0" :key="index" class="tail-text-gray-900 tail-cursor-pointer tail-select-none tail-relative tail-py-2 tail-pl-3 tail-pr-9" role="option">
          <span
            class="tail-font-normal tail-block tail-truncate"
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
