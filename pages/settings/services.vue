<template>
  <div class="bg-white border border-gray-200 rounded-xl py-4">
    <div class="flex justify-between md:mb-5 px-4">
      <h5 class="text-lg">
        Services
      </h5>
      <button class="text-primary-color flex items-center" @click="$modal.show('service-modal')">
        <i class="fi-rr-plus text-sm mr-2"></i>
        <span>Add Service</span>
      </button>
    </div>
    <div class="px-1">
      <template v-if="services && services.length">
        <div v-for="service in services" :key="service._id" class="flex cursor-pointer p-3 hover:bg-blue-50 rounded-lg justify-between items-center">
          <div>
            <h6 class="font-medium">
              {{ service.description }}
            </h6>
            <p class="text-gray-500">
              <template v-for="(appType) in service.appointmentTypes">
                {{ appType }}
              </template>
            </p>
          </div>
          <div class="inline-flex">
            <span class="font-medium mr-6">
              {{ service.pricing.amount | amount }}
            </span>
            <button class="mr-6" @click="selectedService=service; $modal.show('service-modal')">
              <i class="fi-rr-pencil text-md text-primary-color"></i>
            </button>
            <button @click="removeService(service)">
              <i class="fi-rr-trash text-md text-primary-color"></i>
            </button>
          </div>
        </div>
      </template>
      <div v-else class="my-20 text-center h-100">
        <h4 class="font-bold text-gray-700 mb-1">
          You have no service
        </h4>
        <button class="primary-color rounded-lg px-4 py-2" type="button" @click="$modal.show('service-modal')">
          <i class="fi-rr-plus text-white"></i>
          <span class="text-font-medium text-white text-base ml-2">Add service</span>
        </button>
      </div>
    </div>
    <modal name="service-modal" height="auto" :adaptive="true">
      <invoices-add-new-invoice-service :service-object="selectedService" class="m-6" @close-modal="close">
        <template v-slot:title>
          {{ selectedService ? 'Edit Service' : 'Add Service' }}
        </template>
      </invoices-add-new-invoice-service>
    </modal>
  </div>
</template>

<script>
import currency from '~/utils/currency'
export default {
  props: ['serviceObject'],
  async asyncData (ctx) {
    const res = await ctx.store.dispatch('profile/getServices')
    return { services: res.data }
  },
  data () {
    return {
      currency,
      selectedService: null,
      services: []
    }
  },
  methods: {
    close (newObject = null) {
      if (newObject) {
        this.services.unshift(newObject)
      }
      this.selectedService = null
      this.$modal.hide('service-modal')
    },
    async removeService (service) {
      try {
        await this.$store.dispatch('profile/deleteService', service._id)
        this.services.splice(this.services.indexOf(service), 1)
        this.$lunaToast.success('Service deleted')
      } catch (e) {
        this.$lunaToast.error(e)
        console.log('Unable to delete service')
      }
    }
  }
}
</script>

<style scoped>

</style>
