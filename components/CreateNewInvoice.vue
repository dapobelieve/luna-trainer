<template>
  <div class="tail-bg-white tail-grid tail-gap-4">
    <div>
      <label class="tail-block tail-font-medium tail-text-gray-500 tail-text-sm">
        Client
      </label>
      <div class="tail-rounded-md tail-border-2 tail-border-red-400 tail-cursor-pointer tail-p-3 tail-mt-1">
        <multiselect v-model="selectedClient" track-by="firstName" label="firstName" :options="acceptedClients" placeholder="Select a client"></multiselect>
      </div>
    </div>
    <div>
      <label class="block tail-text-sm tail-text-gray-500 font-medium">
        Session Description
      </label>
      <div class="tail-rounded-md tail-border-2 tail-border-gray-200 tail-cursor-pointer tail-p-3 tail-mt-1">
        <multiselect
          v-model="selectedService"
          track-by="description"
          label="description"
          :options="services"
          placeholder="Select a service"
        ></multiselect>
      </div>
    </div>
    <div class="">
      <label for="dueDate" class="tail-block tail-font-light">Due date</label>
      <date-picker
        v-model="selectedDate"
        style="width: 100% !important"
        class="tail-w-full"
        :disabled-date="
          (date) => {
            if (date < new Date()) {
              return true
            }
            return false
          }
        "
        value-type="format"
        placeholder="Select an appointment date"
      ></date-picker>
    </div>
    <div>
      <label class="tail-block tail-text-sm tail-font-medium tail-text-gray-500">
        Price
      </label>
      <div class="tail-mt-1">
        <input :value="selectedPrice" disabled class="tail-appearance-none tail-block tail-w-full tail-px-3 tail-py-2 tail-border tail-border-gray-300 tail-rounded-md tail-shadow-sm tail-placeholder-gray-400 focus:tail-outline-none focus:tail-ring-indigo-500 focus:tail-border-indigo-500 sm:tail-text-sm">
      </div>
    </div>
    <div class="tail-flex tail-justify-center">
      <button :disabled="isLoading" class="base-button" @click.prevent="createInvoice">
        <SingleLoader v-if="isLoading" class="tail-mr-2" />
        {{ isLoading ? 'Creating Invoice...' : 'Create Invoice' }}
      </button>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapGetters, mapActions } from 'vuex'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
  name: 'CreateNewInvoice',
  components: { Multiselect, DatePicker },
  data () {
    return {
      isLoading: false,
      selectedClient: null,
      selectedService: null,
      selectedDate: new Date().toISOString().substring(0, 10)
    }
  },
  computed: {
    ...mapGetters({
      acceptedClients: 'client/getAllAcceptedClients'
    }),
    services () {
      return this.$auth.user.services || []
    },
    // eslint-disable-next-line vue/return-in-computed-property
    selectedPrice () {
      // eslint-disable-next-line curly
      if (this.selectedService) return this.selectedService.pricing.amount
      return 0
    }
  },
  methods: {
    ...mapActions({
      sendInvoice: 'invoice/createInvoice',
      fetchInvoices: 'invoice/getAllInvoices'
    }),
    createInvoice () {
      this.isLoading = true
      this.sendInvoice({
        customerId: this.selectedClient._id,
        dueDateEpoch: new Date(this.selectedDate).getTime() / 1000,
        dueDate: new Date(this.selectedDate),
        items: [{
          service: this.selectedService._id,
          qty: 1,
          price: this.selectedPrice
        }]
      }).then((result) => {
        if (result.status === 'success') {
          this.$toast.success('Invoice created successfully', { position: 'bottom-right' })
          this.fetchInvoices()
          this.$emit('close', false)
        }
      }).catch((err) => {
        if (err.response) {
          this.$toast.error(`Something went wrong: ${err.response.data.message}`, { position: 'bottom-right' })
        } else if (err.request) {
          this.$toast.error('Something went wrong. Try again', { position: 'bottom-right' })
        } else {
          this.$toast.error(`Something went wrong: ${err.message}`, { position: 'bottom-right' })
        }
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
