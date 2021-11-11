<template>
  <div>
    <h5 class="text-lg font-bold">
      Add Your services
    </h5>
    <form class="flex flex-col gap-6 mt-6 lg:mt-10">
      <div class="flex flex-col gap-1.5">
        <label for="service" class="required">Service Title</label>
        <input
          id="service"
          v-model="services.description"
          placeholder="Separation Anxiety (Replace this description)"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="reinforcement" class="required">Type of appointment (you can tick both options)</label>
        <div
          class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
        >
          <label
            class="rounded-md relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm"
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
            <span id="reinforcement-0-label" class="ml-2 font-medium">Remote</span>
          </label>
          <label
            class="rounded-md relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm"
            :class="{
              'bg-blue-50': services.appointmentTypes.includes(
                'in-person'
              )
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
            <span id="reinforcement-0-label" class="ml-2 font-medium">In-person (1-2-1)</span>
          </label>
        </div>
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="currency" class="required">Price</label>
        <div class="relative flex">
          <div
            class="inset-y-0 left-0 pl-3 flex items-center pointer-events-none bg-white h-10 border shadow-sm rounded-l-md border-r-0"
          >
            <span class="text-gray-500">{{ $store.state.profile.trainnerRegData.personalProfile.currency }}</span>
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
          <button type="button" class="button-outline" @click="saveEdit">
            Update Service
          </button>
        </template>
        <button
          v-else
          type="button"
          class="button-outline"
          @click="addNewService"
        >
          Save & add another service
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'OnboardingServices',
  props: {
    selectedServiceIndex: [Number]
  },
  data () {
    return {
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
      servicesFromStore: state => state.profile.trainnerRegData.services,
      editing: state => state.profile.editingServiceCard
    }),
    disabled () {
      return (
        Boolean(this.services.description) &&
        Boolean(this.services.pricing.amount) &&
        this.services.appointmentTypes.length
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
  watch: {
    selectedServiceIndex (newValue, oldValue) {
      if (newValue !== null) {
        this.selectedService = this.servicesFromStore[newValue]
        this.services.description = this.selectedService.description
        this.services.appointmentTypes = this.selectedService.appointmentTypes
        this.services.pricing.amount = this.selectedService.pricing.amount
      }
    },
    servicesFromStore (newValue, oldValue) {
      this.$emit('validity', Boolean(!this.servicesFromStore.length))
    }
  },
  mounted () {
    if (this.servicesFromStore) {
      this.$emit('validity', Boolean(!this.servicesFromStore.length))
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
    ...mapMutations({
      createService: 'profile/UPDATE_TRAINNER_REG_DATA',
      setTempState: 'profile/SET_STATE'
    }),
    addNewService () {
      if (!this.disabled) {
        this.$gwtoast.error('All form fields are required')
      } else if (
        this.servicesFromStore.length &&
        this.servicesFromStore.some(
          s =>
            s.description.toLowerCase() ===
            this.services.description.toLowerCase()
        )
      ) {
        this.$gwtoast.error(
          `${this.services.description} service already exist`)
      } else {
        this.createService({
          parent: 'services',
          type: 'services',
          value: { ...this.services }
        })
        this.services.description = ''
        this.services.appointmentTypes = []
        this.services.pricing = {
          amount: '',
          plan: 'hourly'
        }
      }
    },
    saveEdit () {
      if (this.disableUpdate && this.services.pricing.amount === this.selectedService.pricing.amount) {
        this.$gwtoast.error('You have not made any change to the service')
      } else {
        this.createService({
          parent: 'services',
          type: 'updateService',
          index: this.selectedServiceIndex,
          value: { ...this.services }
        })
        this.cancelEdit()
        this.$gwtoast.success('Service Updated')
      }
    },
    cancelEdit () {
      this.setTempState({ editingServiceCard: false })
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
