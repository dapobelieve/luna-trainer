<template>
  <div>
    <v-select
      :value="value"
      :disabled="disabled"
      :multiple="multiple"
      :options="options"
      :placeholder="placeholder"
      class="v-select"
      :label="label"
      :taggable="taggable"
      @input="$emit('change', $event)"
    >
      <template v-slot:selected-option="selectedOption">
        <slot name="selectedOption" :selected="selectedOption"></slot>
      </template>
      <template v-slot:open-indicator="{ dropdowIndicatorattributes }">
        <span v-bind="dropdowIndicatorattributes">
          <i
            class="fi-rr-caret-down font-bold pt-1 text-base cursor-pointer"
          ></i>
        </span>
      </template>
      <template v-if="multiple" v-slot:selected-option-container="{option}">
        <!-- Take this outside -->
        <div style="display: flex; align-items: baseline">
          <div class="vs__selected">
            {{ option.description }}
          </div>
        </div>
      </template>
      <template v-slot:option="option">
        <slot name="dropdownOption" :optionObject="option" :option="option"></slot>
      </template>
      <template v-slot:list-footer>
        <slot name="footer"></slot>
      </template>
    </v-select>
  </div>
</template>
<script>
export default {
  name: 'GwSelector',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    taggable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    options: Array,
    value: [Object, Array, String]
  },
  data () {
    return {
      clientInfo: {},
      dropdowIndicatorattributes: {
        ref: 'openIndicator',
        role: 'presentation',
        class: 'fi-rr-angle-down font-bold text-base cursor-pointer absolute right-0 p-3'
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (newVal, oldVal) {}
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep .v-select {
  border: 1px solid #E2E8F0 !important;
}

::v-deep {
  .vs__dropdown-toggle {
    @apply border-0
  }
}
::v-deep .vs__dropdown-menu {
  @apply mt-[8px] border rounded-[6px] pt-0
}

::v-deep .vs__clear {
  display: none;
}
</style>
