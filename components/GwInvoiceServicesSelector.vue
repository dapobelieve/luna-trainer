<template>
  <div>
    <ServicesMultiSelect :options="services" @on-service-selected="addService" />
    <ul v-if="selectedServices.length" class="tail-mt-4 tail-p-4 tail-pb-3 tail-border-gray-400 tail-border-solid tail-border tail-rounded-lg tail-border-opacity-30">
      <li v-for="(select,index) in selectedServices" :key="index" class="tail-flex tail-w-full tail-justify-between tail-mb-3">
        <div>
          <h2 class="tail-font-medium tail-text-lg active-item">
            {{ select.description }}
          </h2>
          <small class="tail-text-gray-500 tail-ml-5">Qty {{ select.qty }}</small>
        </div>
        <div class="tail-flex tail-justify-between tail-items-center tail-gap-2">
          <client-only>
            <h5 class="tail-font-medium tail-text-lg">
              {{ select.pricing.amount | amount }}
            </h5>
          </client-only>

          <button @click.prevent="editSelectionItem(select.serviceId)">
            <small class="ns-edit tail-flex tail-align-middle  primary-color tail-rounded-full tail-p-1 tail-text-white"></small>
          </button>

          <button type="button" @click.prevent="removeSelectionItem(select.serviceId)">
            <small class="ns-cross tail-flex tail-align-middle tail-bg-red-300 tail-rounded-full tail-p-1 tail-text-white"></small>
          </button>
        </div>
      </li>
    </ul>
    <GwModal :is-open="openEditItem" @close="openEditItem = $event" @closeBackDrop="openEditItem = $event">
      <template v-slot:status>
        <div class="tail-bg-gray-100 tail-text-gray-500 tail-px-2 tail-rounded-3xl">
          Edit Item
        </div>
      </template>
      <EditItem v-model="selectedItem" @close="openEditItem = $event" />
    </GwModal>
  </div>
</template>
<script>

export default {
  name: 'GwInvoiceServicesSelector',
  props: {
    services: Array
  },
  data () {
    return {
      selectedServices: [],
      selection: [],
      selectedItem: null,
      openEditItem: false
      // options: this.services.map(item => ({ description: item.description, serviceId: item._id, price: item.pricing && item.pricing.amount, qty: 1 }))
    }
  },
  // watch: {
  //   selection (newValue) {
  //     this.$emit('selected', newValue)
  //   },
  //   selectedItem (newValue) {
  //     if (newValue) {
  //       this.selection = this.selection.map(item => item.serviceId === newValue.serviceId ? newValue : item)
  //       this.$emit('selected', this.selection)
  //     }
  //   }
  // },
  methods: {
    editSelectionItem (id) {
      this.selectedItem = this.selection.find(item => item.serviceId === id)
      this.openEditItem = true
    },
    removeSelectionItem (id) {
      this.selection = this.selection.filter(item => item.serviceId !== id)
    },
    addService (service) {
      this.selectedServices.push(service)
      this.$emit('selected', service)
    }
  }
}
</script>
<style scoped>
.active-item {
  position: relative;
  padding-left: 20px;
}
.active-item::after {
  display: block;
  width: 10px;
  position: absolute;
  height: 10px;
  background: rgba(59, 130, 246, 1);;
  content: "";
  top: calc(50% - 5px);
  border-radius: 100%;
  left: 0;
}
</style>
