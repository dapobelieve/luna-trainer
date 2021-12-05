<template>
  <div v-click-outside="externalClick">
    <div class="relative">
      <button
        type="button"
        class="w-24 bg-white relative border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 sm:text-sm"
        aria-labelledby="listbox-label"
        aria-expanded="true"
        aria-haspopup="listbox"
        @click="$data.$open = !$data.$open"
      >
        <span class="block capitalize">
          {{ $data.$selected }}
        </span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <i class="fi-rr-caret-down text-sm"></i>
        </span>
      </button>
      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ul
          v-if="$data.$open"
          class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
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
      </transition>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    value: Object,
    options: Array,
    selected: [Object, String]
  },
  data () {
    return {
      $selected: this.selected,
      $open: false
    }
  },
  methods: {
    select (optionValue) {
      this.$data.$open = !this.$data.$open
      this.$data.$selected = optionValue
      this.$emit('input', optionValue)
      this.$emit('selected', optionValue)
    },
    externalClick () {
      this.$data.$open = false
    }
  }
}
</script>
