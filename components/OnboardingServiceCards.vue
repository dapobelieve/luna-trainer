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
            {{ n.pricing.amount | amount($store.state.onboarding.business.currency ) }}
          </div>
        </div>
        <div class="flex px-2 py-1 gap-2 bg-gray-50">
          <button
            class="w-full h-8 flex items-center justify-center text-blue-500 rounded-md hover:bg-blue-50"
            @click.prevent="editService(n)"
          >
            <i class="fi-rr-pencil"></i>
          </button>
          <button
            class="w-full h-8 flex items-center justify-center text-blue-500 rounded-md hover:bg-blue-50"
            @click.prevent="deleteService(n)"
          >
            <i class="fi-rr-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'OnboardingServiceCards',
  computed: {
    ...mapState({
      services: state => state.onboarding.services
    })
  },
  methods: {
    deleteService (service) {
      this.$store.commit('onboarding/removeService', service)
    },
    editService (service) {
      this.$emit('edit-service', service)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
