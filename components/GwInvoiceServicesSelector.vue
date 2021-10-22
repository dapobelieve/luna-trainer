<template>
  <div>
    <v-select
      v-model="selected"
      class="v-select"
      :options="services"
      placeholder="Choose a list of invoice items"
      label="description"
      multiple
    >
      <template v-slot:open-indicator="{}">
        <span>
          <i
            class="ns-caret-down tail-font-bold tail-text-xl tail-cursor-pointer"
          ></i>
        </span>
      </template>
      <template v-slot:list-footer>
        <button type="button" class="tail-py-2 tail-outline-none" @click="addNewItem">
          <div class="tail-flex tail-px-2  tail-ml-1 tail-items-center tail-justify-center">
            <i class="ns-plus tail-text-base tail-rounded-full tail-text-blue-500 tail-p-1" />
            <span class="text-primary-color tail-text-base tail-pl-2">Add New Service</span>
          </div>
        </button>
      </template>
      <template v-slot:selected-option-container="{option}">
        <div style="display: flex; align-items: baseline">
          <div class="vs__selected">
            {{ option.description }}
          </div>
        </div>
      </template>
      <template v-slot:option="{ description, pricing }">
        <div class="tail-flex tail-justify-between tail-min-w-full tail-items-center">
          <div class="tail-flex tail-content-center tail-py-1">
            <div class="tail-flex tail-flex-col tail-ml-1 tail-text-gray-700">
              <p class="tail-capitalize">
                {{ description }}
              </p>
              <small class="tail-text-gray-500"> {{ pricing.amount | amount }}</small>
            </div>
          </div>
          <div class="check">
            <i class="ns-check tail-text-blue-500 tail-text-lg"></i>
          </div>
        </div>
      </template>
    </v-select>
    <modal name="addNewServiceModal" height="auto" :adaptive="true">
      <InviteNewClient :client="clientInfo" class="tail-m-6" @close="$modal.hide('addNewServiceModal')" />
    </modal>
  </div>
</template>
<script>
export default {
  name: 'GwnInvoiceServiceSelector',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    services: Array,
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
      this.clientInfo = { email: '', firstName: '' }
      this.$modal.show('addNewServiceModal')
    }
  }
}
</script>
