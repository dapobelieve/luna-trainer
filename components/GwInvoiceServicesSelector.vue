<template>
  <div>
    <multiselect
      v-model="selection"
      :options="options"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="Select invoice items"
      label="description"
      track-by="description"
      :preselect-first="true"
    >
      <template slot="selection" slot-scope="{ isOpen }">
        <span v-if="selection.length &amp;&amp; !isOpen" class="multiselect__single">{{ selection.length }} options selection</span>
      </template>
      <template v-if="false" slot="tag"></template>
    </multiselect>
    <ul class="tail-mt-4 tail-p-4 tail-pb-3 tail-border-gray-400 tail-border-solid tail-border tail-rounded-lg tail-border-opacity-30">
      <li v-for="(select,index) in selection" :key="index" class="tail-flex tail-w-full tail-justify-between tail-mb-3">
        <div>
          <h2 class="tail-font-medium tail-text-lg active-item">
            {{ select.description }}
          </h2>
          <small class="tail-text-gray-500 tail-ml-5">Qty {{ select.qty }}</small>
        </div>
        <div class="tail-flex tail-justify-between tail-items-center tail-gap-2">
          <h5 class="tail-font-medium tail-text-lg">
            {{ select.price | amount }}
          </h5>

          <button @click.prevent="editSelectionItem(select.serviceId)">
            <small class="ns-edit tail-flex tail-align-middle  primary-color tail-rounded-full tail-p-1 tail-text-white"></small>
          </button>

          <button type="button" @click.prevent="removeSelectionItem(select.serviceId)">
            <small class="ns-cross tail-flex tail-align-middle tail-bg-red-300 tail-rounded-full tail-p-1 tail-text-white"></small>
          </button>
        </div>
      </li>
    </ul>
    <Modal :is-open="openEditItem" @close="openEditItem = $event" @closeBackDrop="openEditItem = $event">
      <template v-slot:status>
        <div class="tail-bg-gray-100 tail-text-gray-500 tail-px-2 tail-rounded-3xl">
          Edit Item
        </div>
      </template>
      <EditItem v-model="selectedItem" @close="openEditItem = $event" />
    </Modal>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
export default {
  name: 'GwInvoiceServicesSelector',
  components: {
    Multiselect
  },
  props: {
    services: Array
  },
  data () {
    return {
      selection: [],
      selectedItem: null,
      openEditItem: false,
      options: this.services.map(item => ({ description: item.description, serviceId: item._id, price: item.pricing && item.pricing.amount, qty: 1 }))
    }
  },
  watch: {
    selection (newValue) {
      this.$emit('selected', newValue)
    },
    selectedItem (newValue) {
      if (newValue) {
        this.selection = this.selection.map(item => item.serviceId === newValue.serviceId ? newValue : item)
        this.$emit('selected', this.selection)
      }
    }
  },
  methods: {
    editSelectionItem (id) {
      this.selectedItem = this.selection.find(item => item.serviceId === id)
      this.openEditItem = true
    },
    removeSelectionItem (id) {
      this.selection = this.selection.filter(item => item.serviceId !== id)
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
  background: #56ccf2;
  content: "";
  top: calc(50% - 5px);
  border-radius: 100%;
  left: 0;
}
</style>
