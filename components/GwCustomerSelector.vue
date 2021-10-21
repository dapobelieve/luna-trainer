<template>
  <div>
    <MultiSelect
      v-model="$data.$selected"
      :options="clients"
      name="firstName"
      description="email"
      valueKey="_id"
      newItemText="Add New Client"
      @add-new-item="addNewItem"
      single
      showAvatar
      />
    <modal name="addNewClientModal" :height="400">
      <InviteNewClient :client="clientInfo" class="tail-m-6" @close="$modal.hide('addNewClientModal')" />
    </modal>
  </div>
</template>
<script>
export default {
  name: 'GwCustomerSelector',
  props: {
    clients: Array,
    selected: Object
  },
  model: {
    prop: 'selected',
    event: 'change'
  },
  watch: {
    '$data.$selected' (newValue) {
      this.$emit('change', newValue && newValue.length ? newValue[1] : {})
    }
  },
  data () {
    return {
      $selected: !Object.keys(this.selected).length ? [this.selected] : [],
      clientInfo: {}
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
