<template>
  <div>
    <h5 class="text-lg font-bold">
      Add your core $service.
    </h5>
    <form class="flex flex-col gap-6 mt-6 lg:mt-10">
      <div class="flex flex-col gap-1.5">
        <label for="service" class="required">Type of service </label>
        <span
          class="text-gray-400 my-2"
        >For example: Puppy Class or Behaviour Consultation</span>
        <input
          id="service"
          v-model="$service.description"
          placeholder="Separation Anxiety (Replace this description)"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <label
          for="reinforcement"
          class="required"
        >Type of appointment (you can click more than one)</label>
        <div
          class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
        >
          <label
            class="rounded-md relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm"
            :class="{
              'bg-blue-50': $service.appointmentTypes.includes('remote')
            }"
          >
            <input
              id="remote"
              v-model="$service.appointmentTypes"
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
              'bg-blue-50': $service.appointmentTypes.includes(
                'in-person'
              )
            }"
          >
            <input
              id="inPerson"
              v-model="$service.appointmentTypes"
              aria-describedby="remote-description"
              name="remote"
              type="checkbox"
              value="in-person"
              class="h-5 w-5"
            />
            <span id="reinforcement-0-label" class="ml-2 font-medium">In-person</span>
          </label>
        </div>
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="currency" class="required">Price</label>
        <div class="relative flex">
          <div
            class="inset-y-0 left-0 pl-3 flex items-center pointer-events-none bg-white h-10 border shadow-sm rounded-l-md border-r-0"
          >
            <span class="text-gray-500">{{ $store.state.profile.user.currency }}</span>
          </div>
          <input
            id="currency"
            v-model.number="$service.pricing.amount"
            type="number"
            class="bg-white h-10 flex justify-center py-2 px-4 w-full border shadow-sm rounded-r-md focus:outline-none focus:bg-white focus:border-blue-500 focus:border border-l-0"
          />
        </div>
      </div>
      <div class="sm:col-span-2 flex justify-end gap-2">
        <p
          v-if="services.length === 5 && !editing"
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
    service: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      $service: this.service
    }
  },
  computed: {
    ...mapState({
      services: state => state.onboarding.services
    }),
    disabled () {
      return !this.service || !this.$service.description || !this.$service.pricing.amount || !this.$service.appointmentTypes.length
    },
    disableUpdate () {
      if (this.disabled) {
        return Object.values(this.service).toString()
      }
      return true
    }
  },
  watch: {
    services (newValue, oldValue) {
      this.$emit('validity', Boolean(!this.services.length))
    }
  },
  mounted () {
    if (this.services) {
      this.$emit('validity', Boolean(!this.services.length))
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
      updateServices: 'onboarding/updateServices'
    }),
    addNewService () {
      if (!this.disabled) {
        this.$lunaToast.error('All form fields are required')
      } else if (this.services.length && this.services.some(s => s._id() === this.$service._id)) {
        this.$lunaToast.error(`${this.$service.description} service already exist`)
      } else {
        this.addService(this.$service)
        this.resetService()
      }
    },
    saveEdit () {
      if (this.disableUpdate) {
        this.$lunaToast.error('You have not made any change to the service')
      } else {
        this.updateService(this.$service)
        this.cancelEdit()
        this.$lunaToast.success('Service Updated')
      }
    },
    resetService () {
      this.$service.description = ''
      this.$service.appointmentTypes = []
      this.$service.pricing = {
        amount: '',
        plan: 'hourly'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
