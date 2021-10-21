<template>
  <div>
    <MultiSelect
      v-model="$data.$selected"
      :options="services"
      @add-new-item="addNewItem"
      valueKey="_id"
      newItemText="Add New Service"
      name="description"
      description="pricing.amount"
    />
    <modal name="addNewServiceModal" :height="400">
      <InviteNewClient :client="clientInfo" class="tail-m-6" @close="$modal.hide('addNewServiceModal')" />
    </modal>
  </div>
</template>
<script>

export default {
  name: 'GwInvoiceServicesSelector',
  props: {
    services: Array,
    selected: Array
  },
  model: {
    prop: 'selected',
    event: 'change'
  },
  data () {
    return {
      $selected: this.selected || [],
      clientInfo: {}
    }
  },
  watch: {
    '$data.$selected' (newValue) {
      console.trace(newValue)
      this.$emit('change', newValue)
    }
  },
  methods: {
    addNewItem (value) {
      this.clientInfo = { email: '', firstName: value }
      this.$modal.show('addNewServiceModal')
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
