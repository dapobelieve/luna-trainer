<template>
  <div>
    <MultiSelect
      v-model="this.$clients"
      name="firstName"
      description="email"
      valueKey="_id"
      newItemText="Add New Client"
      @add-new-item="addNewItem"
      single
      showAvatar
      />
    <modal name="inviteClientModal2" :height="400">
      <InviteNewClient :client="clientInfo" class="tail-m-6" @close="$modal.hide('inviteClientModal2')" />
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
  data () {
    return {
      $clients: this.clients,
      clientInfo: {}
    }
  },
  computed: {
    isEmpty () {
      return Object.keys(this.selected).length === 0 && this.selected.constructor === Object
    }
  },
  methods: {
    addNewItem (value) {
      this.clientInfo = { email: '', firstName: value }
      this.$modal.show('inviteClientModal')
    }
  }
}
</script>
