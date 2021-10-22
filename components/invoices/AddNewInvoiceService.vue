<template>
  <div>
    <div class="tail-flex tail-justify-between tail-items-center">
      <h5 class="tail-text-2xl tail-text-gray-700">
        {{ editing ? 'Editing a service' : 'Add new item' }}
      </h5>
      <button type="button" @click="$emit('close-modal')">
        <i class="ns-cross tail-text-lg tail-text-blue-500"></i>
      </button>
    </div>
    <form class="tail-flex tail-flex-col tail-gap-6 tail-mt-8">
      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label for="service" class="required">Title</label>
        <input
          id="service"
          v-model="services.description"
          placeholder="Separation Anxiety (Replace this description)"
          class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
        />
      </div>
      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label
          for="reinforcement"
          class="required"
        >Type of appointment (you can tick both options)</label>
        <div
          class="tail-flex tail-flex-col sm:tail-flex-row tail-space-y-2 sm:tail-space-y-0 sm:tail-space-x-2"
        >
          <label
            class="tail-rounded-lg tail-relative tail-border tail-p-3 tail-cursor-pointer focus:tail-outline-none tail-w-full tail-bg-white hover:tail-bg-blue-50 tail-transition-all tail-flex tail-items-center tail-shadow-sm"
            :class="{
              'tail-bg-blue-50': services.appointmentTypes.includes('remote')
            }"
          >
            <input
              id="remote"
              v-model="services.appointmentTypes"
              aria-describedby="remote-description"
              name="remote"
              type="checkbox"
              value="remote"
              class="tail-h-5 tail-w-5 tail-rounded"
            />
            <span
              id="reinforcement-0-label"
              class="tail-ml-2 tail-font-medium"
            >Remote</span>
          </label>
          <label
            class="tail-rounded-lg tail-relative tail-border tail-p-3 tail-cursor-pointer focus:tail-outline-none tail-w-full tail-bg-white hover:tail-bg-blue-50 tail-transition-all tail-flex tail-items-center tail-shadow-sm"
            :class="{
              'tail-bg-blue-50': services.appointmentTypes.includes('in-person')
            }"
          >
            <input
              id="inPerson"
              v-model="services.appointmentTypes"
              aria-describedby="remote-description"
              name="remote"
              type="checkbox"
              value="in-person"
              class="tail-h-5 tail-w-5"
            />
            <span
              id="reinforcement-0-label"
              class="tail-ml-2 tail-font-medium"
            >In-person (1-2-1)</span>
          </label>
        </div>
      </div>
      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label for="currency" class="required">Price</label>
        <div class="tail-relative tail-flex">
          <div
            class="tail-inset-y-0 tail-left-0 tail-pl-3 tail-flex tail-items-center tail-pointer-events-none tail-bg-white tail-h-10 tail-border tail-shadow-sm tail-rounded-l-md tail-border-r-0"
          >
            <span class="tail-text-gray-500">{{ $auth.user.currency }}</span>
          </div>
          <input
            id="currency"
            v-model.number="services.pricing.amount"
            type="number"
            class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-4 tail-w-full tail-border tail-shadow-sm tail-rounded-r-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500 focus:tail-border tail-border-l-0"
          />
        </div>
      </div>
      <div class="sm:tail-col-span-2 tail-flex tail-justify-end tail-gap-2">
        <p
          v-if="servicesFromStore.length === 5 && !editing"
          class="tail-text-gray-500 tail-font-medium"
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
            @click="saveEdit"
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
      updateProfile: 'profile/updateProfile'
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
        return this.updateProfile({
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
    saveEdit () {
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
        return this.updateProfile({
          services: [...allServices, this.services]
        })
          .then((response) => {
            this.isLoading = false
            console.log('you say? ', response)
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
