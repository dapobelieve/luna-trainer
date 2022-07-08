<template>
  <div>
    <h5 class="text-lg font-bold">
      Add your core services.
    </h5>
    <form class="flex flex-col gap-6 mt-6 lg:mt-10">
      <div class="flex flex-col gap-1.5">
        <label for="service" class="required">Type of service </label>
        <span
          class="text-gray-400 text-sm my-1"
        >For example: Puppy Class or Behaviour Consultation</span>
        <input
          id="service"
          v-model="service.description"
          :disabled="maxServicesReached"
          :class="{ 'border-red-500': $v.service.description.$error }"
          placeholder="Separation Anxiety"
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
              'bg-blue-50': service.appointmentTypes.includes('remote'),
              'border-red-500': $v.service.appointmentTypes.$error
            }"
          >
            <input
              id="remote"
              v-model="service.appointmentTypes"
              aria-describedby="remote-description"
              name="remote"
              type="checkbox"
              :disabled="maxServicesReached"
              value="remote"
              class="h-5 w-5 rounded"
            />
            <span id="reinforcement-0-label" class="ml-2 font-medium">Remote</span>
          </label>
          <label
            class="rounded-md relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm"
            :class="{
              'bg-blue-50': service.appointmentTypes.includes(
                'in-person'
              ),
              'border-red-500': $v.service.appointmentTypes.$error
            }"
          >
            <input
              id="inPerson"
              v-model="service.appointmentTypes"
              aria-describedby="remote-description"
              name="remote"
              type="checkbox"
              :disabled="maxServicesReached"
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
            :class="{ 'border-red-500': $v.service.pricing.amount.$error }"
            class="inset-y-0 left-0 pl-3 flex items-center pointer-events-none bg-white h-10 border shadow-sm rounded-l-md border-r-0"
          >
            <span class="text-gray-500">{{ $store.state.onboarding.business.currency }}</span>
          </div>
          <input
            id="currency"
            v-model.number="service.pricing.amount"
            type="number"
            :disabled="maxServicesReached"
            class="bg-white h-10 flex justify-center py-2 px-4 w-full border shadow-sm rounded-r-md focus:outline-none focus:bg-white focus:border-blue-500 focus:border border-l-0"
            :class="{ 'border-red-500': $v.service.pricing.amount.$error }"
          />
        </div>
      </div>
      <div class="sm:col-span-2 flex justify-end gap-2">
        <p
          v-if="maxServicesReached"
          class="text-gray-500 font-medium"
        >
          You have enough services for now
        </p>
        <template v-else-if="service._id || service.idx">
          <button type="button" class="button-text" @click="resetService">
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
import { required, minLength, minValue } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
export default {
  name: 'OnboardingServices',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    maxServicesReached () {
      this.$emit('validity', this.services.length < 1 || (this.service.idx || this.service._id))
      return this.services.length >= 10 && !!(!this.service.idx && !this.service._id)
    },
    ...mapState({
      services (state) {
        return state.onboarding.services
      }
    })
  },
  data () {
    return {
      service: {}
    }
  },
  watch: {
    value: {
      handler () {
        this.service = JSON.parse(JSON.stringify(this.value))
      },
      immediate: true,
      deep: true
    }
  },
  validations: {
    service: {
      pricing: {
        amount: {
          required,
          minValue: minValue(1)
        }
      },
      description: {
        required
      },
      appointmentTypes: {
        required,
        minLength: minLength(1)
      }
    }
  },
  methods: {
    addNewService () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$lunaToast.error('All form fields are required')
      } else {
        this.service.idx = new Date().getTime()
        this.$store.commit('onboarding/updateService', this.service)
        this.resetService()
      }
    },
    saveEdit () {
      this.$store.commit('onboarding/updateService', this.service)
      this.resetService()
      this.$lunaToast.success('Service Updated')
    },
    resetService () {
      this.$v.$reset()
      this.service = {
        description: '',
        appointmentTypes: [],
        pricing: {
          amount: 0,
          plan: 'hourly'
        }
      }
      this.$emit('input', this.service)
    }
  }
}
</script>

<style lang="scss" scoped></style>
