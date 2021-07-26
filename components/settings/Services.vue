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
        <form class="tail-grid tail-gap-4" @submit.prevent="selectedService._id ? updateServiceItem() : insertServiceItem()">
          <div>
            <label for="services" class="tail-block">Service</label>
            <input v-model="selectedService.description" type="text" placeholder="Seperation Anxiety" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
          </div>
          <div>
            <label for="" class="tail-block tail-my-2">Type of appointment</label>
            <div class="tail-py-2 ">
              <div class="tail-flex">
                <div class="tail-mr-4">
                  <input type="checkbox" id="video" v-model="selectedService.appointmentTypes" value="video"/>
                  <label for="video" class="tail-text-gray-600">Available on video</label>
                </div>
                <div >
                  <input type="checkbox" id="in-person" v-model="selectedService.appointmentTypes" value="in-person"/>
                  <label for="in-person" class="tail-text-gray-600">Available in person</label>
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <label for="price" class="tail-pb-8">Price</label>
            <div class="tail-flex">
              <span class="tail-w-11 tail-h-11 tail-border-r-0 tail-mt-1 tail-text-xl tail-bg-gray-300 tail-text-center tail-rounded-l tail-flex tail-justify-center tail-items-center">£</span>
              <input v-model.number="selectedService.pricing.amount" type="number" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-border-l-0 tail-rounded-r">
            </div>
          </div>
          <button :disabled="disabled" :class="[disabled?['tail-text-gray-500', 'tail-pointer-events-none']: [] ]"  @click.prevent="selectedService._id ? updateServiceItem() : insertServiceItem()">
            <div class="tail-flex">
              <div class="tail-rounded-full tail-px-2 tail-py-1 tail-flex tail-items-center tail-justify-center">
                <SingleLoader v-if="isLoading" class="tail-mr-2" />
                <i v-if="!isLoading" class="ns-plus tail-text-base tail-rounded-full tail-text-white tail-p-1 primary-color"/>
                <span class="text-primary-color tail-pl-2">{{ !selectedService._id ? "Add New Service Item" : "Update Service Item" }} </span>
              </div>
            </div>
          </button>
          <div v-if="services.length">
            <div
              v-for="service in services"
              :key="service.index"
              class="tail-flex tail-flex-col"
            >
              <div class="tail-flex tail-mt-4">
                <h1 class="tail-flex-1 tail-text-xl tail-sec-color" >{{ service.description }}</h1>
                <h1 class="tail-ml-4 ">{{ service.pricing.amount | amount }}</h1>
                <button class="tail-ml-4" @click.prevent="editServiceItem(service._id)"><i class="ns-edit tail-text-base"/></button>
              </div>
              <div>
                <span v-for="appointmentType in service.appointmentTypes" :key="appointmentType.index" class="tail-inline-block tail-bg-gray-200 tail-rounded-full tail-px-3 tail-py-1 tail-text-sm tail-text-gray-700 tail-mr-2 tail-mb-2 tail-mt-2">{{ appointmentType }}</span>
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
  computed: {
    disabled () {
      return this.$v.$invalid || this.isLoading
    }
  },
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
      updateProfile: 'authorize/updateProfile'
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
      console.log(this.selectedService)
    },
    upsertServiceItem () {
      this.isLoading = true
      return this.updateProfile({ services: this.updatedServices }).then((response) => {
        if (response.status === 'success') {
          this.resetSelectedService()
          this.$toast.success('Services updated', { position: 'top-right' })
        }
      }).catch().finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
