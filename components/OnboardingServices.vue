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
            v-model="services.title"
            placeholder="Separation Anxiety (Replace this title)"
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
        <div class="tail-flex tail-space-x-2">
          <label
            class="tail-rounded-tl-md tail-rounded-md tail-relative tail-border tail-px-4 tail-py-2.5 tail-flex tail-cursor-pointer focus:tail-outline-none tail-w-full"
            :class="{
              'tail-bg-blue-200': services.appointmentType.includes('remote')
            }"
          >
            <input
              id="remote"
              v-model="services.appointmentType"
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
              'tail-bg-blue-200': services.appointmentType.includes('in-person')
            }"
          >
            <input
              id="inPerson"
              v-model="services.appointmentType"
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
            v-model.number="services.price"
            placeholder="GBP (£)"
            type="number"
            name="price"
            class="tail-py-1 tail-block tail-w-full tail-shadow-sm focus:tail-ring-indigo-500 focus:tail-border-indigo-500 tail-border-gray-300 tail-rounded-md tail-border tail-px-2"
          />
        </div>
      </div>
      <div class="sm:tail-col-span-2 tail-flex tail-justify-end">
        <p v-if="servicesFromStore.length === 5">
          You have enough services for now
        </p>
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
  data () {
    return {
      services: {
        title: '',
        appointmentType: [],
        price: ''
      }
    }
  },
  computed: {
    ...mapState({
      servicesFromStore: state => state.profile.trainnerRegData.services
    })
  },
  watch: {
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
      price: {
        required
      },
      title: {
        required
      }
    }
  },
  methods: {
    ...mapMutations({
      setProfileData: 'profile/UPDATE_TRAINNER_REG_DATA'
    }),
    addNewService () {
      if (this.servicesFromStore.length && this.servicesFromStore.some(s => s.title.toLowerCase() === this.services.title.toLowerCase())) {
        this.$toast.error(`${this.services.title} service already exist`, { position: 'top-right' })
      } else {
        this.setProfileData({ parent: 'services', type: 'services', value: { ...this.services } })
        this.services.title = ''
        this.services.appointmentType = []
        this.services.price = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
