<template>
  <div class="m-5">
    <div class="flex justify-between items-center">
      <h5 class="text-2xl text-gray-700">
        <slot name="title">
          {{ service._id ? 'Editing a service' : 'Add a new service' }}
        </slot>
      </h5>
      <button type="button" @click="$emit('close')">
        <i class="fi-rr-cross text-sm text-blue-500"></i>
      </button>
    </div>
    <form class="flex flex-col gap-6 mt-8">
      <div class="flex flex-col gap-1.5">
        <label for="service" class="required">Description</label>
        <input
          id="service"
          v-model="service.description"
          autofocus
          placeholder="Separation Anxiety (Replace this description)"
          class="
            bg-white
            h-10
            flex
            justify-center
            py-2
            px-3
            w-full
            border
            shadow-sm
            rounded-md
            focus:outline-none focus:bg-white focus:border-blue-500
          "
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="reinforcement" class="required"
          >Type of appointment (you can tick both options)</label
        >
        <div
          class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
        >
          <label
            class="
              rounded-lg
              relative
              border
              p-3
              cursor-pointer
              focus:outline-none
              w-full
              bg-white
              hover:bg-blue-50
              transition-all
              flex
              items-center
              shadow-sm
            "
            :class="{
              'bg-blue-50':
                service.appointmentTypes &&
                service.appointmentTypes.includes('remote'),
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
            <span id="reinforcement-0-label" class="ml-2 font-medium"
              >Remote</span
            >
          </label>
          <label
            class="
              rounded-lg
              relative
              border
              p-3
              cursor-pointer
              focus:outline-none
              w-full
              bg-white
              hover:bg-blue-50
              transition-all
              flex
              items-center
              shadow-sm
            "
            :class="{
              'bg-blue-50':
                service.appointmentTypes &&
                service.appointmentTypes.includes('in-person'),
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
            <span id="reinforcement-0-label" class="ml-2 font-medium"
              >In-person (1-2-1)</span
            >
          </label>
        </div>
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="currency" class="required">Price</label>
        <div class="relative flex">
          <div
            class="
              inset-y-0
              left-0
              pl-3
              flex
              items-center
              pointer-events-none
              bg-white
              h-10
              border
              shadow-sm
              rounded-l-md
              border-r-0
            "
          >
            <span class="text-gray-500">{{ $auth.user.currency }}</span>
          </div>
          <input
            id="currency"
            v-model.number="service.pricing.amount"
            type="number"
            class="
              bg-white
              h-10
              flex
              justify-center
              py-2
              px-4
              w-full
              border
              shadow-sm
              rounded-r-md
              focus:outline-none
              focus:bg-white
              focus:border-blue-500
              focus:border
              border-l-0
            "
          />
        </div>
      </div>
      <div class="sm:col-span-2 flex justify-end gap-2">
        <p v-if="isMaxServicesAmountReached" class="text-gray-500 font-medium">
          You have enough services for now
        </p>
        <button-spinner
          v-else
          :disabled="$v.service.$invalid"
          :loading="loading"
          type="button"
          style="width: fit-content"
          @click="saveItem"
        >
          {{ service._id ? 'Edit Service' : 'Add new service' }}
        </button-spinner>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required, numeric, minValue, minLength} from 'vuelidate/lib/validators'
export default {
  name: 'EditInvoiceItem',
  props: {
    item: {
      _id: '',
      description: '',
      serviceId: '',
      price: 0,
    },
  },
  validations: {
    service: {
      description: { required, minLength: minLength(4)},
      pricing: {
        amount: { required, numeric, minValue: minValue(1) },
      },
      appointmentTypes: { required },
    },
  },
  data() {
    return {
      service: {
        _id: this.item._id,
        description: this.item.description,
        appointmentTypes: [],
        pricing: {
          amount: this.item.price,
        },
      },
      loading: false,
    }
  },
  async mounted() {
    if (this.item.serviceId) {
      this.service = JSON.parse(
        JSON.stringify(this.getServiceById(this.item.serviceId))
      )
    }
  },
  computed: {
    ...mapGetters({
      getServiceById: 'services/getServiceById',
      isMaxServicesAmountReached: 'services/isMaxServicesAmountReached',
    }),
    disableUpdate() {
      return false
    },
  },
  methods: {
    ...mapActions({
      updateService: 'services/updateService',
      createService: 'services/createService',
    }),
    async saveItem() {
      try {
        this.loading = true
        if (this.service._id) await this.updateService(this.service)
        else await this.createService(this.service)
        this.$lunaToast.success('Item updated successfully')
        this.$emit('close')
      } catch (error) {
        this.$lunaToast.error('An error occured while saving')
        console.error(error)
      }
      this.loading = false
    },
    cancel() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped></style>
