<template>
  <div class="m-5">
    <div class="flex justify-between items-center">
      <h5 class="text-2xl text-gray-700">
        <slot name="title"></slot>
      </h5>
      <button type="button" @click="$emit('close-modal')">
        <i class="fi-rr-cross text-sm text-blue-500"></i>
      </button>
    </div>
    <form class="flex flex-col gap-6 mt-8">
      <div class="flex flex-col gap-1.5">
        <label for="service" class="required">Description</label>
        <input
          id="service"
          ref="serviceDescription"
          v-model="service.description"
          autofocus
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
              'bg-blue-50': service.appointmentTypes.includes('remote')
            }"
          >
            <input
              id="remote"
              v-model="service.appointmentTypes"
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
              'bg-blue-50': service.appointmentTypes.includes('in-person')
            }"
          >
            <input
              id="inPerson"
              v-model="service.appointmentTypes"
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
            v-model.number="service.pricing.amount"
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
            :disabled="disableUpdate"
            type="button"
            style="width:fit-content"
            @click="saveEditedServiceItem"
          >
            Update
          </button-spinner>
        </template>
        <button-spinner
          v-else
          :loading="isLoading"
          :disabled="disableAdd"
          type="button"
          style="width:fit-content"
          @click.stop="addNewService"
        >
          Add service
        </button-spinner>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import isEqual from 'lodash.isequal'
export default {
  name: 'CreatingInvoiceNewService',
  props: {
    serviceObject: {
      description: '',
      type: Object

    }
  },
  data () {
    return {
      editing: false,
      isLoading: false,
      selectedService: null,
      service: {
        description: this.serviceObject?.description || '',
        appointmentTypes: [],
        pricing: {
          plan: 'hourly',
          amount: ''
        }
      }
    }
  },
  computed: {
    disableAdd  () {
      return !this.service.appointmentTypes.length || !this.service.description || !this.service.pricing.amount || (this.service?.pricing?.amount?? 0) <= 0
    },
    ...mapState({
      servicesFromStore: state => state.auth.user.services
    }),
    disabled () {
      return (
        Boolean(this.service.description) &&
        Boolean(this.service.pricing.amount) &&
        Boolean(this.service.appointmentTypes.length) &&
        (this.service.pricing?.amount?? 0) <= 0
      )
    },
    disableUpdate () {
      return isEqual(this.service, this.serviceObject) || (this.service?.pricing?.amount?? 0) <= 0
    }
  },
  validations: {
    service: {
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
    reset () {
      this.service.description = ''
      this.service.appointmentTypes = []
      this.service.pricing = {
        amount: '',
        plan: 'hourly'
      }
    },
    async addNewService () {
      if (this.servicesFromStore.length && this.servicesFromStore.filter(x => x.description.toLowerCase() === this.service.description.toLowerCase()).length
      ) {
        this.$lunaToast.error(
          `${this.services.description} service already exist`)
      } else {
        this.isLoading = true
        try {
          const { services } = await this.$store.dispatch('profile/updateProfile', {
            services: [this.service, ...this.servicesFromStore]
          })

          const [latestService] = services
          this.reset()
          this.$emit('close-modal', latestService)
          this.$lunaToast.success(
            `${latestService.description} service added`)
        } catch (e) {
          console.log(e)
          this.$lunaToast.error(
            `${this.service.description} service not added`)
        } finally {
          this.isLoading = false
        }
      }
    },
    async saveEditedServiceItem () {
      try {
        this.isLoading = true
        const allServices = [...this.servicesFromStore].map((_service) => {
          if (_service._id === this.service._id) {
            _service = { ...this.service }
          }
          return _service
        })

        await this.$store.dispatch('profile/updateProfile', { services: [...allServices] })
        this.reset()
        await this.$store.dispatch('profile/getUserProfile')
        this.$emit('close-modal')
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    cancelAndSave () {
      this.editing = false
      this.service.description = ''
      this.service.appointmentTypes = []
      this.service.pricing = {
        amount: '',
        plan: 'hourly'
      }
      this.selectedService = null
    },
    cancelEdit () {
      this.$emit('close-modal')
      this.editing = false
      this.service.description = ''
      this.service.appointmentTypes = []
      this.service.pricing = {
        amount: '',
        plan: 'hourly'
      }
      this.selectedService = null
      this.$emit('clearSelectedServiceIndex', null)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.serviceDescription.focus()
    })
    if (this.serviceObject && Object.entries(this.serviceObject).length !== 0) {
      this.service = JSON.parse(JSON.stringify(this.serviceObject))
      this.editing = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
