<template>
  <div>
    <Dropdown :options="clients" @showModal="$emit('showClientModal')" />

    <!-- {{ dropdownSelection.name }} -->
  </div>
</template>
<script>

export default {
  name: 'GwCustomerSelector',
  props: {
    clients: Array,
    selected: Object
  },
  computed: {
    isEmpty () {
      return Object.keys(this.selected).length === 0 && this.selected.constructor === Object
    }
  }
}
</script>
