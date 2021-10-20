<template>
  <div>
    <MultiSelect 
      v-model="services"
      @selected="addService"
      name="description"
      description="pricing.amount"
    />
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
