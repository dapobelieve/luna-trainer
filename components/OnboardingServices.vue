<template>
  <div>
    <h2
      class="tail-text-lg tail-font-extrabold tail-tracking-tight tail-text-gray-700"
    >
      Add Your services
    </h2>
    <form
      class="tail-grid tail-grid-cols-1 tail-gap-y-6 sm:tail-grid-cols-2 sm:tail-gap-x-8 tail-mt-10 tail-text-gray-700"
    >
      <div class="sm:tail-col-span-2">
        <label
          for="service"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
        >
          Service Title <span class="tail-text-red-700">*</span>
        </label>
        <div class="">
          <input
            id="service"
            v-model="services.description"
            placeholder="Separation Anxiety (Replace this description)"
            class="tail-block tail-w-full tail-shadow-sm sm:tail-text-sm focus:tail-ring-grape-500 focus:tail-border-grape-500 tail-border-gray-300 tail-rounded-md tail-py-2 tail-border tail-px-2"
          />
        </div>
      </div>
      <div class="sm:tail-col-span-2">
        <label
          for="reinforcement"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
        >
          Type of appointment (you can tick both options)
          <span class="tail-text-red-700">*</span>
        </label>
        <div
          class="tail-flex tail-flex-col sm:tail-flex-row tail-space-y-2 sm:tail-space-y-0 sm:tail-space-x-2"
        >
          <label
            class="tail-rounded-tl-md tail-rounded-md tail-relative tail-border tail-px-4 tail-py-2.5 tail-flex tail-cursor-pointer focus:tail-outline-none tail-w-full"
            :class="{
              'tail-bg-blue-200': services.appointmentTypes.includes('remote')
            }"
          >
            <input
              id="remote"
              v-model="services.appointmentTypes"
              aria-describedby="remote-description"
              name="remote"
              type="checkbox"
              value="remote"
              class="focus:tail-ring-indigo-500 tail-h-4 tail-w-4 tail-text-indigo-600 tail-border-gray-300 tail-rounded"
            />
            <div class="tail-ml-3 tail-flex tail-flex-col">
              <span
                id="reinforcement-0-label"
                class="tail-block tail-text-sm tail-font-medium"
              >
                Yes
              </span>
            </div>
          </label>
          <label
            class="tail-rounded-tl-md tail-rounded-md tail-relative tail-border tail-px-4 tail-py-2.5 tail-flex tail-cursor-pointer focus:tail-outline-none tail-w-full"
            :class="{
              'tail-bg-blue-200': services.appointmentTypes.includes(
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
              class="focus:tail-ring-indigo-500 tail-h-4 tail-w-4 tail-text-indigo-600 tail-border-gray-300 tail-rounded"
            />
            <div class="tail-ml-3 tail-flex tail-flex-col">
              <span
                id="reinforcement-0-label"
                class="tail-block tail-text-sm tail-font-medium"
              >
                In-person (1-2-1)
              </span>
            </div>
          </label>
        </div>
      </div>
      <div class="sm:tail-col-span-2">
        <label
          for="currency"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
        >
          Price
          <span class="tail-text-red-700">*</span>
        </label>
        <div class="">
          <input
            id="price"
            v-model.number="services.pricing.amount"
            :placeholder="
              $store.state.profile.trainnerRegData.personalProfile.currency
            "
            type="number"
            class="tail-py-1 tail-block tail-text-sm tail-w-full tail-shadow-sm focus:tail-ring-indigo-500 focus:tail-border-indigo-500 tail-border-gray-300 tail-rounded-md tail-border tail-px-2"
          />
        </div>
      </div>
      <div class="sm:tail-col-span-2 tail-flex tail-justify-end tail-space-x-2">
        <p v-if="servicesFromStore.length === 5 && !editing">
          You have enough services for now
        </p>
        <template v-else-if="editing">
          <button
            type="button"
            style="width: fit-content"
            class="base-button tail-bg-white tail-text-blue-500 tail-border tail-border-blue-500 tail-px-3 tail-py-1 tail-rounded"
            @click="cancelEdit"
          >
            Cancel Edit
          </button>
          <button
            type="button"
            style="width: fit-content"
            class="base-button tail-bg-white tail-text-blue-500 tail-border tail-border-blue-500 tail-px-3 tail-py-1 tail-rounded"
            @click="saveEdit"
          >
            Update Service
          </button>
        </template>
        <button
          v-else
          type="button"
          style="width: fit-content"
          class="base-button tail-bg-white tail-text-blue-500 tail-border tail-border-blue-500 tail-px-3 tail-py-1 tail-rounded"
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
      this.selectedService = this.servicesFromStore[newValue]
      this.services.description = this.selectedService.description
      this.services.appointmentTypes = this.selectedService.appointmentTypes
      this.services.pricing.amount = this.selectedService.pricing.amount
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
      if (this.disableUpdate) {
        this.$toast.error('You have not made any change to the service', {
          position: 'top-right'
        })
      } else {
        this.createService({
          parent: 'services',
          type: 'updateService',
          index: this.selectedServiceIndex,
          value: { ...this.services }
        })
        this.cancelEdit()
        this.$toast.success('Service Updated', { position: 'top-right' })
      }
    },
    cancelEdit () {
      this.setTempState({ editingServiceCard: false })
      this.selectedService = null
      this.services.description = ''
      this.services.appointmentTypes = []
      this.services.pricing = {
        amount: '',
        plan: 'hourly'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
