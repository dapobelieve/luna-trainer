<template>
  <div>
    <div class="pb-5 pt-10">
      <h3 class="text-2xl font-medium sec-color">
        Services
      </h3>
      <small class="text-gray-400">Add services you offer and pricing here.</small>
    </div>
    <div class="pb-4 py-5 px-5 bg-white rounded-md">
      <div class="bg-white rounded-lg">
        <form class="grid gap-4" @submit.prevent="selectedService._id ? updateServiceItem() : insertServiceItem()">
          <div>
            <label for="services" class="block">Service</label>
            <input v-model="selectedService.description" type="text" placeholder="Seperation Anxiety" class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label for="" class="block my-2">Type of appointment</label>
            <div class="py-2 ">
              <div class="flex">
                <div class="mr-4">
                  <input id="video" v-model="selectedService.appointmentTypes" type="checkbox" value="video" />
                  <label for="video" class="text-gray-600">Available on video</label>
                </div>
                <div>
                  <input id="in-person" v-model="selectedService.appointmentTypes" type="checkbox" value="in-person" />
                  <label for="in-person" class="text-gray-600">Available in person</label>
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <label for="price" class="pb-8">Price</label>
            <div class="flex">
              <span class="w-11 h-11 border-r-0 mt-1 text-xl bg-gray-300 text-center rounded-l flex justify-center items-center">£</span>
              <input v-model.number="selectedService.pricing.amount" type="number" class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 border-l-0 rounded-r">
            </div>
          </div>
          <button :disabled="disabled" :class="[disabled?['text-gray-500', 'pointer-events-none']: [] ]" @click.prevent="selectedService._id ? updateServiceItem() : insertServiceItem()">
            <div class="flex">
              <div class="rounded-full px-2 py-1 flex items-center justify-center">
                <SingleLoader v-if="isLoading" class="mr-2" />
                <i v-if="!isLoading" class="ns-plus text-base rounded-full text-white p-1 primary-color" />
                <span class="text-primary-color pl-2">{{ !selectedService._id ? "Add New Service Item" : "Update Service Item" }} </span>
              </div>
            </div>
          </button>
          <div v-if="services.length">
            <div
              v-for="service in services"
              :key="service.index"
              class="flex flex-col"
            >
              <div class="flex mt-4">
                <h1 class="flex-1 text-xl sec-color">
                  {{ service.description }}
                </h1>
                <h1 class="ml-4 ">
                  {{ service.pricing.amount | amount }}
                </h1>
                <button class="ml-4" @click.prevent="editServiceItem(service._id)">
                  <i class="ns-edit text-base" />
                </button>
              </div>
              <div>
                <span v-for="appointmentType in service.appointmentTypes" :key="appointmentType.index" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2 mt-2">{{ appointmentType }}</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'SettingsServices',
  props: {
    services: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isLoading: false,
      selectedService: { pricing: {}, appointmentTypes: [] },
      updatedServices: []
    }
  },
  computed: {
    disabled () {
      return this.$v.$invalid || this.isLoading
    }
  },
  mounted () {
    this.resetUpdatedServices()
  },
  validations: {
    selectedService: {
      description: {
        required
      },
      pricing: {
        amount: {
          required
        }
      }
    }
  },
  methods: {
    ...mapActions({
      updateProfile: 'profile/updateProfile'
    }),
    resetSelectedService () {
      this.selectedService = { pricing: {}, appointmentTypes: [] }
    },
    resetUpdatedServices () {
      this.updatedServices = [...this.services]
    },
    updateServiceItem () {
      this.updatedServices = this.services.map((item) => {
        if (item._id === this.selectedService._id) {
          return this.selectedService
        }
        return item
      })
      this.upsertServiceItem()
    },
    insertServiceItem () {
      this.updatedServices.push(this.selectedService)
      this.upsertServiceItem()
    },
    editServiceItem (id) {
      this.selectedService = JSON.parse(JSON.stringify(this.services.find(service => service._id === id)))
    },
    upsertServiceItem () {
      this.isLoading = true
      return this.updateProfile({ services: this.updatedServices }).then((response) => {
        if (response.status === 'success') {
          this.resetSelectedService()
          this.$gwtoast.success('Services updated')
        }
      }).catch().finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
