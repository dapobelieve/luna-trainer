<template>
  <div>
    <multiselect
      v-model="selected"
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
      <template
        slot="selection"
        slot-scope="{ values, search, isOpen }"
      >
        <span
          v-if="selected.length &amp;&amp; !isOpen"
          class="multiselect__single"
        >{{ selected.length }} options selected</span>
      </template>
      <template v-if="false" slot="tag"></template>
    </multiselect>
    <ul
      class="tail-mt-4 tail-p-4 tail-pb-3 tail-border-gray-400 tail-border-solid tail-border tail-rounded-lg tail-border-opacity-30"
    >
      <li v-for="(select, index) in selected" :key="index">
        <div class="tail-flex tail-justify-between tail-mb-3">
          <h2 class="tail-font-medium tail-text-lg active-item">
            {{ select.description }}
          </h2>
          <small class="tail-text-gray-500 tail-ml-5">Qty 1</small>
        </div>
        <div
          class="tail-flex tail-justify-between tail-items-center tail-gap-2"
        >
          <h5
            v-if="edit && tempId === select._id"
            class="tail-font-medium tail-text-lg"
          >
            {{ modifiedAmount | amount }}
          </h5>
          <h5 v-else class="tail-font-medium tail-text-lg">
            {{ select.pricing.amount | amount }}
          </h5>
          <div class="tail-flex tail-justify-between">
            <button
              class="tail-pr-1"
              @click.once="removeSelectedItem(select._id)"
            >
              <small
                class="ns-cross tail-flex tail-align-middle tail-bg-gray-300 tail-rounded-full tail-p-1 tail-text-white"
              ></small>
            </button>
            <button
              class="focus:tail-outline-none"
              @click.prevent="editSelectedItem(select._id)"
            >
              <small
                class="ns-edit focus:tail-outline-none tail-flex tail-align-middle tail-bg-gray-300 tail-rounded-full tail-p-1 tail-text-white"
              ></small>
            </button>
          </div>
        </div>
        <div v-if="edit && tempId === select._id">
          <div class="tail-flex">
            <span
              class="tail-w-11 tail-h-11 tail-border-r-0 tail-mt-1 tail-text-xl tail-bg-gray-300 tail-text-center tail-rounded-l tail-flex tail-justify-center tail-items-center"
            >£</span>
            <input
              v-model="modifiedAmount"
              type="number"
              class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-border-l-0 tail-rounded-r"
            />
          </div>
          <button @click.prevent="updateServiceAmount(select._id)">
            <div class="tail-flex">
              <div
                class="tail-rounded-full tail-px-2 tail-py-1 tail-flex tail-items-center tail-justify-center"
              >
                <SingleLoader v-if="isLoading" class="tail-mr-2" />
                <i
                  v-if="!isLoading"
                  class="ns-plus tail-text-base tail-rounded-full tail-text-white tail-p-1 primary-color"
                />
                <span class="text-primary-color tail-pl-2"> Update Amount</span>
              </div>
            </div>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import { mapGetters, mapActions } from 'vuex'
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
      selected: [],
      options: this.services,
      edit: false,
      modifiedAmount: '',
      isLoading: false,
      tempId: null,
      updatedServices: []
    }
  },
  watch: {
    selected (newValue) {
      this.$emit('selected', newValue)
    }
  },
  methods: {
    ...mapActions({
      updateProfile: 'authorize/updateProfile'
    }),
    removeSelectedItem (id) {
      this.edit = false
      this.selected = this.selected.filter(item => item._id !== id)
    },
    editSelectedItem (id) {
      this.tempId = id
      this.edit = true
    },
    updateServiceAmount () {
      this.isLoading = true
      const serviceItems = this.services
      const changeItem = serviceItems.findIndex(s => s._id === this.tempId)
      const serviceItem = (serviceItems[changeItem] = {
        ...serviceItems[changeItem],
        pricing: {
          plan: 'hourly',
          amount: Number(this.modifiedAmount)
        }
      })
      return this.updateProfile({ services: serviceItems }).then((response) => {
        if (response.status === 'success') {
          this.$toast.success('Service updated', { position: 'top-right' })
        }
      }).catch().finally(() => {
        this.isLoading = false
      })
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
