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
            class="fi-rr-caret-down font-bold text-base cursor-pointer"
          ></i>
        </span>
      </template>
      <template v-slot:list-footer>
        <button type="button" class="py-2 outline-none" @click="addNewItem">
          <div class="flex px-2  ml-1 items-center justify-center">
            <i class="ns-plus text-base rounded-full text-blue-500 p-1" />
            <span class="text-primary-color text-base pl-2">Add New Service</span>
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
        <div class="flex justify-between min-w-full items-center">
          <div class="flex content-center py-1">
            <div class="flex flex-col ml-1 text-gray-700">
              <p class="capitalize">
                {{ description }}
              </p>
              <small class="text-gray-500"> {{ pricing.amount | amount }}</small>
            </div>
          </div>
          <div class="check">
            <i class="ns-check text-blue-500 text-lg"></i>
          </div>
        </div>
      </template>
    </v-select>
    <modal name="add-service" height="auto" :adaptive="true">
      <invoices-add-new-invoice-service
        class="m-6"
        :selected-service-index="null"
        @close-modal="$modal.hide('add-service')"
      />
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
        class: 'fi-rr-caret-down font-bold text-xl cursor-pointer absolute right-0 p-3'
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
      this.$modal.show('add-service')
    }
  }
}
</script>
