<template>
  <div>
    <div class="tail-relative">
        <button
            type="button"
            class="tail-bg-white tail-relative tail-w-full tail-border tail-border-gray-300 tail-rounded-md tail-shadow-sm tail-pl-3 tail-pr-10 tail-py-2 tail-text-left focus:tail-outline-none focus:tail-ring-1 sm:tail-text-sm"
            aria-labelledby="listbox-label"
            aria-expanded="true"
            aria-haspopup="listbox"
            @click="$data.$open = !$data.$open"
        >
            <span class="tail-block tail-capitalize">
            {{ $data.$selected }}
            </span>
            <span class="tail-absolute tail-inset-y-0 tail-right-0 tail-flex tail-items-center tail-pr-2 tail-pointer-events-none">
            <i class="ns-caret-down tail-text-lg"></i>
            </span>
        </button>
        <transition
            leave-active-class="tail-transition tail-ease-in tail-duration-100"
            leave-from-class="tail-opacity-100"
            leave-to-class="tail-opacity-0"
        >
            <ul
            v-if="$data.$open"
            class="tail-absolute tail-z-10 tail-mt-1 tail-w-full tail-bg-white tail-shadow-lg tail-max-h-60 tail-rounded-md tail-py-1 tail-text-base tail-ring-1 tail-ring-black tail-ring-opacity-5 tail-overflow-auto focus:tail-outline-none sm:tail-text-sm"
            tabindex="-1"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
            >
            <li v-for="(option,index) in options" :key="index" id="listbox-option-0" class="tail-text-gray-900 tail-cursor-pointer tail-select-none tail-relative tail-py-2 tail-pl-3 tail-pr-9" role="option">
                <span
                class="tail-font-normal tail-block tail-truncate"
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
export default {
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
    }
  }
}
</script>
