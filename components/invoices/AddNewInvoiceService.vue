<template>
  <div>
    <div class="flex justify-between items-center">
      <h5 class="text-2xl text-gray-700">
        {{ editing ? 'Editing a service' : 'Add new item' }}
      </h5>
      <button type="button" @click="$emit('close-modal')">
        <i class="ns-cross text-lg text-blue-500"></i>
      </button>
    </div>
    <form class="flex flex-col gap-6 mt-8">
      <div class="flex flex-col gap-1.5">
        <label for="service" class="required">Title</label>
        <input
          id="service"
          v-model="services.description"
          placeholder="Separation Anxiety (Replace this description)"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <label
          for="reinforcement"
          class="required"
        >Type of appointment (you can tick both options)</label>
        <div
          class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
        >
          <label
            class="rounded-lg relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm"
            :class="{
              'bg-blue-50': services.appointmentTypes.includes('remote')
            }"
          >
            <input
              id="remote"
              v-model="services.appointmentTypes"
              aria-describedby="remote-description"
              name="remote"
              type="checkbox"
              value="remote"
              class="h-5 w-5 rounded"
            />
            <span
              id="reinforcement-0-label"
              class="ml-2 font-medium"
            >Remote</span>
          </label>
          <label
            class="rounded-lg relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm"
            :class="{
              'bg-blue-50': services.appointmentTypes.includes('in-person')
            }"
          >
            <input
              id="inPerson"
              v-model="services.appointmentTypes"
              aria-describedby="remote-description"
              name="remote"
              type="checkbox"
              value="in-person"
              class="h-5 w-5"
            />
            <span
              id="reinforcement-0-label"
              class="ml-2 font-medium"
            >In-person (1-2-1)</span>
          </label>
        </div>
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="currency" class="required">Price</label>
        <div class="relative flex">
          <div
            class="inset-y-0 left-0 pl-3 flex items-center pointer-events-none bg-white h-10 border shadow-sm rounded-l-md border-r-0"
          >
            <span class="text-gray-500">{{ $auth.user.currency }}</span>
          </div>
          <input
            id="currency"
            v-model.number="services.pricing.amount"
            type="number"
            class="bg-white h-10 flex justify-center py-2 px-4 w-full border shadow-sm rounded-r-md focus:outline-none focus:bg-white focus:border-blue-500 focus:border border-l-0"
          />
        </div>
      </div>
      <div class="sm:col-span-2 flex justify-end gap-2">
        <p
          v-if="servicesFromStore.length === 5 && !editing"
          class="text-gray-500 font-medium"
        >
          You have enough services for now
        </p>
        <template v-else-if="editing">
          <button type="button" class="button-text" @click="cancelEdit">
            Cancel Edit
          </button>
          <button-spinner
            :loading="isLoading"
            type="button"
            style="width:fit-content"
            @click="saveEditedServiceItem"
          >
            Edit Service
          </button-spinner>
        </template>
        <button-spinner
          v-else
          :loading="isLoading"
          type="button"
          style="width:fit-content"
          @click="addNewService"
        >
          add
        </button-spinner>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'CreatingInvoiceNewService',
  props: {
    selectedServiceIndex: [Number]
  },
  data () {
    return {
      editing: false,
      isLoading: false,
      selectedService: null,
      services: {
        description: '',
        appointmentTypes: [],
        pricing: {
          plan: 'hourly',
          amount: ''
        }
      }
    }
  },
  computed: {
    ...mapState({
      servicesFromStore: state => state.auth.user.services
    }),
    disabled () {
      return (
        Boolean(this.services.description) &&
        Boolean(this.services.pricing.amount) &&
        Boolean(this.services.appointmentTypes.length)
      )
    },
    disableUpdate () {
      if (this.disabled) {
        return (
          Object.values(this.services).toString() ===
          Object.values(this.selectedService).toString()
        )
      }
      return true
    }
  },
  mounted () {
    if (this.selectedServiceIndex !== null) {
      this.editing = true
      this.selectedService = this.servicesFromStore[this.selectedServiceIndex]
      this.services.description = this.selectedService.description
      this.services.appointmentTypes = this.selectedService.appointmentTypes
      this.services.pricing.amount = this.selectedService.pricing.amount
    }
  },
  validations: {
    services: {
      'pricing.amount': {
        required
      },
      description: {
        required
      }
    }
  },
  methods: {
    ...mapActions({
      updateService: 'profile/updateProfile'
    }),
    resetSelectedService () {
      this.services.description = ''
      this.services.appointmentTypes = []
      this.services.pricing = {
        amount: '',
        plan: 'hourly'
      }
    },
    addNewService () {
      if (!this.disabled) {
        this.$toast.error('All form fields are required', {
          position: 'top-right'
        })
      } else if (
        this.servicesFromStore.length &&
        this.servicesFromStore.some(
          s =>
            s.description.toLowerCase() ===
            this.services.description.toLowerCase()
        )
      ) {
        this.$toast.error(
          `${this.services.description} service already exist`,
          { position: 'top-right' }
        )
      } else {
        this.isLoading = true
        return this.updateService({
          services: [this.services, ...this.servicesFromStore]
        })
          .then((response) => {
            this.isLoading = false
            if (response.status === 'success') {
              this.resetSelectedService()
              this.$toast.success('Services updated', {
                position: 'top-right'
              })
            }
          })
          .catch()
          .finally(() => {
            this.isLoading = false
          })
      }
    },
    saveEditedServiceItem () {
      if (
        this.disableUpdate &&
        this.services.pricing.amount === this.selectedService.pricing.amount
      ) {
        this.$toast.error('You have not made any change to the service', {
          position: 'top-right'
        })
      } else {
        this.isLoading = true
        const allServices = [...this.servicesFromStore]
        allServices.splice(this.selectedServiceIndex, 1)
        return this.updateService({
          services: [...allServices, this.services]
        })
          .then((response) => {
            this.isLoading = false
            if (response.status === 'success') {
              this.cancelEdit()
              this.$toast.success('Service Updated', { position: 'top-right' })
            }
          })
          .catch()
          .finally(() => {
            this.isLoading = false
          })
      }
    },
    cancelEdit () {
      this.$emit('close-modal')
      this.editing = false
      this.services.description = ''
      this.services.appointmentTypes = []
      this.services.pricing = {
        amount: '',
        plan: 'hourly'
      }
      this.selectedService = null
      this.$emit('clearSelectedServiceIndex', null)
    }
  }
}
</script>

<style lang="scss" scoped></style>
