<template>
  <div class="tail-w-12/12">
    <div class="tail-border tail-rounded tail-grid tail-gap-4 tail-p-4">
      <div>
        <div>
          <h1 class="tail-font-medium">
            Customer
          </h1>
        </div>
        <div>
          <span class="tail-text-gray-400 tail-text-sm">A short description about this section</span>
        </div>
      </div>
      <div>
        <label for="email" class="tail-font-light">Name</label>
        <input
          style="cursor: not-allowed"
          disabled
          :value="`${client && client.firstName} ${client && client.lastName}`"
          type="email"
          class="tail-w-full tail-bg-gray-200 tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
        >
      </div>
      <div>
        <label for="email" class="tail-font-light">Email Address</label>
        <input style="cursor: not-allowed" disabled :value="client && client.email" type="email" class="tail-w-full tail-bg-gray-200 tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
      </div>
    </div>
    <div class="tail-border tail-rounded tail-gap-4 tail-p-4">
      <div>
        <div>
          <h1 class="tail-font-medium tail-mb-2">
            Services
          </h1>
        </div>
        <div>
          <span class="tail-text-gray-400 tail-text-sm">A short description about this section</span>
        </div>
        <gw-invoice-services-selector :services="$auth.user.services" @selected="updateSelectedItem" />
      </div>
        
      <div class="tail-pt-5">
        <hr />
      </div>

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
    <!-- <Modal :is-open="editItem" @close="editItem = $event">
      <EditItem @close="editItem = $event" />
    </Modal> -->
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  name: "LeftInvoiceForm",
  components: { DatePicker },
  props:{
    value: Object
  },
  methods: {
    updateSelectedItem (selected) {
      this.invoice = { ...this.invoice, items: selected.map(item => ({ service :item._id, price: item.pricing && item.pricing.amount, qty: 1 }))}
      console.log(this.invoice)
      this.$emit("input", this.invoice)
    }
  },
  data() {
    return {
      isLoading: false,
      invoice: this.value,
      client: this.value.client
    }
  }
};
</script>
