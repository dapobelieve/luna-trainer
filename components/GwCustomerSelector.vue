<template>
  <div>
    <v-select :multiple="multiple" v-model="selected" class="v-select" :options="clients" label="firstName">
      <template v-slot:open-indicator="{ dropdowIndicatorattributes }">
        <span v-bind="dropdowIndicatorattributes">
          <i
            class="ns-caret-down font-bold pt-1 text-xl cursor-pointer"
          ></i>
        </span>
      </template>
      <template v-slot:list-footer>
        <button type="button" class="py-2 outline-none" @click="addNewItem">
          <div class="flex px-2 ml-1 items-center justify-center">
            <i class="ns-plus text-base rounded-full text-blue-500 p-1" />
            <span class="text-primary-color text-base pl-2">Add New Client</span>
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
      <InviteNewClient :client="clientInfo" class="m-6" @close="$modal.hide('addNewClientModal')" />
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
        class: 'ns-caret-down font-bold text-xl cursor-pointer absolute right-0 p-3'
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
  @apply border-[#0EA5E9]
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
