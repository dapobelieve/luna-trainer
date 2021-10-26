<template>
  <div>
    <v-select :multiple="multiple" v-model="selected" class="v-select" :options="clients" label="firstName">
      <template v-slot:open-indicator="{ dropdowIndicatorattributes }">
        <span v-bind="dropdowIndicatorattributes">
          <i
            class="ns-caret-down tail-font-bold tail-pt-1 tail-text-xl tail-cursor-pointer"
          ></i>
        </span>
      </template>
      <template v-slot:list-footer>
        <button type="button" class="tail-py-2 tail-outline-none" @click="addNewItem">
          <div class="tail-flex tail-px-2  tail-ml-1 tail-items-center tail-justify-center">
            <i class="ns-plus tail-text-base tail-rounded-full tail-text-blue-500 tail-p-1" />
            <span class="text-primary-color tail-text-base tail-pl-2">Add New Client</span>
          </div>
        </button>
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
    </v-select>
    <modal name="addNewClientModal" height="auto" :adaptive="true">
      <InviteNewClient :client="clientInfo" class="tail-m-6" @close="$modal.hide('addNewClientModal')" />
    </modal>
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
    clients: Array,
    value: Object
  },
  data () {
    return {
      selected: this.value,
      clientInfo: {},
      dropdowIndicatorattributes: {
        ref: 'openIndicator',
        role: 'presentation',
        class: 'ns-caret-down tail-font-bold tail-text-xl tail-cursor-pointer tail-absolute tail-right-0 tail-p-3'
      }
    }
  },
  watch: {
    selected (newValue) {
      this.$emit('change', newValue)
    }
  },
  methods: {
    addNewItem (value) {
      this.clientInfo = { email: '', firstName: value }
      this.$modal.show('addNewClientModal')
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep .v-select {
  @apply tail-border-[#0EA5E9]
}

::v-deep {
  .vs__dropdown-toggle {
    @apply tail-border-0
  }
}
::v-deep .vs__dropdown-menu {
  @apply tail-mt-[8px] tail-border tail-rounded-[6px] tail-pt-0
}

::v-deep .vs__clear {
  display: none;
}
</style>
