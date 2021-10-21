<template>
  <div>
    <v-select class="v-select" v-model="selected" :options="clients" label="firstName">
      <template v-slot:open-indicator="{ dropdowIndicatorattributes }">
        <span v-bind="dropdowIndicatorattributes">
            <i
              class="ns-caret-down tail-font-bold tail-pt-1 tail-text-xl tail-cursor-pointer"
            ></i>
        </span>
      </template>
      <template v-slot:list-footer>
        <button type="button" class="tail-py-2 tail-outline-none" @click="addNewItem">
          <div class="tail-flex tail-px-2  tail-ml-1 tail-items-center tail-justify-center">
            <i class="ns-plus tail-text-base tail-rounded-full tail-text-blue-500 tail-p-1" />
            <span class="text-primary-color tail-text-base tail-pl-2">Add New Client</span>
          </div>
        </button>
       </template>
       <template v-slot:option="{ firstName, email, lastName, imgUrl }" >
          <div class="tail-flex tail-justify-between tail-min-w-full tail-items-center">
            <div class="tail-flex tail-content-center tail-py-1">
              <ClientAvatar :width="2.3" :height="2.3" :client-info="{ firstName, email, lastName, imgUrl }"/>
              <div class="tail-flex tail-flex-col tail-ml-2 tail-text-gray-700">
                <p class="tail-capitalize">
                  {{ firstName }}
                </p>
                <small class="tail-text-gray-500"> {{ email  }}</small>
              </div>
            </div>
            <div class="check">
              <i class="ns-check tail-text-blue-500 tail-text-lg"></i>
            </div>
          </div>
        </template>
    </v-select>
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
    value: Object
  },
  watch: {
    selected (newValue) {
      this.$emit('change', newValue)
    }
  },
  model: {
    prop: 'value',
    event: 'change'
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
  methods: {
    addNewItem (value) {
      this.clientInfo = { email: '', firstName: value }
      this.$modal.show('addNewClientModal')
    }
  }
}
</script>
