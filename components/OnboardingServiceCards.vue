<template>
  <div class="tail-w-full xl:tail-max-w-md">
    <h5 class="xl:tail-text-lg tail-font-medium">
      <b
        v-if="services.length"
      >You have added {{ services.length }} service{{ services.length === 1 ? '' : 's' }}</b>
      <b v-else>You have no services</b>
    </h5>
    <div
      class="tail-flex tail-flex-row xl:tail-flex-col tail-mt-3 xl:tail-mt-10 tail-overflow-x-auto snap-scroll-x tail-gap-2"
    >
      <div
        v-for="(n, index) in services"
        :key="index"
        class="tail-rounded-xl tail-w-[17rem] tail-max-w-xs xl:tail-w-full tail-bg-white tail-border tail-flex tail-flex-col hover:tail-bg-gray-50 tail-cursor-pointer tail-overflow-hidden tail-flex-shrink-0"
      >
        <div class="tail-p-4 tail-flex tail-flex-grow tail-gap-2">
          <div
            class="tail-flex tail-flex-col tail-w-full tail-whitespace-nowrap tail-overflow-ellipsis tail-overflow-hidden"
          >
            <div class="tail-font-bold tail-truncate">
              {{ n.description }}
            </div>
            <div class="tail-inline-flex tail-gap-2">
              <span
                v-for="a in n.appointmentTypes"
                :key="a.index"
                class="tail-capitalize tail-mb-0 tail-text-gray-500"
              >{{ a }}</span>
            </div>
          </div>
          <div class="tail-font-medium">
            {{ $store.state.profile.trainnerRegData.personalProfile.currency }}{{ n.pricing.amount }}.00
          </div>
        </div>
        <div class="tail-flex tail-px-2 tail-py-1 tail-gap-2 tail-bg-gray-50">
          <button
            class="tail-w-full tail-h-8 tail-flex tail-items-center tail-justify-center tail-text-blue-500 tail-rounded-md hover:tail-bg-blue-50"
            @click.prevent="editService(index)"
          >
            <i class="ns-pencil"></i>
          </button>
          <button
            class="tail-w-full tail-h-8 tail-flex tail-items-center tail-justify-center tail-text-blue-500 tail-rounded-md hover:tail-bg-blue-50"
            @click.prevent="deleteService(index)"
          >
            <i class="ns-trash"></i>
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
      services: state => state.profile.trainnerRegData.services,
      currency: state => state.profile.trainnerRegData.personalProfile.currency,
      editingService: state => state.profile.editingServiceCard
    })
  },
  methods: {
    ...mapMutations({
      updateServices: 'profile/UPDATE_TRAINNER_REG_DATA',
      setTempState: 'profile/SET_STATE'
    }),
    deleteService (index) {
      if (this.editingService) {
        this.$toast.error('You are currently editing a service', { position: 'top-right' })
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
.snap-scroll-x {
  scroll-snap-type: x mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  > * {
    scroll-snap-align: start;
  }
}
</style>
