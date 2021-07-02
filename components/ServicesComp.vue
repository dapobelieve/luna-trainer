<template>
  <div>
    <div class="tail-py-10">
      <h3 class="tail-text-2xl tail-font-medium sec-color">
        Services
      </h3>
      <small class="tail-text-gray-400">Set the types of services you offer and your pricing here...</small>
    </div>
    <div class="tail-pb-4 tail-py-5 tail-px-5 tail-bg-white tail-rounded-md">
      <form autocomplete="off" class="tail-grid tail-gap-6" @submit.prevent="updateService">
        <div class="">
          <!-- <div v-else class="tail-rounded-full tail-mt-2 tail-capitalize tail-px-2 tail-w-min tail-border tail-border-gray-600 tail-flex tail-items-center">
            <span class="tail-mr-4">{{ serviceDetails.selectedType }}</span>
            <button
              :class="['tail-bg-red-600', 'tail-rounded-full', 'tail-text-xs', 'tail-p-0.5', 'tail-flex']"
              @click.prevent="removeAppointment"
            >
              <i :class="['ns-cross', 'tail-text-white']" />
            </button>
          </div> -->
        </div>
        <div class="">
          <label for="services" class="">Description</label>
          <input v-model="serviceDetails.description" type="services" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div>
          <label for="typeofappointment" class="tail-px-2">Type of appointment</label>
          <select v-model="appointmentType" class="tail-mt-2 tail-block tail-w-full tail-border tail-border-gray-400 tail-rounded-md tail-p-2">
            <option value="in-person">
              In-person
            </option>
            <option value="video">
              Video
            </option>
          </select>
        </div>
        <template v-if="serviceDetails.appointmentType">
          <input v-model="serviceDetails.appointmentType" type="text" disabled class="tail-bg-gray-300 tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" @keydown.enter.prevent="serviceDetails.selectedType = serviceDetails.appointmentType">
          <em v-if="appointmentType">please input a figure for this service</em>
        </template>
        <div class="">
          <label for="price" class="tail-pb-8">Price</label>
          <div class="tail-flex">
            <span class="tail-w-11 tail-h-11 tail-border-r-0 tail-mt-1 tail-text-xl tail-bg-gray-300 tail-text-center tail-rounded-l tail-flex tail-justify-center tail-items-center">£</span>
            <input v-model="serviceDetails.amount" type="number" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-border-l-0 tail-rounded-r">
          </div>
        </div>
        <div class="tail-flex tail-justify-end">
          <div class="tail-flex tail-justify-end">
            <ButtonSpinner :is-loading="isLoading">
              Save Changes
            </ButtonSpinner>
          </div>
        </div>
        <template v-if="$auth.user.services.length">
          <div v-for="service in $auth.user.services" :key="service.index" class="tail-my-2 tail-p-2 tail-rounded-md tail-border-gray-600 tail-border">
            <div class="tail-flex tail-justify-between">
              <span>{{ service.appointmentType }}</span>
              <span>£ {{ service.pricing.amount }}</span>
              <button class="tail-text-blue-600">
                Edit
              </button>
            </div>
          </div>
        </template>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'ServicesComp',
  data () {
    return {
      appointmentType: '',
      isLoading: false,
      serviceDetails: {
        selectedType: null,
        description: '',
        amount: ''
      }
    }
  },
  methods: {
    ...mapActions({
      updateServices: 'client/updateProfile'
    }),
    updateService () {
      // eslint-disable-next-line no-constant-condition
      if (true) {
        this.isLoading = true
        const services = {
          description: this.serviceDetails.description,
          appointmentType: this.appointmentType,
          pricing: {
            plan: 'hourly',
            amount: parseInt(this.serviceDetails.amount)
          }
        }
        // eslint-disable-next-line object-shorthand
        return this.updateServices({ services: services }).then((response) => {
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
