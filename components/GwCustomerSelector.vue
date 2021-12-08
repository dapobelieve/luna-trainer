<template>
  <div>
    <v-select
      v-model="selected"
      :disabled="disabled"
      :multiple="multiple"
      class="v-select"
      :options="clients"
      label="firstName"
    >
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
        <slot name="dropdownOption" :optionObject="option"></slot>
      </template>
      <template v-slot:list-footer>
        <slot name="footer"></slot>
      </template>
    </v-select>
  </div>
</template>
<script>
export default {
  name: 'GwCustomerSelector',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clients: Array,
    value: [Object, Array]
  },
  data () {
    return {
      selected: this.value,
      clientInfo: {},
      dropdowIndicatorattributes: {
        ref: 'openIndicator',
        role: 'presentation',
        class: 'fi-rr-caret-down font-bold text-base cursor-pointer absolute right-0 p-3'
      }
    }
  },
  watch: {
    selected (newValue) {
      this.$emit('change', newValue)
    }
  },
  mounted () {
    // document.getElementById('defaultOpen').click()
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
