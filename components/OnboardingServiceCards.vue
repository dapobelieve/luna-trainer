<template>
  <div class="w-full xl:max-w-md">
    <h5 class="xl:text-lg font-medium">
      <b
        v-if="services.length"
      >You have added {{ services.length }} service{{ services.length === 1 ? '' : 's' }}</b>
      <b v-else>You have no services</b>
    </h5>
    <div
      class="flex flex-row xl:flex-col mt-3 xl:mt-10 overflow-x-auto snap-scroll-x gap-2"
    >
      <div
        v-for="(n, index) in services"
        :key="index"
        class="rounded-xl w-[17rem] max-w-xs xl:w-full bg-white border flex flex-col hover:bg-gray-50 cursor-pointer overflow-hidden flex-shrink-0"
      >
        <div class="p-4 flex flex-grow gap-2">
          <div
            class="flex flex-col w-full whitespace-nowrap overflow-ellipsis overflow-hidden"
          >
            <div class="font-bold truncate">
              {{ n.description }}
            </div>
            <div class="inline-flex gap-2">
              <span
                v-for="a in n.appointmentTypes"
                :key="a.index"
                class="capitalize mb-0 text-gray-500"
              >{{ a }}</span>
            </div>
          </div>
          <div
            class="font-medium"
          >
            {{amountFormatted($store.state.profile.user.currency, n.pricing.amount)}}
          </div>
        </div>
        <div class="flex px-2 py-1 gap-2 bg-gray-50">
          <button
            class="w-full h-8 flex items-center justify-center text-blue-500 rounded-md hover:bg-blue-50"
            @click.prevent="editService(index)"
          >
            <i class="fi-rr-pencil"></i>
          </button>
          <button
            class="w-full h-8 flex items-center justify-center text-blue-500 rounded-md hover:bg-blue-50"
            @click.prevent="deleteService(index)"
          >
            <i class="fi-rr-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'OnboardingServiceCards',
  computed: {
    ...mapState({
      services: state => state.profile.user.services,
      currency: state => state.profile.user.currency,
      editingService: state => state.profile.editingServiceCard
    }),
  },
  methods: {
    ...mapMutations({
      updateServices: 'profile/UPDATE_TRAINER_REG_DATA',
      setTempState: 'profile/SET_STATE'
    }),
    amountFormatted: (currency, amount) => {
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency
      }).format(amount)
    },
    deleteService (index) {
      if (this.editingService) {
        this.$lunaToast.error('You are currently editing a service')
      } else {
        const updatedServices = [...this.services]
        updatedServices.splice(index, 1)
        this.updateServices({ parent: 'services', type: 'deleteService', value: updatedServices })
      }
    },
    editService (index) {
      this.$emit('editservice', index)
      this.setTempState({ editingServiceCard: true })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
