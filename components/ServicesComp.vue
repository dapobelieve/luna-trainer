<template>
  <div>
    <div class="tail-pb-5 tail-pt-10">
      <h3 class="tail-text-2xl tail-font-medium sec-color">
        Services
      </h3>
      <small class="tail-text-gray-400">Set the types of services you offer and your pricing here...</small>
    </div>
    <div class="tail-pb-4 tail-py-5 tail-px-5 tail-bg-white tail-rounded-md">
      <div class="tail-bg-white tail-rounded-lg">
        <form class="tail-grid tail-gap-6" @submit.prevent="update">
          <div>
            <label for="services" class="tail-block">Service</label>
            <input v-model="serviceDetails.description" type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
          </div>
          <div class="tail-flex tail-items-center">
            <!-- <input type="checkbox" class="tail-mr-2"> -->
          </div>
          <div class="tail-rounded-md tail-border tail-border-gray-300 tail-p-3">
            <label for="">Type of appointment</label>
            <!-- <span class="tail-rounded-full tail-border-gray-300 tail-border tail-px-2 tail-py-1 tail-mr-2 tail-inline-flex tail-items-center tail-text-sm">
              In-person
              <i role="button" class="ns-cross tail-text-xs tail-rounded-full tail-bg-gray-200 tail-text-black tail-p-1 tail-ml-2"></i>
            </span>
            <span class="tail-rounded-full tail-border-gray-300 tail-border tail-px-2 tail-py-1 tail-mr-2 tail-inline-flex tail-items-center tail-text-sm">
              Video
              <i role="button" class="ns-cross tail-text-xs tail-rounded-full tail-bg-gray-200 tail-text-black tail-p-1 tail-ml-2"></i>
            </span> -->
            <select v-model="serviceDetails.appointmentType" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
              <option value="video">
                Video
              </option>
              <option value="in-person">
                In-person
              </option>
            </select>
          </div>
          <div class="">
            <label for="price" class="tail-pb-8">Price</label>
            <div class="tail-flex">
              <span class="tail-w-11 tail-h-11 tail-border-r-0 tail-mt-1 tail-text-xl tail-bg-gray-300 tail-text-center tail-rounded-l tail-flex tail-justify-center tail-items-center">£</span>
              <input v-model.number="serviceDetails.pricing.amount" type="number" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-border-l-0 tail-rounded-r">
            </div>
          </div>
          <button>
            <div class="tail-flex">
              <div class="tail-rounded-full tail-bg-blue-200 tail-px-1 tail-flex tail-items-center tail-justify-center">
                <i class="ns-plus tail-text-base tail-text-white" />
              </div>
              <!-- <span class="text-primary-color tail-pl-2" @click.prevent="addService">Add Service</span> -->
            </div>
          </button>
          <template v-if="services.length">
            <div
              v-for="service in services"
              :key="service.index"
              class="tail-grid tail-grid-cols-4"
            >
              <div>{{ service.description }}</div>
              <div>{{ service.appointmentType }}</div>
              <div>{{ service.pricing.amount }}</div>
              <button>Edit</button>
            </div>
          </template>
          <div class="tail-flex tail-justify-end">
            <button
              type="submit"
              class="base-button"
              style="width: fit-content"
            >
              <SingleLoader v-if="isLoading" class="tail-mr-2" />
              {{ isLoading ? 'Adding Service...' : 'Add Service' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'ServicesComp',
  data () {
    return {
      isLoading: false,
      services: [],
      serviceDetails: {
        description: '',
        appointmentType: '',
        pricing: {
          plan: 'hourly',
          amount: ''
        }
      }
    }
  },
  methods: {
    ...mapActions({
      updateServices: 'client/updateProfile'
    }),
    addService () {
      // this.services.push(this.serviceDetails)
      // this.serviceDetails.appointmentType = ''
      // this.serviceDetails.description = ''
      // this.serviceDetails.pricing.amount = ''
    },
    update () {
      // eslint-disable-next-line no-constant-condition
      if (true) {
        console.log('you pressed')
        this.isLoading = true
        console.log('sending', this.serviceDetails)
        // const services = {
        //   description: this.serviceDetails.description,
        //   appointmentType: this.appointmentType,
        //   pricing: {
        //     plan: 'hourly',
        //     amount: parseInt(this.serviceDetails.amount)
        //   }
        // }
        // eslint-disable-next-line object-shorthand
        return this.updateServices({ services: this.serviceDetails }).then((response) => {
          if (response.status === 'success') {
            this.$toast.success('Services updated', { position: 'top-right' })
            this.serviceDetails.description = ''
            this.appointmentType = ''
            this.serviceDetails.amount = ''
          }
        }).catch().finally(() => {
          this.isLoading = false
        })
      }
    },
    removeAppointment () {
      this.serviceDetails.selectedType = null
    }
  }
}
</script>
