<template>
  <div class="tail-w-12/12">
    <div class="tail-border tail-rounded tail-grid tail-gap-4 tail-p-4 tail-mb-4">
      <div>
        <div class="tail-flex tail-justify-between tail-items-center">
          <h1 class="tail-font-medium">
            Customer
          </h1>
          <a href="Clients" class="tail-block" @click.prevent="openInviteModal=true">
            <div class="tail-rounded-full tail-mt-2 tail-px-2 tail-py-1 tail-text-sm tail-flex tail-items-center">
              <i class="ns-plus tail-rounded-full tail-text-sm tail-text-white tail-p-1 primary-color" />
            </div>
          </a>
        </div>
      </div>
      <div>
        <gw-customer-selector :clients="acceptedClients" :selected="invoice.client" @select="updateClient($event)" />
      </div>
    </div>

    <div class="tail-border tail-rounded tail-gap-4 tail-p-4">
      <div>
        <div class="tail-flex tail-justify-between tail-items-center">
          <h1 class="tail-font-medium tail-mb-2">
            Services
          </h1>
          <a href="/Settings#services" class="tail-block" alt="Add new service">
            <div class="tail-rounded-full tail-px-2 tail-py-1 tail-text-sm tail-flex tail-items-center">
              <i class="ns-plus tail-rounded-full tail-text-sm tail-text-white tail-p-1 primary-color" />
            </div>
          </a>
        </div>
        <template v-if="$auth.user.services">
          <div>
            <span class="tail-text-gray-400 tail-text-sm">Choose a list of invoice items.</span>
          </div>
          <gw-invoice-services-selector :services="$auth.user.services" @selected="updateSelectedItem" />
        </template>
      </div>
      <hr class="tail-pt-5" />
      <div class="tail-py-4">
        <input type="checkbox" class="tail-p-2" />
        <span class="tail-font-light">Value Added Tax (VAT)</span>
      </div>
      <div>
        <label for="dueDate" class="tail-block tail-font-light">Due date</label>
        <date-picker
          v-model="invoice.dueDate"
          style="width: 100% !important"
          class="tail-w-full"
          :disabled-date="(date) => date < new Date()"
          value-type="format"
          placeholder="Select an appointment date"
        ></date-picker>
      </div>
    </div>
    <Modal :is-open="openInviteModal" @close="openInviteModal = $event">
      <InviteNewClient @close="openInviteModal = $event" />
    </Modal>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker'
import { mapGetters } from 'vuex'
import GwCustomerSelector from './GwCustomerSelector.vue'

export default {
  name: 'LeftInvoiceForm',
  components: { DatePicker, GwCustomerSelector },
  data () {
    return {
      isLoading: false,
      openInviteModal: false,
      invoice: this.value
    }
  },
  computed: {
    ...mapGetters({
      acceptedClients: 'client/acceptedClients'
    })
  },
  props: {
    value: Object
  },
  methods: {
    updateClient ($event) {
      this.invoice.client = $event
      this.$emit('input', this.invoice)
    },
    updateSelectedItem (selected) {
      this.invoice.items = selected
      this.$emit('input', this.invoice)
    }
  }
}
</script>
